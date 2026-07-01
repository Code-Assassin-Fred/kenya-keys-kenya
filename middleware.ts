import { NextResponse, NextRequest } from "next/server";
import {
  BLOCKED_COUNTRIES,
  getCountryFromHeaders,
  getClientIp,
  getCountryFromIp,
} from "./lib/geo";

// Known search engine bot User-Agent patterns
const SEARCH_ENGINE_BOTS = [
  "googlebot",
  "bingbot",
  "slurp",        // Yahoo
  "duckduckbot",
  "baiduspider",
  "yandexbot",
  "sogou",
  "exabot",
  "facebot",
  "ia_archiver",  // Alexa
  "apis-google",
  "mediapartners-google",
  "adsbot-google",
  "feedfetcher-google",
  "google-inspectiontool",
  "ahrefsbot",
  "semrushbot",
  "mj12bot",
  "petalbot",
  "applebot",
  "linkedinbot",
  "chatgpt-user",
  "gptbot",
  "claudebot",
  "anthropic-ai",
  "facebookexternalhit",
  "twitterbot"
];

// Countries that must NEVER be blocked, regardless of geo-detection
const ALWAYS_ALLOWED_COUNTRIES = new Set([
  "KE",      // Kenya — our home country
  "LOCAL",   // Local/private IPs
  "UNKNOWN", // Unresolvable IPs — fail open
]);

/**
 * Check if the request is from a known search engine crawler.
 */
function isSearchEngineBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some((bot) => ua.includes(bot));
}

// Cookie TTL: 7 days (reduced from 30 to prevent long-lived stale geo data)
const GEO_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

// SEO-critical paths that must NEVER be geo-blocked
const SEO_BYPASS_PATHS = ["/robots.txt", "/sitemap.xml", "/favicon.ico"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userAgent = request.headers.get("user-agent");

  // 0. ALWAYS allow search engine bots through — never geo-block crawlers
  if (isSearchEngineBot(userAgent)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 1. Explicitly bypass geo-blocking for /blocked, static assets, and SEO-critical paths
  if (
    pathname.startsWith("/blocked") ||
    pathname.startsWith("/_next") ||
    SEO_BYPASS_PATHS.includes(pathname) ||
    pathname.includes(".")
  ) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 1.5. Support ?clear_geo to force a fresh geo-detection (clears stale cookie)
  if (request.nextUrl.searchParams.has("clear_geo")) {
    const cleanUrl = new URL(request.url);
    cleanUrl.searchParams.delete("clear_geo");
    const response = NextResponse.redirect(cleanUrl);
    response.cookies.delete("geo_country");
    return response;
  }

  // 2. Determine country code (with query parameter testing override)
  const testCountry = request.nextUrl.searchParams.get("test_country");
  let country = testCountry ? testCountry.toUpperCase() : null;
  let shouldSetCookie = !!testCountry;

  if (!country) {
    const cachedCountry = request.cookies.get("geo_country")?.value;

    if (cachedCountry && !BLOCKED_COUNTRIES.has(cachedCountry)) {
      // Cookie shows an allowed country — trust it
      country = cachedCountry;
    } else {
      // Either no cookie, or cookie shows a blocked country.
      // Always do a fresh lookup when the cached result would block the user.
      // This prevents stale cookies (e.g., from VPN, testing, ISP changes) from
      // permanently locking out legitimate Kenyan users.
      country = getCountryFromHeaders(request.headers);

      if (!country) {
        const clientIp = getClientIp(request.headers, (request as any).ip);
        country = await getCountryFromIp(clientIp);
      }

      // Log for debugging when a cached blocked country gets re-validated
      if (cachedCountry && BLOCKED_COUNTRIES.has(cachedCountry) && cachedCountry !== country) {
        console.log(
          `[geo] Re-validated stale cookie: was "${cachedCountry}", fresh lookup returned "${country}" for ${pathname}`
        );
      }

      shouldSetCookie = true;
    }
  }

  // 2.5. Never block explicitly allowed countries (Kenya, local, unknown)
  if (ALWAYS_ALLOWED_COUNTRIES.has(country)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-pathname", pathname);
    const response = NextResponse.next({
      request: { headers: requestHeaders },
    });

    if (shouldSetCookie) {
      response.cookies.set("geo_country", country, {
        maxAge: GEO_COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
      });
    }

    // Continue to admin auth check below
    if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/signup")) {
      const session = request.cookies.get("admin_session");
      if (!session) {
        const adminRedirect = NextResponse.redirect(new URL("/admin/login", request.url));
        if (shouldSetCookie) {
          adminRedirect.cookies.set("geo_country", country, {
            maxAge: GEO_COOKIE_MAX_AGE,
            path: "/",
            sameSite: "lax",
          });
        }
        return adminRedirect;
      }
    }

    return response;
  }

  const isBlocked = BLOCKED_COUNTRIES.has(country);

  // 3. Handle geofencing block if matched
  if (isBlocked) {
    console.log(`[geo] Blocking request: country="${country}", path="${pathname}"`);

    let response: NextResponse;
    
    if (pathname.startsWith("/api/")) {
      response = new NextResponse(
        JSON.stringify({
          error: "Access restricted",
          message: "This service is unavailable in North and South America.",
        }),
        {
          status: 451,
          headers: { "Content-Type": "application/json" },
        }
      );
    } else {
      // Redirect to the styled blocked page
      response = NextResponse.redirect(new URL("/blocked", request.url));
    }

    if (shouldSetCookie) {
      response.cookies.set("geo_country", country, {
        maxAge: GEO_COOKIE_MAX_AGE,
        path: "/",
        sameSite: "lax",
      });
    }

    return response;
  }

  // 4. If allowed, proceed with standard checks (e.g. Admin Authentication)
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  
  let response = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  // Protect all /admin routes except /admin/login and /admin/signup
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login") && !pathname.startsWith("/admin/signup")) {
    const session = request.cookies.get("admin_session");
    if (!session) {
      response = NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Ensure resolved country cookie is set for performance
  if (shouldSetCookie && country) {
    response.cookies.set("geo_country", country, {
      maxAge: GEO_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Match all request paths except _next/static, _next/image, and favicon.ico
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

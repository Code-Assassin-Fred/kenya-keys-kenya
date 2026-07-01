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

/**
 * Check if the request is from a known search engine crawler.
 */
function isSearchEngineBot(userAgent: string | null): boolean {
  if (!userAgent) return false;
  const ua = userAgent.toLowerCase();
  return SEARCH_ENGINE_BOTS.some((bot) => ua.includes(bot));
}

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

  // 2. Determine country code (with query parameter testing override)
  const testCountry = request.nextUrl.searchParams.get("test_country");
  let country = testCountry ? testCountry.toUpperCase() : null;
  let shouldSetCookie = !!testCountry;

  if (!country) {
    // Check if country is already cached in cookie
    const cachedCountry = request.cookies.get("geo_country")?.value;
    if (cachedCountry) {
      country = cachedCountry;
    } else {
      // Not cached. Try headers first (Cloudflare, Vercel)
      country = getCountryFromHeaders(request.headers);

      if (!country) {
        // Fallback: Resolve via IP Lookup API
        const clientIp = getClientIp(request.headers, (request as any).ip);
        country = await getCountryFromIp(clientIp);
      }
      shouldSetCookie = true;
    }
  }

  const isBlocked = BLOCKED_COUNTRIES.has(country);

  // 3. Handle geofencing block if matched
  if (isBlocked) {
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
        maxAge: 60 * 60 * 24 * 30, // 30 days
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
      maxAge: 60 * 60 * 24 * 30, // 30 days
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

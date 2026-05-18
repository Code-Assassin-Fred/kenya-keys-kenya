import { NextResponse, NextRequest } from "next/server";
import {
  BLOCKED_COUNTRIES,
  getCountryFromHeaders,
  getClientIp,
  getCountryFromIp,
} from "./lib/geo";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Explicitly bypass geo-blocking for /blocked and static assets/files
  if (
    pathname.startsWith("/blocked") ||
    pathname.startsWith("/_next") ||
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

  // Protect all /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
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

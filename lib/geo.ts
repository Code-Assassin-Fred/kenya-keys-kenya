// Country codes for North & South American countries and territories (ISO 3166-1 alpha-2)
export const BLOCKED_COUNTRIES = new Set([
  // --- NORTH AMERICA & CARIBBEAN ---
  "US", // United States
  "CA", // Canada
  "MX", // Mexico
  "GT", // Guatemala
  "BZ", // Belize
  "HN", // Honduras
  "SV", // El Salvador
  "NI", // Nicaragua
  "CR", // Costa Rica
  "PA", // Panama
  "CU", // Cuba
  "JM", // Jamaica
  "HT", // Haiti
  "DO", // Dominican Republic
  "PR", // Puerto Rico
  "TT", // Trinidad and Tobago
  "BB", // Barbados
  "DM", // Dominica
  "GD", // Grenada
  "KN", // Saint Kitts and Nevis
  "LC", // Saint Lucia
  "VC", // Saint Vincent and the Grenadines
  "AG", // Antigua and Barbuda
  "BS", // Bahamas
  "AI", // Anguilla
  "AW", // Aruba
  "BM", // Bermuda
  "KY", // Cayman Islands
  "CW", // Curaçao
  "GL", // Greenland
  "GP", // Guadeloupe
  "MQ", // Martinique
  "MS", // Montserrat
  "PM", // Saint Pierre and Miquelon
  "TC", // Turks and Caicos Islands
  "VG", // British Virgin Islands
  "VI", // U.S. Virgin Islands
  "BL", // Saint Barthélemy
  "SX", // Sint Maarten
  "MF", // Saint Martin
  "BQ", // Bonaire, Sint Eustatius and Saba

  // --- SOUTH AMERICA ---
  "AR", // Argentina
  "BO", // Bolivia
  "BR", // Brazil
  "CL", // Chile
  "CO", // Colombia
  "EC", // Ecuador
  "FK", // Falkland Islands
  "GF", // French Guiana
  "GY", // Guyana
  "PY", // Paraguay
  "PE", // Peru
  "SR", // Suriname
  "UY", // Uruguay
  "VE", // Venezuela
  "GS", // South Georgia and the South Sandwich Islands
]);

/**
 * Checks if an IP address is a private, loopback, or local IP.
 */
export function isLocalOrPrivateIp(ip: string): boolean {
  if (!ip) return true;
  const trimmed = ip.trim();
  
  return (
    trimmed === "127.0.0.1" ||
    trimmed === "::1" ||
    trimmed.startsWith("localhost") ||
    trimmed.startsWith("10.") ||
    trimmed.startsWith("192.168.") ||
    // 172.16.0.0 - 172.31.255.255
    /^172\.(1[6-9]|2[0-9]|3[0-1])\./.test(trimmed) ||
    trimmed.startsWith("fe80:")
  );
}

/**
 * Attempts to extract the country code from request headers.
 */
export function getCountryFromHeaders(headers: Headers): string | null {
  // Cloudflare headers
  const cfCountry = headers.get("cf-ipcountry") || headers.get("CF-IPCountry");
  if (cfCountry && cfCountry !== "XX" && cfCountry !== "T1") {
    return cfCountry.toUpperCase();
  }

  // Vercel headers
  const vercelCountry = headers.get("x-vercel-ip-country");
  if (vercelCountry) {
    return vercelCountry.toUpperCase();
  }

  return null;
}

/**
 * Extracts the client's IP from request headers or direct property.
 */
export function getClientIp(headers: Headers, requestIp?: string | null): string {
  const xForwardedFor = headers.get("x-forwarded-for");
  if (xForwardedFor) {
    const ips = xForwardedFor.split(",");
    const clientIp = ips[0].trim();
    if (clientIp) return clientIp;
  }

  const xRealIp = headers.get("x-real-ip");
  if (xRealIp) return xRealIp.trim();

  return requestIp ? requestIp.trim() : "127.0.0.1";
}

/**
 * Resolves the country code for a given IP using fast, public APIs.
 */
export async function getCountryFromIp(ip: string): Promise<string> {
  if (isLocalOrPrivateIp(ip)) {
    return "LOCAL";
  }

  // Try freeipapi.com first (extremely fast, HTTPS)
  try {
    const res = await fetch(`https://freeipapi.com/api/json/${ip}`, {
      next: { revalidate: 86400 }, // Cache response for 24 hours at the fetch level if supported
      signal: AbortSignal.timeout(3000), // 3 second timeout
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.countryCode && data.countryCode !== "-") {
        return data.countryCode.toUpperCase();
      }
    }
  } catch (e) {
    console.warn("Failed to fetch country from freeipapi:", e);
  }

  // Fallback 1: ipwho.is (very reliable)
  try {
    const res = await fetch(`https://ipwho.is/${ip}`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.success && data.country_code) {
        return data.country_code.toUpperCase();
      }
    }
  } catch (e) {
    console.warn("Failed to fetch country from ipwho.is:", e);
  }

  // Fallback 2: ipapi.co
  try {
    const res = await fetch(`https://ipapi.co/${ip}/json/`, {
      signal: AbortSignal.timeout(3000),
    });
    if (res.ok) {
      const data = await res.json();
      if (data && data.country_code) {
        return data.country_code.toUpperCase();
      }
    }
  } catch (e) {
    console.warn("Failed to fetch country from ipapi.co:", e);
  }

  // Default to allowing if geolocation completely fails
  return "UNKNOWN";
}

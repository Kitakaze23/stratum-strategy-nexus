/** Canonical public origin of the site. Used for canonical URLs, Open Graph and the sitemap. */
export const SITE_URL = "https://www.stratum-consulting.ru";

/** Absolute URL for a site path ("/services/x" → "https://www.stratum-consulting.ru/services/x"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return SITE_URL + (path.startsWith("/") ? path : `/${path}`);
}

/** Default social preview image (1200×630). */
export const OG_IMAGE = absoluteUrl("/og-image.png");

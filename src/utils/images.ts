const SITE_URL = 'https://www.lilja-tours.com';

// Helper to strip domain from full URLs and normalize to relative path
function normalizeToRelativePath(path: string): string {
  // Strip domain if present
  let cleanPath = path.replace(SITE_URL, '');
  // Ensure it starts with /
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
}

export function getDisplayImageUrl(path: string, width: number, quality = 85): string {
  const isDev = import.meta.env.DEV;
  if (isDev) return path;

  const normalizedPath = normalizeToRelativePath(path);
  return `/cdn-cgi/image/width=${width},format=auto,quality=${quality},fit=scale-down,metadata=none${normalizedPath}`;
}

export function getOgImageUrl(path: string): string {
  const isDev = import.meta.env.DEV;
  const normalizedPath = normalizeToRelativePath(path);

  if (isDev) return normalizedPath;

  return `${SITE_URL}/cdn-cgi/image/width=1200,height=630,fit=cover,format=jpeg,quality=85${normalizedPath}`;
}

export function getJsonLdImages(path: string): string[] {
  const isDev = import.meta.env.DEV;
  const normalizedPath = normalizeToRelativePath(path);

  if (isDev) return [normalizedPath];

  return [
    `${SITE_URL}/cdn-cgi/image/width=1200,height=630,fit=cover,format=jpeg,quality=85${normalizedPath}`,
    `${SITE_URL}/cdn-cgi/image/width=1200,height=900,fit=cover,format=jpeg,quality=85${normalizedPath}`,
    `${SITE_URL}/cdn-cgi/image/width=1200,height=1200,fit=cover,format=jpeg,quality=85${normalizedPath}`
  ];
}

export function getSrcSet(path: string, widths = [640, 1280, 1920, 2400], quality = 85): string {
  const isDev = import.meta.env.DEV;
  if (isDev) return '';

  return widths
    .map(w => `${getDisplayImageUrl(path, w, quality)} ${w}w`)
    .join(', ');
}

export function getBackgroundImageUrl(path: string, width = 1920, quality = 85): string {
  const isDev = import.meta.env.DEV;
  if (isDev) return path;

  const normalizedPath = normalizeToRelativePath(path);
  return `/cdn-cgi/image/width=${width},format=auto,quality=${quality},fit=cover${normalizedPath}`;
}

const DEFAULT_BASE_URL = 'https://www.orangejelly.co.uk';

export function getBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_BASE_URL || DEFAULT_BASE_URL;
  return raw.replace(/\/$/, '');
}

export function getAbsoluteUrl(pathname = ''): string {
  const base = getBaseUrl();

  if (!pathname) {
    return base;
  }

  const normalizedPath = pathname.startsWith('/') ? pathname : `/${pathname}`;
  return `${base}${normalizedPath}`;
}

import { client } from './sanity.client';
import { siteSettingsQuery } from './sanity.queries';
import type { SiteSettings } from './sanity.types';

// Cache for site settings
let cachedSettings: SiteSettings | null = null;

export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (cachedSettings) {
    return cachedSettings;
  }

  try {
    const settings = await client.fetch<SiteSettings>(siteSettingsQuery);
    if (settings) {
      cachedSettings = settings;
      return settings;
    }
  } catch (error) {
    console.error('Error fetching site settings from Sanity:', error);
  }

  return null;
}
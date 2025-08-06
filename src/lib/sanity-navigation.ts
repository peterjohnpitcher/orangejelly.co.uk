import { client } from './sanity.client';
import { navigationQuery } from './sanity.queries';
import type { Navigation } from './sanity.types';

let cachedNavigation: Navigation | null = null;

export async function getNavigation(): Promise<Navigation> {
  if (cachedNavigation) {
    return cachedNavigation;
  }

  try {
    const navigation = await client.fetch<Navigation>(navigationQuery);
    if (navigation) {
      cachedNavigation = navigation;
      return navigation;
    }
  } catch (error) {
    console.error('Error fetching navigation from Sanity:', error);
  }

  // Fallback to hardcoded navigation if Sanity fails
  return {
    mainMenu: [
      { label: 'Home', href: '/', external: false },
      { label: 'Services', href: '/services', external: false },
      { label: "Licensee's Guide", href: '/licensees-guide', external: false },
      { label: 'Success Stories', href: '/results', external: false },
      { label: 'About', href: '/about', external: false },
      { label: 'Contact', href: '/contact', external: false },
    ],
  };
}
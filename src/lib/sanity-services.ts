import { client } from './sanity.client';
import { servicesQuery } from './sanity.queries';
import type { Service } from './sanity.types';

let cachedServices: Service[] | null = null;

export async function getServices(): Promise<Service[]> {
  if (cachedServices) {
    return cachedServices;
  }

  try {
    const services = await client.fetch<Service[]>(servicesQuery);
    if (services && services.length > 0) {
      cachedServices = services;
      return services;
    }
  } catch (error) {
    console.error('Error fetching services from Sanity:', error);
  }

  // Return empty array as fallback
  return [];
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const services = await getServices();
  return services.find(service => service.slug === slug) || null;
}
import { getSiteSettings } from './sanity-settings';
import * as FALLBACK from './constants';

// Dynamic constants that fetch from Sanity with fallback
export async function getConstants() {
  const settings = await getSiteSettings();
  
  if (!settings) {
    // Return fallback constants if Sanity fetch fails
    return FALLBACK;
  }

  // Merge Sanity data with fallback structure
  return {
    CONTACT: {
      phone: settings.contact?.phone || FALLBACK.CONTACT.phone,
      phoneInternational: FALLBACK.CONTACT.phoneInternational, // Not in Sanity schema
      whatsappNumber: settings.contact?.whatsappNumber || FALLBACK.CONTACT.whatsappNumber,
      email: settings.contact?.email || FALLBACK.CONTACT.email,
      location: settings.contact?.address || FALLBACK.CONTACT.location,
      owner: settings.company?.owner || FALLBACK.CONTACT.owner,
      responseTime: FALLBACK.CONTACT.responseTime, // Not in Sanity schema
    },
    
    COMPANY: {
      name: settings.businessName || FALLBACK.COMPANY.name,
      tagline: settings.tagline || FALLBACK.COMPANY.tagline,
      website: FALLBACK.COMPANY.website, // Not in Sanity schema
      vatStatus: settings.company?.vatRegistered 
        ? `VAT Number: ${settings.company.vatNumber}` 
        : FALLBACK.COMPANY.vatStatus,
    },
    
    PRICING: {
      hourlyRate: {
        amount: settings.pricing?.hourlyRate || FALLBACK.PRICING.hourlyRate.amount,
        display: settings.pricing?.hourlyRate 
          ? `£${settings.pricing.hourlyRate}/hour` 
          : FALLBACK.PRICING.hourlyRate.display,
        description: FALLBACK.PRICING.hourlyRate.description, // Not in Sanity schema
      },
      services: FALLBACK.PRICING.services, // Keep services hardcoded for now
    },
    
    MESSAGES: FALLBACK.MESSAGES,
    SUCCESS_METRICS: FALLBACK.SUCCESS_METRICS,
    FEATURES: FALLBACK.FEATURES,
    QUIZ_EXAMPLE: FALLBACK.QUIZ_EXAMPLE,
    URLS: FALLBACK.URLS,
    formatPrice: FALLBACK.formatPrice,
    formatPhoneDisplay: FALLBACK.formatPhoneDisplay,
  };
}

// Export individual getters for specific constants
export async function getContact() {
  const constants = await getConstants();
  return constants.CONTACT;
}

export async function getCompany() {
  const constants = await getConstants();
  return constants.COMPANY;
}

export async function getPricing() {
  const constants = await getConstants();
  return constants.PRICING;
}
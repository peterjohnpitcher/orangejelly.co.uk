// Contact Information
export const CONTACT = {
  phone: '07990 587315',
  phoneInternational: '+447990587315',
  whatsappNumber: '447990587315',
  email: 'peter@orangejelly.co.uk',
  location: 'Stanwell Moor',
  owner: 'Peter Pitcher',
  responseTime: 'as soon as I can',
} as const;

// Company Information
export const COMPANY = {
  name: 'Orange Jelly',
  tagline: 'Marketing that actually works for busy licensees',
  website: 'https://www.orangejelly.co.uk',
  vatStatus: 'All prices exclude VAT',
} as const;

// Pricing Configuration
export const PRICING = {
  // Hourly Rate
  hourlyRate: {
    amount: 62.50,
    display: '£62.50/hour',
    description: 'Simple, honest pricing',
  },

  // Services
  services: {
    // 30-Day Quick Wins Package
    quickWins: {
      amount: 499,
      display: '£499 + VAT',
      description: '30-day trial at one location',
      setupFee: 499,
      monthlyFee: 149,
      firstMonthsSetup: '£499/month',
      ongoingDisplay: 'First 3 months, then £149/month',
    },

    // Menu Makeover
    menuMakeover: {
      amount: 99,
      display: '£99 + VAT',
      description: 'AI-powered menu optimization',
    },

    // Google My Business Setup
    googleMyBusiness: {
      amount: 399,
      display: '£399 + VAT per location',
      description: 'Complete GMB setup and optimization',
    },

    // Website Services
    website: {
      setup: {
        amount: 1499,
        display: '£1499 + VAT setup',
        description: 'Professional pub website',
      },
      hosting: {
        hostingOnly: {
          amount: 50,
          display: '£50/month',
          description: 'Hosting only',
        },
        fullSupport: {
          amount: 199,
          display: '£199/month',
          description: 'Full support with all updates',
        },
      },
    },

    // Email & Social Setup
    emailSocial: {
      amount: 499,
      display: 'From £499 + VAT',
      description: 'Email and social media automation setup',
    },

    // Training Sessions
    training: {
      quickStart: {
        duration: '2 hours',
        amount: 125,
        display: '£125 + VAT',
        description: 'Email & social media basics',
        calculation: '2 hours × £62.50',
      },
      halfDay: {
        duration: '4 hours',
        amount: 250,
        display: '£250 + VAT',
        description: 'Core AI tools for daily ops',
        calculation: '4 hours × £62.50',
      },
      fullDay: {
        duration: '8 hours',
        amount: 500,
        display: '£500 + VAT',
        description: 'Everything including rotas & stock',
        calculation: '8 hours × £62.50',
      },
    },

    // Team Training (group rate for up to 6 people)
    teamTraining: {
      halfDay: {
        amount: 375,
        display: '£375 + VAT',
        description: 'Half Day Workshop',
        calculation: '6 hours × £62.50',
      },
      fullDay: {
        amount: 750,
        display: '£750 + VAT',
        description: 'Full Day Intensive',
        calculation: '12 hours × £62.50',
      },
    },
  },
} as const;

// Common Messages
export const MESSAGES = {
  // WhatsApp Messages
  whatsapp: {
    default: "Hi Peter, got time for a quick chat about my pub?",
    services: "Hi Peter, I'd like to chat about Orange Jelly",
    training: "Hi Peter, I'm interested in AI training for my pub",
    quickWins: "Hi Peter, I'd like to try the 30-day package",
    blog: "Hi Peter, I just read your blog post and need help with my pub",
    notListed: "Hi Peter, I need help with something not on your services list...",
    caseStudies: "Hi Peter, just read your case studies. Can we chat?",
    lostPage: "Hi Peter, I got lost on your site. Can you help me find what I'm looking for?",
  },

  // Response Times
  response: {
    whatsapp: "I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours",
    email: "I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours",
  },

  // Trust Messages
  trust: {
    moneyBack: 'Money-back guarantee',
    timeSaved: 'Time saved promise',
    atLeastFiveHours: 'At Least 5 Hours',
    thirtyDays: '30 Days',
    noContracts: 'No hidden fees, no long contracts, no surprises',
    noAgencyFees: 'No Agency Fees',
    fromlicensees: 'From Real licensees',
    resultsIn14Days: 'Results in 14 Days',
    costEffective: 'Costs less than a part-time employee',
    coversIncrease: '25-35 Quiz Regulars',
    coversIncreaseLabel: 'Up from 20 people',
    foodGPIncrease: '+8% Food GP',
    foodGPIncreaseLabel: 'Improved profit margins',
    sundayRoastRevenue: '£400+ Weekly',
    sundayRoastRevenueLabel: 'Extra Sunday roast revenue',
  },

  // CTA Messages
  cta: {
    primary: 'Fill Your Pub',
    secondary: 'Get More Customers',
    bookCall: 'Get Help Now',
    tryRiskFree: 'Turn Your Pub Around',
    getQuickWins: 'Start Filling Tables',
    seeHow: 'See What Works',
    getHelp: 'Stop Struggling',
  },
} as const;

// Success Metrics (from case studies)
export const SUCCESS_METRICS = {
  theAnchor: {
    revenueIncrease: '£400+',
    averageSpendBefore: '£14.50',
    averageSpendAfter: '£18.50',
    percentageIncrease: '28%',
    description: 'Sunday roast sales up £400+ per week',
  },
  costSavings: {
    identified: '£2,000/month',
    description: 'Identified cost savings through efficiency',
  },
  menuOptimization: {
    spendIncrease: '£4.50',
    description: 'Menu rewrite increased spend per head by £4.50',
  },
} as const;

// Service Features
export const FEATURES = {
  quickWins: [
    'Menu review & profit margin analysis',
    '30 days of content creation',
    'Email templates that work',
    'Staff notices & table talkers',
    'WhatsApp support',
    'Money-back guarantee',
  ],
  support: [
    'WhatsApp preferred for quick responses',
    'Based in Stanwell Moor, serving pubs across the UK',
    'Run by actual licensees who understand your challenges',
  ],
} as const;

// Quiz Example
export const QUIZ_EXAMPLE = {
  entry: '£2',
  message: 'QUIZ NIGHT! 8pm start. I\'ve written easier questions this week (I promise 😂). £2 entry, winning team gets a round + the glory. Book a table - kitchen\'s open til 9!',
} as const;

// URLs
export const URLS = {
  whatsapp: (message: string = MESSAGES.whatsapp.default) => 
    `https://wa.me/${CONTACT.whatsappNumber}?text=${encodeURIComponent(message)}`,
  email: `mailto:${CONTACT.email}`,
  phone: `tel:${CONTACT.phoneInternational}`,
} as const;

// Format helpers
export const formatPrice = (amount: number, includeVAT: boolean = true): string => {
  const formatted = `£${amount.toFixed(2).replace(/\.00$/, '')}`;
  return includeVAT ? `${formatted} + VAT` : formatted;
};

export const formatPhoneDisplay = (): string => {
  return `WhatsApp: ${CONTACT.phone}`;
};
import { Suspense } from 'react';
import { Metadata } from 'next';
import HomePage from './HomePage';
import { AsyncErrorBoundary } from '@/components/ErrorBoundary';
import { PageLoading } from '@/components/Loading';

export const metadata: Metadata = {
  title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
  description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
  keywords: ['pub marketing UK', 'fill empty pub tables', 'pub marketing strategies', 'increase pub customers', 'pub social media marketing', 'pub turnaround', 'empty pub solutions'],
  openGraph: {
    title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
    description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
    type: 'website',
    url: '/',
  },
};

// Local data for homepage
const getLocalHomeData = () => {
  const hero = {
    title: "How to Fill Empty Pub Tables",
    subtitle: "Struggling with empty tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another.",
    ctaText: "Get Marketing Help",
    bottomText: "£62.50 per hour plus VAT • 30-day guarantee • Real pub experience"
  };

  const faqs = [
    {
      question: "Can I just get a one-off consultation?",
      answer: "Of course! Many pubs start with a single consultation to tackle their biggest problem. We charge £62.50 per hour plus VAT, and there's no minimum commitment. Often, that first session provides enough value to transform your business."
    },
    {
      question: "How quickly can Orange Jelly help fill my empty pub?",
      answer: "We typically see results within 30 days. Our strategies have been proven at The Anchor where we've turned quiet nights into profitable ones. We use AI-powered marketing that brings customers through the door."
    },
    {
      question: "What makes Orange Jelly different from other pub marketing agencies?",
      answer: "We actually run a pub - The Anchor in Stanwell Moor. Every strategy we recommend has been tested in our own business first. We're not an agency; I'm a licensee who understands your challenges because I face them too."
    },
    {
      question: "What does pub marketing cost with Orange Jelly?",
      answer: "We charge £62.50 per hour plus VAT as a flat rate. I'm always happy to have a free chat first to understand your challenges. All pricing is transparent with no hidden fees, and we offer a 30-day money-back guarantee."
    }
  ];

  const problems = [
    {
      emoji: "📉",
      title: "Empty Tables Tuesday-Thursday",
      description: "Quiet midweek trade killing your profits",
      linkHref: "midweek-marketing"
    },
    {
      emoji: "💸",
      title: "Rising Costs, Falling Revenue",
      description: "Squeezed margins with no clear way forward",
      linkHref: "cost-optimization"
    },
    {
      emoji: "🏢",
      title: "Chain Pub Competition",
      description: "Struggling to compete with Wetherspoons and Greene King",
      linkHref: "competitive-advantage"
    },
    {
      emoji: "📱",
      title: "Social Media Overwhelm",
      description: "No time for marketing, no results when you try",
      linkHref: "social-media-automation"
    },
    {
      emoji: "🍽️",
      title: "Menu Not Converting",
      description: "Food orders low despite good quality",
      linkHref: "menu-optimization"
    },
    {
      emoji: "⭐",
      title: "Poor Online Reviews",
      description: "Negative feedback damaging your reputation",
      linkHref: "reputation-management"
    }
  ];

  const features = [
    {
      icon: "🧠",
      title: "AI-Powered Marketing",
      description: "Create months of content in hours, not weeks",
      highlight: true
    },
    {
      icon: "🍺",
      title: "Real Pub Experience",
      description: "Every strategy tested at The Anchor first"
    },
    {
      icon: "⚡",
      title: "Quick Results",
      description: "Most pubs see improvements within 30 days"
    },
    {
      icon: "💰",
      title: "Guaranteed ROI",
      description: "30-day money-back guarantee on results"
    }
  ];

  const metrics = {
    quizNight: "25-35 people",
    quizNightContext: "per quiz night (up from 0-5)",
    foodGP: "71%",
    foodGPContext: "food GP (up from 58%)",
    socialViews: "50,000+",
    socialViewsContext: "monthly social media impressions",
    hoursSaved: "25 hours",
    hoursSavedContext: "of admin time saved weekly"
  };

  const trustBadges = [
    {
      name: "BII Featured",
      description: "Featured in BII Autumn 2025 magazine",
      icon: "🏆"
    },
    {
      name: "Real Licensees",
      description: "Active pub operators since 2019",
      icon: "🍺"
    },
    {
      name: "AI Pioneers",
      description: "Early AI adopters in hospitality",
      icon: "🤖"
    },
    {
      name: "Proven Results",
      description: "£75k-£100k value added to our own pub",
      icon: "📈"
    }
  ];

  const siteSettings = {
    title: "Orange Jelly",
    description: "Pub marketing that works"
  };

  const partnerships = [
    {
      name: "Greene King",
      logo: "/partnerships/greene-king.png",
      description: "Pub group partnerships"
    },
    {
      name: "BII",
      logo: "/partnerships/bii.png",
      description: "British Institute of Innkeeping"
    }
  ];

  const trustBarItems = [
    { value: "£75k-£100k", label: "value added to The Anchor" },
    { value: "71%", label: "food GP (up from 58%)" },
    { value: "30 days", label: "typical results timeframe" },
    { value: "£62.50", label: "per hour + VAT" }
  ];

  const sectionHeadings = {
    problemsHeading: "What's Killing Your Business?",
    solutionsHeading: "Explore Solutions to Your Biggest Problems",
    resultsHeading: "Real Results from The Anchor",
    resultsTestimonial: "We've added £75,000-£100,000 of value to our business using AI. Our food GP improved from 58% to 71%. Every strategy we share has been proven in our own pub.",
    resultsSubtext: "Featured in BII's Autumn 2025 magazine for AI innovation. From quiz nights to tasting events - see how we turned our pub around.",
    resultsButtonText: "See More Pub Turnarounds",
    calculatorHeading: "Calculate Your Potential Revenue",
    calculatorSubtext: "Every pub is different. See exactly how much more revenue you could generate with proven strategies.",
    aboutHeading: "We're licensees, Just Like You",
    aboutText1: "I'm Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. We faced the same struggles - empty tables, rising costs, fierce competition.",
    aboutText2: "Orange Jelly exists because we discovered how AI can add 25 hours of value per week. I've been an early AI adopter since 2021, and now I help other pubs implement the same strategies that transformed our business.",
    aboutButtonText: "Read Our Full Story →",
    aboutCardText: "Real pub experience + proven strategies = Orange Jelly",
    aboutCardLabel: "Proven Daily At",
    ctaBannerHeading: "Stop Struggling. Start Thriving.",
    ctaBannerText: "Tell me what's killing your business. I'll share exactly how we fixed the same problems at The Anchor. Real solutions, no fluff.",
    ctaBannerButton: "Get Marketing Help",
    faqHeading: "Frequently Asked Questions",
    finalCtaTitle: "Ready to Turn Your Pub Around?",
    finalCtaSubtitle: "Let's talk about what's really hurting your business. I'll share the exact strategies that saved ours."
  };

  return {
    hero,
    faqs,
    problems,
    features,
    metrics,
    trustBadges,
    siteSettings,
    partnerships,
    trustBarItems,
    sectionHeadings
  };
};

// Component that uses local data
function HomePageData() {
  const data = getLocalHomeData();

  return (
    <HomePage 
      hero={data.hero}
      faqs={data.faqs}
      problems={data.problems}
      features={data.features}
      metrics={data.metrics}
      trustBadges={data.trustBadges}
      siteSettings={data.siteSettings}
      partnerships={data.partnerships}
      trustBarItems={data.trustBarItems}
      sectionHeadings={data.sectionHeadings}
    />
  );
}

export default function Home() {
  return (
    <AsyncErrorBoundary>
      <HomePageData />
    </AsyncErrorBoundary>
  );
}
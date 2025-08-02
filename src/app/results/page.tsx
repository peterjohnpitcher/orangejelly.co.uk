import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CaseStudySelector from '@/components/CaseStudySelector';

export const metadata: Metadata = {
  title: 'Real Results from The Anchor | Orange Jelly Case Studies',
  description: 'Real case studies from The Anchor pub. See how we increased Sunday roast revenue by £400+/week, saved 5+ hours weekly, and turned Wednesday nights from 20 to 60+ covers.',
  openGraph: {
    title: 'Real Results from The Anchor | Orange Jelly Case Studies',
    description: 'Real case studies showing how Orange Jelly helped The Anchor increase revenue and save time with AI.',
    url: 'https://orangejelly.co.uk/results',
    siteName: 'Orange Jelly',
    locale: 'en_GB',
    type: 'website',
  },
};

interface Result {
  id: string;
  title: string;
  subtitle: string;
  problem: string[];
  failed: string[];
  solution: string[];
  results: { metric: string; value: string }[];
  timeInvestment: string[];
  learnings: string[];
  quote?: string;
}

export default function Results() {
  // Generate comprehensive schema for Results
  const resultsSchema = (() => {
    const caseStudySchemas = [
      {
        "@type": "HowTo",
        "@id": "https://orangejelly.co.uk/results#sunday-roast",
        "name": "How to Increase Sunday Roast Sales with AI Menu Descriptions",
        "description": "Learn how The Anchor increased Sunday lunch revenue by £400+ per week using AI-optimized menu descriptions",
        "supply": ["AI writing tool", "Menu photos", "Customer feedback"],
        "tool": ["ChatGPT or Claude", "Photo editing software"],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Analyze current menu",
            "text": "Identify boring descriptions like 'Roast beef with vegetables'"
          },
          {
            "@type": "HowToStep", 
            "name": "Train AI with specifics",
            "text": "Upload photos and details of actual dishes to AI"
          },
          {
            "@type": "HowToStep",
            "name": "Use customer language",
            "text": "Write descriptions using words your customers actually use"
          },
          {
            "@type": "HowToStep",
            "name": "Add local details",
            "text": "Include local supplier names and portion sizes"
          }
        ],
        "totalTime": "PT2H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "GBP",
          "value": "199"
        },
        "performTime": "PT30M",
        "yield": "44% increase in covers, 28% increase in average spend"
      },
      {
        "@type": "Article",
        "@id": "https://orangejelly.co.uk/results#social-media",
        "headline": "3 Months of Social Media in One Afternoon",
        "description": "Case study showing how The Anchor created 90 days of engaging social media content using AI tools in just 3 hours",
        "author": {
          "@id": "https://orangejelly.co.uk/#peter-pitcher"
        },
        "datePublished": "2024-09-15",
        "articleBody": "Struggling with daily social media posts, we used AI to batch-create 3 months of content...",
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "reviewCount": "8"
        }
      },
      {
        "@type": "Article",
        "@id": "https://orangejelly.co.uk/results#wednesday-nights",
        "headline": "Wednesday Nights: From 20 to 60+ Covers",
        "description": "How we turned our quietest night into a packed house using AI-powered business analysis",
        "author": {
          "@id": "https://orangejelly.co.uk/#peter-pitcher"
        },
        "datePublished": "2024-10-01",
        "articleBody": "Wednesday was dead. Using AI to analyze competitors and trends, we discovered an untapped opportunity..."
      }
    ];

    const reviewSchema = {
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "Orange Jelly AI Consulting",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        }
      },
      "reviewBody": "Since changing our menus with Peter's help, our Sunday roast sales are through the roof. Best investment we've made.",
      "author": {
        "@type": "Restaurant",
        "name": "The Anchor"
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      }
    };

    return {
      "@context": "https://schema.org",
      "@graph": [...caseStudySchemas, reviewSchema]
    };
  })();

  const results: Result[] = [
    {
      id: 'sunday-roast',
      title: 'The Sunday Roast Revolution',
      subtitle: 'How better menu descriptions added £400+ weekly revenue',
      problem: [
        'Sunday lunch is 30% of our weekly revenue',
        'Menu descriptions were boring: "Roast beef with vegetables"',
        'Average Sunday covers: 45',
        'Average spend: £14.50'
      ],
      failed: [
        'Copied fancy restaurant descriptions - sounded pretentious',
        'Used ChatGPT raw - "Succulent protein with seasonal accoutrements" (too pretentious)',
        'Got too flowery - three-line descriptions nobody read'
      ],
      solution: [
        'Trained AI with our actual dishes (photos helped)',
        'Used words our customers actually use',
        'Added local supplier names',
        'Mentioned portion sizes (people want to know!)'
      ],
      results: [
        { metric: 'Sunday covers', value: 'Up to 65 (44% increase)' },
        { metric: 'Average spend', value: '£18.50 (28% increase)' },
        { metric: 'Advance bookings', value: 'Doubled' },
        { metric: 'Kitchen efficiency', value: 'More consistent orders' }
      ],
      timeInvestment: [
        'Initial menu rewrite: 3 hours',
        'Weekly tweaks: 10 minutes',
        'Training Billy: 1 hour'
      ],
      learnings: [
        'Keep local references',
        'Mention portion sizes',
        'Don\'t overthink it',
        'Test with regulars first'
      ],
      quote: '"Slow-roasted Hereford beef (served pink or well-done), proper Yorkshire pudding, honey-glazed carrots, crispy roasties, and rich gravy"'
    },
    {
      id: 'social-media',
      title: 'The Social Media Time Sink Solution',
      subtitle: 'From 2 hours to 20 minutes weekly',
      problem: [
        'Billy spending 2 hours every week on social media',
        'Staring at blank screens',
        'Forgetting to promote events',
        'Missing prime posting times'
      ],
      failed: [
        'Quiz night posts at 8pm (too late!)',
        'Same boring "Sunday lunch available" posts',
        'No consistency between platforms',
        'Marty deleted a week\'s work once'
      ],
      solution: [
        'Set up AI to generate month\'s content in batches',
        'Created variations for different platforms',
        'Scheduled posts for optimal times',
        'Kept our voice (casual, friendly, bit cheeky)'
      ],
      results: [
        { metric: 'Facebook engagement', value: 'Up 200%' },
        { metric: 'Quiz attendance', value: '25-30 → 40-45 people' },
        { metric: 'Event food orders', value: 'Increased 40%' },
        { metric: 'Time saved', value: 'At least 5 hours monthly' }
      ],
      timeInvestment: [
        'Initial setup: Half day',
        'Monthly content creation: 20 minutes',
        'Daily management: Zero (automated)'
      ],
      learnings: [
        'Batch creation is key',
        'Personality matters more than perfection',
        'Timing is everything',
        'Staff love sharing interesting posts'
      ],
      quote: '"QUIZ NIGHT! 8pm start. I\'ve written easier questions this week (I promise). £2 entry, winning team gets a round + the glory. Book a table - kitchen\'s open til 9!"'
    },
    {
      id: 'wednesday-graveyard',
      title: 'The Wednesday Graveyard Shift',
      subtitle: 'From 20 covers to 60+ with smart targeting',
      problem: [
        '15-20 covers on a good night',
        'Staff standing around',
        'Fixed costs eating profits',
        'Tried everything: discounts, themes, giving up'
      ],
      failed: [
        'Generic discounts attracted wrong crowd',
        'Quiz night clashed with 3 other pubs',
        'Curry night was too common',
        'OAP lunch - wrong day choice'
      ],
      solution: [
        'AI analyzed local competition gaps',
        'Identified underserved family market',
        '"Kids Eat Free" 5-7pm positioning',
        'Targeted social media to school parents'
      ],
      results: [
        { metric: 'Week 1', value: '25 covers' },
        { metric: 'Week 4', value: '45 covers' },
        { metric: 'Week 8', value: '60+ (booking essential)' },
        { metric: 'Profit impact', value: 'Wednesday now profitable' }
      ],
      timeInvestment: [
        'Market research: 2 hours',
        'Campaign setup: 3 hours',
        'Weekly promotion: 15 minutes'
      ],
      learnings: [
        'Data beats guesswork',
        'Families are underserved midweek',
        'Parents have wine (higher spend)',
        'Success breeds success'
      ]
    }
  ];


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resultsSchema) }}
      />
      <Hero
        title="Real Results from The Anchor"
        subtitle="These aren't theory. This is what actually happened when we used AI in our pub."
        showCTA={false}
      />

      <Section background="white">
        <CaseStudySelector results={results} defaultStudy="sunday-roast" />
      </Section>

      {/* Bottom Line */}
      <Section background="orange-light" padding="small">
        <AnimatedItem animation="scale" delay={200}>
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={2} className="mb-6">The Bottom Line</Heading>
          <Grid columns={{ default: 1, md: 2 }} gap="medium" className="mb-8">
            <Card variant="shadowed">
              <p className="text-2xl font-bold text-orange mb-2">At least 5 hours</p>
              <p className="text-charcoal/80">Saved weekly</p>
            </Card>
            <Card variant="shadowed">
              <p className="text-2xl font-bold text-orange mb-2">22%</p>
              <p className="text-charcoal/80">Revenue increase over 6 months</p>
            </Card>
          </Grid>
          <p className="text-lg text-charcoal/80">
            <strong>Investment:</strong> Less than we spent on that failed coffee machine
          </p>
        </div>
        </AnimatedItem>
      </Section>

      {/* Transparency Note */}
      <Section>
        <AnimatedItem animation="fade-in" delay={300}>
        <div className="max-w-3xl mx-auto text-center">
          <Card variant="bordered" padding="large" className="shadow-lg border-2 border-orange/20">
            <Heading level={3} className="mb-4">Want to See the Proof?</Heading>
            <p className="text-lg text-charcoal/80 mb-6">
              Every pub is different. These are our real results - yours might be 
              better or take longer. But we'll be honest about what's possible and 
              use everything we learned to help you skip our mistakes.
            </p>
            <Card variant="colored" className="bg-teal-dark text-white">
              <p className="font-semibold mb-2">Visit The Anchor</p>
              <p className="text-sm mb-4">
                See our menus, check our social media, talk to Billy about how much time he saves.
              </p>
              <p className="text-xs opacity-80">
                Screenshots, photos, and actual examples available on request. 
                We're transparent about everything - including what didn't work!
              </p>
            </Card>
          </Card>
        </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="Want These Results for Your Pub?"
        subtitle="Tell me your biggest challenge and I'll show you how we solved it."
        whatsappMessage="Hi Peter, just read your case studies. Can we chat?"
        buttonText="Let's Chat"
      />
    </>
  );
}
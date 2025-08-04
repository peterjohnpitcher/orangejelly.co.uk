import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CaseStudySelector from '@/components/CaseStudySelector';
import Breadcrumb, { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import Text from '@/components/Text';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Pubs That Were Empty. Now They\'re Not',
  description: 'How did The Anchor increase Sunday roasts by 300%? How do pubs fill empty Tuesday nights? Real success stories from UK pubs using Orange Jelly\'s AI tools. From 5 covers to 50, see the actual numbers and proven strategies.',
  path: '/results',
});

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
        "@id": "https://www.orangejelly.co.uk/results#sunday-lunches",
        "name": "How to Fix Sunday Lunch Chaos with Pre-Order System",
        "description": "Learn how The Anchor went from 45 to 65 Sunday covers with zero waste using a simple pre-order system",
        "supply": ["Google Forms or similar", "Payment processor", "SMS system"],
        "tool": ["Online form builder", "Automated SMS tool"],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Set up simple pre-order form",
            "text": "Create online form with menu choices and deposit option"
          },
          {
            "@type": "HowToStep", 
            "name": "Implement £5 deposit system",
            "text": "Small deposit prevents no-shows without scaring customers"
          },
          {
            "@type": "HowToStep",
            "name": "Send confirmation texts",
            "text": "Automated SMS confirms booking and reminds day before"
          },
          {
            "@type": "HowToStep",
            "name": "Lock in menu choices",
            "text": "Pre-orders mean exact prep with no waste"
          }
        ],
        "totalTime": "PT4H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "GBP",
          "value": "99"
        },
        "performTime": "PT20M",
        "yield": "£500 weekly savings, 90% reduction in food waste"
      },
      {
        "@type": "Article",
        "@id": "https://www.orangejelly.co.uk/results#social-media",
        "headline": "How AI Transformed Our Social Media from Chore to Customer Magnet",
        "description": "Case study showing how The Anchor uses AI to create daily content across 3 platforms in just 30 minutes monthly",
        "author": {
          "@id": "https://www.orangejelly.co.uk/#peter-pitcher"
        },
        "datePublished": "2024-09-15",
        "articleBody": "From posting once a week to daily engagement that actually fills tables. AI creates content that sounds like us, not a robot..."
      },
      {
        "@type": "Article",
        "@id": "https://www.orangejelly.co.uk/results#quiz-night",
        "headline": "Tuesday Quiz Night: From 25 to 85+ People Using AI",
        "description": "How we ditched expensive quiz subscriptions and created better quizzes with AI in 20 minutes",
        "author": {
          "@id": "https://www.orangejelly.co.uk/#peter-pitcher"
        },
        "datePublished": "2024-10-01",
        "articleBody": "QuestionOne was stale and expensive. Now AI creates custom quizzes with local flavor that pack the pub every Tuesday..."
      },
      {
        "@type": "HowTo",
        "@id": "https://www.orangejelly.co.uk/results#quiet-weeks",
        "name": "How to Fill Quiet Weeknights with Tasting Events",
        "description": "Turn dead Monday-Thursday nights into profitable tasting experiences",
        "supply": ["Local suppliers", "Tasting glasses", "Simple nibbles"],
        "tool": ["AI for market research", "WhatsApp for bookings"],
        "step": [
          {
            "@type": "HowToStep",
            "name": "Research what locals actually want",
            "text": "Use AI to analyze local preferences and gaps"
          },
          {
            "@type": "HowToStep",
            "name": "Keep it casual and affordable",
            "text": "£15 for 5 samples and nibbles - accessible pricing"
          },
          {
            "@type": "HowToStep",
            "name": "Partner with local suppliers",
            "text": "They love the exposure and often help with costs"
          },
          {
            "@type": "HowToStep",
            "name": "Build WhatsApp community",
            "text": "Create group for regulars to build repeat business"
          }
        ],
        "totalTime": "PT5H",
        "estimatedCost": {
          "@type": "MonetaryAmount",
          "currency": "GBP",
          "value": "199"
        },
        "performTime": "PT2H",
        "yield": "Wednesday covers from 15 to 45-50, £675 average revenue"
      }
    ];

    const reviewSchema = {
      "@type": "Review",
      "itemReviewed": {
        "@type": "Service",
        "name": "Orange Jelly Pub Consulting",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        }
      },
      "reviewBody": "Peter's AI strategies transformed our pub. Quiz nights now 25-35 regulars, food GP from 58% to 71%, and we actually have evenings off now. Best investment we've made.",
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
      id: 'quiet-weeks',
      title: 'The Anchor\'s Quiet Weeks Challenge',
      subtitle: 'Monday to Thursday were dead. We created tasting nights that actually work.',
      problem: [
        'Weeknights empty except Tuesday quiz',
        'Losing money Monday, Wednesday, Thursday',
        'Same boring weekly pattern',
        'Staff costs higher than revenue'
      ],
      failed: [
        'Generic "2-for-1" offers attracted wrong crowd',
        'Wine tasting too fancy for our locals',
        'Theme nights felt forced and fake',
        'Discounting just lost us money'
      ],
      solution: [
        'AI analyzed what our actual customers wanted',
        'Created "Gin Discovery" nights - casual, fun',
        'Rum tasting with local supplier stories',
        'Kept it simple: 5 samples, some nibbles, £15'
      ],
      results: [
        { metric: 'Wednesday covers', value: 'From 15 to 45-50' },
        { metric: 'Tasting night revenue', value: '£675 average' },
        { metric: 'Repeat bookings', value: '60% come monthly' },
        { metric: 'Staff morale', value: 'Love the variety' }
      ],
      timeInvestment: [
        'AI research and planning: 2 hours',
        'Setting up with suppliers: 3 hours',
        'Running each event: Already there anyway'
      ],
      learnings: [
        'Keep tastings informal and fun',
        'Local suppliers love being involved',
        'Pre-booking essential for stock',
        'Create WhatsApp group for regulars'
      ],
      quote: '"Wednesday gin nights now bring in more than some Fridays. Who\'d have thought?"'
    },
    {
      id: 'sunday-lunches',
      title: 'The Sunday Lunch Pre-Order Revolution',
      subtitle: 'Cut £500/week in wasted food without losing the offer.',
      problem: [
        'Throwing away £500 worth of food weekly',
        'Prepping for 70 but only serving 45-50',
        'Last-minute cancellations killed us',
        'Never knew numbers until Sunday morning'
      ],
      failed: [
        'Deposits scared regular customers away',
        'Complicated booking systems confused everyone',
        'Full payment upfront - nobody trusted it',
        'Paper forms got lost constantly'
      ],
      solution: [
        'Simple online pre-order form (Google Forms)',
        '£5 per person deposit - reasonable',
        'Confirmation texts automated',
        'Menu choices locked in = no waste'
      ],
      results: [
        { metric: 'Weekly savings', value: '£500 in reduced waste' },
        { metric: 'Food waste', value: 'Down 90%' },
        { metric: 'No-shows', value: 'Almost eliminated' },
        { metric: 'Predictability', value: 'Know numbers by Friday' }
      ],
      timeInvestment: [
        'Setting up system: 4 hours',
        'Training team: 1 hour',
        'Weekly management: 20 minutes'
      ],
      learnings: [
        '£5 deposit is the sweet spot',
        'Text reminders prevent no-shows',
        'Regulars now book weeks ahead',
        'Predictability changes everything'
      ],
      quote: '"We\'re saving £500 every single week just by knowing how many are coming. No more bins full of perfectly good food."'
    },
    {
      id: 'social-media',
      title: 'Social Media Transformation with AI',
      subtitle: 'From posting once a week to daily engagement that fills tables.',
      problem: [
        'Posting maybe once a week if remembered',
        'No consistency across platforms',
        'Spending hours for mediocre results',
        'Missing opportunities to promote events'
      ],
      failed: [
        'Hiring social media manager - too expensive',
        'Staff posting randomly - no consistency',
        'Generic template posts - no personality',
        'Posting at wrong times - no engagement'
      ],
      solution: [
        'AI creates month of content in 30 minutes',
        'Maintains our voice - casual, friendly, local',
        'Auto-schedules for peak engagement times',
        'Different versions for each platform'
      ],
      results: [
        { metric: 'Posting frequency', value: 'Daily across 3 platforms' },
        { metric: 'Engagement rate', value: 'Up 240%' },
        { metric: 'Event attendance', value: '30% increase' },
        { metric: 'Time saved', value: '6 hours per week' }
      ],
      timeInvestment: [
        'Initial AI training: 2 hours',
        'Monthly content creation: 30 minutes',
        'Daily management: 5 minutes'
      ],
      learnings: [
        'Consistency beats perfection',
        'Local groups drive real customers',
        'Behind-scenes content performs best',
        'Schedule everything in advance'
      ],
      quote: '"We went from social media being a chore to it actually bringing customers through the door. The AI understands our pub\'s personality perfectly."'
    },
    {
      id: 'search-visibility',
      title: 'From Invisible to Fully Booked Online',
      subtitle: 'How we went from page 3 on Google to dominating local search.',
      problem: [
        'Didn\'t show up for "pubs near me"',
        'Old website looked amateur',
        'No online booking system',
        'Lost customers to pubs with better web presence'
      ],
      failed: [
        'Cheap website builder - looked terrible',
        'Paying for Google ads - too expensive',
        'Complicated SEO that we didn\'t understand',
        'Facebook page as main website - unprofessional'
      ],
      solution: [
        'Built proper website focused on local SEO',
        'Online booking for events and Sundays',
        'Google Business profile optimization',
        'Mobile-first design (everyone searches on phones)'
      ],
      results: [
        { metric: 'Google ranking', value: '#1 for "pub Stanwell Moor"' },
        { metric: 'Website visits', value: 'Up 450%' },
        { metric: 'Online bookings', value: '40% of all bookings' },
        { metric: 'New customers', value: '25% say "found you online"' }
      ],
      timeInvestment: [
        'Website build: 2 days with AI help',
        'Weekly updates: 15 minutes',
        'Review responses: 10 minutes daily'
      ],
      learnings: [
        'Mobile experience is everything',
        'Local SEO beats paid ads',
        'Fast loading speeds matter',
        'Update Google Business weekly'
      ],
      quote: '"Tourists staying at Heathrow hotels now find us easily. That\'s an extra 15-20 covers we never had before."'
    },
    {
      id: 'quiz-night',
      title: 'Quiz Night Innovation: Goodbye QuestionOne',
      subtitle: 'AI-created quizzes that pack the pub every Tuesday.',
      problem: [
        'QuestionOne quiz was stale and predictable',
        'Same 20-25 people every week',
        'No local flavor or personality',
        'Expensive monthly subscription'
      ],
      failed: [
        'Writing quizzes took 3+ hours weekly',
        'Downloaded quiz packs were boring',
        'Too hard or too easy - never right',
        'No connection to local area or events'
      ],
      solution: [
        'AI creates custom quizzes in 20 minutes',
        'Mix of local knowledge and general trivia',
        'Adjustable difficulty based on crowd',
        'Topical rounds about current events'
      ],
      results: [
        { metric: 'Quiz attendance', value: 'From 20 to 25-35 people' },
        { metric: 'Food orders', value: '70% of teams eat' },
        { metric: 'Quiz quality', value: 'Best in the area' },
        { metric: 'Time saved', value: '2.5 hours weekly' }
      ],
      timeInvestment: [
        'AI quiz creation: 20 minutes',
        'Customizing for locals: 10 minutes',
        'Running quiz night: 2 hours (same as before)'
      ],
      learnings: [
        'Local questions create connection',
        'Picture rounds on phones work great',
        'Consistency matters more than perfection',
        'Make it an event, not just a quiz'
      ],
      quote: '"Our quiz night is back on track. We get 25-35 regulars with a £25 average spend. The AI helps me create custom quizzes with local flavor in just 20 minutes."'
    },
    {
      id: 'customer-engagement',
      title: 'Building Customer Relationships That Last',
      subtitle: 'SMS, bookings, and birthday clubs that actually work.',
      problem: [
        'No customer database at all',
        'Birthday offers going to waste',
        'No way to contact regulars',
        'Missing opportunities for repeat business'
      ],
      failed: [
        'Email newsletters - nobody read them',
        'Loyalty cards - too complicated',
        'App-based system - older customers hated it',
        'Paper mailing list - expensive and slow'
      ],
      solution: [
        'Simple SMS system for updates',
        'Birthday club with automatic vouchers',
        'Booking confirmations via text',
        'WhatsApp groups for different events'
      ],
      results: [
        { metric: 'Customer database', value: '300 opted-in contacts' },
        { metric: 'Birthday voucher redemption', value: '65%' },
        { metric: 'Repeat visit rate', value: 'Up 40%' },
        { metric: 'Event sell-out rate', value: 'Most events full' }
      ],
      timeInvestment: [
        'Initial setup: Half day',
        'Weekly SMS blast: 10 minutes',
        'Birthday vouchers: Automated'
      ],
      learnings: [
        'SMS beats email every time',
        'Keep messages short and valuable',
        'Birthday offers bring groups',
        'Different groups want different things'
      ],
      quote: '"The birthday club alone brings in 30+ extra tables per month. People love feeling remembered, and they always bring friends."'
    }
  ];


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resultsSchema) }}
      />
      <Hero
        title="Pubs That Were Empty. Now They're Not. Here's How"
        subtitle="Real stories from pubs that turned their biggest problems into their biggest wins."
        showCTA={false}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto mb-8">
          <Breadcrumb items={breadcrumbPaths.results} />
        </div>
        
        <CaseStudySelector results={results} defaultStudy="quiet-weeks" />
        
        <RelatedLinks
          title="Ready to Write Your Own Success Story?"
          subtitle="Choose the problem that's hurting your business most"
          links={[
            {
              title: "Empty Pub Recovery",
              description: "Fill your quiet nights in 30 days or your money back",
              href: "/services#empty-pub-recovery",
              emoji: "⏰",
              highlight: true
            },
            {
              title: "Boost Food Sales",
              description: "Turn your menu into a profit machine with psychology",
              href: "/services#boost-food-sales",
              emoji: "💷"
            },
            {
              title: "Done-For-You Marketing",
              description: "We handle everything while you serve customers",
              href: "/services#done-for-you-marketing",
              emoji: "📱"
            }
          ]}
          variant="card"
          columns={{ default: 1, md: 3 }}
        />
      </Section>

      {/* Bottom Line */}
      <Section background="orange-light" padding="small">
        <AnimatedItem animation="scale" delay={200}>
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={2} align="center" className="mb-6">The Bottom Line</Heading>
          <Grid columns={{ default: 1, md: 2 }} gap="medium" className="mb-8">
            <Card variant="shadowed">
              <Text align="center" className="text-2xl font-bold text-orange mb-2">At least 5 hours</Text>
              <Text align="center" color="muted">Saved weekly</Text>
            </Card>
            <Card variant="shadowed">
              <Text align="center" className="text-2xl font-bold text-orange mb-2">22%</Text>
              <Text align="center" color="muted">Revenue increase over 6 months</Text>
            </Card>
          </Grid>
          <Text size="lg" color="muted" align="center">
            <strong>Investment:</strong> Less than we spent on that failed coffee machine
          </Text>
        </div>
        </AnimatedItem>
      </Section>

      {/* Transparency Note */}
      <Section>
        <AnimatedItem animation="fade-in" delay={300}>
        <div className="max-w-3xl mx-auto text-center">
          <Card variant="bordered" padding="large" className="shadow-lg border-2 border-orange/20">
            <Heading level={3} className="mb-4">Want to See the Proof?</Heading>
            <Text size="lg" color="muted" className="mb-6">
              Every pub is different. These are our real results - yours might be 
              better or take longer. But we'll be honest about what's possible and 
              use everything we learned to help you skip our mistakes.
            </Text>
            <Card variant="colored" className="bg-teal-dark text-white">
              <Text className="font-semibold mb-2">Visit The Anchor</Text>
              <Text size="sm" className="mb-4">
                See our menus, check our social media, talk to Billy about how much time he saves.
              </Text>
              <Text size="xs" className="opacity-80">
                Screenshots, photos, and actual examples available on request. 
                We're transparent about everything - including what didn't work!
              </Text>
            </Card>
          </Card>
        </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="Want These Results for Your Pub?"
        subtitle="Tell me your biggest challenge and I'll show you how we solved it."
        whatsappMessage="Hi Peter, just read your case studies. Can we chat?"
        buttonText="Get More Customers"
      />
    </>
  );
}
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import { PRICING, MESSAGES, CONTACT } from '@/lib/constants';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import Partnerships from '@/components/Partnerships';

interface ServicesPageProps {
  faqs?: any[];
}

export default function ServicesPage({ faqs = [] }: ServicesPageProps) {
  // Comprehensive FAQ data for services page
  const servicesFAQs = [
    // Empty Pub Recovery FAQs
    {
      question: "How does the Empty Pub Recovery Package work?",
      answer: "We work with you to implement AI-powered marketing strategies that have been proven at The Anchor. This includes training on social media automation, event promotion, and customer engagement. We charge £62.50 per hour plus VAT, and offer a 30-day money-back guarantee."
    },
    {
      question: "How does your hourly consulting work?",
      answer: "We charge £62.50 per hour plus VAT as a flat rate. I'll work with you to implement the AI strategies that have transformed The Anchor - from social media automation to event planning. First training session with a pub chain scheduled September 2025."
    },
    {
      question: "How quickly will I see more customers from the recovery package?",
      answer: "Results vary by pub, but at The Anchor we've seen quiz nights grow from 20 to 25-35 regulars, tasting nights with 85% retention, and 60,000-70,000 social media views monthly. Most improvements show within 30 days."
    },
    // Menu Makeover FAQs
    {
      question: "How can menu descriptions increase my food sales?",
      answer: "Psychology-based menu descriptions guide customers to order more profitable dishes and increase average spend by £7 per table. We use proven techniques like sensory language, storytelling, and strategic positioning that have increased food GP by up to 15% for our clients."
    },
    {
      question: "What exactly do you do with menu AI?",
      answer: "I'll teach you to use AI for menu analysis, pricing optimization, and seasonal updates. I've helped improve food GP from 58% to 71%, saving £250/week on waste."
    },
    {
      question: "Will AI-written menus sound fake or robotic?",
      answer: "Not at all! I guide the AI to write in your pub's authentic voice. The descriptions feel personal and appetizing - customers often comment on how good our food sounds before they've even tasted it."
    },
    // Quiz Night FAQs
    {
      question: "How do you promote a pub quiz effectively?",
      answer: "Through AI-powered social media campaigns, automated reminders, and community engagement. Our quiz attendance has grown from 20 to 25-35 regulars using these exact methods - I'll show you how to replicate this success."
    },
    {
      question: "What's the secret to quiz night success?",
      answer: "AI automation for consistent promotion, WhatsApp groups for regular attendees, and prize structures that encourage teams. We've grown from 20 to 25-35 regulars with these methods."
    },
    {
      question: "Can AI really help with quiz nights?",
      answer: "Absolutely! AI helps create engaging promotional content, manage bookings, send reminders, and even generate fresh quiz questions. It's transformed our Tuesday nights from empty to buzzing."
    },
    // Social Media FAQs
    {
      question: "Can AI really manage my pub's social media?",
      answer: "Yes - I post 5 times weekly reaching 60,000-70,000 views monthly, spending just 2 hours per week. I'll train you on the exact AI tools and prompts I use, so you can achieve similar results without the time drain."
    },
    {
      question: "Will my social media posts look automated?",
      answer: "Not at all! I'll teach you to guide AI to create posts that sound like you, showcase your pub's personality, and engage your local community. Our posts get more engagement now than when we spent hours writing them manually."
    },
    {
      question: "What if I'm not tech-savvy?",
      answer: "Perfect - neither was I! If you can send a WhatsApp message, you can use these AI tools. I provide step-by-step training designed for busy licensees, not tech experts. Most clients are posting confidently within days."
    },
    // Business Analysis FAQs
    {
      question: "What kind of business insights can AI provide?",
      answer: "AI helps analyze your sales patterns, identify your most profitable customers, optimize staff scheduling, and predict busy periods. I've discovered profit opportunities worth £75,000-£100,000 annually using these tools."
    },
    {
      question: "How detailed are your AI business reports?",
      answer: "Very detailed but easy to understand. You'll get insights on customer behavior, menu performance, event ROI, and seasonal trends - all presented in plain English with clear action steps."
    },
    {
      question: "Can AI help with supplier negotiations?",
      answer: "Yes! AI analyzes your purchasing patterns, compares supplier prices, and identifies savings opportunities. I've saved £250/week on food waste alone by optimizing our ordering based on AI predictions."
    },
    // Event Planning FAQs
    {
      question: "How do you create pub events that actually work?",
      answer: "By using AI to analyze what your community wants, automate promotion, and track results. Our tasting nights achieve 85% customer retention because we use data to plan events people actually want to attend."
    },
    {
      question: "What makes your event planning different?",
      answer: "Real experience combined with AI efficiency. I've run successful quiz nights, tasting events, and seasonal promotions. I'll share what works and train you to use AI for promotion and management."
    },
    {
      question: "Can AI predict which events will be successful?",
      answer: "Yes! By analyzing local demographics, past event performance, and social media engagement, AI helps predict which events will draw crowds. It's helped us avoid costly flops and double down on winners."
    },
    // General FAQs
    {
      question: "Why don't you offer fixed-price packages?",
      answer: "Every pub is unique. Fixed packages force you to pay for things you don't need. At £62.50 per hour plus VAT, you only pay for the help you actually use. Most pubs see significant improvements within 20-30 hours of consulting."
    },
    {
      question: "Can I see examples of your work?",
      answer: "Visit The Anchor! See our menus, watch our social media in action, attend a quiz night. Everything I teach, we use daily. First pint's on me - seeing is believing."
    },
    {
      question: "Do you offer remote support?",
      answer: "Yes! Most AI training works perfectly over video calls. I support pubs across the UK with screen sharing, recorded tutorials, and WhatsApp support. Distance is no barrier to getting help."
    }
  ];

  // All services data
  const services = {
    recovery: {
      id: 'empty-pub-recovery',
      emoji: '🚨',
      title: 'Empty Pub Recovery Package',
      problem: 'Staring at empty tables on quiet nights?',
      deliverable: 'Effective marketing strategies delivered quickly',
      description: `Turn those soul-crushing empty nights into profitable ones. This is our emergency response for pubs bleeding money on quiet nights. I've been there - watching the clock, calculating losses, wondering if tomorrow will be better. It doesn't have to be this way.`,
      features: [
        'AI-powered social media campaigns that actually bring people in',
        'Event ideas proven to work (not theory - real results)',
        'Local community engagement strategies',
        'Staff motivation techniques for quiet periods',
        'Quick-win promotions you can start tomorrow',
        '30-day action plan with weekly check-ins'
      ],
      example: {
        before: 'Deadly Tuesday nights with empty tables',
        after: 'Quiz nights with 25-35 regulars every week',
        result: 'Tuesday now one of our busiest nights'
      },
      timeEstimate: '15-25 hours over 30 days',
      priceBreakdown: 'Costs vary based on your needs. Most pubs invest £1,000-1,500 for complete transformation',
      price: PRICING.hourlyRate.display,
      ctaText: 'Save my pub',
      highlight: true
    },
    menu: {
      id: 'menu-makeover',
      emoji: '🍴',
      title: 'Menu Makeover & Profit Maximization',
      problem: 'Food sitting in the kitchen while bills pile up?',
      deliverable: 'AI-crafted menu descriptions that sell',
      description: `Your menu is a sales tool, not just a list. Wrong descriptions = lost money. I'll show you how AI transforms boring food lists into profit machines that make mouths water and tills ring.`,
      features: [
        'Psychology-based descriptions that increase average spend',
        'Strategic pricing for maximum profit',
        'Dietary labels and allergen management',
        'Seasonal menu planning with AI',
        'Waste reduction strategies (we save £250/week)',
        'Supplier negotiation tactics'
      ],
      example: {
        before: 'Food GP at 58%, struggling to make profit',
        after: 'Food GP at 71% with same suppliers',
        result: '£250/week extra profit from food alone'
      },
      timeEstimate: '8-12 hours initially, then 2 hours monthly',
      price: PRICING.hourlyRate.display,
      ctaText: 'Boost food profits'
    },
    social: {
      id: 'social-media-mastery',
      emoji: '📱',
      title: 'Social Media That Actually Works',
      problem: 'Posting into the void while competitors steal your customers?',
      deliverable: 'Reach thousands weekly in just 2 hours',
      description: `Stop wasting hours on posts nobody sees. I reach 60,000-70,000 people monthly spending just 2 hours per week. I'll teach you the exact AI tools and strategies that transformed our empty pub into a community hub.`,
      features: [
        'AI content creation that sounds human',
        'Scheduling tools that save hours',
        'Local engagement strategies that work',
        'Event promotion templates',
        'Crisis management protocols',
        'Monthly analytics that matter'
      ],
      example: {
        before: 'No social media presence, relying on walk-ins',
        after: '70,000 monthly views across platforms',
        result: 'Quiz night sells out, Sunday lunch bookings up 40%'
      },
      timeEstimate: '10 hours training, then 2 hours weekly ongoing',
      price: PRICING.hourlyRate.display,
      ctaText: 'Get noticed online'
    },
    quiz: {
      id: 'quiz-night-success',
      emoji: '🎯',
      title: 'Quiz Night Success System',
      problem: 'Running quizzes for empty chairs and family members?',
      deliverable: '25-35 weekly regulars within 2 months',
      description: `Transform your quiet Tuesday into your busiest weeknight. Our quiz went from 20 people to 35 regulars who book tables, buy food, and bring friends. I'll share every trick, template, and AI tool that made it happen.`,
      features: [
        'Question sources and AI generation tools',
        'Promotional templates that fill tables',
        'Prize structures that maximize profit',
        'Team booking systems',
        'Food deals that increase spend',
        'Building quiz night community'
      ],
      example: {
        before: 'Tuesday was our quietest night',
        after: 'Regular quiz with 25-35 attendees',
        result: 'Tuesday now our 3rd busiest night'
      },
      timeEstimate: '8-10 hours setup, 1 hour weekly support',
      price: PRICING.hourlyRate.display,
      ctaText: 'Pack my quiz nights'
    },
    analysis: {
      id: 'business-analysis',
      emoji: '📊',
      title: 'AI Business Analysis & Insights',
      problem: 'Making decisions on gut feel while money disappears?',
      deliverable: 'Know exactly where to focus for maximum profit',
      description: `Stop guessing, start knowing. AI reveals hidden profit opportunities in your data. I found £75,000 of annual value in ours - imagine what's hiding in yours.`,
      features: [
        'Sales pattern analysis and predictions',
        'Customer behavior insights',
        'Profitable vs problem areas identified',
        'Staff optimization recommendations',
        'Supplier cost comparisons',
        'Seasonal planning with data'
      ],
      example: {
        before: 'Sunday lunches losing £250/week',
        after: 'Streamlined menu, AI-optimized portions',
        result: 'Now profitable with less waste'
      },
      timeEstimate: '15-20 hours initial analysis',
      price: PRICING.hourlyRate.display,
      ctaText: 'Find hidden profits'
    },
    events: {
      id: 'event-planning',
      emoji: '🎉',
      title: 'Events That Fill Your Pub',
      problem: 'Organizing events that nobody attends?',
      deliverable: 'Events people mark in their diary',
      description: `Stop throwing parties for empty rooms. Our events consistently draw crowds because we use AI to understand what people actually want, then promote effectively. 85% of our tasting night attendees become regulars.`,
      features: [
        'Event ideas matched to your community',
        'AI-powered promotional campaigns',
        'Booking and ticketing systems',
        'Partnership opportunities',
        'Post-event analysis for improvement',
        'Seasonal event calendar planning'
      ],
      example: {
        before: 'Same old events, declining attendance',
        after: 'Gin tasting nights, food pairings, themed events',
        result: '40 tickets sold in 48 hours, 85% became regulars'
      },
      timeEstimate: '6-8 hours per event',
      price: PRICING.hourlyRate.display,
      ctaText: 'Create buzzing events'
    },
    consultation: {
      id: 'consultation',
      emoji: '💬',
      title: 'Pub Recovery Consultation',
      problem: 'Need specific help with your unique challenges?',
      deliverable: 'Practical solutions from someone who gets it',
      description: `Sometimes you just need to talk to someone who's been there. Book time with me to discuss your specific challenges. No corporate nonsense - just honest advice from one licensee to another.`,
      features: [
        'One-to-one video or phone consultations',
        'Review your current situation',
        'Identify quick wins and long-term strategies',
        'Access to my AI tools and templates',
        'Follow-up support via WhatsApp',
        'Connection to helpful suppliers'
      ],
      example: {
        before: 'Using Word docs and manual calculations',
        after: 'AI-powered tools for everything',
        result: 'Save 25 hours/week on admin tasks'
      },
      timeEstimate: 'Minimum 2 hours, typically 4-6 hours initially',
      price: PRICING.hourlyRate.display,
      ctaText: 'Book consultation'
    },
    website: {
      id: 'website-presence',
      emoji: '🌐',
      title: 'Website & Online Presence',
      problem: 'Invisible online while chains dominate Google?',
      deliverable: 'Found by locals searching for pubs',
      description: `If you're not online, you don't exist to most customers. But you don't need an expensive website - you need to be found. I'll show you free and low-cost ways to dominate local search results.`,
      features: [
        'Google My Business optimization',
        'Simple website solutions that work',
        'Online booking integration',
        'Menu and events always up-to-date',
        'Mobile-friendly design',
        'Local SEO strategies'
      ],
      example: {
        before: 'Invisible on Google, no website',
        after: 'Professional website, optimized Google listing',
        result: 'Top 3 for "pubs near Heathrow" - free customers daily'
      },
      timeEstimate: '10-15 hours setup',
      price: PRICING.hourlyRate.display,
      ctaText: 'Get found online'
    }
  };

  // Speakable content for voice search
  const speakableQuestions = [
    {
      question: "What services does Orange Jelly offer for struggling pubs?",
      answer: `Orange Jelly offers practical help for pub licensees including social media management, menu optimization, event planning, and business analysis using AI tools. All services are £62.50 per hour plus VAT.`
    },
    {
      question: "How much does Orange Jelly charge?",
      answer: "We charge £62.50 per hour plus VAT as a flat rate. I'm always happy to have a free chat first to understand your challenges. All pricing is transparent with no hidden fees."
    },
    {
      question: "Can Orange Jelly help my empty pub?",
      answer: `Yes, our Empty Pub Recovery Package has transformed quiet nights into profitable ones. We've grown quiz nights from 20 to 35 regulars and reach 70,000 people monthly on social media.`
    }
  ];

  return (
    <>
      <FAQSchema faqs={servicesFAQs} />
      <SpeakableContent cssSelectors={['.prose h2', '.prose h3', '.prose > p:first-of-type']} url="/services" />
      
      <Hero 
        title="From Empty Tables to Full Tills"
        subtitle="Every service below has been tested at The Anchor. If it didn't work for us, it's not here."
        showCTA={true}
        ctaText="Help me fill my pub"
        bottomText="All services £62.50/hour • No packages • Pay for what you need"
        breadcrumbs={breadcrumbPaths.services}
      />

      {/* Services Grid */}
      <Section background="white" padding="large">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Heading level={2} className="mb-4">Real Solutions, Not Theory</Heading>
          <Text size="lg" color="muted">
            I'm not selling you strategies I read in a book. Every service below is something 
            I use daily at The Anchor. You're learning from real experience, not corporate theory.
          </Text>
        </div>

        <div className="space-y-8">
          <ServiceCard {...services.recovery} />
          <ServiceCard {...services.menu} />
          <ServiceCard {...services.social} />
          <ServiceCard {...services.quiz} />
          <ServiceCard {...services.analysis} />
          <ServiceCard {...services.events} />
          <ServiceCard {...services.consultation} />
          <ServiceCard {...services.website} />
        </div>
      </Section>

      {/* How it works */}
      <Section background="cream" padding="large">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-12">Simple, Honest Process</Heading>
          
          <div className="space-y-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <Heading level={3} className="mb-2">Tell Me What's Wrong</Heading>
                <Text>
                  WhatsApp or call me. Explain what's keeping you up at night. 
                  Empty Tuesday? Weak food sales? No online presence? I've been there.
                </Text>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <Heading level={3} className="mb-2">We Create a Plan</Heading>
                <Text>
                  No cookie-cutter solutions. We'll discuss what's worked at The Anchor 
                  and adapt it to your pub. You'll know exactly what we're doing and why.
                </Text>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <Heading level={3} className="mb-2">I Show You How</Heading>
                <Text>
                  Screen sharing, videos, or in-person - whatever works. I'll train you 
                  to use the exact AI tools and strategies that saved our pub.
                </Text>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <Heading level={3} className="mb-2">You See Results</Heading>
                <Text>
                  Most pubs see improvements within 30 days. Quiz nights filling up, 
                  social media buzzing, food flying out the kitchen. Real results, not promises.
                </Text>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <WhatsAppButton 
              text="Let's fix my pub"
              size="large"
            />
            <Text size="sm" color="muted" className="mt-4">
              {CONTACT.phone} • No obligation chat • I understand pub life
            </Text>
          </div>
        </div>
      </Section>

      {/* Money back guarantee */}
      <Section background="teal" padding="large">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} color="white" className="mb-6">
            30-Day Money-Back Guarantee
          </Heading>
          <Text size="lg" color="white" className="mb-8">
            If you don't see real improvements within 30 days, I'll refund every penny. 
            That's how confident I am these strategies work - because they saved my pub.
          </Text>
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-lg px-6 py-4">
            <Text size="2xl" color="white">✓</Text>
            <div className="text-left">
              <Text color="white" weight="semibold">No risk, all reward</Text>
              <Text size="sm" color="white" className="opacity-90">
                The only thing you risk is staying stuck where you are
              </Text>
            </div>
          </div>
        </div>
      </Section>

      {/* Partnership logos */}
      <Section background="white" padding="medium">
        <div className="text-center mb-8">
          <Text size="sm" color="muted" weight="medium" className="uppercase tracking-wider">
            Proud to work with
          </Text>
        </div>
        <Partnerships />
      </Section>

      {/* CTA Section */}
      <CTASection
        title="Stop Watching Money Walk Past Your Pub"
        subtitle="Every empty table is lost revenue. Every quiet night is bills unpaid. Let's change that - starting today."
        buttonText="WhatsApp me now"
        whatsappMessage="Hi Peter, I saw your services page and need help with my pub"
        bottomText={`${CONTACT.phone} • Available 7 days a week`}
      />

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinks
          title="See How We Can Help"
          links={linkClusters.services}
        />
      </Section>
    </>
  );
}
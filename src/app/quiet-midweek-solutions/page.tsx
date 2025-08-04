import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CTASection from '@/components/CTASection';
import TrustBar from '@/components/TrustBar';
import Text from '@/components/Text';
import FeatureList from '@/components/FeatureList';
import { URLS, CONTACT } from '@/lib/constants';
import { generateMetadata } from '@/lib/metadata';
import { HowToSchema } from '@/components/StructuredData';

export const metadata = generateMetadata({
  title: 'Pub Dead Monday to Thursday? Here\'s the Fix',
  description: 'Transform dead weeknights into profitable nights. Proven strategies that took pubs from 20% to 70% capacity Monday-Thursday. Real results in 30 days.',
  path: '/quiet-midweek-solutions',
});

export default function QuietMidweekSolutions() {
  // HowTo schema for midweek transformation
  const howToSteps = [
    {
      name: "Analyze Your Current Midweek Performance",
      text: "Track your Monday-Thursday covers, identify patterns, and understand why customers aren't visiting. Use this data as your baseline for improvement.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-1"
    },
    {
      name: "Create Compelling Midweek Offers",
      text: "Design offers that give people a reason to choose your pub over staying home. Focus on value adds like 'Steak & Wine Wednesdays' rather than discounting.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-2"
    },
    {
      name: "Launch a Successful Quiz Night",
      text: "Build a quiz night that becomes THE Tuesday event in your area. Include food deals, team registration, and prizes that bring people back week after week.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-3"
    },
    {
      name: "Implement Theme Nights",
      text: "Create themed evenings like Curry Club, Wine Wednesday, or Burger Monday. Give each night its own identity that customers can plan around.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-4"
    },
    {
      name: "Partner with Local Businesses",
      text: "Connect with nearby offices, gyms, and clubs for after-work gatherings and team nights. Offer exclusive deals for their members and staff.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-5"
    },
    {
      name: "Master Midweek Social Media",
      text: "Post at the right times with messages that overcome the 'I'll stay in' mindset. Show the atmosphere, not just the offers.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-6"
    },
    {
      name: "Create a Midweek Loyalty Program",
      text: "Reward regular midweek visitors with points, perks, and exclusive benefits. Make Tuesday-Thursday visits more valuable than weekends.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-7"
    },
    {
      name: "Build Community Events",
      text: "Host book clubs, craft groups, language exchanges, or business networking. Regular groups guarantee consistent midweek footfall.",
      url: "https://www.orangejelly.co.uk/quiet-midweek-solutions#step-8"
    }
  ];

  // Generate FAQ schema
  const generateFAQSchema = () => {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Why is my pub so quiet Monday to Thursday?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pubs rely on weekend trade and hope midweek 'sorts itself out'. It won't. Quiet weeknights need specific strategies: targeted offers, the right events, and messaging that gives people a reason to leave the house on a Tuesday."
          }
        },
        {
          "@type": "Question",
          "name": "What events actually work for midweek?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Quiz nights (done right) can pull 60-100 people. Steak nights, curry clubs, and wine tastings work brilliantly. The key is consistency, proper promotion, and making it unmissable. We'll show you exactly how."
          }
        },
        {
          "@type": "Question",
          "name": "How much revenue am I losing on quiet nights?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "A pub doing 20 covers on a Tuesday instead of 60 loses £1,200 that night. Over a month, that's £4,800. Over a year? £57,600 in lost revenue just from Tuesday nights alone."
          }
        },
        {
          "@type": "Question",
          "name": "Will discounting hurt my weekend trade?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No, if done correctly. Smart midweek offers bring in different customers at different times. We'll show you how to create compelling offers that fill quiet periods without cannibalizing busy times."
          }
        },
        {
          "@type": "Question",
          "name": "How quickly will I see midweek improvements?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Most pubs see 30-50% increase in midweek covers within 2 weeks. By week 4, you should be at 60-70% capacity on previously dead nights. The Anchor went from 20 to 85 people for Tuesday quiz in 6 weeks."
          }
        }
      ]
    };

    return {
      "@context": "https://schema.org",
      "@graph": [faqSchema]
    };
  };

  const midweekStrategies = [
    {
      day: "Monday",
      strategy: "Special Theme Night",
      description: "50% off for hospitality workers",
      result: "Builds loyal following, word spreads fast"
    },
    {
      day: "Tuesday",
      strategy: "Quiz Night Done Right",
      description: "£50 winner, free entry, food deals",
      result: "25-35 regular attendees"
    },
    {
      day: "Wednesday",
      strategy: "Steak & Wine Night",
      description: "2 steaks + bottle for £45",
      result: "Books out 3 weeks in advance"
    },
    {
      day: "Thursday",
      strategy: "Curry Club",
      description: "£12.95 curry + pint special",
      result: "60+ covers, becoming 'the' curry spot"
    }
  ];

  const costOfEmpty = [
    {
      metric: "Lost Revenue",
      amount: "£1,200",
      period: "per quiet night"
    },
    {
      metric: "Wasted Staff Costs",
      amount: "£180",
      period: "per quiet night"
    },
    {
      metric: "Fixed Overheads",
      amount: "£150",
      period: "still paid regardless"
    },
    {
      metric: "Total Loss",
      amount: "£57,600",
      period: "per year (just Tuesdays!)"
    }
  ];

  const successStories = [
    {
      challenge: "Tuesday Quiz Night",
      before: "25 people, losing money",
      action: "Proper promotion + better prizes",
      after: "25-35 people, strong £25 average spend"
    },
    {
      challenge: "Dead Mondays",
      before: "15-20 covers, staff standing around",
      action: "Theme nights + entertainment",
      after: "55 covers, buzzing atmosphere"
    },
    {
      challenge: "Midweek Lunches",
      before: "5-10 covers, considering closing",
      action: "Business lunch deal + marketing",
      after: "35-40 covers, profitable again"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />
      <HowToSchema
        name="Transform Quiet Midweek Nights Into Profitable Evenings"
        description="Step-by-step guide to filling your pub Monday-Thursday. Proven strategies that increase midweek revenue by 200% in 30 days."
        image="https://www.orangejelly.co.uk/images/midweek-transformation.svg"
        estimatedCost={{
          currency: "GBP",
          value: "299"
        }}
        supply={[
          "Social media accounts",
          "Email list or customer database",
          "Basic event supplies (quiz sheets, prizes)",
          "Menu flexibility for special offers"
        ]}
        tool={[
          "Orange Jelly marketing tools",
          "Social media scheduler",
          "Email marketing platform",
          "Event planning templates"
        ]}
        steps={howToSteps}
        totalTime="P30D"
        url="https://www.orangejelly.co.uk/quiet-midweek-solutions"
      />
      
      <Hero
        title={<>Monday to Thursday:<br />From Ghost Town to Gold Mine</>}
        subtitle="Stop bleeding money on quiet nights. Proven system fills tables midweek."
        bottomText="🎯 Most pubs see 200% increase in midweek revenue within 30 days"
      />

      <TrustBar />

      {/* The Real Cost */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              What Quiet Midweeks Really Cost You
            </Heading>
            <Grid columns={{ default: 2, md: 4 }} gap="medium">
              {costOfEmpty.map((cost, index) => (
                <Card key={index} variant="bordered" padding="medium" className="text-center">
                  <Text size="2xl" weight="bold" color="red" align="center" className="text-3xl mb-2">{cost.amount}</Text>
                  <Text weight="semibold" align="center" className="mb-1">{cost.metric}</Text>
                  <Text size="sm" color="muted" align="center">{cost.period}</Text>
                </Card>
              ))}
            </Grid>
            <div className="mt-8 bg-orange-light rounded-lg p-6 text-center">
              <Text size="xl" weight="semibold" align="center">
                4 quiet nights × 52 weeks = £230,400 lost annually
              </Text>
              <Text color="muted" align="center" className="mt-2">
                That's a house deposit disappearing every year
              </Text>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Winning Strategies */}
      <Section background="teal">
        <AnimatedItem animation="slide-up">
          <Heading level={2} align="center" color="white" className="mb-12">
            Midweek Strategies That Actually Work
          </Heading>
          <div className="max-w-4xl mx-auto space-y-4">
            {midweekStrategies.map((item, index) => (
              <Card key={index} background="white" padding="large">
                <Grid columns={{ default: 1, md: 4 }} gap="medium" className="items-center">
                  <div>
                    <Text size="sm" color="muted">Day</Text>
                    <Text size="lg" weight="bold" color="teal">{item.day}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted">Strategy</Text>
                    <Text weight="semibold">{item.strategy}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted">Offer</Text>
                    <Text>{item.description}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted">Result</Text>
                    <Text color="green" weight="semibold">{item.result}</Text>
                  </div>
                </Grid>
              </Card>
            ))}
          </div>
        </AnimatedItem>
      </Section>

      {/* Success Stories */}
      <Section>
        <AnimatedItem animation="fade-in">
          <Heading level={2} align="center" className="mb-12">
            Real Transformations in Real Pubs
          </Heading>
          <Grid columns={{ default: 1, md: 3 }} gap="large">
            {successStories.map((story, index) => (
              <Card key={index} variant="colored" background="white" padding="large" className="border-2 border-orange/20">
                <Heading level={3} color="orange" className="mb-4">{story.challenge}</Heading>
                <div className="space-y-3">
                  <div>
                    <Text size="sm" color="muted">Before:</Text>
                    <Text color="red">{story.before}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted">We did:</Text>
                    <Text weight="semibold">{story.action}</Text>
                  </div>
                  <div>
                    <Text size="sm" color="muted">Now:</Text>
                    <Text color="green" weight="semibold">{story.after}</Text>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* The System */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Your Midweek Recovery System
            </Heading>
            <Grid columns={{ default: 1, md: 2 }} gap="large">
              <div>
                <Card variant="colored" background="orange-light" padding="large">
                  <Heading level={3} className="mb-6">Week 1-2: Foundation</Heading>
                  <FeatureList
                    items={[
                      '1. Analyze what\'s not working (we do this)',
                      '2. Create irresistible midweek offers',
                      '3. Launch targeted local campaigns',
                      '4. Implement booking systems'
                    ]}
                    icon="bullet"
                    iconColor="orange"
                    spacing="loose"
                  />
                </Card>
              </div>
              <div>
                <Card variant="colored" background="teal-dark" padding="large">
                  <Heading level={3} color="white" className="mb-6">Week 3-4: Growth</Heading>
                  <div className="text-white">
                    <FeatureList
                      items={[
                        '5. Test and refine what works best',
                        '6. Build regular customer base',
                        '7. Create must-attend weekly events',
                        '8. Lock in sustainable growth'
                      ]}
                      icon="bullet"
                      spacing="loose"
                    />
                  </div>
                </Card>
              </div>
            </Grid>
          </div>
        </AnimatedItem>
      </Section>

      {/* ROI Calculator */}
      <Section background="orange-light">
        <AnimatedItem animation="scale">
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} className="mb-8">
              Calculate Your Midweek Potential
            </Heading>
            <Card background="white" padding="large">
              <Text size="lg" className="mb-6">
                If you increased midweek covers from 20 to 60:
              </Text>
              <div className="space-y-4 text-left max-w-md mx-auto">
                <div className="flex justify-between items-center">
                  <Text>Extra covers per night:</Text>
                  <Text weight="bold">40</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Average spend per cover:</Text>
                  <Text weight="bold">£30</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text>Extra revenue per night:</Text>
                  <Text weight="bold" color="green">£1,200</Text>
                </div>
                <div className="flex justify-between items-center">
                  <Text>4 nights × 52 weeks:</Text>
                  <Text size="xl" weight="bold" color="green">£249,600/year</Text>
                </div>
              </div>
              <div className="mt-8 pt-6 border-t">
                <Text size="sm" color="muted" className="mb-4">
                  Investment: £62.50 per hour plus VAT
                </Text>
                <Button
                  href={URLS.whatsapp()}
                  variant="primary"
                  size="large"
                  external
                >
                  Start Filling Midweek Tables
                </Button>
              </div>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="How Much Longer Can You Afford Dead Nights?"
        subtitle="Every quiet Monday-Thursday costs you £1,500+. Let's turn those ghost towns into gold mines."
        whatsappMessage="Help me fix my quiet midweek nights"
        buttonText="Get My Midweek Plan"
      />
    </>
  );
}
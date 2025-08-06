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
import { breadcrumbPaths } from '@/components/Breadcrumb';
import { URLS, CONTACT } from '@/lib/constants';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: 'Pub Chains Killing Your Trade? Fight Back',
  description: 'Beat pub chains at their own game. Proven strategies help independent pubs compete with chain pubs. Win on service, atmosphere and personality, not just price.',
  path: '/compete-with-pub-chains',
});

export default function CompeteWithPubChains() {
  // Generate FAQ schema
  const generateFAQSchema = () => {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "How can I compete with chain pubs on price?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "You don't compete on price - you compete on value. Chain pub customers aren't always your customers. Focus on quality, atmosphere, personal service, and community connection. We'll show you how to position your pub as the premium local choice."
          }
        },
        {
          "@type": "Question",
          "name": "What advantages do independent pubs have over chains?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Personal service, flexibility, local knowledge, unique atmosphere, better quality, community connection, and the ability to adapt quickly. Chains are slow corporate machines - you can outmaneuver them every time."
          }
        },
        {
          "@type": "Question",
          "name": "How do I stop losing customers to cheaper chain pubs?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Create experiences chains can't match. Regular's benefits, personalized service, quality food, unique events, and genuine community feel. Make your pub irreplaceable, not just another place to drink."
          }
        },
        {
          "@type": "Question",
          "name": "Should I match chain pub prices?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. Racing to the bottom kills profits. Instead, justify your prices with superior quality, service, and experience. Our strategies help you attract customers who value quality over cheapness."
          }
        },
        {
          "@type": "Question",
          "name": "Can a small pub really compete with big chains?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely. David beats Goliath when he's smart. At The Anchor, we compete successfully with nearby chains. The key is playing to your strengths, not trying to beat them at their game."
          }
        }
      ]
    };

    return {
      "@context": "https://schema.org",
      "@graph": [faqSchema]
    };
  };

  const chainWeaknesses = [
    {
      weakness: "No Soul",
      description: "Corporate atmosphere, no personality",
      yourAdvantage: "Create a unique vibe that becomes 'your thing'"
    },
    {
      weakness: "Poor Service",
      description: "Understaffed, don't know regulars",
      yourAdvantage: "Remember names, drinks, and make people feel special"
    },
    {
      weakness: "Frozen Food",
      description: "Microwaved meals, no chef",
      yourAdvantage: "Fresh, local, homemade - and shout about it"
    },
    {
      weakness: "No Flexibility",
      description: "Can't adapt, corporate rules",
      yourAdvantage: "Change instantly based on what customers want"
    }
  ];

  const winningStrategies = [
    {
      strategy: "The Local Hero",
      tactics: [
        "Partner with local suppliers",
        "Support community causes",
        "Host local groups",
        "Celebrate local success"
      ],
      result: "Becomes THE community pub"
    },
    {
      strategy: "The Experience",
      tactics: [
        "Themed nights chains can't do",
        "Unique food offerings",
        "Personal touches everywhere",
        "Stories and personality"
      ],
      result: "Destination, not just a pub"
    },
    {
      strategy: "The Quality Play",
      tactics: [
        "Premium products done well",
        "Expert knowledge",
        "Craft and specialty focus",
        "Quality over quantity"
      ],
      result: "Attracts discerning customers"
    },
    {
      strategy: "The Service Win",
      tactics: [
        "Know every regular by name",
        "Remember preferences",
        "Go extra mile always",
        "Create 'wow' moments"
      ],
      result: "Unbeatable customer loyalty"
    }
  ];

  const successStories = [
    {
      pub: "The Fox & Hounds",
      challenge: "Major chain pub nearby",
      strategy: "Focused on craft beer and quality food",
      result: "Revenue up 15% in 6 months"
    },
    {
      pub: "The Railway Arms",
      challenge: "Lost 40% trade to Greene King",
      strategy: "Became THE live music venue",
      result: "Busier than ever, different crowd"
    },
    {
      pub: "The Village Inn",
      challenge: "Harvester stealing food trade",
      strategy: "Local suppliers, 'real food' message",
      result: "Food sales doubled in 8 weeks"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />
      
      <Hero
        title={<>Chain Pubs Stealing Your Trade?<br />Here's How to Fight Back</>}
        subtitle="Stop competing on price. Start winning on everything else that matters."
        bottomText="🏆 Independent pubs CAN beat the chains - we'll show you how"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Compete with Pub Chains' }
        ]}
      />

      <TrustBar />

      {/* The Problem */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              The Chain Pub Threat is Real
            </Heading>
            <Grid columns={{ default: 1, md: 2 }} gap="large" className="mb-8">
              <Card variant="bordered" padding="large" className="border-red-200">
                <Heading level={3} className="mb-4 text-red-600">What They Have</Heading>
                <FeatureList 
                  items={[
                    'Buying power for cheap prices',
                    'Million-pound marketing budgets',
                    'Prime locations',
                    'National brand recognition',
                    'Deep pockets for promotions'
                  ]}
                  icon="bullet"
                  spacing="normal"
                />
              </Card>
              <Card variant="bordered" padding="large" className="border-green-200">
                <Heading level={3} className="mb-4 text-green-600">What You Have</Heading>
                <FeatureList 
                  items={[
                    'Personality and soul',
                    'Flexibility to adapt',
                    'Personal relationships',
                    'Quality over quantity',
                    'Real community connection'
                  ]}
                  icon="bullet"
                  iconColor="green"
                  spacing="normal"
                />
              </Card>
            </Grid>
            <div className="bg-orange-light rounded-lg p-6 text-center">
              <Text size="xl" weight="semibold">
                You don't beat chains by trying to be a chain
              </Text>
              <Text color="muted" className="mt-2">
                You beat them by being everything they can't be
              </Text>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Their Weaknesses */}
      <Section background="teal">
        <AnimatedItem animation="slide-up">
          <Heading level={2} align="center" color="white" className="mb-12">
            Turn Their Weaknesses Into Your Strengths
          </Heading>
          <Grid columns={{ default: 1, md: 2 }} gap="medium">
            {chainWeaknesses.map((item, index) => (
              <Card key={index} background="white" padding="large">
                <Heading level={3} className="mb-3 text-red-600">Their Weakness: {item.weakness}</Heading>
                <Text color="muted" className="mb-4">{item.description}</Text>
                <div className="border-t pt-4">
                  <Text weight="semibold" color="green" className="mb-2">Your Opportunity:</Text>
                  <Text>{item.yourAdvantage}</Text>
                </div>
              </Card>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Winning Strategies */}
      <Section>
        <AnimatedItem animation="fade-in">
          <Heading level={2} align="center" className="mb-12">
            4 Proven Ways to Beat the Chains
          </Heading>
          <div className="space-y-6">
            {winningStrategies.map((item, index) => (
              <Card key={index} variant="colored" background="white" padding="large" className="border-2 border-orange/20">
                <Grid columns={{ default: 1, md: 3 }} gap="medium">
                  <div>
                    <Heading level={3} color="orange" className="mb-2">
                      Strategy #{index + 1}: {item.strategy}
                    </Heading>
                  </div>
                  <div>
                    <Text weight="semibold" color="muted" className="mb-2">Tactics:</Text>
                    <FeatureList 
                      items={item.tactics}
                      icon="bullet"
                      spacing="tight"
                    />
                  </div>
                  <div>
                    <Text weight="semibold" color="muted" className="mb-2">Result:</Text>
                    <Text color="green" weight="semibold">{item.result}</Text>
                  </div>
                </Grid>
              </Card>
            ))}
          </div>
        </AnimatedItem>
      </Section>

      {/* Success Stories */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <Heading level={2} align="center" className="mb-12">
            Pubs That Beat the Chains
          </Heading>
          <Grid columns={{ default: 1, md: 3 }} gap="large">
            {successStories.map((story, index) => (
              <Card key={index} variant="colored" background="teal-dark" padding="large">
                <Heading level={3} color="white" className="mb-4">{story.pub}</Heading>
                <div className="space-y-3 text-white">
                  <div>
                    <Text size="sm" className="text-cream/80">Challenge:</Text>
                    <Text color="white">{story.challenge}</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-cream/80">Strategy:</Text>
                    <Text color="white">{story.strategy}</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-cream/80">Result:</Text>
                    <Text weight="bold" className="text-cream">{story.result}</Text>
                  </div>
                </div>
              </Card>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Your Battle Plan */}
      <Section background="orange-light">
        <AnimatedItem animation="scale">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Your Chain-Beating Battle Plan
            </Heading>
            <Grid columns={{ default: 1, md: 2 }} gap="large">
              <Card background="white" padding="large">
                <Heading level={3} color="orange" className="mb-6">Immediate Actions</Heading>
                <FeatureList 
                  items={[
                    'Stop trying to match their prices',
                    'Identify your unique selling points',
                    'Create experiences they can\'t copy',
                    'Build unbreakable customer loyalty'
                  ]}
                  icon="check"
                  iconColor="orange"
                  spacing="loose"
                />
              </Card>
              <Card background="white" padding="large">
                <Heading level={3} color="teal" className="mb-6">30-Day Transformation</Heading>
                <FeatureList 
                  items={[
                    'Positioning that sets you apart',
                    'Marketing that highlights your strengths',
                    'Service standards chains can\'t match',
                    'Community connections that matter'
                  ]}
                  icon="check"
                  iconColor="teal"
                  spacing="loose"
                />
              </Card>
            </Grid>
            <div className="text-center mt-8">
              <Button
                href={URLS.whatsapp()}
                variant="primary"
                size="large"
                external
              >
                Start Beating the Chains
              </Button>
              <Text size="sm" color="muted" className="mt-4">
                £62.50/hour plus VAT - Most pubs see positive impact within 2 weeks
              </Text>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="Ready to Show the Chains How It's Done?"
        subtitle="Stop losing customers to chains. Let's build a pub they can't compete with."
        whatsappMessage="Help me compete with chain pubs"
        buttonText="Get My Battle Plan"
      />
    </>
  );
}
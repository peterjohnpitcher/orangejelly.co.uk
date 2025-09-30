import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CTASection from '@/components/CTASection';
import FAQItem from '@/components/FAQItem';
import TrustBar from '@/components/TrustBar';
import Text from '@/components/Text';
import FeatureList from '@/components/FeatureList';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import { URLS, CONTACT } from '@/lib/constants';
import { generateMetadata } from '@/lib/metadata';

export const metadata = generateMetadata({
  title: '£0 Marketing Budget? These Pub Strategies Cost Nothing',
  description: 'No money for marketing? These free strategies filled our pub. Social media, community partnerships, email marketing - all free, all proven to work.',
  path: '/pub-marketing-no-budget',
});

export default function PubMarketingNoBudget() {
  // FAQ data
  const faqs = [
    {
      question: "Can I really market my pub without spending money?",
      answer: "Absolutely. The best pub marketing is often free - word of mouth, social media, community partnerships, and email marketing cost nothing but time. We filled The Anchor using mostly free strategies before investing in paid advertising."
    },
    {
      question: "What free marketing works best for pubs?",
      answer: "Social media (especially local Facebook groups), Google My Business optimization, email marketing to existing customers, community partnerships, and creating shareable moments. These strategies consistently outperform paid ads for local pubs."
    },
    {
      question: "How long until free marketing shows results?",
      answer: "Immediate to 30 days. Fixing your Google listing can bring customers tomorrow. Social media posts work within days. Email campaigns see instant results. Community partnerships take 2-4 weeks to build momentum."
    },
    {
      question: "Do I need to be good at social media?",
      answer: "No. Authentic posts outperform polished content for pubs. Phone photos, genuine updates, and community focus work better than professional content. We'll show you simple formulas anyone can follow."
    },
    {
      question: "What if I don't have time for marketing?",
      answer: "15 minutes daily is enough with the right systems. Batch content creation, automation tools, and simple templates mean you can market effectively in less time than counting the till. We'll set up systems that run themselves."
    }
  ];

  // Generate FAQ schema
  const generateFAQSchema = () => {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    };

    return {
      "@context": "https://schema.org",
      "@graph": [faqSchema]
    };
  };

  const freeStrategies = [
    {
      strategy: "Google My Business",
      effort: "1 hour setup",
      impact: "50% more calls",
      tactics: [
        "Complete every section",
        "Add photos weekly",
        "Post updates regularly",
        "Respond to all reviews"
      ]
    },
    {
      strategy: "Local Facebook Groups",
      effort: "15 mins daily",
      impact: "20+ new customers/week",
      tactics: [
        "Join all local groups",
        "Share genuinely helpful content",
        "Announce events personally",
        "Build relationships, not spam"
      ]
    },
    {
      strategy: "Email Marketing",
      effort: "1 hour weekly",
      impact: "£500+ per campaign",
      tactics: [
        "Collect emails at point of sale",
        "Weekly 'what's on' emails",
        "VIP offers for subscribers",
        "Birthday club automated"
      ]
    },
    {
      strategy: "Community Partnerships",
      effort: "2 hours monthly",
      impact: "30+ covers per event",
      tactics: [
        "Host local groups free",
        "Cross-promote with shops",
        "Support local causes",
        "Become the community hub"
      ]
    }
  ];

  const zeroComstTemplates = [
    {
      type: "The Tuesday Post",
      template: "Quiet night? Not here! [Photo of your busiest corner] Join us for [offer] tonight. See you at 7pm!",
      result: "15-20 extra covers"
    },
    {
      type: "The Friday Hype",
      template: "Weekend starts HERE! 🍻 [Photo of drinks being poured] Kitchen open till 9pm, live music from 8pm. Tag your crew!",
      result: "Fully booked by 6pm"
    },
    {
      type: "The Sunday Roast",
      template: "Only [number] roasts left for today! [Photo of roast] Book now: [phone]. Walk-ins welcome but booking essential.",
      result: "Sells out every week"
    },
    {
      type: "The Local Hero",
      template: "Congrats to [local person/team] on [achievement]! First drink's on us this weekend. Well done! 👏",
      result: "Viral locally, brings whole groups"
    }
  ];

  const weeklyPlan = [
    {
      day: "Monday",
      task: "Post week's events on Facebook",
      time: "10 mins",
      result: "Sets tone for busy week"
    },
    {
      day: "Tuesday",
      task: "Email newsletter to database",
      time: "20 mins",
      result: "£300-500 in bookings"
    },
    {
      day: "Wednesday",
      task: "Update Google My Business",
      time: "5 mins",
      result: "Stay top of search"
    },
    {
      day: "Thursday",
      task: "Weekend hype on socials",
      time: "10 mins",
      result: "Build anticipation"
    },
    {
      day: "Friday",
      task: "Share customer photos/stories",
      time: "5 mins",
      result: "Social proof working"
    },
    {
      day: "Saturday",
      task: "Capture content for next week",
      time: "Throughout shift",
      result: "Authentic content bank"
    },
    {
      day: "Sunday",
      task: "Plan next week's content",
      time: "15 mins",
      result: "Stay organized"
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema()) }}
      />
      
      <Hero
        title={<>No Marketing Budget?<br />No Problem.</>}
        subtitle="Free strategies that filled our pub (and will fill yours too)"
        bottomText="💪 From empty Tuesday nights to turning people away - all with £0 spend"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Pub Marketing No Budget' }
        ]}
      />

      <TrustBar />

      {/* The Truth */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} className="mb-6">
              The Best Pub Marketing Costs Nothing
            </Heading>
            <Text size="xl" color="muted" className="mb-8">
              We spent £5,000 on various marketing agencies before discovering the truth: 
              the strategies that actually filled our pub were completely free.
            </Text>
            <Grid columns={{ default: 1, md: 3 }} gap="medium">
              <Card variant="bordered" padding="medium" className="text-center">
                <Text size="2xl" weight="bold" className="text-orange text-3xl mb-2">85%</Text>
                <Text size="sm">of new customers came from free marketing</Text>
              </Card>
              <Card variant="bordered" padding="medium" className="text-center">
                <Text size="2xl" weight="bold" className="text-teal text-3xl mb-2">£0</Text>
                <Text size="sm">spent to double our Tuesday trade</Text>
              </Card>
              <Card variant="bordered" padding="medium" className="text-center">
                <Text size="2xl" weight="bold" className="text-green-600 text-3xl mb-2">4x</Text>
                <Text size="sm">ROI vs paid advertising</Text>
              </Card>
            </Grid>
          </div>
        </AnimatedItem>
      </Section>

      {/* Free Strategies */}
      <Section background="teal">
        <AnimatedItem animation="slide-up">
          <Heading level={2} align="center" color="white" className="mb-12">
            The 4 Free Strategies That Actually Work
          </Heading>
          <Grid columns={{ default: 1, md: 2 }} gap="large">
            {freeStrategies.map((item, index) => (
              <Card key={index} background="white" padding="large">
                <div className="flex justify-between items-start mb-4">
                  <Heading level={3} color="teal">{item.strategy}</Heading>
                  <Text size="sm" color="muted">{item.effort}</Text>
                </div>
                <Text weight="semibold" className="text-green-600 mb-4">Result: {item.impact}</Text>
                <FeatureList 
                  items={item.tactics}
                  icon="bullet"
                  iconColor="orange"
                  spacing="normal"
                />
              </Card>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Social Media Templates */}
      <Section>
        <AnimatedItem animation="fade-in">
          <Heading level={2} align="center" className="mb-12">
            Copy-Paste Social Media Posts That Fill Tables
          </Heading>
          <div className="max-w-4xl mx-auto">
            <Text size="lg" color="muted" align="center" className="mb-8">
              These exact posts have generated thousands in revenue. Just adapt to your pub:
            </Text>
            <Grid columns={{ default: 1, md: 2 }} gap="medium">
              {zeroComstTemplates.map((item, index) => (
                <Card key={index} variant="colored" background="orange-light" padding="large">
                  <Heading level={4} className="mb-3">{item.type}</Heading>
                  <div className="bg-white rounded p-4 mb-3 italic">
                    <Text>"{item.template}"</Text>
                  </div>
                  <Text size="sm" className="text-green-600" weight="semibold">
                    Typical result: {item.result}
                  </Text>
                </Card>
              ))}
            </Grid>
          </div>
        </AnimatedItem>
      </Section>

      {/* Weekly Marketing Plan */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Your 7-Day Free Marketing Plan
            </Heading>
            <Text size="lg" color="muted" align="center" className="mb-8">
              Just 15 minutes a day keeps empty tables away:
            </Text>
            <div className="bg-teal rounded-lg p-8">
              <Grid columns={{ default: 1, md: 2 }} gap="medium">
                {weeklyPlan.map((item, index) => (
                  <div key={index} className="bg-white rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <Heading level={4} color="teal">{item.day}</Heading>
                      <Text size="sm" color="muted">{item.time}</Text>
                    </div>
                    <Text weight="semibold" className="mb-1">{item.task}</Text>
                    <Text size="sm" className="text-green-600">→ {item.result}</Text>
                  </div>
                ))}
              </Grid>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Hidden Opportunities */}
      <Section background="orange-light">
        <AnimatedItem animation="scale">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Free Marketing Gold Mines Most Pubs Miss
            </Heading>
            <Grid columns={{ default: 1, md: 3 }} gap="medium">
              <Card background="white" padding="large">
                <Heading level={3} color="orange" className="mb-4">Customer Content</Heading>
                <FeatureList 
                  items={[
                    'Repost customer photos',
                    'Share their reviews',
                    'Feature their stories',
                    'Create "customer of month"'
                  ]}
                  icon="bullet"
                  spacing="normal"
                />
                <Text className="text-green-600 mt-4" weight="semibold">Worth £1000s in content</Text>
              </Card>
              <Card background="white" padding="large">
                <Heading level={3} color="orange" className="mb-4">Local Partnerships</Heading>
                <FeatureList 
                  items={[
                    'Sports clubs HQ',
                    'Business networking',
                    'Charity quiz nights',
                    'School PTA events'
                  ]}
                  icon="bullet"
                  spacing="normal"
                />
                <Text className="text-green-600 mt-4" weight="semibold">30+ guaranteed customers</Text>
              </Card>
              <Card background="white" padding="large">
                <Heading level={3} color="orange" className="mb-4">Staff Advocacy</Heading>
                <FeatureList 
                  items={[
                    'Staff share posts',
                    'Their friends visit',
                    'Personal invitations',
                    'Genuine enthusiasm'
                  ]}
                  icon="bullet"
                  spacing="normal"
                />
                <Text className="text-green-600 mt-4" weight="semibold">Most powerful marketing</Text>
              </Card>
            </Grid>
          </div>
        </AnimatedItem>
      </Section>

      {/* Implementation Support */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} className="mb-8">
              Need Help Getting Started?
            </Heading>
            <Card variant="colored" background="teal-dark" padding="large">
              <Heading level={3} color="white" className="text-2xl mb-6">
                We'll Set Up Your Free Marketing Machine
              </Heading>
              <div className="text-white text-left max-w-2xl mx-auto">
                <FeatureList 
                  items={[
                    '✓ Optimize your Google My Business (1 hour)',
                    '✓ Create 30 days of social content (2 hours)',
                    '✓ Set up email marketing system (1 hour)',
                    '✓ Train you on everything (2 hours)',
                    '✓ Provide templates and calendars'
                  ]}
                  icon="bullet"
                  spacing="loose"
                />
              </div>
              <div className="mt-8 pt-6 border-t border-cream/20">
                <Text className="text-cream mb-4">
                  Investment: £75 per hour plus VAT
                </Text>
                <Button
                  href={URLS.whatsapp()}
                  variant="secondary"
                  size="large"
                  external
                  className="!bg-white !text-teal hover:!bg-cream"
                >
                  Set Up My Free Marketing
                </Button>
                <Text size="sm" className="text-cream/80 mt-4">
                  Most pubs make this back in week one
                </Text>
              </div>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* FAQ Section */}
      <Section background="cream">
        <Heading level={2} className="text-center mb-8">
          Common Questions About Free Pub Marketing
        </Heading>
        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </Section>

      <CTASection
        title="Empty Pub + No Budget = Big Problem"
        subtitle="But with the right free strategies, you'll fill tables fast. Let's get started today."
        whatsappMessage="Help me market my pub for free"
        buttonText="Show Me How"
      />
    </>
  );
}
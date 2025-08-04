import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import OptimizedImage from '@/components/OptimizedImage';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import FeatureList from '@/components/FeatureList';
import FAQItem from '@/components/FAQItem';
import Breadcrumb, { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import Text from '@/components/Text';
import { generateMetadata } from '@/lib/metadata';
import { FAQSchema } from '@/components/StructuredData';
import Partnerships from '@/components/Partnerships';
import { StruggleIcon, DiscoveryIcon, TransformationIcon, GrowthIcon } from '@/components/icons/JourneyIcons';

export const metadata = generateMetadata({
  title: 'About Orange Jelly - From One licensee to Another',
  description: 'Who is Peter Pitcher? How can AI help my pub? Meet the pub owner behind Orange Jelly who helps UK licensees save 5+ hours weekly with practical AI tools. Real experience from running The Anchor pub.',
  path: '/about',
});

export default function About() {
  // Comprehensive FAQ data for about page
  const aboutFAQs = [
    {
      question: "Who is Peter Pitcher and why should I trust Orange Jelly?",
      answer: "I'm Peter Pitcher, and I've run The Anchor pub in Stanwell Moor with my husband Billy since March 2019. I also work full-time as an AI Marketing Capabilities Lead for a global food manufacturer. I've been an early AI adopter since 2021 and discovered how AI can add 25 hours of value per week. Orange Jelly exists to share these proven strategies with fellow licensees."
    },
    {
      question: "What makes Orange Jelly different from other consultants?",
      answer: "We're not consultants who've never pulled a pint. We run an actual pub and test every strategy in our own business first. No corporate nonsense, no jargon - just one licensee helping another with tools that actually work. Plus, we guarantee results or your money back."
    },
    {
      question: "Is Orange Jelly a big company?",
      answer: "No, Orange Jelly started in 2016 with Laura Willis as a digital agency, then pivoted in 2019. Now it's just me (Peter) working around my full-time job, running The Anchor, and family life. No big office, no sales team. This means you get personal service, honest advice, and someone who genuinely understands your challenges because I face them too."
    },
    {
      question: "Why is it called Orange Jelly?",
      answer: "Just a fun play on words in a world that's ever-changing! We wanted a name that's friendly, memorable, and doesn't take itself too seriously - just like us. It reflects our approach: making complicated things simple and approachable."
    },
    {
      question: "Can I visit The Anchor to see your strategies in action?",
      answer: "Absolutely! We'd love to show you around. Pop in for a pint and see how we use AI tools in real pub operations. First pint's on me if you mention Orange Jelly. We're at Horton Road, Stanwell Moor, Staines TW19 6AQ."
    },
    {
      question: "How did you discover AI could help pubs?",
      answer: "Through my curiosity for technology and being an early adopter. I started with ChatGPT in 2021 when it first launched. The early results were terrible, but as the models evolved, they became business-ready. Now AI helps me deliver 120-150 hours worth of equivalent work per week in my spare time."
    },
    {
      question: "What results have you achieved at The Anchor?",
      answer: "We've improved food GP from 58% to 71%, grown quiz nights to 25-35 regulars, achieve 60,000-70,000 social media views monthly, and added £75,000-£100,000 of value to our business using AI. Most importantly - we got our evenings back. Every strategy we share has delivered real results in our own pub."
    },
    {
      question: "Do you understand the challenges of running a small pub?",
      answer: "Completely. We've dealt with empty Monday nights, staff no-shows, supplier price hikes, TripAdvisor nightmares, and competing with Wetherspoons. That's why our solutions are practical, affordable, and designed for real pub life."
    },
    {
      question: "Is Orange Jelly just about AI and technology?",
      answer: "No, it's about giving you your life back. AI is just the tool - the real goal is helping you work less and earn more. Whether that's automating social media so you can have Sunday lunch with family, or creating menus that sell themselves so you're not stressing about GP."
    },
    {
      question: "How can I be sure Orange Jelly will work for my pub?",
      answer: "Every pub is different, but the challenges are similar. That's why we offer a free consultation to understand your specific situation, and a 30-day money-back guarantee. We're so confident because these aren't theories - they're proven strategies from our own pub."
    },
    {
      question: "What areas does Orange Jelly cover?",
      answer: "For in-person training and consultations, we cover a 30-mile radius from Stanwell Moor (Surrey, Berkshire, West London). For online services like marketing and menu design, we help pubs across the UK. Technology means distance isn't a barrier."
    },
    {
      question: "What's your promise to pub owners?",
      answer: "To save you at least 5 hours per week on admin tasks, be honest about what AI can and can't do, only recommend tools we use ourselves, keep prices transparent and fair, and provide personal support when you need it. Plus our 30-day money-back guarantee."
    }
  ];

  // Generate comprehensive schema for About page
  const generateAboutSchema = () => {
    const aboutPageSchema = {
      "@type": "AboutPage",
      "name": "About Orange Jelly - From One licensee to Another",
      "description": "Learn about Peter Pitcher and Billy Summers, who run The Anchor pub and help other licensees save time with AI tools.",
      "url": "https://www.orangejelly.co.uk/about",
      "mainEntity": {
        "@id": "https://www.orangejelly.co.uk/#organization"
      }
    };

    const founderSchema = {
      "@type": "Person",
      "@id": "https://www.orangejelly.co.uk/#peter-pitcher",
      "name": "Peter Pitcher",
      "jobTitle": "Founder & AI Consultant",
      "description": "Pub owner who discovered how AI can Save At Least 5 Hours a Week on boring admin tasks. Co-owner of The Anchor in Stanwell Moor with wife Billy Summers.",
      "spouse": {
        "@type": "Person",
        "name": "Billy Summers",
        "jobTitle": "Co-owner of The Anchor"
      },
      "worksFor": [
        {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        {
          "@type": "Restaurant",
          "@id": "https://the-anchor.pub/#restaurant",
          "name": "The Anchor"
        }
      ],
      "knowsAbout": ["AI Tools", "Pub Management", "Hospitality", "Marketing"],
      "image": "https://www.orangejelly.co.uk/images/peter-pitcher.svg"
    };

    const theAnchorExtendedSchema = {
      "@type": "Restaurant",
      "@id": "https://the-anchor.pub/#restaurant",
      "name": "The Anchor",
      "description": "Award-winning pub in Stanwell Moor where all Orange Jelly AI solutions are tested and proven.",
      "url": "https://the-anchor.pub",
    };

    const servicePromise = {
      "@type": "Service",
      "name": "Orange Jelly AI Consulting",
      "description": "AI tools and consulting for pub owners",
      "provider": {
        "@id": "https://www.orangejelly.co.uk/#organization"
      },
      "serviceOutput": "At least 5 hours saved per week",
      "termsOfService": "30-day money-back guarantee"
    };

    return {
      "@context": "https://schema.org",
      "@graph": [aboutPageSchema, founderSchema, theAnchorExtendedSchema, servicePromise]
    };
  };

  const results = [
    { value: 'Honest', label: 'Transparent pricing always' },
    { value: 'Simple', label: 'No tech jargon' },
    { value: '25 hours', label: 'Value added weekly with AI' },
    { value: 'Personal', label: 'Direct WhatsApp support' },
    { value: '30 Days', label: 'Money-back guarantee' },
    { value: 'Proven', label: 'Tools we use daily' }
  ];

  const promises = {
    will: [
      'Always answer your messages personally',
      'Only recommend tools that work for us',
      'Be honest about what AI can and can\'t do',
      'Share our mistakes so you can avoid them',
      'Keep prices fair and transparent'
    ],
    wont: [
      'Sell you tools you don\'t need',
      'Use confusing tech jargon',
      'Hide costs or add surprise fees',
      'Pretend AI is magic (it\'s not)',
      'Forget we\'re licensees first'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAboutSchema()) }}
      />
      <FAQSchema faqs={aboutFAQs} />
      <Hero
        title="From One licensee to Another"
        subtitle="We run The Anchor. We get it. Now we want to help."
        showCTA={false}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto mb-8">
          <Breadcrumb items={breadcrumbPaths.about} />
        </div>
        
        <AnimatedItem animation="fade-in">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-6">Why "Orange Jelly"?</Heading>
          <Text size="lg" color="muted" align="center" className="mb-12">
            Just a fun play on words in a world that's ever-changing! We wanted a name 
            that's friendly, memorable, and doesn't take itself too seriously - just like us.
          </Text>

          <Card variant="shadowed">
            <Heading level={3} className="mb-4">Our Story</Heading>
            <Text color="muted" className="mb-6">
              I'm Peter Pitcher. Together with my husband Billy Summers, we've owned The Anchor 
              pub in Stanwell Moor since March 5th, 2019. Billy runs the day-to-day operations while I handle 
              business development and still work full-time as an AI Marketing Capabilities Lead 
              for a global food manufacturer. We're raising our little boy Marty (with help from 
              Molly, our dog!).
            </Text>

            <Text color="muted" className="mb-6">
              Like you, we've faced late nights, staff shortages, and marketing on a 
              shoestring budget. The difference? I discovered how AI could actually help 
              with the boring bits, giving us our evenings back.
            </Text>

            <Text color="muted" className="mb-6">
              Orange Jelly started in 2016 with my friend Laura Willis as a digital agency. 
              It pivoted in 2019 to serve both our pub business and AI consulting. It's just me now, 
              working around my full-time job and family life. No big office, no sales team, 
              no corporate nonsense. Just one licensee helping others discover how AI can add 
              25 hours of value per week.
            </Text>

            <Text color="muted">
              We operate The Anchor as a Greene King tenant and share our AI innovations with them. 
              We're members of the British Institute of Innkeeping and were featured in their 
              Autumn 2025 magazine for our AI innovation work. We maintain strong relationships 
              with both organisations as we help bring modern technology solutions to traditional pubs.
            </Text>
          </Card>
        </div>
        </AnimatedItem>
      </Section>

      <Section background="orange-light" padding="small">
        <AnimatedItem animation="slide-up">
          <Heading level={3} align="center" className="mb-8">Real Results We've Achieved at The Anchor</Heading>
          <Grid columns={{ default: 1, md: 3 }} gap="medium" className="max-w-4xl mx-auto">
            {results.map((result, index) => (
              <AnimatedItem key={index} animation="fade-in" delay={index * 100}>
                <Card variant="shadowed">
                  <Text className="text-3xl font-bold text-orange mb-2">{result.value}</Text>
                  <Text size="sm" color="muted">{result.label}</Text>
                </Card>
              </AnimatedItem>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Our Journey Timeline */}
      <Section background="white">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Our Journey: From Struggling to Thriving
            </Heading>
            
            <div className="space-y-8">
              <Card variant="bordered" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div>
                    <Text size="sm" color="muted" className="mb-2">March 5, 2019</Text>
                    <Heading level={3} className="mb-4 text-red-600">Taking Over The Anchor</Heading>
                    <Text className="mb-4">
                      We inherited a pub in terrible physical state. Leaky conservatory, leaking roof, 
                      no insulation. Previous tenants used paper rotas, laminated menus, and had to pay 
                      for beer on delivery. Customers thought they had a say in business decisions.
                    </Text>
                    <Text size="sm" color="muted">
                      "We almost had a nervous breakdown in year one."
                    </Text>
                  </div>
                  <div className="flex items-center justify-center opacity-60">
                    <StruggleIcon />
                  </div>
                </Grid>
              </Card>

              <Card variant="bordered" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div className="flex items-center justify-center opacity-60 order-2 md:order-1">
                    <DiscoveryIcon />
                  </div>
                  <div className="order-1 md:order-2">
                    <Text size="sm" color="muted" className="mb-2">March 2020 - 2021</Text>
                    <Heading level={3} color="orange" className="mb-4">COVID & Discovering AI</Heading>
                    <Text className="mb-4">
                      COVID hit one year after we took over. We chose not to offer takeaway, 
                      conserving funds instead. As an early adopter, I started using ChatGPT in 2021 
                      for rotas, menus, social media. The results were terrible at first, but kept improving.
                    </Text>
                    <Text size="sm" color="muted">
                      "That was the moment everything changed."
                    </Text>
                  </div>
                </Grid>
              </Card>

              <Card variant="bordered" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div>
                    <Text size="sm" color="muted" className="mb-2">2023</Text>
                    <Heading level={3} className="mb-4 text-green-600">The Anchor Transforms</Heading>
                    <Text className="mb-4">
                      Quiz nights: 25-35 regulars. Quarterly tasting nights (gin, rum, tequila) with 85% retention. 
                      Monthly cash bingo. Drag events, karaoke and games nights. Food GP improved from 58% to 71%. 
                      Added £75,000-£100,000 of value using AI. 60,000-70,000 social media views monthly. 
                      Partnered with Barrel And Stone, Brakes, and Bidfood. And we got our evenings back!
                    </Text>
                    <Text size="sm" color="muted">
                      "Other licensees started asking how we did it..."
                    </Text>
                  </div>
                  <div className="flex items-center justify-center opacity-60">
                    <TransformationIcon />
                  </div>
                </Grid>
              </Card>

              <Card variant="bordered" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div className="flex items-center justify-center opacity-60 order-2 md:order-1">
                    <GrowthIcon />
                  </div>
                  <div className="order-1 md:order-2">
                    <Text size="sm" color="muted" className="mb-2">2024-2025</Text>
                    <Heading level={3} color="teal" className="mb-4">Orange Jelly Evolves</Heading>
                    <Text className="mb-4">
                      Featured in BII Autumn 2025 magazine for AI innovation. 
                      First pub chain training scheduled September 2025. Building tools 
                      to help licensees add 25 hours of value per week using AI.
                    </Text>
                    <Text size="sm" color="muted">
                      "Every pub we help is one less closure statistic."
                    </Text>
                  </div>
                </Grid>
              </Card>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Achievements & Credibility */}
      <Section background="cream">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Why Licensees Trust Orange Jelly
            </Heading>

            <Grid columns={{ default: 1, md: 2 }} gap="large" className="mb-12">
              <Card background="white" padding="large">
                <div className="text-4xl mb-4">🏆</div>
                <Heading level={3} className="mb-4">Real Pub Experience</Heading>
                <FeatureList
                  items={[
                    'Run The Anchor pub every single day',
                    'Turned failing pub into thriving business',
                    'Tested every strategy in real conditions',
                    'Understand the daily struggles firsthand',
                    'No theory - just what actually works'
                  ]}
                  icon="check"
                  iconColor="green"
                  spacing="tight"
                />
              </Card>

              <Card background="white" padding="large">
                <div className="text-4xl mb-4">🤝</div>
                <Heading level={3} className="mb-4">Industry Recognition</Heading>
                <FeatureList
                  items={[
                    'Proud partners with Greene King',
                    'Working with British Institute of Innkeeping',
                    'Helping pubs across the UK',
                    'Direct support from real licensees',
                    '30-day money-back guarantee'
                  ]}
                  icon="check"
                  iconColor="orange"
                  spacing="tight"
                />
              </Card>
            </Grid>

            <Card background="orange-light" padding="large">
              <Heading level={3} align="center" className="mb-6">
                The Numbers That Matter
              </Heading>
              <Grid columns={{ default: 2, md: 4 }} gap="medium">
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">71%</Text>
                  <Text size="sm">Food GP (up from 58%)</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">25 hrs</Text>
                  <Text size="sm">Value added weekly with AI</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">£62.50</Text>
                  <Text size="sm">Per hour plus VAT</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">30 days</Text>
                  <Text size="sm">To see results or money back</Text>
                </div>
              </Grid>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Personal Touch */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              This Is Personal for Us
            </Heading>

            <Card variant="shadowed" padding="large">
              <Text size="lg" className="mb-6">
                When I see a pub closing down, I don't see statistics. I see a family losing 
                their livelihood, staff losing jobs, a community losing its heart.
              </Text>

              <Text className="mb-6">
                That's why Orange Jelly exists. Not to make millions (we're a tiny startup!), 
                but to help fellow licensees avoid the mistakes we made and implement the 
                solutions that saved us.
              </Text>

              <Text className="mb-6">
                Every pub we help means:
              </Text>

              <Grid columns={{ default: 1, md: 3 }} gap="medium" className="mb-6">
                <Card background="cream" padding="medium">
                  <Heading level={4} className="mb-2">A Family Saved</Heading>
                  <Text size="sm">
                    Licensees getting evenings back with their kids instead of 
                    drowning in paperwork
                  </Text>
                </Card>
                <Card background="cream" padding="medium">
                  <Heading level={4} className="mb-2">Jobs Protected</Heading>
                  <Text size="sm">
                    Staff keeping their livelihoods because the pub stays 
                    profitable and busy
                  </Text>
                </Card>
                <Card background="cream" padding="medium">
                  <Heading level={4} className="mb-2">Community Preserved</Heading>
                  <Text size="sm">
                    The local hub staying open for quiz nights, celebrations, 
                    and daily connections
                  </Text>
                </Card>
              </Grid>

              <Text weight="semibold">
                We're not just saving pubs. We're saving the people and communities that 
                depend on them. That's what gets me up every morning.
              </Text>

              <Text size="sm" color="muted" className="mt-6 text-right">
                - Peter Pitcher, Founder of Orange Jelly
              </Text>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* FAQ Section */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Questions About Orange Jelly
            </Heading>
            
            <div className="space-y-6">
              {aboutFAQs.slice(0, 6).map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Partnerships Section */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <Partnerships variant="full" />
        </div>
      </Section>

      <Section>
        <AnimatedItem animation="fade-in">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-8">Our Promise to You</Heading>
          <Grid columns={{ default: 1, md: 2 }} gap="medium">
            <Card variant="shadowed" className="h-full">
              <Heading level={4} color="orange" className="mb-3">What We Will Do</Heading>
              <FeatureList
                items={promises.will}
                icon="check"
                iconColor="green"
                spacing="normal"
              />
            </Card>
            <Card variant="shadowed" className="h-full">
              <Heading level={4} color="orange" className="mb-3">What We Won't Do</Heading>
              <FeatureList
                items={promises.wont}
                icon="cross"
                iconColor="red"
                spacing="normal"
              />
            </Card>
          </Grid>
        </div>
        </AnimatedItem>
      </Section>

      <Section background="teal">
        <AnimatedItem animation="slide-up" delay={100}>
          <Heading level={2} color="white" align="center" className="mb-6">Visit Us at The Anchor</Heading>
          <Text size="lg" className="mb-8 text-cream/90 max-w-3xl mx-auto" align="center">
            Want to see the results for yourself? Pop in for a pint and a chat. 
            We'll show you exactly how we use AI to run our pub more efficiently.
          </Text>
          <div className="text-center">
            <Card background="teal-dark" className="inline-block">
              <OptimizedImage
                src="/logo_the-anchor.png"
                alt="The Anchor - Stanwell Moor"
                width={200}
                height={80}
                className="mx-auto mb-4"
              />
              <Text color="white" className="font-semibold mb-2">The Anchor</Text>
              <Text size="sm" className="mb-1 text-cream/90">Horton Road, Stanwell Moor</Text>
              <Text size="sm" className="mb-4 text-cream/90">Staines TW19 6AQ</Text>
              <a href="https://the-anchor.pub" target="_blank" rel="noopener noreferrer" 
                 className="text-orange hover:text-orange-light transition underline">
                www.the-anchor.pub
              </a>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Related Links */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <RelatedLinks
            title="How We Can Help Your Pub"
            subtitle="Choose what matters most to you right now"
            links={[
              ...linkClusters.time,
              {
                title: "Free Chat About Your Pub",
                description: "Tell me your biggest headache - I'll share how we fixed it",
                href: "/contact",
                emoji: "💬",
                highlight: true
              }
            ]}
            variant="card"
            columns={{ default: 1, md: 2 }}
          />
        </div>
      </Section>

      <CTASection
        title="Let's Have a Chat"
        subtitle="No sales pressure, just one licensee helping another."
        whatsappMessage="Hi Peter, I'd love to hear more about your story and how Orange Jelly could help my pub"
        buttonText="Get Marketing Help"
      />
    </>
  );
}
import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TrustBadges from '@/components/TrustBadges';
import ProblemCard from '@/components/ProblemCard';
import CTASection from '@/components/CTASection';
import Section from '@/components/Section';
import ROICalculator from '@/components/ROICalculator';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import { URLS, MESSAGES, CONTACT } from '@/lib/constants';

export default function Home() {
  // Generate comprehensive schema for Homepage
  const generateHomepageSchema = () => {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "I spend my evenings doing social media",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Create 3 months of posts in one afternoon. Get your evenings back."
          }
        },
        {
          "@type": "Question",
          "name": "My menu doesn't sell profitable dishes",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "AI-written descriptions that make your best dishes fly off the pass."
          }
        },
        {
          "@type": "Question", 
          "name": "I don't know if AI actually works",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Try everything for 30 days. Money back if you don't save time and money."
          }
        }
      ]
    };


    const localBusinessAction = {
      "@type": "ConsumeAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `https://wa.me/${CONTACT.whatsappNumber}?text={message}`,
        "actionPlatform": [
          "http://schema.org/DesktopWebPlatform",
          "http://schema.org/MobileWebPlatform"
        ]
      },
      "object": {
        "@type": "Service",
        "name": "AI Consulting for Pubs"
      }
    };

    return {
      "@context": "https://schema.org",
      "@graph": [faqSchema, localBusinessAction]
    };
  };

  const problems = [
    {
      emoji: '😩',
      problem: '"I spend my evenings doing social media"',
      solution: 'Create 3 months of posts in one afternoon. Get your evenings back.',
      linkText: 'Marketing Package',
      linkHref: '/services#marketing'
    },
    {
      emoji: '📋',
      problem: '"My menu doesn\'t sell profitable dishes"',
      solution: 'AI-written descriptions that make your best dishes fly off the pass.',
      linkText: 'Menu Makeover',
      linkHref: '/services#menu'
    },
    {
      emoji: '🤔',
      problem: '"I don\'t know if AI actually works"',
      solution: 'Try everything for 30 days. Money back if you don\'t save time and money.',
      linkText: '30-Day Quick Wins',
      linkHref: '/services#quickwins'
    }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateHomepageSchema()) }}
      />
      
      <Hero
        title={<>Save At Least 5 Hours a Week<br />Running Your Pub</>}
        subtitle="AI tools that actually work - from publicans who use them daily"
        secondaryAction={{
          text: 'See How It Works',
          href: '/services'
        }}
        bottomText="📍 We run The Anchor in Stanwell Moor - come see the results yourself!"
      />

      <TrustBar />

      {/* Trust Badges */}
      <Section padding="small">
        <TrustBadges variant="horizontal" />
      </Section>

      {/* Problems We Solve */}
      <Section>
        <AnimatedItem animation="fade-in">
        <Heading level={2} align="center" className="mb-12">
          Problems We Actually Solve
        </Heading>
        
        <Grid columns={{ default: 1, md: 3 }} gap="medium">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </Grid>
        </AnimatedItem>
      </Section>

      {/* Mini Case Study */}
      <Section background="teal">
        <AnimatedItem animation="slide-up">
        <div className="text-center">
          <Heading level={2} color="white" className="mb-6">
            How We Use AI at The Anchor
          </Heading>
          <div className="bg-teal-dark/30 rounded-lg p-8 mb-8 max-w-4xl mx-auto">
            <p className="text-xl mb-4 text-white">
              "We test every tool and technique at our own pub first. 
              If it doesn't work for us, we won't recommend it to you."
            </p>
            <p className="text-lg text-cream/90">
              From menu writing to social media, we use AI daily to run our pub more efficiently.
            </p>
          </div>
          <Button
            href="/results"
            variant="secondary"
            className="bg-cream text-teal hover:bg-cream-light"
          >
            Read More Success Stories
          </Button>
        </div>
        </AnimatedItem>
      </Section>


      {/* ROI Calculator Section */}
      <Section background="white">
        <AnimatedItem animation="fade-in" delay={100}>
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-4">
            See Your Savings in Real Time
          </Heading>
          <p className="text-xl text-center text-charcoal/80 mb-12 max-w-2xl mx-auto">
            Every pub is different. Use our calculator to see exactly how much time and money 
            you could save with AI tools.
          </p>
          <ROICalculator />
        </div>
        </AnimatedItem>
      </Section>

      {/* About Preview with The Anchor Logo */}
      <Section>
        <AnimatedItem animation="slide-up" delay={200}>
        <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
          <div>
            <Heading level={2} className="mb-6">
              We're Not a Tech Company
            </Heading>
            <p className="text-lg text-charcoal/80 mb-4">
              I'm Peter. My husband Billy and I run The Anchor in Stanwell Moor. 
              We're raising our son Marty, managing staff, dealing with suppliers - 
              just like you.
            </p>
            <p className="text-lg text-charcoal/80 mb-6">
              Orange Jelly started because we figured out how AI could give us our 
              evenings back. Now we want to help you do the same.
            </p>
            <Button
              href="/about"
              variant="ghost"
              className="text-lg"
            >
              Read Our Full Story →
            </Button>
          </div>
          <Card variant="colored" background="white" padding="large" className="!bg-teal text-center relative overflow-hidden">
            {/* Orange Jelly watermark in corner */}
            <div className="absolute top-2 right-2 opacity-20">
              <Image
                src="/logo.png"
                alt=""
                width={60}
                height={60}
                aria-hidden="true"
                className="rounded-lg"
              />
            </div>
            
            <p className="text-sm text-white uppercase tracking-wider mb-4 opacity-90">
              Proven Daily At
            </p>
            <Image
              src="/logo_the-anchor.png"
              alt="The Anchor - Stanwell Moor"
              width={240}
              height={96}
              className="mx-auto mb-4"
            />
            <p className="text-white/90 font-semibold">
              Family-run pub + AI knowledge = Orange Jelly
            </p>
            
            {/* Orange accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-orange to-transparent"></div>
          </Card>
        </Grid>
        </AnimatedItem>
      </Section>

      {/* Free Chat Banner */}
      <Section background="orange-light" padding="small">
        <AnimatedItem animation="scale" delay={300}>
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={3} className="mb-4">
            Let's Have a Quick Chat
          </Heading>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Tell me what's keeping you up at night. I'll share how we solved 
            the same problems at The Anchor. No sales pitch, promise.
          </p>
          <Button
            href={URLS.whatsapp()}
            variant="primary"
            size="medium"
            external
            ariaLabel={`Contact ${CONTACT.owner} on WhatsApp at ${CONTACT.phone}`}
          >
            Message Peter
          </Button>
        </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="Ready to Get Your Evenings Back?"
        subtitle="Let's have a quick chat about what's driving you mad. I'll share what worked for us."
      />
    </>
  );
}
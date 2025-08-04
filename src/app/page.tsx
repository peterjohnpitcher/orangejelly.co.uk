import Hero from '@/components/Hero';
import TrustBar from '@/components/TrustBar';
import TrustBadges from '@/components/TrustBadges';
import ProblemCard from '@/components/ProblemCard';
import CTASection from '@/components/CTASection';
import Section from '@/components/Section';
import ROICalculator from '@/components/ROICalculator';
import OptimizedImage from '@/components/OptimizedImage';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import { URLS, MESSAGES, CONTACT } from '@/lib/constants';
import Text from '@/components/Text';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import Partnerships from '@/components/Partnerships';
import { generateMetadata } from '@/lib/metadata';
import { homepageFAQs, homeProblems, homeFeatures, homeMetrics } from '@/lib/content/home-content';

export const metadata = generateMetadata({
  title: 'How to Fill Empty Pub Tables | Pub Marketing That Works',
  description: 'Struggling with empty pub tables? We use AI-powered marketing strategies that transformed The Anchor from struggling to thriving. From one licensee to another. £62.50 per hour plus VAT.',
  path: '/',
  keywords: 'pub marketing UK, fill empty pub tables, pub marketing strategies, increase pub customers, pub social media marketing, pub turnaround, empty pub solutions',
});

export default function Home() {
  // Problem cards data
  const problems = [
    {
      emoji: '🪑',
      problem: '"My tables are empty most nights"',
      solution: 'Fill your pub with proven marketing that brings customers through the door.',
      linkText: 'Fill Your Pub',
      linkHref: '/services#marketing'
    },
    {
      emoji: '🍽️',
      problem: '"Food sales aren\'t covering costs"',
      solution: 'Menu descriptions that sell your most profitable dishes every time.',
      linkText: 'Boost Food Sales',
      linkHref: '/services#menu'
    },
    {
      emoji: '🏆',
      problem: '"Competition is killing us"',
      solution: 'Stand out locally with strategies that actually bring customers back.',
      linkText: 'Beat Competition',
      linkHref: '/services#quickwins'
    }
  ];

  return (
    <>
      <FAQSchema faqs={homepageFAQs} />
      <SpeakableContent 
        cssSelectors={[
          '.hero-title',
          '.hero-subtitle', 
          '.trust-bar',
          '.problem-card h3',
          '.cta-section h2',
          '.cta-section p'
        ]}
        url="/"
      />
      
      <Hero
        title={<>Your Pub is Struggling.<br />We Know How to Fix It.</>}
        subtitle="AI-powered marketing strategies from real licensees who turned their pubs around"
        secondaryAction={{
          text: 'See What Works',
          href: '/services'
        }}
        bottomText="📍 We run The Anchor in Stanwell Moor - come see the results yourself!"
      />

      <TrustBar />

      {/* Trust Badges */}
      <Section padding="small">
        <TrustBadges variant="horizontal" />
      </Section>

      {/* Partnerships */}
      <Section background="cream" padding="small">
        <Partnerships variant="compact" />
      </Section>

      {/* Problems We Solve */}
      <Section>
        <AnimatedItem animation="fade-in">
        <Heading level={2} align="center" className="mb-12">
          What's Killing Your Business?
        </Heading>
        
        <Grid columns={{ default: 1, md: 3 }} gap="medium">
          {problems.map((problem, index) => (
            <ProblemCard key={index} {...problem} />
          ))}
        </Grid>
        
        <RelatedLinks
          title="Explore Solutions to Your Biggest Problems"
          links={[
            ...linkClusters.emptyPub.slice(0, 2),
            linkClusters.competition[0],
            linkClusters.time[0]
          ]}
          variant="inline"
          centered={true}
        />
        </AnimatedItem>
      </Section>

      {/* Mini Case Study */}
      <Section background="teal">
        <AnimatedItem animation="slide-up">
        <div className="text-center">
          <Heading level={2} color="white" align="center" className="mb-6">
            Real Results from The Anchor
          </Heading>
          <div className="bg-teal-dark/30 rounded-lg p-8 mb-8 max-w-4xl mx-auto">
            <Text size="lg" color="white" align="center" className="mb-4">
              "We've added £75,000-£100,000 of value to our business using AI. 
              Our food GP improved from 58% to 71%. Every strategy we share has been proven in our own pub."
            </Text>
            <Text size="lg" align="center" className="text-cream/90">
              Featured in BII's Autumn 2025 magazine for AI innovation. From quiz nights to tasting events - 
              see how we turned our pub around.
            </Text>
          </div>
          <Button
            href="/results"
            variant="secondary"
            className="bg-cream text-teal hover:bg-cream-light"
          >
            See More Pub Turnarounds
          </Button>
        </div>
        </AnimatedItem>
      </Section>


      {/* ROI Calculator Section */}
      <div id="roi-calculator">
      <Section background="white">
        <AnimatedItem animation="fade-in" delay={100}>
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-4">
            Calculate Your Potential Revenue
          </Heading>
          <Text size="lg" color="muted" align="center" className="mb-12 max-w-2xl mx-auto">
            Every pub is different. See exactly how much more revenue 
            you could generate with proven strategies.
          </Text>
          <ROICalculator />
          
          <RelatedLinks
            title="Ready to Increase Your Revenue?"
            subtitle="Choose the solution that fits your budget and timeline"
            links={linkClusters.budget}
            variant="card"
            columns={{ default: 1, md: 3 }}
          />
        </div>
        </AnimatedItem>
      </Section>
      </div>

      {/* About Preview with The Anchor Logo */}
      <Section>
        <AnimatedItem animation="slide-up" delay={200}>
        <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
          <div>
            <Heading level={2} className="mb-6">
              We're licensees, Just Like You
            </Heading>
            <Text size="lg" color="muted" className="mb-4">
              I'm Peter. My husband Billy and I have run The Anchor in Stanwell Moor since March 2019. 
              We faced the same struggles - empty tables, rising costs, fierce competition.
            </Text>
            <Text size="lg" color="muted" className="mb-6">
              Orange Jelly exists because we discovered how AI can add 25 hours of value per week. 
              I've been an early AI adopter since 2021, and now I help other pubs implement 
              the same strategies that transformed our business.
            </Text>
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
              <OptimizedImage
                src="/logo.png"
                alt=""
                width={60}
                height={60}
                className="rounded-lg"
                loading="lazy"
              />
            </div>
            
            <Text size="xs" color="white" align="center" className="mb-4 opacity-90">
              Proven Daily At
            </Text>
            <OptimizedImage
              src="/logo_the-anchor.png"
              alt="The Anchor - Stanwell Moor"
              width={240}
              height={96}
              className="mx-auto mb-4"
              priority
            />
            <Text color="white" align="center" className="opacity-90 font-semibold">
              Real pub experience + proven strategies = Orange Jelly
            </Text>
            
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
          <Heading level={3} align="center" className="mb-4">
            Stop Struggling. Start Thriving.
          </Heading>
          <Text size="lg" align="center" className="mb-6 max-w-2xl mx-auto">
            Tell me what's killing your business. I'll share exactly how we fixed 
            the same problems at The Anchor. Real solutions, no fluff.
          </Text>
          <Button
            href={URLS.whatsapp()}
            variant="primary"
            size="medium"
            external
            ariaLabel={`Contact ${CONTACT.owner} on WhatsApp at ${CONTACT.phone}`}
          >
            Get Marketing Help
          </Button>
        </div>
        </AnimatedItem>
      </Section>

      <CTASection
        title="Ready to Turn Your Pub Around?"
        subtitle="Let's talk about what's really hurting your business. I'll share the exact strategies that saved ours."
      />
    </>
  );
}
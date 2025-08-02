import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Image from 'next/image';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import FeatureList from '@/components/FeatureList';

export const metadata: Metadata = {
  title: 'About Orange Jelly - From One Publican to Another',
  description: 'Meet Peter Pitcher, pub owner turned AI consultant. Learn how Orange Jelly helps pubs Save At Least 5 Hours a Week with practical AI tools.',
  alternates: {
    canonical: 'https://orangejelly.co.uk/about',
  },
};

export default function About() {
  // Generate comprehensive schema for About page
  const generateAboutSchema = () => {
    const aboutPageSchema = {
      "@type": "AboutPage",
      "name": "About Orange Jelly - From One Publican to Another",
      "description": "Learn about Peter Pitcher and Billy Summers, who run The Anchor pub and help other publicans save time with AI tools.",
      "url": "https://orangejelly.co.uk/about",
      "mainEntity": {
        "@id": "https://orangejelly.co.uk/#organization"
      }
    };

    const founderSchema = {
      "@type": "Person",
      "@id": "https://orangejelly.co.uk/#peter-pitcher",
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
          "@id": "https://orangejelly.co.uk/#organization"
        },
        {
          "@type": "Restaurant",
          "@id": "https://the-anchor.pub/#restaurant",
          "name": "The Anchor"
        }
      ],
      "knowsAbout": ["AI Tools", "Pub Management", "Hospitality", "Marketing"],
      "image": "https://orangejelly.co.uk/peter-pitcher.jpg"
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
        "@id": "https://orangejelly.co.uk/#organization"
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
    { value: 'At least 5 hours', label: 'Time saved promise' },
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
      'Forget we\'re publicans first'
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateAboutSchema()) }}
      />
      <Hero
        title="From One Publican to Another"
        subtitle="We run The Anchor. We get it. Now we want to help."
        showCTA={false}
      />

      <Section background="white">
        <AnimatedItem animation="fade-in">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-6">Why "Orange Jelly"?</Heading>
          <p className="text-lg text-charcoal/80 text-center mb-12">
            Just a fun play on words in a world that's ever-changing! We wanted a name 
            that's friendly, memorable, and doesn't take itself too seriously - just like us.
          </p>

          <Card variant="shadowed">
            <Heading level={3} className="mb-4">Our Story</Heading>
            <p className="text-charcoal/80 mb-6">
              I'm Peter Pitcher. Together with my husband Billy Summers, we own The Anchor 
              pub in Stanwell Moor. Billy runs the day-to-day operations while I handle 
              business development - and we're raising our little boy Marty (with help from 
              Molly, our dog!).
            </p>

            <p className="text-charcoal/80 mb-6">
              Like you, we've faced late nights, staff shortages, and marketing on a 
              shoestring budget. The difference? I discovered how AI could actually help 
              with the boring bits, giving us our evenings back.
            </p>

            <p className="text-charcoal/80 mb-6">
              Orange Jelly is a small startup - just me working around my full-time job 
              and family life. No big office, no sales team, no corporate nonsense. Just 
              one publican helping others discover how AI can save them time and stress.
            </p>
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
                  <p className="text-3xl font-bold text-orange mb-2">{result.value}</p>
                  <p className="text-sm text-charcoal/80">{result.label}</p>
                </Card>
              </AnimatedItem>
            ))}
          </Grid>
        </AnimatedItem>
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
          <p className="text-xl mb-8 text-cream/90 text-center max-w-3xl mx-auto">
            Want to see the results for yourself? Pop in for a pint and a chat. 
            We'll show you exactly how we use AI to run our pub more efficiently.
          </p>
          <div className="text-center">
            <Card background="teal-dark" className="inline-block">
              <Image
                src="/logo_the-anchor.png"
                alt="The Anchor - Stanwell Moor"
                width={200}
                height={80}
                className="mx-auto mb-4"
              />
              <p className="font-semibold mb-2 text-white">The Anchor</p>
              <p className="text-sm mb-1 text-cream/90">Horton Road, Stanwell Moor</p>
              <p className="text-sm mb-4 text-cream/90">Staines TW19 6AQ</p>
              <a href="https://the-anchor.pub" target="_blank" rel="noopener noreferrer" 
                 className="text-orange hover:text-orange-light transition underline">
                www.the-anchor.pub
              </a>
            </Card>
          </div>
        </AnimatedItem>
      </Section>


      <CTASection
        title="Let's Have a Chat"
        subtitle="No sales pressure, just one publican helping another."
        whatsappMessage="Hi Peter, I'd love to hear more about your story and how Orange Jelly could help my pub"
        buttonText="Message Peter on WhatsApp"
      />
    </>
  );
}
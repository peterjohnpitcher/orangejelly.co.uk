'use client';

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
import { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import Text from '@/components/Text';
import { FAQSchema } from '@/components/StructuredData';
import Partnerships from '@/components/Partnerships';
import { StruggleIcon, DiscoveryIcon, TransformationIcon, GrowthIcon } from '@/components/icons/JourneyIcons';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { AboutContent } from '@/lib/sanity-about';
import type { FAQ, SiteSettings } from '@/lib/sanity.types';
import { portableTextToPlainText } from '@/lib/portable-text-utils';
import { urlFor } from '@/lib/sanity.client';

// Default FAQs if not in Sanity
const defaultAboutFAQs = [
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

interface AboutPageProps {
  aboutContent?: AboutContent | null;
  faqs?: FAQ[];
  siteSettings?: SiteSettings | null;
}

export default function AboutPage({ aboutContent, faqs, siteSettings }: AboutPageProps) {

  // Use Sanity FAQs or fallback to default
  const aboutFAQs = faqs && faqs.length > 0 ? faqs.map(faq => ({
    ...faq,
    answer: portableTextToPlainText(faq.answer) // Convert Portable Text to plain string
  })) : defaultAboutFAQs;

  return (
    <>
      <FAQSchema faqs={aboutFAQs} />
      
      <Hero
        title={aboutContent?.heroSection?.title || "From One Licensee to Another"}
        subtitle={aboutContent?.heroSection?.subtitle || "We run The Anchor in Stanwell Moor. We discovered how AI saves 25 hours a week. Now we help other licensees do the same."}
        breadcrumbs={breadcrumbPaths.about}
      />

      {/* The Story */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} className="mb-6">
              The Real Story Behind Orange Jelly
            </Heading>
              {aboutContent?.story ? (
                <div className="prose prose-lg">
                  <PortableText value={aboutContent.story} />
                </div>
              ) : (
                <>
                  <Text size="lg" className="mb-4">
                    I'm Peter. My husband Billy and I have run <strong>The Anchor in Stanwell Moor</strong> since March 2019. 
                    Like you, we've faced empty tables, rising costs, and 70-hour weeks wondering if it's all worth it.
                  </Text>
                  <Text size="lg" className="mb-4">
                    Everything changed when I discovered how <strong>AI could transform pub operations</strong>. 
                    As an early adopter since 2021, I've tested everything - the failures taught me what to avoid, 
                    the successes showed me what to share.
                  </Text>
                  <Text size="lg" className="mb-6">
                    Today, our quiz nights attract <strong>25-35 regulars</strong>, our food GP improved from 
                    <strong> 58% to 71%</strong>, and we actually have evenings off. Orange Jelly exists to help 
                    you achieve the same transformation.
                  </Text>
                </>
              )}
              
              <Button
                href="/results"
                variant="ghost"
                className="text-lg"
              >
                See Our Proven Results →
              </Button>
          </div>
        </AnimatedItem>
      </Section>

      {/* Quick Facts */}
      <Section background="cream">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Card variant="colored" background="orange-light" padding="large">
              <Heading level={3} className="mb-4">Quick Facts</Heading>
              <FeatureList
                items={[
                  'Pub owners since March 2019',
                  'AI early adopter since 2021',
                  'Full-time job + pub + Orange Jelly',
                  'Featured in BII magazine',
                  'Greene King tenants',
                  '£62.50/hour - no packages',
                  '30-day money-back guarantee'
                ]}
                columns={1}
              />
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Journey Timeline */}
      <Section background="cream">
        <AnimatedItem animation="slide-up">
          <Heading level={2} align="center" className="mb-12">
            Our Journey from Struggle to Success
          </Heading>
          
          <div className="max-w-4xl mx-auto">
            {aboutContent?.timeline ? (
              <div className="space-y-8">
                {aboutContent.timeline.map((event, index) => (
                  <div key={index} className={`flex items-start gap-4 ${event.highlight ? 'scale-105' : ''}`}>
                    <div className={`w-24 flex-shrink-0 text-right ${event.highlight ? 'font-bold text-orange' : 'text-charcoal/60'}`}>
                      {event.date}
                    </div>
                    <div className={`w-4 h-4 rounded-full flex-shrink-0 mt-1 ${event.highlight ? 'bg-orange' : 'bg-charcoal/30'}`} />
                    <div className="flex-grow">
                      <Heading level={4} className={event.highlight ? 'text-orange' : ''}>{event.title}</Heading>
                      {event.description && <Text color="muted">{event.description}</Text>}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Grid columns={{ default: 1, md: 2, lg: 4 }} gap="medium">
                <Card variant="bordered" padding="medium" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-orange">
                    <StruggleIcon />
                  </div>
                  <Heading level={4} className="mb-2">March 2019</Heading>
                  <Text size="sm" color="muted">
                    Took over The Anchor. Empty tables, no strategy, pure hope.
                  </Text>
                </Card>
                
                <Card variant="bordered" padding="medium" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-orange">
                    <DiscoveryIcon />
                  </div>
                  <Heading level={4} className="mb-2">2021</Heading>
                  <Text size="sm" color="muted">
                    Discovered AI tools. Started testing, failing, learning.
                  </Text>
                </Card>
                
                <Card variant="bordered" padding="medium" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-orange">
                    <TransformationIcon />
                  </div>
                  <Heading level={4} className="mb-2">Jan-Feb 2024</Heading>
                  <Text size="sm" color="muted">
                    Six brutal weeks forced full AI adoption. GP hit 71%.
                  </Text>
                </Card>
                
                <Card variant="bordered" padding="medium" className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 text-orange">
                    <GrowthIcon />
                  </div>
                  <Heading level={4} className="mb-2">Today</Heading>
                  <Text size="sm" color="muted">
                    Helping licensees save 5+ hours weekly with proven tools.
                  </Text>
                </Card>
              </Grid>
            )}
          </div>
        </AnimatedItem>
      </Section>

      {/* Meet Peter */}
      <Section>
        <AnimatedItem animation="fade-in" delay={100}>
          <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
            <div className="order-2 md:order-1">
              <div className="relative aspect-square max-w-[400px] mx-auto md:mx-0">
                {aboutContent?.founderSection?.image?.asset ? (
                  <OptimizedImage
                    src={urlFor(aboutContent.founderSection.image).url()}
                    alt={aboutContent.founderSection.name || "Peter Pitcher"}
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="rounded-lg shadow-xl object-cover"
                    priority
                  />
                ) : (
                  <OptimizedImage
                    src="/images/peter-pitcher.svg"
                    alt="Peter Pitcher, founder of Orange Jelly"
                    fill
                    sizes="(max-width: 768px) 100vw, 400px"
                    className="rounded-lg shadow-xl object-cover"
                    priority
                  />
                )}
              </div>
            </div>
            <div className="order-1 md:order-2">
              <Heading level={2} className="mb-6">
                {aboutContent?.founderSection?.name || "Meet Peter Pitcher"}
              </Heading>
              <Text size="sm" color="muted" className="mb-4 uppercase tracking-wide">
                {aboutContent?.founderSection?.role || "Founder & Pub Owner"}
              </Text>
              
              {aboutContent?.founderSection?.bio ? (
                <div className="prose prose-lg mb-6">
                  <PortableText value={aboutContent.founderSection.bio} />
                </div>
              ) : (
                <>
                  <Text size="lg" className="mb-4">
                    I'm not your typical consultant. By day, I'm an AI Marketing Capabilities Lead 
                    for a global food manufacturer. By night and weekends, I'm pulling pints at The Anchor.
                  </Text>
                  <Text size="lg" className="mb-4">
                    My curiosity for technology made me an early AI adopter in 2021. When I saw 
                    how it could save hours on pub admin, I had to share it with other licensees 
                    struggling like we were.
                  </Text>
                  <Text size="lg" className="mb-6">
                    Now I help pubs across the UK implement the same AI strategies that transformed 
                    our business. No theory, no fluff - just practical tools that work in real pub life.
                  </Text>
                </>
              )}
              
              {aboutContent?.founderSection?.quote && (
                <Card variant="colored" background="teal-dark" padding="medium">
                  <Text size="lg" className="italic text-white">
                    "{aboutContent.founderSection.quote}"
                  </Text>
                </Card>
              )}
            </div>
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Our Values */}
      <Section background="orange-light">
        <AnimatedItem animation="slide-up" delay={200}>
          <Heading level={2} align="center" className="mb-12">
            What We Stand For
          </Heading>
          
          <Grid columns={{ default: 1, md: 2, lg: 4 }} gap="medium">
            {(aboutContent?.values || [
              {
                icon: '🎯',
                title: 'Real Experience',
                description: 'We run an actual pub. Every strategy has been tested at The Anchor first.',
              },
              {
                icon: '💰',
                title: 'Honest Pricing',
                description: '£62.50 per hour plus VAT. No packages, no hidden fees, no surprises.',
              },
              {
                icon: '🛡️',
                title: 'Guaranteed Results',
                description: '30-day money-back guarantee because we believe in what we do.',
              },
              {
                icon: '🤝',
                title: 'Personal Service',
                description: 'Just me, no sales team. You get direct access to someone who understands.',
              },
            ]).map((value, index) => (
              <Card key={index} variant="shadowed" background="white" padding="medium" className="text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <Heading level={4} className="mb-2">{value.title}</Heading>
                <Text size="sm" color="muted">{value.description}</Text>
              </Card>
            ))}
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Why Orange Jelly */}
      {aboutContent?.whyOrangeJelly && (
        <Section>
          <AnimatedItem animation="fade-in" delay={300}>
            <div className="max-w-3xl mx-auto text-center">
              <Heading level={2} align="center" className="mb-6">
                {aboutContent.whyOrangeJelly.title || "Why Orange Jelly?"}
              </Heading>
              <div className="prose prose-lg mx-auto">
                <PortableText value={aboutContent.whyOrangeJelly.content} />
              </div>
            </div>
          </AnimatedItem>
        </Section>
      )}

      {/* FAQs */}
      <Section background="cream">
        <AnimatedItem animation="fade-in" delay={400}>
          <Heading level={2} align="center" className="mb-12">
            Your Questions Answered
          </Heading>
          
          <div className="max-w-3xl mx-auto">
            {aboutFAQs.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </AnimatedItem>
      </Section>

      {/* Partners */}
      <Section>
        <Partnerships 
          variant="full"
        />
      </Section>

      {/* Visit CTA */}
      <Section background="teal">
        <AnimatedItem animation="scale" delay={500}>
          <div className="text-center">
            <Heading level={2} color="white" className="mb-6">
              Come See The Results Yourself
            </Heading>
            <Text size="lg" className="text-white mb-8 max-w-2xl mx-auto">
              Visit The Anchor and see how we use AI in real pub operations. 
              First pint's on me if you mention Orange Jelly.
            </Text>
            <Card variant="shadowed" background="white" padding="large" className="inline-block">
              <Heading level={4} className="mb-2">The Anchor</Heading>
              <Text color="muted" className="mb-4">
                {siteSettings?.contact?.address ? (
                  siteSettings.contact.address.split('\n').map((line, i) => (
                    <span key={i}>
                      {line}
                      {i < siteSettings.contact.address.split('\n').length - 1 && <br />}
                    </span>
                  ))
                ) : (
                  <>Horton Road, Stanwell Moor<br />Staines TW19 6AQ</>
                )}
              </Text>
              <Link
                href="https://maps.google.com/?q=The+Anchor+Stanwell+Moor"
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal hover:text-teal-dark transition-colors underline"
              >
                Get Directions →
              </Link>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinks
          title="See How We Can Help"
          subtitle="Choose where to start based on your biggest challenge"
          links={[
            ...linkClusters.about,
            linkClusters.quickWins[0],
            linkClusters.emptyPub[0]
          ]}
          variant="card"
          columns={{ default: 1, md: 2, lg: 4 }}
        />
      </Section>

      <CTASection
        title="Ready to Transform Your Pub?"
        subtitle="Let's chat about your challenges. No sales pitch, just one licensee to another."
      />
    </>
  );
}
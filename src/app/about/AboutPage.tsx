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
import RelatedLinksFromSanity from '@/components/RelatedLinksFromSanity';
import Text from '@/components/Text';
import Container from '@/components/Container';
import Box from '@/components/Box';
import { FAQSchema } from '@/components/StructuredData';
import Partnerships from '@/components/Partnerships';
import { StruggleIcon, DiscoveryIcon, TransformationIcon, GrowthIcon } from '@/components/icons/JourneyIcons';
import Link from 'next/link';
import { PortableText } from '@portabletext/react';
import type { AboutContent } from '@/lib/sanity-about';
import type { FAQ, SiteSettings } from '@/lib/sanity.types';
import { portableTextToPlainText } from '@/lib/portable-text-utils';
import { urlFor } from '@/lib/sanity.client';


interface AboutPageProps {
  aboutContent?: AboutContent | null;
  faqs?: FAQ[];
  siteSettings?: SiteSettings | null;
  author?: any; // Author data from Sanity
}

export default function AboutPage({ aboutContent, faqs, siteSettings, author }: AboutPageProps) {

  // Use Sanity FAQs
  const aboutFAQs = faqs && faqs.length > 0 ? faqs.map(faq => ({
    ...faq,
    answer: portableTextToPlainText(faq.answer) // Convert Portable Text to plain string
  })) : [];

  return (
    <>
      <FAQSchema faqs={aboutFAQs} />
      
      <Hero
        title={aboutContent?.heroSection?.title || "About Orange Jelly"}
        subtitle={aboutContent?.heroSection?.subtitle || "Helping pub owners transform their business with practical AI solutions."}
        breadcrumbs={breadcrumbPaths.about}
      />

      {/* The Story */}
      <Section>
        <AnimatedItem animation="fade-in">
          <Container maxWidth="4xl">
            <Heading level={2} className="mb-6">
              The Real Story Behind Orange Jelly
            </Heading>
              {aboutContent?.story ? (
                <Box className="prose prose-lg">
                  <PortableText value={aboutContent.story} />
                </Box>
              ) : (
                <Text size="lg" color="muted">Content loading...</Text>
              )}
              
              <Button
                href="/results"
                variant="ghost"
                className="text-lg"
              >
                See Our Proven Results →
              </Button>
          </Container>
        </AnimatedItem>
      </Section>

      {/* Quick Facts */}
      <Section background="cream">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Card variant="colored" background="orange-light" padding="large">
              <Heading level={3} className="mb-4">{aboutContent?.quickFacts?.title || 'Quick Facts'}</Heading>
              {aboutContent?.quickFacts?.facts ? (
                <FeatureList
                  items={aboutContent.quickFacts.facts}
                  columns={1}
                />
              ) : (
                <Text color="muted">Facts loading...</Text>
              )}
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
              <Text color="muted" className="text-center">Timeline loading...</Text>
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
                {author?.image?.asset || aboutContent?.founderSection?.image?.asset ? (
                  <OptimizedImage
                    src={author?.image?.asset ? urlFor(author.image).url() : (aboutContent?.founderSection?.image ? urlFor(aboutContent.founderSection.image).url() : '/peter-pitcher.jpg')}
                    alt={author?.name || aboutContent?.founderSection?.name || "Peter Pitcher"}
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
                <Text color="muted">Biography loading...</Text>
              )}
              
              {aboutContent?.founderSection?.quote && (
                <Card variant="colored" background="cream" padding="medium">
                  <Text size="lg" className="italic text-charcoal">
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
          
          {aboutContent?.values ? (
            <Grid columns={{ default: 1, md: 2, lg: 4 }} gap="medium">
              {aboutContent.values.map((value, index) => (
                <Card key={index} variant="shadowed" background="white" padding="medium" className="text-center">
                  <div className="text-4xl mb-4">{value.icon}</div>
                  <Heading level={4} className="mb-2">{value.title}</Heading>
                  <Text size="sm" color="muted">{value.description}</Text>
                </Card>
              ))}
            </Grid>
          ) : (
            <Text color="muted" className="text-center">Values loading...</Text>
          )}
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
          
          {aboutFAQs.length > 0 && (
            <div className="max-w-3xl mx-auto">
              {aboutFAQs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          )}
        </AnimatedItem>
      </Section>

      {/* Partners */}
      <Section>
        <Partnerships 
          variant="full"
          partners={aboutContent?.partnerships}
        />
      </Section>

      {/* Visit CTA */}
      <Section background="teal">
        <AnimatedItem animation="scale" delay={500}>
          <div className="max-w-3xl mx-auto text-center">
            <Heading level={2} color="white" className="mb-6">
              {aboutContent?.visitCTA?.title || "Come See The Results Yourself"}
            </Heading>
            <Text size="lg" color="white" className="mb-8">
              {aboutContent?.visitCTA?.subtitle || "Visit us and see our AI strategies in action."}
            </Text>
            <Card variant="shadowed" className="inline-block max-w-md bg-black/20 backdrop-blur" padding="large">
              <Heading level={4} color="white" className="mb-2">{aboutContent?.visitCTA?.locationName || "The Anchor"}</Heading>
              {aboutContent?.visitCTA?.address ? (
                aboutContent.visitCTA.address.split('\n').map((line, i, arr) => (
                  <Text key={i} color="white" className={i === arr.length - 1 ? 'mb-4' : ''}>
                    {line}
                  </Text>
                ))
              ) : siteSettings?.contact?.address ? (
                siteSettings.contact.address.split('\n').map((line, i) => (
                  <Text key={i} color="white" className={i === siteSettings.contact.address.split('\n').length - 1 ? "mb-4" : ""}>
                    {line}
                  </Text>
                ))
              ) : (
                <Text color="white" className="mb-4">Address loading...</Text>
              )}
              <Link
                href={aboutContent?.visitCTA?.mapUrl || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-gray-200 transition-colors underline font-medium"
              >
                {aboutContent?.visitCTA?.ctaText || "Get Directions →"}
              </Link>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinksFromSanity
          clusterId="about"
          title="See How We Can Help"
          subtitle="Choose where to start based on your biggest challenge"
          variant="card"
          columns={{ default: 1, md: 3 }}
        />
      </Section>

      <CTASection
        title="Ready to Transform Your Pub?"
        subtitle="Let's chat about your challenges. No sales pitch, just one licensee to another."
      />
    </>
  );
}
import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CTASection from '@/components/CTASection';
import FAQItem from '@/components/FAQItem';
import ProblemCard from '@/components/ProblemCard';
import Text from '@/components/Text';
import FeatureList from '@/components/FeatureList';
import { generateMetadata as generateMeta } from '@/lib/metadata';
import { FAQSchema } from '@/components/StructuredData';
import { getLandingPageContent } from '@/lib/sanity-landing-pages';
import { notFound } from 'next/navigation';
import WhatsAppButton from '@/components/WhatsAppButton';

export async function generateMetadata(): Promise<Metadata> {
  const content = await getLandingPageContent('quiet-midweek-solutions');
  
  if (!content || !content.seo) {
    return generateMeta({
      title: 'Fix Dead Tuesday & Wednesday Nights - Proven Midweek Solutions',
      description: 'Transform your dead midweek nights into profit. From 5 tables to fully booked - proven strategies that work for UK pubs. Get the exact system we use at The Anchor.',
      path: '/quiet-midweek-solutions',
    });
  }

  return generateMeta({
    title: content.seo.metaTitle || content.title,
    description: content.seo.metaDescription || content.heroSection?.subtitle || 'Proven system to fill dead Tuesday and Wednesday nights with paying customers in 30 days.',
    path: '/quiet-midweek-solutions',
  });
}

export default async function QuietMidweekSolutions() {
  const content = await getLandingPageContent('quiet-midweek-solutions');

  if (!content) {
    notFound();
  }

  const {
    heroSection,
    strategies = [],
    timeline = [],
    successMetrics,
    faqs = []
  } = content;

  return (
    <>
      {heroSection && (
        <Hero
          title={heroSection.title}
          subtitle={heroSection.subtitle}
          breadcrumbs={[
            { label: 'Home', href: '/' },
            { label: 'Quiet Midweek Solutions' }
          ]}
        />
      )}

      {/* Problem Agitation */}
      <Section background="cream" padding="small">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={2} className="mb-8">
              Tuesday & Wednesday Nights Killing Your Profits?
            </Heading>
            
            <Grid columns={{ default: 1, md: 3 }} gap="medium" className="mb-8">
              <ProblemCard
                emoji="💀"
                problem="Ghost Town Tuesdays"
                solution="5 tables out of 30 occupied. Staff standing around. Losing £300+ per night."
                linkText="Fix Tuesdays"
                linkHref="/services#quick-wins"
              />
              <ProblemCard
                emoji="📉"
                problem="Wednesday Wasteland"
                solution="Kitchen prepped for 50, serving 12. Food waste mounting. Morale dropping."
                linkText="Fix Wednesdays"
                linkHref="/services#menu-makeover"
              />
              <ProblemCard
                emoji="🔄"
                problem="The Vicious Cycle"
                solution="Empty pub looks closed → People avoid it → Gets emptier → Death spiral."
                linkText="Break the cycle"
                linkHref="/services#done-for-you-marketing"
              />
            </Grid>

            <Card background="white" padding="large" variant="bordered" className="border-red-200">
              <Text size="lg" weight="semibold" className="text-red-600 mb-4">
                The Brutal Math: Every Dead Midweek Night Costs You £400-600
              </Text>
              <Text className="mb-6">
                That's £3,200-4,800 per month bleeding from your business. Meanwhile, your competition 
                is packed because they cracked the midweek code. Time to steal it back.
              </Text>
              <WhatsAppButton
                text="Fix my midweek crisis NOW"
                size="large"
                className="!bg-red-600 hover:!bg-red-700"
              />
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Our Results */}
      <Section background="teal-dark">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto text-center">
            <Heading level={2} color="white" className="mb-8">
              How We Fixed Our Own Dead Midweek Nights
            </Heading>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card background="white" padding="large">
                <Heading level={3} className="mb-4 text-teal">Tuesday Quiz Night</Heading>
                <div className="space-y-4">
                  <div>
                    <Text size="sm" className="text-charcoal/60">Before:</Text>
                    <Text weight="semibold">20-25 people, losing money</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-charcoal/60">After 30 days:</Text>
                    <Text weight="semibold" className="text-green-600">25-35 regulars, £800+ takings</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-charcoal/60">Secret:</Text>
                    <Text>WhatsApp quiz group + weekly reminders</Text>
                  </div>
                </div>
              </Card>

              <Card background="white" padding="large">
                <Heading level={3} className="mb-4 text-teal">Wednesday Steak Night</Heading>
                <div className="space-y-4">
                  <div>
                    <Text size="sm" className="text-charcoal/60">Before:</Text>
                    <Text weight="semibold">Random walk-ins only</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-charcoal/60">After 30 days:</Text>
                    <Text weight="semibold" className="text-green-600">30-40 covers, fully booked by Monday</Text>
                  </div>
                  <div>
                    <Text size="sm" className="text-charcoal/60">Secret:</Text>
                    <Text>£19.95 deal + social media countdown</Text>
                  </div>
                </div>
              </Card>
            </div>

            <Text size="lg" color="white" className="mb-6">
              We went from losing £2,400/month on quiet nights to making £3,200+ profit. 
              Here's the exact system we used...
            </Text>
          </div>
        </AnimatedItem>
      </Section>

      {/* The System */}
      {strategies.length > 0 && (
        <Section>
          <AnimatedItem animation="fade-in">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} align="center" className="mb-4">
                The Midweek Momentum System™
              </Heading>
              <Text size="lg" align="center" className="mb-12 text-charcoal/70">
                5 proven strategies that transform dead nights into your busiest (and most profitable) evenings
              </Text>

              <div className="space-y-8">
                {strategies.map((strategy, index) => (
                  <Card
                    key={strategy._key}
                    padding="large"
                    variant="bordered"
                    className="relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-20 h-20 bg-orange/10 rounded-br-full flex items-center justify-center">
                      <Text size="2xl" weight="bold" className="text-orange">
                        {index + 1}
                      </Text>
                    </div>
                    <div className="ml-16">
                      <Heading level={3} className="mb-4">
                        {strategy.title}
                      </Heading>
                      {strategy.description && (
                        <Text className="mb-4">
                          {strategy.description}
                        </Text>
                      )}
                      {strategy.points && strategy.points.length > 0 && (
                        <div className="bg-cream rounded-lg p-4">
                          <FeatureList
                            items={strategy.points}
                            icon="check"
                            iconColor="green"
                            spacing="tight"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </AnimatedItem>
        </Section>
      )}

      {/* Implementation Timeline */}
      {timeline.length > 0 && (
        <Section background="orange-light">
          <AnimatedItem animation="slide-up">
            <div className="max-w-4xl mx-auto">
              <Heading level={2} align="center" className="mb-12">
                Your 4-Week Midweek Transformation
              </Heading>

              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-orange/30 hidden md:block" />

                <div className="space-y-8">
                  {timeline.map((week, index) => (
                    <div key={week._key} className="relative flex gap-6 items-start">
                      <div className="flex-shrink-0 w-16 h-16 rounded-full bg-orange text-white flex items-center justify-center font-bold text-lg z-10">
                        W{index + 1}
                      </div>
                      <Card background="white" padding="large" className="flex-1">
                        <Heading level={3} className="mb-2">
                          {week.week}: {week.title}
                        </Heading>
                        {week.description && (
                          <Text className="mb-4 text-charcoal/80">
                            {week.description}
                          </Text>
                        )}
                        {week.actions && week.actions.length > 0 && (
                          <FeatureList
                            items={week.actions}
                            icon="arrow"
                            iconColor="orange"
                            spacing="tight"
                          />
                        )}
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              <Card background="teal" padding="large" className="mt-12 text-center">
                <Heading level={3} color="white" className="mb-4">
                  By Week 4: Your Midweek Nights Are Transformed
                </Heading>
                <Text color="white" className="mb-6">
                  Tuesday quiz packed. Wednesday offers selling out. Thursday becoming the new Friday. 
                  You're making £2,000+ more per week and working less.
                </Text>
                <WhatsAppButton
                  text="Start my midweek transformation"
                  size="large"
                  variant="secondary"
                />
              </Card>
            </div>
          </AnimatedItem>
        </Section>
      )}

      {/* Success Metrics */}
      {successMetrics && successMetrics.metrics && (
        <Section background="white">
          <AnimatedItem animation="fade-in">
            <div className="max-w-4xl mx-auto text-center">
              <Heading level={2} className="mb-12">
                {successMetrics.title || 'Average Results After 30 Days'}
              </Heading>

              <div className="grid md:grid-cols-4 gap-6 mb-12">
                {successMetrics.metrics.map((metric) => (
                  <Card key={metric._key} background="cream" padding="large">
                    <Text size="3xl" weight="bold" className="text-orange mb-2">
                      {metric.value}
                    </Text>
                    <Text weight="semibold" className="mb-1">
                      {metric.label}
                    </Text>
                    {metric.description && (
                      <Text size="sm" className="text-charcoal/60">
                        {metric.description}
                      </Text>
                    )}
                  </Card>
                ))}
              </div>

              <Text size="lg" className="mb-8">
                These aren't cherry-picked success stories. This is the average improvement 
                pubs see when they implement our Midweek Momentum System.
              </Text>
            </div>
          </AnimatedItem>
        </Section>
      )}

      {/* Event Ideas */}
      <Section background="cream">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Steal These Proven Midweek Events
            </Heading>

            <Grid columns={{ default: 1, md: 2 }} gap="large">
              <Card variant="bordered" padding="large">
                <Heading level={3} className="mb-6">
                  🎯 Tuesday Winners
                </Heading>
                <div className="space-y-4">
                  <div>
                    <Text weight="semibold">Quiz Night 2.0</Text>
                    <Text size="sm" className="text-charcoal/70">
                      Not your grandad's pub quiz. Fast-paced, phone-friendly, prizes that matter.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Taco Tuesday</Text>
                    <Text size="sm" className="text-charcoal/70">
                      £2 tacos, £5 margaritas. Simple menu, huge margins, Instagram gold.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Open Mic Night</Text>
                    <Text size="sm" className="text-charcoal/70">
                      Performers bring friends. Friends buy drinks. Everyone wins.
                    </Text>
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="large">
                <Heading level={3} className="mb-6">
                  🎯 Wednesday Winners
                </Heading>
                <div className="space-y-4">
                  <div>
                    <Text weight="semibold">Steak Night</Text>
                    <Text size="sm" className="text-charcoal/70">
                      Two steaks + bottle of wine for £39.95. Books out every week.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Wing Wednesday</Text>
                    <Text size="sm" className="text-charcoal/70">
                      50p wings. Yes, you lose money on wings. You make it on £6 pints.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Wine & Paint Night</Text>
                    <Text size="sm" className="text-charcoal/70">
                      £25 ticket includes materials + first drink. 30 guaranteed customers.
                    </Text>
                  </div>
                </div>
              </Card>

              <Card variant="bordered" padding="large">
                <Heading level={3} className="mb-6">
                  🎯 Thursday Winners
                </Heading>
                <div className="space-y-4">
                  <div>
                    <Text weight="semibold">Curry Club</Text>
                    <Text size="sm" className="text-charcoal/70">
                      £12.95 curry + rice + naan + pint. Batch cook, minimal waste, packed tables.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Speed Dating</Text>
                    <Text size="sm" className="text-charcoal/70">
                      Partner with dating company. They bring 40+ people. You provide drinks.
                    </Text>
                  </div>
                  <div>
                    <Text weight="semibold">Cocktail Masterclass</Text>
                    <Text size="sm" className="text-charcoal/70">
                      £30 per person. Teach 3 cocktails. They drink them all. High margins.
                    </Text>
                  </div>
                </div>
              </Card>

              <Card background="orange-light" padding="large">
                <Heading level={3} className="mb-4">
                  🚀 The Secret Sauce
                </Heading>
                <Text className="mb-4">
                  It's not about the event - it's about the promotion. We'll show you exactly 
                  how to fill ANY midweek event using our proven social media templates, 
                  WhatsApp broadcasts, and community engagement tactics.
                </Text>
                <WhatsAppButton
                  text="Get the promotion templates"
                  fullWidth
                />
              </Card>
            </Grid>
          </div>
        </AnimatedItem>
      </Section>

      {/* FAQ Section */}
      {faqs.length > 0 && (
        <Section>
          <AnimatedItem animation="fade-in">
            <div className="max-w-3xl mx-auto">
              <Heading level={2} align="center" className="mb-12">
                Common Questions About Fixing Quiet Midweek Nights
              </Heading>
              
              <div className="space-y-6">
                {faqs.map((faq) => (
                  <FAQItem
                    key={faq._key}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </AnimatedItem>
        </Section>
      )}

      {/* Investment Section */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Card background="gradient" padding="large" className="text-center">
              <Heading level={2} className="mb-8">
                Transform Your Midweek Nights in 30 Days
              </Heading>

              <Grid columns={{ default: 1, md: 3 }} gap="medium" className="mb-8">
                <div>
                  <div className="text-4xl mb-2">📅</div>
                  <Heading level={4} className="mb-2">Week 1-2</Heading>
                  <Text size="sm">
                    Launch first events, see immediate increase in Tuesday/Wednesday covers
                  </Text>
                </div>
                <div>
                  <div className="text-4xl mb-2">📈</div>
                  <Heading level={4} className="mb-2">Week 3-4</Heading>
                  <Text size="sm">
                    Events gaining momentum, regulars forming, bookings coming in advance
                  </Text>
                </div>
                <div>
                  <div className="text-4xl mb-2">💰</div>
                  <Heading level={4} className="mb-2">Month 2+</Heading>
                  <Text size="sm">
                    Midweek as busy as weekends, £8,000+ extra monthly revenue locked in
                  </Text>
                </div>
              </Grid>

              <div className="bg-white rounded-lg p-6 mb-6">
                <Text size="2xl" weight="bold" className="text-orange mb-2">
                  Investment: £62.50/hour + VAT
                </Text>
                <Text className="text-charcoal/70">
                  Most pubs recover this in their first successful midweek event
                </Text>
              </div>

              <Text weight="semibold" className="mb-6">
                30-Day Money-Back Guarantee: If your midweek nights aren't busier, you pay nothing
              </Text>

              <WhatsAppButton
                text="Fix my quiet midweek nights"
                size="large"
              />
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Urgency Section */}
      <Section background="red-50">
        <div className="max-w-4xl mx-auto text-center">
          <Heading level={2} className="mb-6 text-red-700">
            ⚠️ Every Dead Tuesday Costs You £400. Every Dead Wednesday Another £400.
          </Heading>
          <Text size="lg" className="mb-8">
            That's £6,400 per month vanishing while your competition gets busier. 
            In 3 months, you've lost £19,200. In 6 months... you might not have a pub.
          </Text>
          <Card background="white" padding="large">
            <Heading level={3} className="mb-4">
              Stop The Bleeding Today
            </Heading>
            <Text className="mb-6">
              Next Tuesday could have 40 people instead of 5. Next Wednesday could be fully booked. 
              But only if you act now. Limited spots available - I can only properly support 5 pubs at once.
            </Text>
            <WhatsAppButton
              text="URGENT: Save my midweek nights"
              size="large"
              className="!bg-red-600 hover:!bg-red-700"
            />
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        title="Your Midweek Nights Are 30 Days From Packed"
        subtitle="Join the smart pub owners who turned their quietest nights into their most profitable. Get the exact system, templates, and support that transformed The Anchor's dead midweek into £3,200+ monthly profit."
        buttonText="Transform My Midweek Nights Now"
        whatsappMessage="Peter, my Tuesday and Wednesday nights are dead. I need the Midweek Momentum System."
      />

      {/* Structured Data */}
      {faqs.length > 0 && <FAQSchema faqs={faqs} />}
    </>
  );
}
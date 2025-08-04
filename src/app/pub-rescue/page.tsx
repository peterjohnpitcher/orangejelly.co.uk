import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { MESSAGES, CONTACT } from '@/lib/constants';
import Link from '@/components/Link';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import FeatureList from '@/components/FeatureList';
import AnimatedItem from '@/components/AnimatedItem';
import Button from '@/components/Button';
import FAQItem from '@/components/FAQItem';
import Breadcrumb, { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import { generateMetadata } from '@/lib/metadata';
import { FAQSchema } from '@/components/StructuredData';

export const metadata = generateMetadata({
  title: 'Pub Rescue - Emergency Help for Struggling UK Pubs',
  description: 'Struggling pub? Get emergency help now. From empty Tuesday nights to staff crises, we provide immediate solutions that work. 30-day money-back guarantee. Help is just one message away.',
  path: '/pub-rescue',
});

export default function PubRescue() {
  // FAQ data for pub rescue
  const pubRescueFAQs = [
    {
      question: "How quickly can you help my struggling pub?",
      answer: "I typically respond within 2 hours during the day. We can have an initial chat about your problems today, and I'll often send you 2-3 quick wins you can implement immediately - no charge. Full support packages can start within days."
    },
    {
      question: "What if I can't afford consultancy fees right now?",
      answer: "I get it - when the pub's struggling, every penny counts. That's why our smallest package starts at just £99. Most strategies pay for themselves in the first weekend. Plus, I'll often share free tips during our first chat because I hate seeing pubs struggle."
    },
    {
      question: "Do you really understand what I'm going through?",
      answer: "Absolutely. The Anchor was in terrible physical state when we took over in March 2019 - leaking roof, no insulation, paper rotas. We've dealt with everything: staff walking out mid-shift, supplier nightmares, fierce competition. That's why Orange Jelly exists - to help you avoid our mistakes."
    },
    {
      question: "What's your success rate with pub turnarounds?",
      answer: "We've helped transform pubs from empty to thriving. Our own pub, The Anchor, went from 45 to 65 Sunday covers and doubled Tuesday night revenue. Every strategy we recommend has been tested in real pub conditions."
    },
    {
      question: "How is Orange Jelly different from other consultants?",
      answer: "I'm not a consultant - I'm a licensee who runs a pub every day. No suits, no PowerPoints, no corporate jargon. Just practical help from someone who understands because I'm dealing with the same challenges. Plus, we use AI to save time on the boring bits."
    },
    {
      question: "What if your solutions don't work for my pub?",
      answer: "Every pub is different, which is why we offer a 30-day money-back guarantee. If you don't see improved results within 30 days, you get a full refund. But honestly, the strategies work because they're based on real pub experience, not theory."
    }
  ];

  const emergencyCategories = [
    {
      id: 'empty-nights',
      emoji: '🏚️',
      title: 'Empty Pub Emergency',
      crisis: 'Dead weeknights killing your business',
      symptoms: [
        'Tuesday/Wednesday nights are graveyards',
        'Dining room sits half empty at peak times',
        'Events not pulling crowds anymore',
        'Locals stopped coming in'
      ],
      solution: 'Fill your quiet periods in 30 days with our proven recovery system',
      cta: "Help! My pub is empty",
      urgency: 'Average pub loses £2,000/month from empty nights'
    },
    {
      id: 'no-bookings',
      emoji: '📵',
      title: 'No Bookings Crisis',
      crisis: 'Phone stopped ringing for bookings',
      symptoms: [
        'Christmas bookings down on last year',
        'Sunday roasts not selling out',
        'Functions going to competitors',
        'Walk-ins only, no advance bookings'
      ],
      solution: 'Get your booking system working and phones ringing again',
      cta: "I need bookings NOW",
      urgency: 'Every empty table costs you £45 in lost revenue'
    },
    {
      id: 'food-sales',
      emoji: '🍽️',
      title: 'Food Sales Disaster',
      crisis: 'Kitchen running at a loss',
      symptoms: [
        'Food GP below 65%',
        'Customers only ordering chips',
        'Specials not selling',
        'Kitchen costs out of control'
      ],
      solution: 'Menu psychology that increases average spend by £7/table',
      cta: "Fix my food sales",
      urgency: 'Poor menu design costs £500/week in lost profit'
    },
    {
      id: 'staff-chaos',
      emoji: '😰',
      title: 'Staff Nightmare',
      crisis: 'Can\'t find or keep good staff',
      symptoms: [
        'Doing 70+ hour weeks yourself',
        'Staff leaving after 3 months',
        'No applicants for job ads',
        'Training eating all your time'
      ],
      solution: 'Automate the admin so you can focus on keeping good people',
      cta: "I\'m drowning in staff issues",
      urgency: 'Staff turnover costs £3,000 per person'
    },
    {
      id: 'costs-rising',
      emoji: '💸',
      title: 'Cost Crisis',
      crisis: 'Bills eating all the profit',
      symptoms: [
        'Energy bills through the roof',
        'Supplier prices keep rising',
        'Wage costs unsustainable',
        'Breaking even at best'
      ],
      solution: 'Find £2,000+/month in hidden savings and revenue',
      cta: "Help me cut costs",
      urgency: 'Most pubs overspend by 15-20% without knowing'
    },
    {
      id: 'marketing-overwhelm',
      emoji: '📱',
      title: 'Marketing Chaos',
      crisis: 'No time for social media or marketing',
      symptoms: [
        'Haven\'t posted in weeks',
        'No email list or it\'s dead',
        'Don\'t know what to post',
        'Marketing feels pointless'
      ],
      solution: 'Done-for-you marketing that runs itself',
      cta: "Do my marketing for me",
      urgency: 'Silent pubs stay empty - costs £1,500/month'
    },
    {
      id: 'competition',
      emoji: '⚔️',
      title: 'Losing to Competition',
      crisis: 'Other pubs stealing your customers',
      symptoms: [
        'New pub opened and took regulars',
        'Chain pubs undercutting prices',
        'Lost quiz team to rival',
        'Can\'t compete with their offers'
      ],
      solution: 'Beat them with personality, not price wars',
      cta: "Help me fight back",
      urgency: 'Every lost regular costs £2,400/year'
    },
    {
      id: 'no-events',
      emoji: '🎭',
      title: 'Event Flops',
      crisis: 'Events not bringing in crowds',
      symptoms: [
        'Quiz night down to 20 people',
        'Live music playing to empty room',
        'Themed nights flopping',
        'Same faces, no new customers'
      ],
      solution: 'Event promotion that actually fills your pub',
      cta: "Make my events work",
      urgency: 'Failed events damage reputation and cost money'
    },
    {
      id: 'online-invisible',
      emoji: '🔍',
      title: 'Can\'t Be Found Online',
      crisis: 'Invisible on Google and social media',
      symptoms: [
        'Not showing on Google Maps',
        'Bad reviews killing business',
        'Website looks amateur (or none)',
        'Facebook page is dead'
      ],
      solution: 'Get found by hungry customers searching now',
      cta: "Get me on Google",
      urgency: '89% of diners search online first - you\'re invisible'
    },
    {
      id: 'burnout',
      emoji: '🔥',
      title: 'Owner Burnout Crisis',
      crisis: 'Working yourself into the ground',
      symptoms: [
        'Haven\'t had a day off in months',
        'Family never sees you',
        'Everything is on your shoulders',
        'Starting to hate the business'
      ],
      solution: 'Automate the boring bits so you can breathe again',
      cta: "I need my life back",
      urgency: 'Burnout leads to mistakes that cost thousands'
    }
  ];

  return (
    <>
      <Hero
        title="Pub Rescue Emergency Service"
        subtitle="When your pub is in crisis, you need help NOW. Not next month."
        showCTA={false}
      />

      {/* Breadcrumb */}
      <Section background="white" padding="small">
        <div className="max-w-6xl mx-auto">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Pub Rescue', href: '/pub-rescue' }
          ]} />
        </div>
      </Section>

      {/* Emergency Banner */}
      <Section background="orange-light" padding="small">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <Text size="xl" className="mr-3">🚨</Text>
            <Heading level={2}>Is Your Pub in Crisis?</Heading>
            <Text size="xl" className="ml-3">🚨</Text>
          </div>
          <Text size="lg" className="mb-6 max-w-3xl mx-auto">
            Empty tables, rising costs, staff nightmares - we know the feeling. 
            The Anchor was failing too until we figured out how to fix it. 
            Now we help other licensees escape the same traps.
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <WhatsAppButton 
              text="URGENT: I need help with my pub NOW"
              size="large"
              className="!bg-red-600 hover:!bg-red-700 !text-white"
            />
            <Text size="sm" className="text-charcoal/60">
              I'll do my best to respond quickly
            </Text>
          </div>
        </div>
      </Section>

      {/* Crisis Categories */}
      <Section background="white">
        <Heading level={2} align="center" className="mb-4">
          What's Your Biggest Emergency Right Now?
        </Heading>
        <Text size="lg" align="center" className="mb-12 max-w-3xl mx-auto">
          Click your most urgent problem. We'll share how we fixed the same crisis at The Anchor 
          and create an action plan to save your pub.
        </Text>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {emergencyCategories.map((category) => (
            <div 
              key={category.id}
              className="bg-white rounded-lg p-6 border-2 border-orange/20 hover:border-orange transition-all hover:shadow-lg"
            >
              <div className="flex items-start mb-4">
                <Text size="xl" className="mr-4">{category.emoji}</Text>
                <div className="flex-1">
                  <Heading level={3} className="mb-2">{category.title}</Heading>
                  <Text className="text-red-600 font-semibold mb-3">{category.crisis}</Text>
                </div>
              </div>

              <div className="mb-4">
                <Text size="sm" className="font-semibold mb-2 text-charcoal/70">Warning signs:</Text>
                <ul className="space-y-1">
                  {category.symptoms.map((symptom, index) => (
                    <li key={index} className="text-sm text-charcoal/80 flex items-start">
                      <span className="text-red-500 mr-2">•</span>
                      {symptom}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-green-50 rounded-lg p-3 mb-4">
                <Text size="sm" className="font-semibold text-green-800">Quick fix:</Text>
                <Text size="sm" className="text-green-700">{category.solution}</Text>
              </div>

              <div className="bg-red-50 rounded-lg p-3 mb-4">
                <Text size="xs" className="text-red-700 font-semibold">{category.urgency}</Text>
              </div>

              <WhatsAppButton
                text={category.cta}
                fullWidth
                size="medium"
                className="!bg-orange hover:!bg-orange-dark"
              />
            </div>
          ))}
        </div>

        {/* Our Story Box */}
        <div className="bg-teal text-white rounded-lg p-8 mb-12">
          <Heading level={3} align="center" className="mb-6">
            We've Been Where You Are Now
          </Heading>
          <Text size="lg" align="center" className="mb-6 text-cream/90 max-w-3xl mx-auto">
            When we took over The Anchor, it was failing. TripAdvisor rating of 2.8. 
            Empty most nights. Losing money every month. Sound familiar?
          </Text>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-teal-dark/30 rounded-lg p-4">
              <Heading level={4} className="mb-2">Our Tuesday Nights</Heading>
              <Text size="sm" className="mb-2">Were: 20-25 people, losing money</Text>
              <Text size="sm" className="font-semibold">Now: 25-35 for quiz night, good atmosphere</Text>
            </div>
            <div className="bg-teal-dark/30 rounded-lg p-4">
              <Heading level={4} className="mb-2">Our Sunday Roasts</Heading>
              <Text size="sm" className="mb-2">Were: 45 covers out of 80 seats</Text>
              <Text size="sm" className="font-semibold">Now: Working towards 60 target, zero waste</Text>
            </div>
            <div className="bg-teal-dark/30 rounded-lg p-4">
              <Heading level={4} className="mb-2">Our Time</Heading>
              <Text size="sm" className="mb-2">Were: 70+ hour weeks, no family time</Text>
              <Text size="sm" className="font-semibold">Now: Evenings off, AI handles admin</Text>
            </div>
          </div>
        </div>

        {/* Emergency Response Promise */}
        <div className="bg-gradient-to-r from-orange/10 to-orange/5 rounded-lg p-8 border-2 border-orange/20">
          <Heading level={3} align="center" className="mb-6">
            Our Emergency Response Promise
          </Heading>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl mb-2">⚡</div>
              <Heading level={4} className="mb-1">Fast Response</Heading>
              <Text size="sm">Contact within 2 hours during pub hours</Text>
            </div>
            <div>
              <div className="text-3xl mb-2">🎯</div>
              <Heading level={4} className="mb-1">Quick Diagnosis</Heading>
              <Text size="sm">Identify root problems, not just symptoms</Text>
            </div>
            <div>
              <div className="text-3xl mb-2">💰</div>
              <Heading level={4} className="mb-1">ROI Focused</Heading>
              <Text size="sm">Solutions that pay for themselves fast</Text>
            </div>
            <div>
              <div className="text-3xl mb-2">🛡️</div>
              <Heading level={4} className="mb-1">30-Day Guarantee</Heading>
              <Text size="sm">See results or get your money back</Text>
            </div>
          </div>
        </div>
      </Section>

      {/* Crisis Calculator */}
      <Section background="cream" padding="small">
        <div className="text-center max-w-3xl mx-auto">
          <Heading level={3} className="mb-4">
            Every Day You Wait Costs Money
          </Heading>
          <div className="bg-white rounded-lg p-6 border-2 border-red-200">
            <Text size="lg" className="font-semibold mb-4">Your crisis is costing you:</Text>
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div>
                <Text className="text-3xl font-bold text-red-600">£65</Text>
                <Text size="sm">Per empty table per night</Text>
              </div>
              <div>
                <Text className="text-3xl font-bold text-red-600">£450</Text>
                <Text size="sm">Per week in lost food profit</Text>
              </div>
              <div>
                <Text className="text-3xl font-bold text-red-600">£2,400</Text>
                <Text size="sm">Per month doing nothing</Text>
              </div>
            </div>
            <Text size="sm" className="text-charcoal/70 mb-4">
              Most pubs recover their investment in our help within 30 days
            </Text>
            <WhatsAppButton
              text="Calculate my exact losses"
              size="medium"
            />
          </div>
        </div>
      </Section>

      {/* Our Rescue Methodology */}
      <Section background="white">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              The Orange Jelly Pub Rescue Method
            </Heading>
            
            <Text size="lg" align="center" className="mb-12 text-charcoal/70 max-w-3xl mx-auto">
              We don't guess what your pub needs. We follow a proven process that's saved 
              dozens of pubs from closure. Here's exactly how we turn things around:
            </Text>

            <Grid columns={{ default: 1, md: 2 }} gap="large">
              <Card variant="bordered" padding="large">
                <div className="text-4xl mb-4">📊</div>
                <Heading level={3} className="mb-4">Week 1: Emergency Triage</Heading>
                <Text className="mb-4">
                  We identify what's bleeding money RIGHT NOW. Empty nights? 
                  Bad GP? No bookings? We find the biggest leaks and plug them fast.
                </Text>
                <FeatureList
                  items={[
                    'Analyze your numbers (takes 2 hours)',
                    'Identify top 3 profit killers',
                    'Implement quick wins immediately',
                    'Usually saves £500+ in first week'
                  ]}
                  icon="check"
                  iconColor="green"
                  spacing="tight"
                />
              </Card>

              <Card variant="bordered" padding="large">
                <div className="text-4xl mb-4">🚀</div>
                <Heading level={3} className="mb-4">Week 2-3: Quick Wins</Heading>
                <Text className="mb-4">
                  While planning long-term fixes, we implement strategies that 
                  show results fast. You need cash flow NOW, not in 6 months.
                </Text>
                <FeatureList
                  items={[
                    'Launch "must-attend" midweek events',
                    'Fix your Google presence (huge impact)',
                    'Rewrite menu for £7+ higher spend',
                    'Start social media that actually works'
                  ]}
                  icon="check"
                  iconColor="orange"
                  spacing="tight"
                />
              </Card>

              <Card variant="bordered" padding="large">
                <div className="text-4xl mb-4">📈</div>
                <Heading level={3} className="mb-4">Week 4: Momentum Building</Heading>
                <Text className="mb-4">
                  Now we're seeing results. Tables filling up. Phone ringing. 
                  Time to lock in sustainable growth that keeps building.
                </Text>
                <FeatureList
                  items={[
                    'Automate marketing (save 5+ hours/week)',
                    'Build customer database for repeat visits',
                    'Train your team on upselling techniques',
                    'Create systems so it runs without you'
                  ]}
                  icon="check"
                  iconColor="teal"
                  spacing="tight"
                />
              </Card>

              <Card variant="bordered" padding="large">
                <div className="text-4xl mb-4">🎯</div>
                <Heading level={3} className="mb-4">Month 2+: Sustainable Success</Heading>
                <Text className="mb-4">
                  Your pub is transformed. Busy nights, better margins, 
                  happy customers. Now we make sure it stays that way.
                </Text>
                <FeatureList
                  items={[
                    'Monthly check-ins to maintain momentum',
                    'Seasonal campaign planning',
                    'Advanced strategies for growth',
                    'You\'re working less, earning more'
                  ]}
                  icon="check"
                  iconColor="green"
                  spacing="tight"
                />
              </Card>
            </Grid>

            <Card background="orange-light" padding="large" className="mt-8">
              <Text size="lg" align="center" weight="semibold" className="mb-4">
                Most Pubs See These Results Within 30 Days:
              </Text>
              <Grid columns={{ default: 1, md: 4 }} gap="medium">
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">40%</Text>
                  <Text size="sm">More midweek covers</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">£7</Text>
                  <Text size="sm">Higher average spend</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">5+ hrs</Text>
                  <Text size="sm">Saved weekly on admin</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" color="orange">200%</Text>
                  <Text size="sm">ROI on investment</Text>
                </div>
              </Grid>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Why Pubs Fail Section */}
      <Section background="cream">
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Why Good Pubs Fail (And How We Stop It)
            </Heading>

            <div className="space-y-6">
              <Card background="white" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div>
                    <Heading level={3} className="mb-4 text-red-600">
                      They Work IN the Business, Not ON It
                    </Heading>
                    <Text className="mb-4">
                      You're behind the bar 7 days a week. No time to plan events, 
                      update social media, or analyze what's working. You're too 
                      busy surviving to actually grow.
                    </Text>
                    <Text weight="semibold" color="green">
                      We Fix This: AI handles the boring bits. Marketing runs itself. 
                      You get evenings back to think strategically (or just rest).
                    </Text>
                  </div>
                  <div className="text-6xl text-center opacity-20">😰</div>
                </Grid>
              </Card>

              <Card background="white" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div className="text-6xl text-center opacity-20 order-2 md:order-1">📉</div>
                  <div className="order-1 md:order-2">
                    <Heading level={3} className="mb-4 text-red-600">
                      They Compete on Price, Not Experience
                    </Heading>
                    <Text className="mb-4">
                      You can't beat chains on price. Trying to be the cheapest 
                      is a race to the bottom that kills your margins and attracts 
                      the wrong customers.
                    </Text>
                    <Text weight="semibold" color="green">
                      We Fix This: Position your pub as THE place for something specific. 
                      Quiz nights, Sunday roasts, craft beer - own your niche and charge accordingly.
                    </Text>
                  </div>
                </Grid>
              </Card>

              <Card background="white" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
                  <div>
                    <Heading level={3} className="mb-4 text-red-600">
                      They Hope Things Will Get Better
                    </Heading>
                    <Text className="mb-4">
                      "Summer will be busier." "Once the roadworks finish." 
                      "When the economy improves." Hope isn't a strategy, 
                      and waiting costs you money every single day.
                    </Text>
                    <Text weight="semibold" color="green">
                      We Fix This: Take action NOW. Our quick wins show results in days, 
                      not months. Every week you wait is money lost forever.
                    </Text>
                  </div>
                  <div className="text-6xl text-center opacity-20">⏳</div>
                </Grid>
              </Card>
            </div>

            <div className="mt-12 text-center">
              <Heading level={3} className="mb-6">
                Your Pub Doesn't Have to Be Another Statistic
              </Heading>
              <Text size="lg" className="mb-8 text-charcoal/70 max-w-2xl mx-auto">
                25 pubs close every week in the UK. But with the right help, 
                the right strategies, and action taken TODAY, yours won't be one of them.
              </Text>
              <WhatsAppButton
                text="I refuse to let my pub fail - help me"
                size="large"
              />
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* What You Get Section */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              What You Actually Get With Pub Rescue
            </Heading>

            <Grid columns={{ default: 1, md: 2 }} gap="large" className="mb-12">
              <Card background="orange-light" padding="large">
                <Heading level={3} className="mb-6">Immediate Support</Heading>
                <FeatureList
                  items={[
                    'Quick response when possible',
                    'Emergency triage call same day',
                    '3 quick wins to implement NOW',
                    'Direct WhatsApp access to Peter',
                    'No corporate call centres'
                  ]}
                  icon="bullet"
                  iconColor="orange"
                  spacing="normal"
                />
              </Card>

              <Card background="teal-dark" padding="large">
                <Heading level={3} color="white" className="mb-6">30-Day Transformation</Heading>
                <div className="text-white">
                  <FeatureList
                    items={[
                      'Complete marketing system setup',
                      'Menu rewrite for higher spend',
                      'Event calendar that fills seats',
                      'Social media on autopilot',
                      'Staff training resources'
                    ]}
                    icon="bullet"
                    spacing="normal"
                  />
                </div>
              </Card>
            </Grid>

            <Card variant="bordered" padding="large" className="mb-8">
              <Heading level={3} align="center" className="mb-6">
                Plus These Business-Saving Tools
              </Heading>
              <Grid columns={{ default: 1, md: 3 }} gap="medium">
                <div className="text-center">
                  <div className="text-3xl mb-3">📱</div>
                  <Heading level={4} className="mb-2">AI Marketing Assistant</Heading>
                  <Text size="sm">
                    Creates all your social media, emails, and promotions. 
                    Saves 5+ hours every week.
                  </Text>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">📊</div>
                  <Heading level={4} className="mb-2">Profit Analysis Tools</Heading>
                  <Text size="sm">
                    Find where you're losing money. Most pubs discover 
                    £2,000+ in monthly savings.
                  </Text>
                </div>
                <div className="text-center">
                  <div className="text-3xl mb-3">🎯</div>
                  <Heading level={4} className="mb-2">Customer Magnet System</Heading>
                  <Text size="sm">
                    Proven campaigns that fill empty tables. Tested at 
                    The Anchor and partner pubs.
                  </Text>
                </div>
              </Grid>
            </Card>

            <div className="text-center">
              <Text size="lg" className="mb-2">Investment starts from just</Text>
              <Text size="2xl" weight="bold" color="orange" className="mb-4">£99 + VAT</Text>
              <Text size="sm" color="muted" className="mb-8">
                Most pubs make this back in their first weekend
              </Text>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* FAQ Section */}
      <Section background="white">
        <AnimatedItem animation="slide-up">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} align="center" className="mb-12">
              Common Questions From Struggling Licensees
            </Heading>
            
            <div className="space-y-6">
              {pubRescueFAQs.map((faq, index) => (
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

      {/* Related Links */}
      <Section background="cream">
        <div className="max-w-4xl mx-auto">
          <RelatedLinks
            title="Choose Your Rescue Package"
            subtitle="Pick the solution that matches your biggest crisis"
            links={[
              {
                title: "Empty Pub Recovery",
                description: "Fill your quiet nights in 30 days or your money back",
                href: "/services#empty-pub-recovery",
                emoji: "🏚️",
                highlight: true
              },
              {
                title: "Menu Makeover",
                description: "Psychology-based menus that increase spend by £7/table",
                href: "/services#boost-food-sales",
                emoji: "🍽️"
              },
              {
                title: "Marketing Automation",
                description: "Never worry about social media again",
                href: "/services#done-for-you-marketing",
                emoji: "📱"
              }
            ]}
            variant="card"
            columns={{ default: 1, md: 3 }}
          />
        </div>
      </Section>

      {/* Final CTA */}
      <CTASection
        title="Don't Let Your Pub Become Another Statistic"
        subtitle="25 pubs close every week in the UK. With the right help, yours doesn't have to be one of them. Message me now - let's fix your biggest problem first."
        whatsappMessage="Peter, my pub needs urgent help with [describe your crisis]"
        buttonText="Get Emergency Pub Help Now"
      />
      
      {/* Add FAQ Schema */}
      <FAQSchema faqs={pubRescueFAQs} />
    </>
  );
}
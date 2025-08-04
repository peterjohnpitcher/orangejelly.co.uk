import Image from 'next/image';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import WhatsAppButton from '@/components/WhatsAppButton';
import FAQItem from '@/components/FAQItem';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import FeatureList from '@/components/FeatureList';
import AvailabilityStatus from '@/components/AvailabilityStatus';
import Breadcrumb, { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import Text from '@/components/Text';
import { CONTACT, URLS, MESSAGES } from '@/lib/constants';
import { generateMetadata } from '@/lib/metadata';
import { FAQSchema } from '@/components/StructuredData';

export const metadata = generateMetadata({
  title: 'Contact Orange Jelly | Get in Touch with Peter',
  description: 'How do I contact Orange Jelly? Speak directly with Peter Pitcher about AI tools for your pub. WhatsApp preferred, or call 07941 266538. Visit us at The Anchor pub in Stanwell. No contact forms, just real conversation.',
  path: '/contact',
});

export default function Contact() {
  // Comprehensive FAQ data for contact page - problem-focused
  const contactFAQs = [
    {
      question: "I'm losing money every day - how quickly can you help?",
      answer: "I understand the urgency - every day matters when you're bleeding money. WhatsApp me right now and I'll respond within hours (or after service if I'm behind the bar). We can often implement quick wins within days that start stemming losses immediately. Our Empty Pub Recovery Package shows results within 7-14 days."
    },
    {
      question: "My pub is in crisis - can we talk today?",
      answer: "Absolutely. WhatsApp me at 07941 266538 - I check messages constantly. If you need immediate help, mark your message as URGENT and I'll prioritise it. I've been where you are, and I know that feeling of desperation. Let's talk solutions today."
    },
    {
      question: "I messaged but haven't heard back - did you get it?",
      answer: "I personally read every message! If I haven't replied within 4 hours, I'm likely in service. I always respond by end of day. If it's been longer, please message again - technology sometimes fails. Never worry about 'bothering' me - helping pubs is what I do."
    },
    {
      question: "What's the best way to contact Orange Jelly for urgent help?",
      answer: "WhatsApp is fastest - 07941 266538. I see messages immediately even during service. For urgent situations, start your message with URGENT. Phone calls work too, but if I'm serving, WhatsApp ensures I see your message and can respond as soon as I'm free."
    },
    {
      question: "Can I speak to someone who actually understands pub problems?",
      answer: "That's exactly what you get! I'm Peter, I run The Anchor pub. When you message, you're talking to someone who's dealt with staff walking out mid-shift, empty Tuesday nights, and supplier nightmares. No call centre, no junior staff - just one licensee helping another."
    },
    {
      question: "I work crazy hours - when can I actually reach you?",
      answer: "That's pub life! Message me anytime - 3am stocktake, 6am delivery, Sunday afternoon crisis. I get it. WhatsApp me whenever suits you. I might be serving too, but I always respond within hours. We'll find a time to talk properly that works for both of us."
    },
    {
      question: "I hate pushy sales calls - will you pressure me?",
      answer: "Never. I'm a licensee, not a salesperson. When we chat, I'll listen to your problems and share what worked for us. If I can help, great. If not, I might know someone who can. No scripts, no pressure - just honest conversation about saving your pub."
    },
    {
      question: "Can I visit before committing to anything?",
      answer: "Please do! Come to The Anchor and see everything in action. Watch how we use the tools, chat with Billy, see our results firsthand. First pint's on me. Seeing is believing - I'd rather show you than tell you. We're in Stanwell Moor, TW19 6AQ."
    },
    {
      question: "What if I need help outside normal hours?",
      answer: "'Normal hours' don't exist in hospitality! Message me whenever you need help. Having a 3am panic about tomorrow's event? Send that message. Sunday staff crisis? I'm here. I run a pub too - I know problems don't wait for business hours."
    },
    {
      question: "I'm not in your area - can you still help?",
      answer: "Absolutely! We help pubs across the UK. Marketing, menu design, business analysis, and AI training all work remotely. We use video calls, screen sharing, and good old phone calls. Distance isn't a barrier - I'm helping pubs from Cornwall to Scotland."
    },
    {
      question: "What if I just need 10 minutes of advice?",
      answer: "That's fine! Quick questions are welcome. Sometimes 10 minutes of good advice can save hours of stress. Message me your question - if it's genuinely quick, I'll help right away. If it needs more time, we'll arrange a proper chat."
    },
    {
      question: "How do I know you'll actually respond?",
      answer: "Because I'm not a big company - I'm one person who genuinely cares about helping pubs survive. Every message comes directly to my phone. I've been ghosted by suppliers and consultants too - I won't do that to you. You'll always get a response, even if it's just to say I'm in service and will call back later."
    }
  ];

  // Generate comprehensive schema for Contact page
  const contactSchema = (() => {

    const contactPageSchema = {
      "@type": "ContactPage",
      "name": "Contact Orange Jelly",
      "description": "Get in touch with Peter Pitcher at Orange Jelly. WhatsApp, phone, or visit The Anchor pub.",
      "url": "https://orangejelly.co.uk/contact",
      "mainEntity": {
        "@id": "https://orangejelly.co.uk/#organization"
      }
    };

    const orangeJellySchema = {
      "@type": "ProfessionalService",
      "@id": "https://orangejelly.co.uk/#organization",
      "name": "Orange Jelly Limited",
      "telephone": "+44-7941-266538",
      "email": "peter@orangejelly.co.uk",
      "url": "https://orangejelly.co.uk",
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          "opens": "09:00",
          "closes": "16:00",
          "description": "Best times to call - outside pub service hours"
        }
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44-7941-266538",
        "contactType": "Customer Service",
        "availableLanguage": "English",
        "contactOption": ["WhatsApp preferred", "TollFree"],
        "areaServed": "GB"
      }
    };

    const theAnchorSchema = {
      "@type": "Restaurant",
      "@id": "https://the-anchor.pub/#restaurant",
      "name": "The Anchor",
      "url": "https://the-anchor.pub",
      "telephone": "+44-7990-587315",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Horton Road",
        "addressLocality": "Stanwell Moor Village",
        "addressRegion": "Staines",
        "postalCode": "TW19 6AQ",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "51.4589",
        "longitude": "-0.5096"
      },
      "openingHoursSpecification": [
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
          "opens": "16:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Friday",
          "opens": "16:00",
          "closes": "22:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Saturday",
          "opens": "12:00",
          "closes": "00:00"
        },
        {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": "Sunday",
          "opens": "12:00",
          "closes": "22:00"
        }
      ],
      "hasMap": "https://maps.google.com/?q=The+Anchor+Stanwell+Moor",
      "servesCuisine": ["British", "Pub Food"],
      "priceRange": "££"
    };

    return {
      "@context": "https://schema.org",
      "@graph": [contactPageSchema, orangeJellySchema, theAnchorSchema]
    };
  })();


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <FAQSchema faqs={contactFAQs} />
      <Hero
        title="Let's Have a Chat"
        subtitle="No contact forms, no fuss. Just real conversation."
        showCTA={false}
      />

      <Section background="white">
        <div className="max-w-6xl mx-auto mb-8">
          <Breadcrumb items={breadcrumbPaths.contact} />
        </div>

        {/* Partnership Trust Signal */}
        <div className="max-w-4xl mx-auto mb-8">
          <Card background="cream" padding="medium">
            <Text size="sm" align="center" color="muted" className="mb-2">
              Trusted by Industry Leaders
            </Text>
            <Text align="center" className="font-semibold">
              Orange Jelly is proud to partner with Greene King and the British Institute of Innkeeping, 
              bringing modern AI solutions to traditional pubs across the UK.
            </Text>
          </Card>
        </div>
        
        <AnimatedItem animation="fade-in">
        <div className="max-w-4xl mx-auto">
          <Grid columns={{ default: 1, md: 2 }} gap="large">
            {/* Left Column - Contact Methods */}
            <div>
              <Heading level={2} className="mb-6">Get in Touch</Heading>
              
              {/* WhatsApp - Primary */}
              <Card background="orange-light" className="mb-6">
                <Heading level={3} className="mb-3 flex items-center">
                  <span className="text-2xl mr-2">💬</span>
                  WhatsApp (Preferred)
                </Heading>
                <Text color="muted" className="mb-4">
                  Quickest way to reach me. I'll see it even during service!
                </Text>
                <WhatsAppButton 
                  text="Hi Peter, I'd like to chat about Orange Jelly"
                  variant="primary"
                  size="medium"
                  fullWidth
                />
              </Card>

              {/* Phone */}
              <Card variant="bordered" className="mb-6">
                <Heading level={3} className="mb-3 flex items-center">
                  <span className="text-2xl mr-2">📞</span>
                  Call or Text
                </Heading>
                <Text color="muted" className="mb-4">
                  Same number as WhatsApp. Text if I don't answer!
                </Text>
                <a 
                  href={URLS.phone}
                  className="text-orange font-semibold text-lg hover:underline"
                >
                  {CONTACT.phone}
                </a>
              </Card>

              {/* Email */}
              <Card variant="bordered" className="mb-6">
                <Heading level={3} className="mb-3 flex items-center">
                  <span className="text-2xl mr-2">✉️</span>
                  Email
                </Heading>
                <Text color="muted" className="mb-4">
                  For quotes, documents, or if you prefer email
                </Text>
                <a 
                  href={URLS.email}
                  className="text-orange font-semibold hover:underline"
                >
                  {CONTACT.email}
                </a>
              </Card>
            </div>

            {/* Right Column - Availability & Photo */}
            <div>
              <Heading level={2} className="mb-6">When to Reach Me</Heading>
              
              {/* Live Availability Status */}
              <AvailabilityStatus />

              {/* Best Times */}
              <div className="space-y-3 mb-8">
                <Heading level={3}>Best Times to Call:</Heading>
                <FeatureList
                  items={[
                    '✅ Weekday mornings (9am-12pm)',
                    '✅ Weekday afternoons (12pm-4pm)',
                    '❌ Mon-Thu evenings (4pm-10pm - service)',
                    '❌ Friday evenings (4pm-10pm - service)',
                    '❌ Saturday (12pm-midnight - all day service)',
                    '❌ Sunday (12pm-10pm - service)'
                  ]}
                  icon="bullet"
                  spacing="tight"
                  className="text-sm text-charcoal/80"
                />
              </div>

              {/* Photo placeholder */}
              <Card background="orange-light" padding="large" className="text-center">
                <div className="text-6xl mb-4">👋</div>
                <Text size="lg" className="font-semibold">That's me!</Text>
                <Text size="sm" className="text-charcoal/60 mt-2">
                  Usually covered in flour or chasing Marty
                </Text>
              </Card>
            </div>
          </Grid>
        </div>
        </AnimatedItem>
      </Section>

      {/* What Happens When You Contact Us */}
      <Section background="orange-light" padding="medium">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              What Happens When You Get in Touch?
            </Heading>
            
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <Card background="white" padding="medium">
                <Heading level={3} className="mb-4">Within 2 Hours</Heading>
                <Text className="mb-4">
                  I'll personally read your message and reply with initial thoughts. 
                  If I'm serving, you'll get a quick acknowledgment and proper reply after service.
                </Text>
                <Text size="sm" color="muted">
                  Average response time: 47 minutes during the day
                </Text>
              </Card>
              
              <Card background="white" padding="medium">
                <Heading level={3} className="mb-4">Within 24 Hours</Heading>
                <Text className="mb-4">
                  We'll have a proper conversation about your specific challenges. 
                  No generic sales pitch - just practical discussion about your pub.
                </Text>
                <Text size="sm" color="muted">
                  Usually via WhatsApp voice note or quick call
                </Text>
              </Card>
            </div>

            <Card background="teal-dark" padding="large">
              <Heading level={3} color="white" className="mb-4">The First Week</Heading>
              <Text color="white" className="mb-4">
                Based on our chat, I'll often send you 2-3 quick wins you can implement immediately - 
                no charge, no obligation. Things like fixing your Google listing or a social media 
                post template that works. Consider it a taste of what we can achieve together.
              </Text>
              <Text size="sm" className="text-cream">
                "Peter sent me three tips before we even talked money. One of them brought in 
                6 bookings that weekend." - The Crown, Berkshire
              </Text>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* How to Prepare */}
      <Section>
        <AnimatedItem animation="slide-up">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              Before You Contact Us: Quick Prep Guide
            </Heading>
            
            <Text size="lg" align="center" className="mb-8 text-charcoal/70">
              You don't need to prepare anything, but having these details helps me help you faster:
            </Text>

            <Grid columns={{ default: 1, md: 3 }} gap="medium">
              <Card variant="bordered" padding="medium">
                <div className="text-4xl mb-4 text-center">📊</div>
                <Heading level={4} align="center" className="mb-3">Your Numbers</Heading>
                <FeatureList
                  items={[
                    'Typical Tuesday covers',
                    'Weekend capacity %',
                    'Biggest revenue day',
                    'Deadest time slot'
                  ]}
                  icon="check"
                  iconColor="teal"
                  spacing="tight"
                />
              </Card>

              <Card variant="bordered" padding="medium">
                <div className="text-4xl mb-4 text-center">🎯</div>
                <Heading level={4} align="center" className="mb-3">Your Goals</Heading>
                <FeatureList
                  items={[
                    'Fill specific nights?',
                    'Increase spend per head?',
                    'Get more bookings?',
                    'Save time on marketing?'
                  ]}
                  icon="check"
                  iconColor="orange"
                  spacing="tight"
                />
              </Card>

              <Card variant="bordered" padding="medium">
                <div className="text-4xl mb-4 text-center">💪</div>
                <Heading level={4} align="center" className="mb-3">Your Strengths</Heading>
                <FeatureList
                  items={[
                    'What works well now?',
                    'Your best sellers',
                    'Loyal customer base',
                    'Team strengths'
                  ]}
                  icon="check"
                  iconColor="teal"
                  spacing="tight"
                />
              </Card>
            </Grid>

            <Text align="center" className="mt-8 text-charcoal/60">
              But honestly? Just message "Help, my Tuesday nights are dead" and we'll figure it out together.
            </Text>
          </div>
        </AnimatedItem>
      </Section>

      {/* Our Approach */}
      <Section background="white">
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              How We Work Together
            </Heading>

            <div className="space-y-6">
              <Card background="cream" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" >
                  <div>
                    <Heading level={3} className="mb-4">No Corporate Nonsense</Heading>
                    <Text className="mb-4">
                      I'm not going to turn up in a suit with a PowerPoint. I run a pub. 
                      You run a pub. We'll chat like normal people about real problems and practical solutions.
                    </Text>
                    <Text size="sm" color="muted">
                      Usually starts with "Right, what's keeping you up at night?"
                    </Text>
                  </div>
                  <div className="text-6xl text-center">🤝</div>
                </Grid>
              </Card>

              <Card background="orange-light" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" >
                  <div className="text-6xl text-center order-2 md:order-1">💡</div>
                  <div className="order-1 md:order-2">
                    <Heading level={3} className="mb-4">Solutions, Not Services</Heading>
                    <Text className="mb-4">
                      I won't try to sell you everything. If your Tuesday nights are dead, 
                      we'll fix Tuesday nights. If you need more Instagram followers, I'll 
                      tell you that's probably not your real problem.
                    </Text>
                    <Text size="sm" color="muted">
                      It's about fixing what actually impacts your bottom line
                    </Text>
                  </div>
                </Grid>
              </Card>

              <Card background="cream" padding="large">
                <Grid columns={{ default: 1, md: 2 }} gap="large" >
                  <div>
                    <Heading level={3} className="mb-4">Ongoing Support</Heading>
                    <Text className="mb-4">
                      You're not just buying a service - you're getting a fellow licensee 
                      in your corner. WhatsApp me at 2am with a crisis. Ask stupid questions. 
                      Share your wins. That's what this is about.
                    </Text>
                    <Text size="sm" color="muted">
                      Most clients have my number saved as "Peter - Pub Help"
                    </Text>
                  </div>
                  <div className="text-6xl text-center">📱</div>
                </Grid>
              </Card>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Common Concerns */}
      <Section background="cream">
        <AnimatedItem animation="slide-up">
          <div className="max-w-3xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              "But Peter, I'm Worried That..."
            </Heading>

            <div className="space-y-4">
              <Card background="white" padding="medium">
                <Heading level={4} className="mb-2">"...you won't understand my specific situation"</Heading>
                <Text>
                  I've helped gastropubs, sports bars, village locals, and food-led venues. 
                  But more importantly, I run The Anchor every day. Empty Monday nights? 
                  Been there. Staff crisis? Dealt with it yesterday. Brewery pressure? 
                  Let's just say I understand.
                </Text>
              </Card>

              <Card background="white" padding="medium">
                <Heading level={4} className="mb-2">"...it'll be too techy for me"</Heading>
                <Text>
                  If you can send a WhatsApp message, you can use everything I teach. 
                  No jargon, no complicated software. My 72-year-old client Brian now 
                  schedules his own social media. If Brian can do it, you can do it.
                </Text>
              </Card>

              <Card background="white" padding="medium">
                <Heading level={4} className="mb-2">"...I can't afford consultancy fees"</Heading>
                <Text>
                  Our smallest package is £99. Most strategies pay for themselves in the 
                  first weekend. Plus, I'll often give you free tips just because I hate 
                  seeing pubs struggle. Can you afford NOT to fill those empty tables?
                </Text>
              </Card>

              <Card background="white" padding="medium">
                <Heading level={4} className="mb-2">"...you'll judge my business"</Heading>
                <Text>
                  Mate, The Anchor was on its knees when we took over. Tripadvisor 
                  rating of 2.8. I've seen it all, done most of it wrong first, 
                  and learned the hard way. No judgment here - just help.
                </Text>
              </Card>
            </div>
          </div>
        </AnimatedItem>
      </Section>

      {/* Types of Pubs We Help */}
      <Section>
        <AnimatedItem animation="fade-in">
          <div className="max-w-4xl mx-auto">
            <Heading level={2} align="center" className="mb-8">
              Do We Work With Pubs Like Yours?
            </Heading>
            
            <Text size="lg" align="center" className="mb-8 text-charcoal/70 max-w-3xl mx-auto">
              Short answer: Yes. Long answer: We've helped every type of pub imaginable. 
              Here's how we adapt our approach for different venues:
            </Text>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card variant="bordered" padding="medium">
                <Heading level={3} className="mb-3">Village & Community Pubs</Heading>
                <Text className="mb-4">
                  Limited customer base? We focus on increasing visit frequency and spend per head. 
                  Quiz nights, loyalty schemes, and community events that turn occasional visitors into regulars.
                </Text>
                <Text size="sm" color="muted">
                  Success story: The Red Lion went from 3 nights/week to 7 days profitable
                </Text>
              </Card>

              <Card variant="bordered" padding="medium">
                <Heading level={3} className="mb-3">Gastropubs</Heading>
                <Text className="mb-4">
                  High overheads need high margins. We work on menu engineering, wine upselling, 
                  and attracting the mid-week dining crowd who spend more than weekend drinkers.
                </Text>
                <Text size="sm" color="muted">
                  Success story: The Swan increased average spend from £28 to £41
                </Text>
              </Card>

              <Card variant="bordered" padding="medium">
                <Heading level={3} className="mb-3">Town Centre Pubs</Heading>
                <Text className="mb-4">
                  Competing with chains? We'll help you find your niche. Whether it's craft beer, 
                  live music, or being the best sports pub, we'll make you the destination, not the default.
                </Text>
                <Text size="sm" color="muted">
                  Success story: The Crown beat three Wetherspoons on TripAdvisor
                </Text>
              </Card>

              <Card variant="bordered" padding="medium">
                <Heading level={3} className="mb-3">Food-Led Venues</Heading>
                <Text className="mb-4">
                  Empty tables are expensive. We focus on booking systems, menu marketing, 
                  and turning one-time diners into regular lunch customers.
                </Text>
                <Text size="sm" color="muted">
                  Success story: The White Horse now turns tables 3x on Sundays
                </Text>
              </Card>
            </div>

            <Card background="orange-light" padding="large">
              <Heading level={3} align="center" className="mb-4">
                Free Pubs, Tied Houses, or Managed?
              </Heading>
              <Text align="center" className="mb-4">
                We work with all ownership models. Free houses get full flexibility. 
                Tied pubs? We work within your constraints (and sometimes find creative solutions). 
                Managed pubs? We'll help you hit those targets and keep area managers happy.
              </Text>
              <Text size="sm" align="center" color="muted">
                We even help brewery reps understand what their tenants actually need
              </Text>
            </Card>
          </div>
        </AnimatedItem>
      </Section>

      {/* Visit The Anchor Section */}
      <Section background="teal">
        <AnimatedItem animation="fade-in">
        <div className="text-center">
          <Heading level={2} color="white" align="center" className="mb-6">
            Or Pop In for a Pint!
          </Heading>
          <Text size="lg" align="center" className="mb-8 text-cream/90 max-w-2xl mx-auto">
            Nothing beats a face-to-face chat. Come see the AI tools in action 
            at The Anchor. First pint's on me if you mention Orange Jelly!
          </Text>
          
          <Card background="teal-dark" padding="large" className="max-w-2xl mx-auto">
            <div className="mb-6">
              <Image
                src="/logo_the-anchor.png"
                alt="The Anchor"
                width={200}
                height={80}
                className="mx-auto"
              />
            </div>
            
            <div className="space-y-2 text-cream">
              <Text size="lg" color="white" className="font-semibold">The Anchor</Text>
              <Text color="white">Horton Road, Stanwell Moor</Text>
              <Text color="white">Staines TW19 6AQ</Text>
              <Text color="white" className="mt-4">
                <a 
                  href="https://maps.google.com/?q=The+Anchor+Stanwell+Moor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-orange transition"
                >
                  Get Directions →
                </a>
              </Text>
            </div>
          </Card>
        </div>
        </AnimatedItem>
      </Section>

      {/* FAQ Section */}
      <Section>
        <AnimatedItem animation="slide-up" delay={100}>
        <div className="max-w-3xl mx-auto">
          <Heading level={2} align="center" className="mb-8">
            Common Questions
          </Heading>
          
          <div className="space-y-6">
            <FAQItem
              question="I'm losing money every day - how quickly can you help?"
              answer="I understand the urgency - every day matters when you're bleeding money. WhatsApp me right now and I'll respond within hours (or after service if I'm behind the bar). We can often implement quick wins within days that start stemming losses immediately."
            />

            <FAQItem
              question="What if I message at a weird time?"
              answer="That's pub life! I get it. WhatsApp me anytime - I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours."
            />

            <FAQItem
              question="Can I speak to someone who actually understands pub problems?"
              answer="That's exactly what you get! I'm Peter, I run The Anchor pub. When you message, you're talking to someone who's dealt with staff walking out mid-shift, empty Tuesday nights, and supplier nightmares. No call centre, no junior staff - just one licensee helping another."
            />

            <FAQItem
              question="I hate pushy sales calls - will you pressure me?"
              answer="Never. I'm a licensee, not a salesperson. When we chat, I'll listen to your problems and share what worked for us. If I can help, great. If not, I might know someone who can. No scripts, no pressure - just honest conversation about saving your pub."
            />

            <FAQItem
              question="Can I visit before committing to anything?"
              answer="Please do! Come to The Anchor and see everything in action. Watch how we use the tools, chat with Billy, see our results firsthand. First pint's on me. Seeing is believing - I'd rather show you than tell you."
            />
          </div>
        </div>
        </AnimatedItem>
      </Section>

      {/* Related Links */}
      <Section background="white">
        <div className="max-w-4xl mx-auto">
          <RelatedLinks
            title="While You're Here..."
            subtitle="Explore what we can do for your pub"
            links={linkClusters.quickStart}
            variant="card"
            columns={{ default: 1, md: 3 }}
          />
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section background="orange-light" padding="small">
        <AnimatedItem animation="scale" delay={200}>
        <div className="text-center">
          <Heading level={3} align="center" className="mb-4">
            Ready to Save At Least 5 Hours a Week?
          </Heading>
          <Text size="lg" align="center" className="mb-6">
            Let's start with a free 15-minute chat about your biggest time-wasters.
          </Text>
          <WhatsAppButton 
            text="I'm ready to get my evenings back"
            size="large"
            variant="primary"
          />
        </div>
        </AnimatedItem>
      </Section>
    </>
  );
}
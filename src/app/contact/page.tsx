import type { Metadata } from 'next';
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
import { CONTACT, URLS, MESSAGES } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact Orange Jelly | Get in Touch with Peter',
  description: 'Get in touch with Peter Pitcher at Orange Jelly. WhatsApp, phone, or visit The Anchor pub. No contact forms, just real conversation.',
  openGraph: {
    title: 'Contact Orange Jelly | Get in Touch with Peter',
    description: 'Get in touch with Peter Pitcher at Orange Jelly. WhatsApp, phone, or visit The Anchor pub.',
    url: 'https://orangejelly.co.uk/contact',
    siteName: 'Orange Jelly',
    locale: 'en_GB',
    type: 'website',
  },
};

export default function Contact() {

  // Generate comprehensive schema for Contact page
  const contactSchema = (() => {
    const faqSchema = {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What if I message at a weird time?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "That's pub life! I get it. WhatsApp me anytime - I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours."
          }
        },
        {
          "@type": "Question",
          "name": "Do you do video calls?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Absolutely! Sometimes easier than typing. We can do WhatsApp video, Zoom, or whatever works for you."
          }
        },
        {
          "@type": "Question",
          "name": "Can I book a specific time to chat?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Just WhatsApp me with a few times that work for you. We'll find something that fits around both our schedules."
          }
        },
        {
          "@type": "Question",
          "name": "What if I just have a quick question?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Fire away! Quick questions are welcome. If it turns into something bigger, we'll figure out next steps."
          }
        }
      ]
    };

    const contactPageSchema = {
      "@type": "ContactPage",
      "name": "Contact Orange Jelly",
      "description": "Get in touch with Peter Pitcher at Orange Jelly. WhatsApp, phone, or visit The Anchor pub.",
      "url": "https://orangejelly.co.uk/contact",
      "mainEntity": {
        "@id": "https://orangejelly.co.uk/#organization"
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
        "addressLocality": "Stanwell Moor",
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
      "@graph": [faqSchema, contactPageSchema, theAnchorSchema]
    };
  })();


  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <Hero
        title="Let's Have a Chat"
        subtitle="No contact forms, no fuss. Just real conversation."
        showCTA={false}
      />

      <Section background="white">
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
                <p className="text-charcoal/80 mb-4">
                  Quickest way to reach me. I'll see it even during service!
                </p>
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
                <p className="text-charcoal/80 mb-4">
                  Same number as WhatsApp. Text if I don't answer!
                </p>
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
                <p className="text-charcoal/80 mb-4">
                  For quotes, documents, or if you prefer email
                </p>
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
                <p className="text-lg font-semibold">That's me!</p>
                <p className="text-sm text-charcoal/60 mt-2">
                  Usually covered in flour or chasing Marty
                </p>
              </Card>
            </div>
          </Grid>
        </div>
        </AnimatedItem>
      </Section>

      {/* Visit The Anchor Section */}
      <Section background="teal">
        <AnimatedItem animation="fade-in">
        <div className="text-center">
          <Heading level={2} color="white" className="mb-6">
            Or Pop In for a Pint!
          </Heading>
          <p className="text-xl mb-8 text-cream/90 max-w-2xl mx-auto">
            Nothing beats a face-to-face chat. Come see the AI tools in action 
            at The Anchor. First pint's on me if you mention Orange Jelly!
          </p>
          
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
              <p className="font-semibold text-lg">The Anchor</p>
              <p>Horton Road, Stanwell Moor</p>
              <p>Staines TW19 6AQ</p>
              <p className="mt-4">
                <a 
                  href="https://maps.google.com/?q=The+Anchor+Stanwell+Moor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-orange transition"
                >
                  Get Directions →
                </a>
              </p>
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
              question="What if I message at a weird time?"
              answer="That's pub life! I get it. WhatsApp me anytime - I personally reply to every message. During service? I'll get back to you after. Otherwise, expect a reply within a few hours."
            />

            <FAQItem
              question="Do you do video calls?"
              answer="Absolutely! Sometimes easier than typing. We can do WhatsApp video, Zoom, or whatever works for you."
            />

            <FAQItem
              question="Can I book a specific time to chat?"
              answer="Just WhatsApp me with a few times that work for you. We'll find something that fits around both our schedules."
            />

            <FAQItem
              question="What if I just have a quick question?"
              answer="Fire away! Quick questions are welcome. If it turns into something bigger, we'll figure out next steps."
            />
          </div>
        </div>
        </AnimatedItem>
      </Section>

      {/* Bottom CTA */}
      <Section background="orange-light" padding="small">
        <AnimatedItem animation="scale" delay={200}>
        <div className="text-center">
          <Heading level={3} className="mb-4">
            Ready to Save At Least 5 Hours a Week?
          </Heading>
          <p className="text-lg mb-6">
            Let's start with a free 15-minute chat about your biggest time-wasters.
          </p>
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
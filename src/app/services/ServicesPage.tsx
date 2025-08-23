import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import FAQItem from '@/components/FAQItem';
import WhatsAppButton from '@/components/WhatsAppButton';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks from '@/components/RelatedLinks';

// Import related links data
import relatedLinksData from '../../../content/data/related-links.json';
import { CONTACT } from '@/lib/constants';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import Partnerships from '@/components/Partnerships';
// Local data imports
import servicesData from '../../../content/data/services.json';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface ServicesPageProps {
  // No props needed - using local data
}

export default function ServicesPage({}: ServicesPageProps) {
  // Use local data
  const faqsForDisplay = servicesData.faqs;
  const servicePackages = servicesData.servicePackages;
  const partnerships = servicesData.partnerships;

  // Transform service packages for the service cards
  const servicesForDisplay = servicePackages.reduce((acc: any, pkg: any) => {
    acc[pkg.id] = pkg;
    return acc;
  }, {});

  return (
    <>
      <FAQSchema faqs={faqsForDisplay} />
      <SpeakableContent
        cssSelectors={['.prose h2', '.prose h3', '.prose > p:first-of-type']}
        url="/services"
      />

      <Hero
        title={servicesData.hero.title}
        subtitle={servicesData.hero.subtitle}
        showCTA={true}
        ctaText={servicesData.hero.ctaText}
        bottomText={servicesData.hero.bottomText}
        breadcrumbs={breadcrumbPaths.services}
      />

      {/* Services Grid */}
      <Section background="white" padding="large">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Heading level={2} className="mb-4">
            {servicesData.introSection.heading}
          </Heading>
          <Text size="lg" color="muted">
            {servicesData.introSection.description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePackages.map((service) => (
            <ServiceCard key={service.id} {...servicesForDisplay[service.id]} />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section background="cream" padding="large">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-12">
            {servicesData.processSection.heading}
          </Heading>

          <div className="space-y-8">
            {servicesData.processSection.steps.map((step: any) => (
              <div key={step.stepNumber} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">
                  {step.stepNumber}
                </div>
                <div>
                  <Heading level={3} className="mb-2">
                    {step.title}
                  </Heading>
                  <Text>{step.description}</Text>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <WhatsAppButton text={servicesData.processSection.ctaText} size="large" />
          </div>
        </div>
      </Section>

      {/* Money back guarantee */}
      <Section background="teal" padding="large">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} color="white" className="mb-6">
            {servicesData.guaranteeSection.heading}
          </Heading>
          <Text size="lg" color="white" className="mb-8">
            {servicesData.guaranteeSection.description}
          </Text>
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-lg px-6 py-4">
            <Text size="2xl" color="white">
              ✓
            </Text>
            <div className="text-left">
              <Text color="white" weight="semibold">
                {servicesData.guaranteeSection.checkmarkText}
              </Text>
              <Text size="sm" color="white" className="opacity-90">
                {servicesData.guaranteeSection.checkmarkSubtext}
              </Text>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="cream" padding="large">
        <div className="max-w-3xl mx-auto">
          <Heading level={2} align="center" className="mb-12">
            {servicesData.faqSection.heading}
          </Heading>
          <div className="space-y-6">
            {faqsForDisplay.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </Section>

      {/* Partnership logos */}
      <Section background="white" padding="medium">
        <div className="text-center mb-8">
          <Text size="sm" color="muted" weight="medium" className="uppercase tracking-wider">
            Proud to work with
          </Text>
        </div>
        <Partnerships partners={partnerships} />
      </Section>

      {/* CTA Section */}
      <CTASection
        title={servicesData.ctaSection.title}
        subtitle={servicesData.ctaSection.subtitle}
        buttonText={servicesData.ctaSection.buttonText}
        whatsappMessage={servicesData.ctaSection.whatsappMessage}
        bottomText={servicesData.ctaSection.bottomText}
      />

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinks
          title={servicesData.relatedLinksSection.title}
          links={(relatedLinksData as any).services.links}
          variant="card"
        />
      </Section>
    </>
  );
}

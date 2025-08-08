import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import FAQItem from '@/components/FAQItem';
import WhatsAppButton from '@/components/WhatsAppButton';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinksFromSanity from '@/components/RelatedLinksFromSanity';
import { CONTACT } from '@/lib/constants';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import Partnerships from '@/components/Partnerships';
import type { ServicesPageContent, ServicePackage, ServicesFAQ } from '@/lib/sanity.types';

interface ServicesPageProps {
  servicesPageContent: ServicesPageContent;
  servicePackages: ServicePackage[];
  servicesFAQs: ServicesFAQ[];
  partnerships?: any[];
}

export default function ServicesPage({ 
  servicesPageContent, 
  servicePackages, 
  servicesFAQs, 
  partnerships 
}: ServicesPageProps) {
  // Transform services FAQs for the FAQ component
  const faqsForDisplay = servicesFAQs.map(faq => ({
    question: faq.question,
    answer: faq.answer
  }));

  // Transform service packages for the service cards
  const servicesForDisplay = servicePackages.reduce((acc, pkg) => {
    acc[pkg.id] = {
      id: pkg.id,
      emoji: pkg.emoji,
      title: pkg.title,
      problem: pkg.problem,
      deliverable: pkg.deliverable,
      description: pkg.description,
      features: pkg.features,
      example: pkg.example,
      timeEstimate: pkg.timeEstimate,
      priceBreakdown: pkg.priceBreakdown,
      price: pkg.price,
      ctaText: pkg.ctaText,
      highlight: pkg.highlight
    };
    return acc;
  }, {} as any);

  // Use speakable content from Sanity or default
  const speakableQuestions = servicesPageContent.speakableContent || [];

  return (
    <>
      <FAQSchema faqs={faqsForDisplay} />
      <SpeakableContent cssSelectors={['.prose h2', '.prose h3', '.prose > p:first-of-type']} url="/services" />
      
      <Hero 
        title={servicesPageContent.hero.title}
        subtitle={servicesPageContent.hero.subtitle}
        showCTA={true}
        ctaText={servicesPageContent.hero.ctaText}
        bottomText={servicesPageContent.hero.bottomText}
        breadcrumbs={breadcrumbPaths.services}
      />

      {/* Services Grid */}
      <Section background="white" padding="large">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <Heading level={2} className="mb-4">{servicesPageContent.introSection.heading}</Heading>
          <Text size="lg" color="muted">
            {servicesPageContent.introSection.description}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {servicePackages.map(service => (
            <ServiceCard key={service.id} {...servicesForDisplay[service.id]} />
          ))}
        </div>
      </Section>

      {/* How it works */}
      <Section background="cream" padding="large">
        <div className="max-w-4xl mx-auto">
          <Heading level={2} align="center" className="mb-12">{servicesPageContent.processSection.heading}</Heading>
          
          <div className="space-y-8">
            {servicesPageContent.processSection.steps.map(step => (
              <div key={step.stepNumber} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold">{step.stepNumber}</div>
                <div>
                  <Heading level={3} className="mb-2">{step.title}</Heading>
                  <Text>{step.description}</Text>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <WhatsAppButton 
              text={servicesPageContent.processSection.ctaText || 'Talk to me about getting started'}
              size="large"
            />
          </div>
        </div>
      </Section>

      {/* Money back guarantee */}
      <Section background="teal" padding="large">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} color="white" className="mb-6">
            {servicesPageContent.guaranteeSection.heading}
          </Heading>
          <Text size="lg" color="white" className="mb-8">
            {servicesPageContent.guaranteeSection.description}
          </Text>
          <div className="inline-flex items-center gap-4 bg-white/10 rounded-lg px-6 py-4">
            <Text size="2xl" color="white">✓</Text>
            <div className="text-left">
              <Text color="white" weight="semibold">{servicesPageContent.guaranteeSection.checkmarkText}</Text>
              <Text size="sm" color="white" className="opacity-90">
                {servicesPageContent.guaranteeSection.checkmarkSubtext}
              </Text>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ Section */}
      <Section background="cream" padding="large">
        <div className="max-w-3xl mx-auto">
          <Heading level={2} align="center" className="mb-12">
            {servicesPageContent.faqSection.heading}
          </Heading>
          <div className="space-y-6">
            {faqsForDisplay.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.question}
                answer={faq.answer}
              />
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
        title={servicesPageContent.ctaSection.title}
        subtitle={servicesPageContent.ctaSection.subtitle}
        buttonText={servicesPageContent.ctaSection.buttonText}
        whatsappMessage={servicesPageContent.ctaSection.whatsappMessage}
        bottomText={servicesPageContent.ctaSection.bottomText}
      />

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinksFromSanity
          title={servicesPageContent.relatedLinksSection?.title || "See How We Can Help"}
          clusterId={servicesPageContent.relatedLinksSection?.clusterId || "services"}
        />
      </Section>
    </>
  );
}
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import FAQItem from '@/components/FAQItem';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Button from '@/components/Button';
import Container from '@/components/Container';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import PartnershipsSection from '@/components/PartnershipsSection';
import { URLS } from '@/lib/constants';

// Local data imports
import servicesData from '../../../content/data/services.json';

export default function ServicesPage() {
  const faqsForDisplay = servicesData.faqs;
  const servicePackages = servicesData.servicePackages;
  const realSolutions = servicesData.realSolutionsSection;
  const process = servicesData.processSection;
  const partnerships = servicesData.partnershipsSection;

  return (
    <>
      <FAQSchema faqs={faqsForDisplay} />
      <SpeakableContent
        cssSelectors={['.hero-title', '.hero-subtitle', '.service-card h3']}
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

      {/* Real Solutions, Not Theory Section */}
      <Section background="white" padding="medium">
        <Container maxWidth="6xl">
          <div className="text-center mb-8">
            <Heading level={2} className="mb-3">
              {realSolutions.heading}
            </Heading>
            <Text size="lg" color="muted" className="max-w-4xl mx-auto">
              {realSolutions.description}
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {realSolutions.metrics.map((metric: any) => (
              <Card key={metric.number} variant="bordered" padding="medium" className="text-center">
                <div className="w-10 h-10 bg-orange text-white rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {metric.number}
                </div>
                <Text size="sm" weight="semibold" color="muted" className="mb-2">
                  {metric.title}
                </Text>
                <Heading level={3} className="mb-2 text-orange">
                  {metric.value}
                </Heading>
                <Text size="sm" color="muted">
                  {metric.description}
                </Text>
              </Card>
            ))}
          </div>
        </Container>
      </Section>

      {/* Services Grid - 2 columns max on desktop, 1 on mobile */}
      <Section background="cream" padding="large">
        <Container maxWidth="4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {servicePackages.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Simple, Honest Process */}
      <Section background="white" padding="large">
        <Container maxWidth="6xl">
          <Heading level={2} align="center" className="mb-12">
            {process.heading}
          </Heading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.steps.map((step: any) => (
              <div key={step.number} className="text-center">
                <div className="w-12 h-12 bg-orange text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4">
                  {step.number}
                </div>
                <Heading level={4} className="mb-3">
                  {step.title}
                </Heading>
                <Text size="sm" color="muted">
                  {step.description}
                </Text>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button href={URLS.whatsapp()} variant="primary" size="large" external>
              {process.ctaText}
            </Button>
          </div>
        </Container>
      </Section>

      {/* Guarantee */}
      <Section background="teal" padding="large">
        <Container maxWidth="3xl">
          <div className="text-center">
            <Heading level={2} color="white" className="mb-6">
              {servicesData.guaranteeSection.heading}
            </Heading>
            <Text size="lg" color="white" className="mb-8">
              {servicesData.guaranteeSection.description}
            </Text>
            <div className="inline-flex items-center gap-4 bg-white/10 rounded-lg px-8 py-6">
              <Text size="2xl" color="white">
                ✓
              </Text>
              <div className="text-left">
                <Text color="white" weight="semibold" size="lg">
                  {servicesData.guaranteeSection.checkmarkText}
                </Text>
                <Text size="sm" color="white" className="opacity-90 mt-1">
                  {servicesData.guaranteeSection.checkmarkSubtext}
                </Text>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* FAQ Section - Expandable */}
      <Section background="white" padding="large">
        <Container maxWidth="4xl">
          <Heading level={2} align="center" className="mb-12">
            {servicesData.faqSection.heading}
          </Heading>
          <div className="space-y-4">
            {faqsForDisplay.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Partnership Section */}
      {partnerships && partnerships.partners && (
        <PartnershipsSection
          partners={partnerships.partners.map((partner: any) => ({
            name: partner.name,
            description: partner.description,
            logoUrl: partner.logo,
            url:
              partner.name === 'Greene King'
                ? 'https://www.greeneking.co.uk/'
                : 'https://www.bii.org/',
          }))}
          title={partnerships.heading}
        />
      )}

      {/* Final CTA Section */}
      <Section background="orange-light" padding="large">
        <Container maxWidth="3xl">
          <div className="text-center">
            <Heading level={2} className="mb-4">
              {servicesData.ctaSection.title}
            </Heading>
            <Text size="lg" className="mb-8 max-w-2xl mx-auto">
              {servicesData.ctaSection.subtitle}
            </Text>
            <Button
              href={URLS.whatsapp(servicesData.ctaSection.whatsappMessage)}
              variant="primary"
              size="large"
              external
              className="mb-4"
            >
              {servicesData.ctaSection.buttonText}
            </Button>
            <Text size="sm" color="muted">
              {servicesData.ctaSection.bottomText}
            </Text>
          </div>
        </Container>
      </Section>
    </>
  );
}

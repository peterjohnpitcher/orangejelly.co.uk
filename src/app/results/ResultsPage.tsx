import Hero from '@/components/Hero';
import Section from '@/components/Section';
import CTASection from '@/components/CTASection';
import Heading from '@/components/Heading';
import Card from '@/components/Card';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';
import CaseStudySelector from '@/components/CaseStudySelector';
import { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinksFromSanity from '@/components/RelatedLinksFromSanity';
import Text from '@/components/Text';
import Button from '@/components/Button';
import { portableTextToPlainText } from '@/lib/portable-text-utils';
import type { CaseStudy } from '@/lib/sanity-case-studies';

interface ResultsPageProps {
  caseStudies: CaseStudy[];
}

export default function ResultsPage({ caseStudies }: ResultsPageProps) {
  // Transform Sanity case studies to match the existing component format
  const transformedCaseStudies = caseStudies
    .filter(study => study && study.title) // Filter out any invalid studies
    .map(study => ({
      id: study.slug?.current || study._id,
      title: study.title,
      subtitle: study.subtitle || '',
      problem: study.problem ? study.problem.map(block => portableTextToPlainText([block])) : [],
      failed: study.failedAttempts || [],
      solution: study.solution ? study.solution.map(block => portableTextToPlainText([block])) : [],
      results: study.results?.map(r => ({ 
        metric: r.metric, 
        value: r.value + (r.improvement ? ` (${r.improvement})` : '') 
      })) || [],
      timeInvestment: study.timeInvestment ? [study.timeInvestment] : [],
      learnings: study.learnings || [],
      quote: study.quote?.text,
    }));


  return (
    <>
      <Hero
        title="Pubs That Were Empty. Now They're Not."
        subtitle="Real results from The Anchor. No fluff, just numbers and strategies that actually work."
        breadcrumbs={breadcrumbPaths.results}
      />

      {/* Case Study Selector */}
      <Section background="cream" padding="small">
        <AnimatedItem animation="fade-in">
          <CaseStudySelector 
            results={transformedCaseStudies}
          />
        </AnimatedItem>
      </Section>


      {/* Trust Section */}
      <Section background="orange-light">
        <AnimatedItem animation="fade-in" delay={200}>
          <Grid columns={{ default: 1, md: 2 }} gap="large" className="items-center">
            <div>
              <Heading level={2} className="mb-4">
                These Aren't Just Case Studies
              </Heading>
              <Text size="lg" className="mb-6">
                Every strategy, every number, every result comes from our own pub. 
                We've tested it all at The Anchor first. The failures taught us what to avoid. 
                The successes showed us what to share.
              </Text>
              <Text size="lg" className="mb-6">
                When you work with Orange Jelly, you're getting proven strategies 
                from someone who's been in your shoes and found a way out.
              </Text>
              <Button
                href="/services"
                variant="primary"
                size="large"
              >
                See How We Can Help You
              </Button>
            </div>
            <Card variant="shadowed" padding="large" className="bg-white">
              <Heading level={3} className="mb-4 text-center">
                The Numbers Don't Lie
              </Heading>
              <Grid columns={{ default: 2 }} gap="medium">
                <div className="text-center">
                  <Text size="2xl" weight="bold" className="text-orange">71%</Text>
                  <Text size="sm" color="muted">Food GP</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" className="text-orange">25-35</Text>
                  <Text size="sm" color="muted">Quiz Regulars</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" className="text-orange">£250</Text>
                  <Text size="sm" color="muted">Weekly Savings</Text>
                </div>
                <div className="text-center">
                  <Text size="2xl" weight="bold" className="text-orange">70k</Text>
                  <Text size="sm" color="muted">Monthly Views</Text>
                </div>
              </Grid>
            </Card>
          </Grid>
        </AnimatedItem>
      </Section>

      {/* Related Links */}
      <Section background="cream" padding="medium">
        <RelatedLinksFromSanity
          clusterId="quickWins"
          title="Ready to Get Similar Results?"
          subtitle="Choose where to start based on your biggest challenge"
          variant="card"
          columns={{ default: 1, md: 2, lg: 3 }}
        />
      </Section>

      <CTASection
        title="Let's Fix Your Biggest Problem First"
        subtitle="Tell me what's killing your business. I'll share exactly how we solved it at The Anchor."
      />
    </>
  );
}
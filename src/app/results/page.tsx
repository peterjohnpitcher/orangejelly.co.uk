import { generateStaticMetadata } from '@/lib/metadata';
import ResultsPage from './ResultsPage';

export async function generateMetadata() {
  return generateStaticMetadata({
    title: "Pubs That Were Empty. Now They're Not",
    description:
      'How did The Anchor transform Sunday lunches and reduce waste by £250/week? How we grew quiz nights from zero to 25-35 regulars? Real success stories from The Anchor using AI tools. See the actual numbers and proven strategies.',
    path: '/results',
    keywords: [
      'pub success stories',
      'pub turnaround case studies',
      'increase pub revenue',
      'pub marketing results',
      'The Anchor success',
      'pub transformation',
    ],
  });
}

export default function Results() {
  // Use local data

  // Generate comprehensive schema for Results
  const resultsSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'HowTo',
        '@id': 'https://www.orangejelly.co.uk/results#sunday-lunches',
        name: 'How to Fix Sunday Lunch Chaos with Pre-Order System',
        description:
          'Learn how The Anchor reduced Sunday lunch waste by £250/week using a custom-built pre-order system',
        supply: ['Google Forms or similar', 'Payment processor', 'SMS system'],
        tool: ['Online form builder', 'Automated SMS tool'],
        step: [
          {
            '@type': 'HowToStep',
            name: 'Set up simple pre-order form',
            text: 'Create online form with menu choices and deposit option',
          },
          {
            '@type': 'HowToStep',
            name: 'Implement £5 deposit system',
            text: 'Small deposit prevents no-shows without scaring customers',
          },
          {
            '@type': 'HowToStep',
            name: 'Send confirmation texts',
            text: 'Automated SMS confirms booking and reminds day before',
          },
          {
            '@type': 'HowToStep',
            name: 'Lock in menu choices',
            text: 'Pre-orders mean exact prep with no waste',
          },
        ],
        totalTime: 'PT4H',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'GBP',
          value: '99',
        },
        performTime: 'PT20M',
        yield: '£250 weekly savings, 90% reduction in food waste',
      },
      {
        '@type': 'Article',
        '@id': 'https://www.orangejelly.co.uk/results#social-media',
        headline: 'How AI Transformed Our Social Media from Chore to Customer Magnet',
        description:
          'Case study showing how The Anchor uses AI to create daily content across 3 platforms in just 30 minutes monthly',
        author: {
          '@id': 'https://www.orangejelly.co.uk/#peter-pitcher',
        },
        datePublished: '2024-09-15',
        articleBody:
          'From posting once a week to daily engagement that actually fills tables. AI creates content that sounds like us, not a robot...',
      },
      {
        '@type': 'Article',
        '@id': 'https://www.orangejelly.co.uk/results#quiz-night',
        headline: 'Tuesday Quiz Night: From 20 to 25-35 Regulars Using AI',
        description:
          'How we ditched expensive quiz subscriptions and created better quizzes with AI in 20 minutes',
        author: {
          '@id': 'https://www.orangejelly.co.uk/#peter-pitcher',
        },
        datePublished: '2024-10-01',
        articleBody:
          'QuestionOne was stale and expensive. Now AI creates custom quizzes with local flavor that pack the pub every Tuesday...',
      },
      {
        '@type': 'HowTo',
        '@id': 'https://www.orangejelly.co.uk/results#quiet-weeks',
        name: 'Transform Quiet Weeks into Premium Events',
        description: 'How The Anchor created sold-out tasting events charging £25+ per ticket',
        step: [
          {
            '@type': 'HowToStep',
            name: 'Ask locals what they want',
            text: 'Use AI to analyze feedback and identify gaps',
          },
          {
            '@type': 'HowToStep',
            name: 'Partner with local suppliers',
            text: 'Gin distilleries and breweries love showcasing products',
          },
          {
            '@type': 'HowToStep',
            name: 'Price for value not volume',
            text: '£25 tickets with proper experience beats cheap offers',
          },
          {
            '@type': 'HowToStep',
            name: 'Build WhatsApp community',
            text: 'Direct communication with interested customers',
          },
        ],
        totalTime: 'PT3H',
        estimatedCost: {
          '@type': 'MonetaryAmount',
          currency: 'GBP',
          value: '199',
        },
        performTime: 'PT2H',
        yield: 'Sold out tasting nights at 25 tickets, 85% retention rate',
      },
      {
        '@type': 'Review',
        itemReviewed: {
          '@type': 'Service',
          name: 'Orange Jelly Pub Consulting',
          provider: {
            '@id': 'https://www.orangejelly.co.uk/#organization',
          },
        },
        reviewBody:
          "Peter's AI strategies transformed our pub. Quiz nights now 25-35 regulars, food GP from 58% to 71%, and we actually have evenings off now. Best investment we've made.",
        author: {
          '@type': 'Restaurant',
          name: 'The Anchor',
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5',
        },
      },
    ],
  };

  return (
    <>
      <ResultsPage />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(resultsSchema) }}
      />
    </>
  );
}

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Results - Real Success Stories from The Anchor',
  description: 'See how we use AI at The Anchor to save time and increase revenue. Real examples, real numbers, no fluff.',
  alternates: {
    canonical: 'https://orangejelly.co.uk/results',
  },
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
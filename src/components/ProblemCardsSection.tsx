import { memo } from 'react';
import Link from 'next/link';

interface ProblemCard {
  emoji: string;
  title: string;
  description: string;
  linkHref: string;
}

interface ProblemCardsSectionProps {
  problems: ProblemCard[];
  title?: string;
  className?: string;
}

function ProblemCardsSection({ 
  problems, 
  title = "What's Killing Your Business?",
  className = '' 
}: ProblemCardsSectionProps) {
  if (!problems || problems.length === 0) {
    return null;
  }

  return (
    <section className={`bg-cream py-16 ${className}`}>
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-charcoal mb-12">
          {title}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 group">
              <div className="p-8 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  {problem.emoji}
                </div>
                <h3 className="text-xl font-bold text-charcoal mb-3">
                  {problem.title}
                </h3>
                <p className="text-gray-600 mb-6">
                  {problem.description}
                </p>
                <Link 
                  href={problem.linkHref}
                  className="inline-flex items-center justify-center text-sm font-semibold text-orange hover:text-orange-dark transition-colors"
                >
                  Learn More →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(ProblemCardsSection);
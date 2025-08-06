import Link from 'next/link';
import Card from '@/components/Card';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Grid from '@/components/Grid';
import AnimatedItem from '@/components/AnimatedItem';

export interface RelatedLink {
  title: string;
  description: string;
  href: string;
  emoji?: string;
  highlight?: boolean;
}

interface RelatedLinksProps {
  title?: string;
  subtitle?: string;
  links: RelatedLink[];
  variant?: 'card' | 'inline' | 'compact';
  columns?: {
    default?: 1 | 2 | 3 | 4;
    sm?: 1 | 2 | 3 | 4;
    md?: 1 | 2 | 3 | 4;
    lg?: 1 | 2 | 3 | 4;
  };
  centered?: boolean;
}

export default function RelatedLinks({ 
  title = "Related Topics", 
  subtitle,
  links, 
  variant = 'card',
  columns = { default: 1, md: 2, lg: 3 },
  centered = false
}: RelatedLinksProps) {
  if (links.length === 0) return null;

  // Card variant - for featured related content
  if (variant === 'card') {
    return (
      <AnimatedItem animation="fade-in">
        <div className="mt-12 pt-8 border-t border-gray-200">
          <Heading level={3} className="mb-3">{title}</Heading>
          {subtitle && <Text size="lg" className="text-charcoal/70 mb-6">{subtitle}</Text>}
          
          <Grid columns={columns} gap="medium">
            {links.map((link, index) => (
              <Link key={index} href={link.href} className="block hover:no-underline">
                <Card 
                  variant={link.highlight ? 'colored' : 'default'} 
                  className="h-full"
                >
                  <div className="flex items-start gap-4">
                    {link.emoji && (
                      <span className="text-2xl flex-shrink-0" aria-hidden="true">
                        {link.emoji}
                      </span>
                    )}
                    <div className="flex-1 min-w-0">
                      <Heading level={4} className="font-semibold text-charcoal mb-2 group-hover:text-orange transition-colors">
                        {link.title}
                      </Heading>
                      <Text size="sm" className="text-charcoal/70">
                        {link.description}
                      </Text>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </Grid>
        </div>
      </AnimatedItem>
    );
  }

  // Inline variant - for contextual links within content
  if (variant === 'inline') {
    return (
      <div className={`my-8 p-6 bg-cream rounded-lg ${centered ? 'text-center' : ''}`}>
        <Heading level={4} className={`font-semibold text-charcoal mb-4 ${centered ? 'text-center' : ''}`}>{title}</Heading>
        <ul className={`space-y-3 ${centered ? 'max-w-2xl mx-auto' : ''}`}>
          {links.map((link, index) => (
            <li key={index} className={`flex items-start gap-2 ${centered ? 'justify-center' : ''}`}>
              <span className="text-orange mt-0.5">→</span>
              <div className={centered ? 'text-left' : ''}>
                <Link 
                  href={link.href} 
                  className="font-medium text-charcoal hover:text-orange transition-colors"
                >
                  {link.title}
                </Link>
                {link.description && (
                  <Text size="sm" className="text-charcoal/70 mt-1">{link.description}</Text>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Compact variant - for footer or sidebar links
  return (
    <div className="space-y-2">
      <Heading level={4} className="font-semibold text-sm uppercase tracking-wider text-charcoal/60 mb-3">
        {title}
      </Heading>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <li key={index}>
            <Link 
              href={link.href} 
              className="text-sm text-charcoal/80 hover:text-orange transition-colors flex items-center gap-2"
            >
              {link.emoji && <span aria-hidden="true">{link.emoji}</span>}
              {link.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Pre-defined link clusters for common use cases
export const linkClusters = {
  about: [
    {
      title: "Our Services",
      description: "See how we can help transform your pub",
      href: "/services",
      emoji: "🚀"
    },
    {
      title: "Success Stories",
      description: "Real results from real pubs",
      href: "/results",
      emoji: "📈"
    },
    {
      title: "Get Started",
      description: "Book a free chat with Peter",
      href: "/contact",
      emoji: "💬"
    }
  ],
  
  quickWins: [
    {
      title: "Quick Wins Consultation",
      description: "5 instant improvements for your pub",
      href: "/services#quick-wins",
      emoji: "⚡"
    },
    {
      title: "30-Minute AI Demo",
      description: "See AI in action for pub marketing",
      href: "/services#training",
      emoji: "🤖"
    },
    {
      title: "Free Social Media Review",
      description: "Get personalized improvement tips",
      href: "/contact",
      emoji: "📱"
    }
  ],
  
  emptyPub: [
    {
      title: "Empty Pub Recovery Package",
      description: "Fill your quiet nights in 30 days with our proven system",
      href: "/services#empty-pub-recovery",
      emoji: "⏰",
      highlight: true
    },
    {
      title: "Done-For-You Marketing",
      description: "We handle all your marketing while you focus on customers",
      href: "/services#done-for-you-marketing",
      emoji: "📱"
    },
    {
      title: "Real Pub Turnarounds",
      description: "See how other pubs went from empty to packed",
      href: "/results",
      emoji: "📈"
    }
  ],
  
  competition: [
    {
      title: "Beat Local Competition",
      description: "Stand out with strategies that bring customers back",
      href: "/services#empty-pub-recovery",
      emoji: "🏆"
    },
    {
      title: "Get Found Online",
      description: "Be first on Google when locals search for pubs",
      href: "/services#website",
      emoji: "🔍"
    },
    {
      title: "Find Hidden Profits",
      description: "Discover opportunities your competitors miss",
      href: "/services#business",
      emoji: "💡"
    }
  ],
  
  budget: [
    {
      title: "Boost Food Sales",
      description: "Turn your menu into a profit-driving machine",
      href: "/services#boost-food-sales",
      emoji: "💷"
    },
    {
      title: "Calculate Your ROI",
      description: "See exactly how much extra revenue you could generate",
      href: "/#roi-calculator",
      emoji: "🧮"
    },
    {
      title: "Payment Plans Available",
      description: "Spread the cost with flexible payment options",
      href: "/contact",
      emoji: "💳"
    }
  ],
  
  time: [
    {
      title: "AI Training for licensees",
      description: "Learn to automate the boring bits yourself",
      href: "/services#training",
      emoji: "🎓"
    },
    {
      title: "3 Months of Social in 3 Hours",
      description: "How we batch-created content for The Anchor",
      href: "/results#social-media",
      emoji: "📅"
    },
    {
      title: "About Peter & The Anchor",
      description: "How we save 5+ hours every week with AI",
      href: "/about",
      emoji: "⏰"
    }
  ],

  quickStart: [
    {
      title: "Free Chat with Peter",
      description: "Tell me your biggest problem - I'll share how we fixed it",
      href: "/contact",
      emoji: "💬",
      highlight: true
    },
    {
      title: "Our Proven Services",
      description: "Pick the problem that's keeping you up at night",
      href: "/services",
      emoji: "🚀"
    },
    {
      title: "Success Stories",
      description: "Real results from real pubs like yours",
      href: "/results",
      emoji: "🎯"
    }
  ],

  services: [
    {
      title: "Empty Pub Recovery",
      description: "Turn quiet nights into profitable ones",
      href: "/solutions/empty-pub-midweek",
      emoji: "🚨"
    },
    {
      title: "About Peter Pitcher",
      description: "The licensee behind Orange Jelly",
      href: "/about",
      emoji: "👤"
    },
    {
      title: "Real Pub Results",
      description: "See what's possible for your pub",
      href: "/results",
      emoji: "📊"
    }
  ],

  contact: [
    {
      title: "View Our Services",
      description: "Find the right solution for your pub",
      href: "/services",
      emoji: "🛠️"
    },
    {
      title: "Empty Pub Solutions",
      description: "Fill your quiet nights fast",
      href: "/solutions/empty-pub-midweek",
      emoji: "🌙"
    },
    {
      title: "Pub Marketing Guide",
      description: "Free marketing tips for licensees",
      href: "/licensees-guide",
      emoji: "📚"
    }
  ]
};
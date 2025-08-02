import { Metadata } from 'next';
import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import WhatsAppButton from '@/components/WhatsAppButton';
import { PRICING, MESSAGES, CONTACT } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Services - How Orange Jelly Helps Your Pub',
  description: 'Save time, make more money, and fill quiet nights with AI tools designed for pubs. From menu optimization to social media automation.',
  alternates: {
    canonical: 'https://orangejelly.co.uk/services',
  },
};

export default function Services() {
  // Generate comprehensive Service schema
  const generateServiceSchema = () => {
    const serviceSchemas = [
      {
        "@type": "Service",
        "@id": "https://orangejelly.co.uk/services#quickwins",
        "name": "30-Day Quick Wins Package",
        "description": "Try everything risk-free for 30 days at one location with our money-back guarantee. Menu review, social media content, email templates, and WhatsApp support.",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "30-Day Quick Wins",
          "itemListElement": [{
            "@type": "Offer",
            "price": "499",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "499",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            },
            "validFrom": "2025-01-01",
            "availability": "https://schema.org/InStock",
            "url": "https://orangejelly.co.uk/services#quickwins"
          }]
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "5",
          "bestRating": "5",
          "reviewCount": "12"
        }
      },
      {
        "@type": "Service",
        "@id": "https://orangejelly.co.uk/services#menu",
        "name": "Menu Makeover",
        "description": "AI-powered review and rewrite of your menu descriptions to increase sales of profitable dishes. Full menu analysis with profit margin optimization.",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Menu Makeover Service",
          "itemListElement": [{
            "@type": "Offer",
            "price": "99",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "99",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            },
            "availability": "https://schema.org/InStock"
          }]
        },
        "serviceOutput": "Optimized menu with compelling descriptions",
        "duration": "PT3H"
      },
      {
        "@type": "Service",
        "@id": "https://orangejelly.co.uk/services#marketing",
        "name": "Marketing Without the Hassle",
        "description": "Never stare at a blank Facebook post again. We set you up with AI tools that create your content. 3 months upfront content plus ongoing support.",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Marketing Services",
          "itemListElement": [{
            "@type": "Offer",
            "price": "499",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "499",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false,
              "billingDuration": "P1M"
            }
          }]
        }
      },
      {
        "@type": "Service",
        "@id": "https://orangejelly.co.uk/services#website",
        "name": "Website That Actually Works",
        "description": "A simple website that gets you bookings, works on phones, and you can update yourself. Professional design with booking system integration.",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Website Development",
          "itemListElement": [{
            "@type": "Offer",
            "price": "1499",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "1499",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            }
          }]
        },
        "serviceOutput": "Professional responsive website"
      },
      {
        "@type": "Service",
        "@id": "https://orangejelly.co.uk/services#business",
        "name": "Find Hidden Money",
        "description": "Fresh eyes on your business (with AI help) to spot opportunities you're too busy to see. Competitor analysis, pricing recommendations, and action plan.",
        "provider": {
          "@id": "https://orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Business Analysis",
          "itemListElement": [{
            "@type": "Offer",
            "price": "499",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "499",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            }
          }]
        },
        "duration": "P2D"
      }
    ];

    const trainingSchema = {
      "@type": "Course",
      "@id": "https://orangejelly.co.uk/services#training",
      "name": "AI Training for Publicans",
      "description": "Personal training on using AI for the boring bits, so you can focus on customers.",
      "provider": {
        "@id": "https://orangejelly.co.uk/#organization"
      },
      "courseMode": "onsite",
      "educationalLevel": "Beginner",
      "teaches": ["AI Tools", "Email Marketing", "Social Media", "Business Operations"],
      "hasCourseInstance": [
        {
          "@type": "CourseInstance",
          "name": "Quick Start Training",
          "duration": "PT2H",
          "offers": {
            "@type": "Offer",
            "price": "150",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "150",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            }
          }
        },
        {
          "@type": "CourseInstance",
          "name": "Half Day Training",
          "duration": "PT4H",
          "offers": {
            "@type": "Offer",
            "price": "300",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "CourseInstance",
          "name": "Full Day Training",
          "duration": "PT8H",
          "offers": {
            "@type": "Offer",
            "price": "600",
            "priceCurrency": "GBP"
          }
        }
      ]
    };

    return {
      "@context": "https://schema.org",
      "@graph": [...serviceSchemas, trainingSchema]
    };
  };
  const services = [
    {
      id: 'quickwins',
      emoji: '⏰',
      title: '30-Day Quick Wins Package',
      problem: '"I need to see if AI actually works before committing"',
      description: 'Try everything for 30 days at one location. We\'ll set up the tools, train you, and prove the results.',
      features: [
        'One month of social media content created',
        'Email templates that convert',
        'Review response system setup',
        'Personal AI training session',
        'Money back if you don\'t save 5 hours'
      ],
      price: PRICING.services.quickWins.display + ' per location',
      timeline: 'One-time 30-day package',
      highlight: true,
      example: {
        result: 'Most pubs upgrade to monthly support after seeing results'
      }
    },
    {
      id: 'menu',
      emoji: '💷',
      title: 'Sell More Profitable Dishes',
      problem: '"People always order the cheapest things on my menu"',
      description: 'Transform your menu into a sales tool that guides customers to your best dishes.',
      features: [
        'Psychology-based menu redesign',
        'Descriptions that make mouths water',
        'Strategic pricing and positioning',
        'Highlight your most profitable items',
        'Digital and print-ready versions'
      ],
      price: PRICING.services.menuMakeover.display,
      timeline: 'Same week delivery',
      example: {
        before: '"Roast beef and vegetables"',
        after: '"Slow-roasted Hereford beef with honey-glazed carrots, crispy roast potatoes and rich gravy"',
        result: 'Sunday roasts up 22%, average spend +28%'
      }
    },
    {
      id: 'marketing',
      emoji: '📱',
      title: 'Fill Your Quiet Nights',
      problem: '"Tuesday nights are dead, and I don\'t know how to promote events"',
      description: 'Create compelling promotions that actually bring people through the door.',
      features: [
        'Event promotion that works',
        'Social media that engages locals',
        'Email campaigns that fill tables',
        'Custom graphics and posters',
        'Seasonal campaign planning',
        'Monthly content creation'
      ],
      price: PRICING.services.quickWins.display + ' setup',
      timeline: `Then £${PRICING.services.quickWins.monthlyFee}/month + VAT ongoing`,
      example: {
        result: 'Quiz night: 25→45 people. Tuesday covers: 20→60+'
      }
    },
    {
      id: 'website',
      emoji: '🔍',
      title: 'Get Found Online',
      problem: '"People can\'t find us on Google" / "Our website looks terrible on phones"',
      description: 'A modern website that brings in bookings and showcases what makes you special.',
      features: [
        'Mobile-first design that loads fast',
        'SEO that puts you on page 1',
        'Online booking integration',
        'Google My Business optimization',
        'Content that converts visitors to customers',
        `Choose: ${PRICING.services.website.hosting.hostingOnly.display} hosting only OR ${PRICING.services.website.hosting.fullSupport.display} for all updates`
      ],
      price: PRICING.services.website.setup.display,
      timeline: `Then ${PRICING.services.website.hosting.hostingOnly.display} hosting or ${PRICING.services.website.hosting.fullSupport.display} full support`,
      example: {
        result: 'Online bookings up 40%, phone calls down 60%'
      }
    },
    {
      id: 'business',
      emoji: '💡',
      title: 'Boost Your Bottom Line',
      problem: '"I\'m busy but not profitable" / "I don\'t know what\'s working"',
      description: 'Identify exactly where you\'re leaving money on the table and how to fix it.',
      features: [
        'Full business health check',
        'Find your most profitable opportunities',
        'Competitor insights and positioning',
        'Data-driven pricing strategy',
        'Clear 90-day action plan'
      ],
      price: PRICING.services.emailSocial.display,
      timeline: '1 week turnaround',
      example: {
        result: 'Average profit margin up 15% in 3 months'
      }
    },
    {
      id: 'custom',
      emoji: '🚀',
      title: 'Your Specific Challenge',
      problem: '"I have a problem that\'s not listed here"',
      description: 'More solutions coming soon. Let\'s discuss what\'s really bothering you.',
      features: [
        'Staff scheduling nightmares?',
        'Supplier invoice chaos?',
        'Event planning headaches?',
        'Customer database mess?',
        'Something else entirely?'
      ],
      price: 'Let\'s chat',
      timeline: 'Custom to your needs',
      highlight: false,
      example: {
        result: 'Every pub is different - let\'s solve YOUR problem'
      }
    }
  ];

  const trainingOptions = [
    { name: 'Quick Start', duration: PRICING.services.training.quickStart.duration, price: PRICING.services.training.quickStart.display, description: PRICING.services.training.quickStart.description },
    { name: 'Half Day', duration: PRICING.services.training.halfDay.duration, price: PRICING.services.training.halfDay.display, description: PRICING.services.training.halfDay.description },
    { name: 'Full Day', duration: PRICING.services.training.fullDay.duration, price: PRICING.services.training.fullDay.display, description: PRICING.services.training.fullDay.description }
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateServiceSchema()) }}
      />
      <Hero
        title="What We Can Help You With"
        subtitle="Pick the problem that's keeping you up at night. We'll fix it."
        showCTA={false}
      />

      <Section background="white">
        {/* Free Chat Banner */}
        <div className="text-center mb-12 p-8 bg-gradient-to-r from-orange/10 to-orange/5 rounded-lg border-2 border-orange/20">
          <h2 className="text-2xl font-bold mb-4">Let's Have a Quick Chat First</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Tell me what's driving you mad about running your pub. I'll share exactly how 
            we fixed the same problems at The Anchor. No sales pitch, just publican to publican.
          </p>
          <WhatsAppButton 
            text={MESSAGES.whatsapp.default} 
            size="medium"
          />
        </div>

        {/* How We Can Help */}
        <h2 className="text-2xl font-bold text-center mb-8">Choose What You Need Help With</h2>
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* Custom Solutions CTA */}
        <div className="bg-gradient-to-r from-teal to-teal-dark text-white rounded-lg p-8 mb-12">
          <h3 className="text-2xl font-bold text-center mb-4">These Are Just Starting Points</h3>
          <p className="text-lg text-center mb-6 max-w-3xl mx-auto">
            Every pub faces unique challenges. I'd love to hear what's really keeping you up at night - 
            whether it's staff issues, supplier headaches, or something completely different. 
            Let's chat about what would actually help you and your business.
          </p>
          <div className="text-center">
            <WhatsAppButton 
              text="Peter, I need help with something specific..." 
              variant="secondary"
              size="large"
              className="!bg-white !text-teal hover:!bg-cream"
            />
          </div>
        </div>

        {/* Idea Starters */}
        <div className="bg-white rounded-lg p-8 mb-12 border-2 border-orange/20">
          <h3 className="text-2xl font-bold text-center mb-8">More Ways AI Can Help Your Pub</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <h4 className="font-semibold text-orange mb-3">⏰ Save Time Daily</h4>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Write staff rotas in minutes</li>
                <li>• Create supplier orders from photos</li>
                <li>• Answer bookings while you sleep</li>
                <li>• Voice notes → meeting notes</li>
                <li>• Write job ads that work</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange mb-3">💷 Make More Money</h4>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• "Today's specials" that sell out</li>
                <li>• Wine descriptions that upsell</li>
                <li>• Turn slow stock into bestsellers</li>
                <li>• Smart pricing from competitors</li>
                <li>• Find your profit champions</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange mb-3">📈 Get Busier</h4>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Match day posts automatically</li>
                <li>• "We miss you" to old regulars</li>
                <li>• Weather-based promotions</li>
                <li>• Event posters that pop</li>
                <li>• Stress-free review replies</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold text-orange mb-3">🎯 Fix Headaches</h4>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Never run out of anything</li>
                <li>• Paperwork done in half the time</li>
                <li>• Get your Sundays back</li>
                <li>• Actually leave on time</li>
                <li>• Sleep better at night</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center mt-8 text-charcoal/60">
            These are all things we actually do at The Anchor. Pick what matters most to you.
          </p>
        </div>

        {/* Training Section */}
        <div className="bg-teal text-white rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-4 text-center">Learn to Use AI Yourself</h3>
          <p className="mb-8 text-center text-cream/90">
            Personal training on using AI for the boring bits, so you can focus on customers.
          </p>
          
          {/* Individual Training */}
          <div className="mb-8">
            <h4 className="text-lg font-semibold mb-4">Individual Training</h4>
            <div className="grid md:grid-cols-3 gap-4">
              {trainingOptions.map((option) => (
                <div key={option.name} className="bg-teal-dark/30 rounded-lg p-4">
                  <h5 className="font-semibold mb-1">{option.name}</h5>
                  <p className="text-sm mb-2">{option.duration} - {option.price}</p>
                  <p className="text-xs opacity-80">{option.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Group Training */}
          <div className="border-t border-cream/20 pt-6">
            <h4 className="text-lg font-semibold mb-4">Group Training (up to 6 people)</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-teal-dark/30 rounded-lg p-4">
                <h5 className="font-semibold">Half Day Workshop</h5>
                <p className="text-sm">{PRICING.services.teamTraining.halfDay.display}</p>
                <p className="text-xs opacity-80 mt-1">Perfect for pub groups or local publicans</p>
              </div>
              <div className="bg-teal-dark/30 rounded-lg p-4">
                <h5 className="font-semibold">Full Day Intensive</h5>
                <p className="text-sm">{PRICING.services.teamTraining.fullDay.display}</p>
                <p className="text-xs opacity-80 mt-1">Comprehensive training for teams</p>
              </div>
            </div>
            <div className="text-center">
              <WhatsAppButton 
                text={MESSAGES.whatsapp.training} 
                variant="secondary"
                size="medium"
              />
            </div>
          </div>
        </div>
      </Section>


      <Section background="orange-light" padding="small">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-4">Why Our Pricing is Fair</h3>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Based on {PRICING.hourlyRate.display} professional rate
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Everything tested at The Anchor first
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              No hidden fees or surprises
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Cancel anytime (no contracts)
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Payment plans available
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              All prices shown + VAT
            </div>
          </div>
          <p className="text-xs mt-4 text-charcoal/60">
            *Travel included within 30 miles of Stanwell. Small charge may apply for longer distances.
          </p>
        </div>
      </Section>

      <CTASection
        title="Your Problems Are Unique - Let's Talk"
        subtitle="These services are just the start. Tell me what's really affecting you and your pub, and we'll create something that actually helps."
        whatsappMessage={MESSAGES.whatsapp.notListed}
        buttonText="Let's Create a Solution"
      />
    </>
  );
}
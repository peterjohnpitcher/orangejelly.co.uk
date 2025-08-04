import Hero from '@/components/Hero';
import Section from '@/components/Section';
import ServiceCard from '@/components/ServiceCard';
import CTASection from '@/components/CTASection';
import WhatsAppButton from '@/components/WhatsAppButton';
import Breadcrumb, { breadcrumbPaths } from '@/components/Breadcrumb';
import RelatedLinks, { linkClusters } from '@/components/RelatedLinks';
import { PRICING, MESSAGES, CONTACT } from '@/lib/constants';
import Text from '@/components/Text';
import Heading from '@/components/Heading';
import { generateMetadata } from '@/lib/metadata';
import { FAQSchema } from '@/components/StructuredData';
import { SpeakableContent } from '@/components/SpeakableContent';
import Partnerships from '@/components/Partnerships';

export const metadata = generateMetadata({
  title: 'Pub Recovery Services - Turn Your Empty Nights Into Profitable Ones',
  description: 'How do I fill my empty pub on Tuesday nights? How can I increase pub food sales? Orange Jelly offers proven pub recovery services that deliver results within 30 days. £62.50 per hour plus VAT. AI training and consulting for UK licensees.',
  path: '/services',
});

export default function Services() {
  // Comprehensive FAQ data for services page
  const servicesFAQs = [
    // Empty Pub Recovery FAQs
    {
      question: "How does the Empty Pub Recovery Package work?",
      answer: "We work with you to implement AI-powered marketing strategies that have been proven at The Anchor. This includes training on social media automation, event promotion, and customer engagement. We charge £62.50 per hour plus VAT, and offer a 30-day money-back guarantee."
    },
    {
      question: "How does your hourly consulting work?",
      answer: "We charge £62.50 per hour plus VAT as a flat rate. I'll work with you to implement the AI strategies that have transformed The Anchor - from social media automation to event planning. First training session with a pub chain scheduled September 2025."
    },
    {
      question: "How quickly will I see more customers from the recovery package?",
      answer: "Results vary by pub, but at The Anchor we've seen quiz nights grow from 20 to 25-35 regulars, tasting nights with 85% retention, and 60,000-70,000 social media views monthly. Most improvements show within 30 days."
    },
    // Menu Makeover FAQs
    {
      question: "How can menu descriptions increase my food sales?",
      answer: "Psychology-based menu descriptions guide customers to order more profitable dishes and increase average spend by £7 per table. We use proven techniques like sensory language, storytelling, and strategic positioning that have increased food GP by up to 15% for our clients."
    },
    {
      question: "What's the ROI on menu optimization?",
      answer: "At The Anchor, we improved food GP from 58% to 71%. Menu psychology can increase average spend significantly. We charge £62.50 per hour for consultation, and most menu reviews take 2-3 hours."
    },
    {
      question: "How long does a menu makeover take?",
      answer: "We deliver your new menu within 3-5 business days. You'll get both digital versions for online/social media and print-ready files. Implementation is immediate - you can start using the new descriptions right away."
    },
    // Marketing Service FAQs
    {
      question: "What's included in the Done-For-You marketing service?",
      answer: "We create all your social media content, post to all channels, design and promote events, run email campaigns, and provide monthly ROI reports. You don't touch anything - we handle it all while you serve the extra customers."
    },
    {
      question: "How much value can AI marketing add?",
      answer: "We've added £75,000-£100,000 of value to The Anchor using AI. It delivers 120-150 hours worth of equivalent work per week. We charge £62.50 per hour to teach you the same strategies."
    },
    // Website FAQs
    {
      question: "Why do I need a website when I have social media?",
      answer: "80% of people check a pub's website before visiting. Without one, you're invisible on Google and losing £1000s in bookings to competitors. Our websites get you on Google's first page and convert browsers into bookings - one pub saw £4,000 extra bookings in 3 months."
    },
    {
      question: "What makes your pub websites different?",
      answer: "Built specifically for pubs with integrated booking systems, mobile-first design (80% browse on phones), and local SEO that gets you found. Plus, we handle all updates for you. Live in 2 weeks, typically see ROI within 8 weeks."
    },
    // Business Analysis FAQs
    {
      question: "How can business analysis help my struggling pub?",
      answer: "We find the money you're leaving on the table - typically 15-20% profit improvement. That's £2,000+ extra per month for most pubs through better pricing (most undercharge by 20%), cost reduction without quality loss, and strategic competitive positioning."
    },
    {
      question: "What's included in business analysis consulting?",
      answer: "Complete profit leak analysis, competitor research, pricing optimisation review, cost reduction opportunities, 90-day improvement plan, and ongoing support. Delivered within 7 days, with most pubs seeing profit increases within 30 days."
    },
    // Training FAQs
    {
      question: "What will I learn in the AI training for licensees?",
      answer: "How to add 25 hours of value weekly using AI: create rotas in minutes, write menus that sell, automate social media (60,000+ views monthly at The Anchor), handle bookings while you sleep, and use AI for all the boring bits so you can focus on customers. No tech knowledge needed."
    },
    {
      question: "Is AI training suitable for someone who's not tech-savvy?",
      answer: "Absolutely! We're licensees, not tech experts. Our training is designed for busy pub owners who want practical solutions, not complicated technology. We focus on simple tools that save time immediately."
    },
    // General FAQs
    {
      question: "Do you offer payment plans?",
      answer: "Yes, we offer flexible payment plans to spread the cost. We understand cash flow challenges in hospitality. Let's discuss what works for your budget - most packages can be split into 2-3 monthly payments."
    },
    {
      question: "What if I'm not happy with the results?",
      answer: "We offer a 30-day money-back guarantee on most services. If we don't deliver the promised results, you get a full refund. We're confident because these strategies work - we use them in our own pub."
    },
    {
      question: "Can I pick and mix services?",
      answer: "Of course! Every pub has different needs. Start with your biggest pain point, see the results, then add more services as needed. Many pubs start with a menu makeover then add marketing once they see the impact."
    },
    {
      question: "How is Orange Jelly different from other marketing agencies?",
      answer: "We actually run a pub - The Anchor in Stanwell Moor. We're not marketers who've never pulled a pint. Every strategy we recommend has been tested in our own business first. Plus, we guarantee results or your money back."
    }
  ];

  // Generate comprehensive Service schema
  const generateServiceSchema = () => {
    const serviceSchemas = [
      {
        "@type": "Service",
        "@id": "https://www.orangejelly.co.uk/services#empty-pub-recovery",
        "name": "Empty Pub Recovery Package",
        "description": "Empty nights killing your profits? Try our proven recovery system risk-free for 30 days. Get customers back through the door with guaranteed results or your money back.",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Empty Pub Recovery",
          "itemListElement": [{
            "@type": "Offer",
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            },
            "validFrom": "2025-01-01",
            "availability": "https://schema.org/InStock",
            "url": "https://www.orangejelly.co.uk/services#empty-pub-recovery"
          }]
        },
      },
      {
        "@type": "Service",
        "@id": "https://www.orangejelly.co.uk/services#boost-food-sales",
        "name": "Boost Food Sales Service",
        "description": "Customers always ordering the cheapest items? Transform your menu into a profit-driving sales tool. Proven to increase average spend by 28% with psychology-based descriptions.",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        "areaServed": {
          "@type": "Country",
          "name": "United Kingdom"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Boost Food Sales Service",
          "itemListElement": [{
            "@type": "Offer",
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
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
        "@id": "https://www.orangejelly.co.uk/services#done-for-you-marketing",
        "name": "Done-For-You Pub Marketing",
        "description": "No time for marketing? Quiet nights stay quiet? We create all your content, manage your social media, and fill your pub. Proven to double Tuesday night covers.",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Marketing Services",
          "itemListElement": [{
            "@type": "Offer",
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false,
              "billingDuration": "P1M"
            }
          }]
        }
      },
      {
        "@type": "Service",
        "@id": "https://www.orangejelly.co.uk/services#website",
        "name": "Website That Actually Works",
        "description": "A simple website that gets you bookings, works on phones, and you can update yourself. Professional design with booking system integration.",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Website Development",
          "itemListElement": [{
            "@type": "Offer",
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
              "priceCurrency": "GBP",
              "valueAddedTaxIncluded": false
            }
          }]
        },
        "serviceOutput": "Professional responsive website"
      },
      {
        "@type": "Service",
        "@id": "https://www.orangejelly.co.uk/services#business",
        "name": "Find Hidden Money",
        "description": "Fresh eyes on your business (with AI help) to spot opportunities you're too busy to see. Competitor analysis, pricing recommendations, and action plan.",
        "provider": {
          "@id": "https://www.orangejelly.co.uk/#organization"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Business Analysis",
          "itemListElement": [{
            "@type": "Offer",
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
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
      "@id": "https://www.orangejelly.co.uk/services#training",
      "name": "AI Training for licensees",
      "description": "Personal training on using AI for the boring bits, so you can focus on customers.",
      "provider": {
        "@id": "https://www.orangejelly.co.uk/#organization"
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
            "price": "62.50",
            "priceCurrency": "GBP",
            "priceSpecification": {
              "@type": "PriceSpecification",
              "price": "62.50",
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
            "price": "250",
            "priceCurrency": "GBP"
          }
        },
        {
          "@type": "CourseInstance",
          "name": "Full Day Training",
          "duration": "PT8H",
          "offers": {
            "@type": "Offer",
            "price": "500",
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
      id: 'empty-pub-recovery',
      emoji: '⏰',
      title: 'Empty Pub Recovery Package',
      problem: '"My pub is dead on weeknights and I\'m bleeding money"',
      description: 'Empty Tuesday nights? Half-empty dining room? We\'ll fill your quiet periods within 30 days or your money back. Proven system that transformed our own pub at The Anchor.',
      features: [
        'Fill your quiet nights in 30 days',
        'Complete marketing system setup',
        'Event promotions that actually work',
        'Personal training included',
        'Money back if we don\'t increase covers by 25%'
      ],
      price: '£62.50 per hour plus VAT',
      timeline: 'Flexible based on your needs',
      highlight: true,
      example: {
        result: 'The Anchor: 25-35 quiz regulars, 85% tasting night retention'
      }
    },
    {
      id: 'boost-food-sales',
      emoji: '💷',
      title: 'Boost Food Sales Service',
      problem: '"Food sales are flat and people only order chips"',
      description: 'Low food GP? Customers ordering the cheapest items? Our psychology-based menu makeover increases average spend by 28% - that\'s £7 more per table. Pays for itself in one weekend.',
      features: [
        'Turn browsers into buyers',
        'Guide customers to profitable dishes',
        'Descriptions that sell themselves',
        'Strategic pricing that works',
        'Digital and print-ready versions'
      ],
      price: '£62.50 per hour plus VAT',
      timeline: 'Typically 2-3 hours for full menu review',
      example: {
        before: '"Roast beef and vegetables"',
        after: '"Slow-roasted Hereford beef with honey-glazed carrots, crispy roast potatoes and rich gravy"',
        result: 'Average spend up £7/table, food GP up 15%'
      }
    },
    {
      id: 'done-for-you-marketing',
      emoji: '📱',
      title: 'Done-For-You Pub Marketing',
      problem: '"I have no time for social media and my events are flopping"',
      description: 'Too busy to post? Events not pulling crowds? Learn how we achieve 60,000-70,000 social media views monthly at The Anchor using AI. Quiz nights grew from 20 to 25-35 regulars.',
      features: [
        'We create all your content',
        'Post to all your channels',
        'Event promotion that fills seats',
        'Email campaigns that work',
        'Monthly reports showing ROI',
        'You just serve the extra customers'
      ],
      price: '£62.50 per hour plus VAT',
      timeline: 'Training on AI tools you can use yourself',
      example: {
        result: 'Tuesday revenue up 180%, Facebook reach up 400%'
      }
    },
    {
      id: 'website',
      emoji: '🔍',
      title: 'Get Found Online',
      problem: '"We\'re invisible on Google and losing bookings to competitors"',
      description: 'Missing out on £1000s because people can\'t find you online? Our websites get you on Google\'s first page and convert browsers into bookings. One pub saw 40% more bookings in month one.',
      features: [
        'First page of Google in 60 days',
        'Mobile-first (80% browse on phones)',
        'Online bookings save 2 hours/day',
        'Showcase your best features',
        'Updates done for you',
        'Guidance on best platforms for pubs'
      ],
      price: '£62.50 per hour plus VAT',
      timeline: 'Consultation on website strategy',
      example: {
        result: '£4,000 extra bookings in first 3 months'
      }
    },
    {
      id: 'business',
      emoji: '💡',
      title: 'Boost Your Bottom Line',
      problem: '"I\'m working 70 hours a week but barely breaking even"',
      description: 'Busy but not profitable? We\'ll find the £10,000s you\'re leaving on the table. Our analysis typically uncovers 15-20% profit improvement - that\'s £2,000+ extra per month for most pubs.',
      features: [
        'Find hidden profit leaks',
        'Price correctly (most undercharge 20%)',
        'Cut costs without cutting quality',
        'Beat competitors strategically',
        '90-day profit improvement plan'
      ],
      price: '£62.50 per hour plus VAT',
      timeline: 'Initial consultation 2-3 hours',
      example: {
        result: 'Average client adds £2,400/month profit'
      }
    },
    {
      id: 'custom',
      emoji: '🚀',
      title: 'Your Specific Challenge',
      problem: '"My biggest headache isn\'t listed here"',
      description: 'Every pub has unique problems costing them money. Tell us yours - whether it\'s staff chaos, supplier nightmares, or something else. We\'ll create a solution that pays for itself.',
      features: [
        'Staff costing you fortune in overtime?',
        'Drowning in supplier paperwork?',
        'Events not making money?',
        'Systems all over the place?',
        'Something else draining profits?'
      ],
      price: 'Solution designed to your budget',
      timeline: 'Quick wins in days, full fix in weeks',
      highlight: false,
      example: {
        result: 'Custom solutions with guaranteed ROI'
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
      <FAQSchema faqs={servicesFAQs} />
      {/* Note: ProductSchema removed as we don't have fixed package prices or real reviews yet */}
      <SpeakableContent 
        cssSelectors={[
          '.hero-title',
          '.hero-subtitle',
          '.service-card h3',
          '.service-card p',
          '.cta-section h2',
          '.pricing-card h4'
        ]}
        url="/services"
      />
      <Hero
        title="What We Can Help You With"
        subtitle="Featured in BII Autumn 2025 magazine for AI innovation. First pub chain training September 2025."
        showCTA={false}
      />

      {/* Partnerships */}
      <Section background="cream" padding="small">
        <Partnerships variant="compact" />
      </Section>

      <Section background="white">
        <div className="max-w-6xl mx-auto mb-8">
          <Breadcrumb items={breadcrumbPaths.services} />
        </div>
        {/* Free Chat Banner */}
        <div className="text-center mb-12 p-8 bg-gradient-to-r from-orange/10 to-orange/5 rounded-lg border-2 border-orange/20">
          <Heading level={2} align="center" className="mb-4">Let's Have a Quick Chat First</Heading>
          <Text size="lg" className="mb-6 max-w-2xl mx-auto">
            Tell me what's driving you mad about running your pub. I'll share exactly how 
            we fixed the same problems at The Anchor. No sales pitch, just licensee to licensee.
          </Text>
          <WhatsAppButton 
            text={MESSAGES.whatsapp.default} 
            size="medium"
          />
        </div>

        {/* How We Can Help */}
        <Heading level={2} align="center" className="mb-8">Choose What You Need Help With</Heading>
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {services.map((service) => (
            <ServiceCard key={service.id} {...service} />
          ))}
        </div>

        {/* Related Success Stories */}
        <RelatedLinks
          title="See How Other Pubs Solved These Problems"
          subtitle="Real stories from pubs that turned their struggles into success"
          links={[
            {
              title: "From 5 to 50 Sunday Roasts",
              description: "How better menu descriptions transformed The Anchor's Sundays",
              href: "/results#sunday-roast",
              emoji: "🍽️"
            },
            {
              title: "Tuesday Quiz: Now 25-35 Regulars",
              description: "Smart social media strategy that packed our quiet nights",
              href: "/results#social-media",
              emoji: "📱"
            },
            {
              title: "£2,400 Extra Monthly Profit",
              description: "How business analysis uncovered hidden opportunities",
              href: "/results",
              emoji: "💰"
            }
          ]}
          variant="card"
          columns={{ default: 1, md: 3 }}
        />

        {/* Custom Solutions CTA */}
        <div className="bg-gradient-to-r from-teal to-teal-dark text-white rounded-lg p-8 mb-12 mt-12">
          <Heading level={3} align="center" color="white" className="mb-4">Your Problem Costs You Money Every Day</Heading>
          <Text size="lg" align="center" className="mb-6 max-w-3xl mx-auto">
            Whether it's empty tables, staff chaos, or supplier nightmares - every problem has a cost. 
            I'll show you exactly how much it's draining from your profits and create a solution that 
            pays for itself fast. Most pubs see positive ROI within 4 weeks.
          </Text>
          <div className="text-center">
            <WhatsAppButton 
              text="Help me fix my specific problem" 
              variant="secondary"
              size="large"
              className="!bg-white !text-teal hover:!bg-cream"
            />
          </div>
        </div>

        {/* Idea Starters */}
        <div className="bg-white rounded-lg p-8 mb-12 border-2 border-orange/20">
          <Heading level={3} align="center" className="mb-8">More Ways AI Can Help Your Pub</Heading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Heading level={4} color="orange" className="mb-3">⏰ Save Time Daily</Heading>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Write staff rotas in minutes</li>
                <li>• Create supplier orders from photos</li>
                <li>• Answer bookings while you sleep</li>
                <li>• Voice notes → meeting notes</li>
                <li>• Write job ads that work</li>
              </ul>
            </div>
            
            <div>
              <Heading level={4} color="orange" className="mb-3">💷 Make More Money</Heading>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• "Today's specials" that sell out</li>
                <li>• Wine descriptions that upsell</li>
                <li>• Turn slow stock into bestsellers</li>
                <li>• Smart pricing from competitors</li>
                <li>• Find your profit champions</li>
              </ul>
            </div>
            
            <div>
              <Heading level={4} color="orange" className="mb-3">📈 Get Busier</Heading>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Match day posts automatically</li>
                <li>• "We miss you" to old regulars</li>
                <li>• Weather-based promotions</li>
                <li>• Event posters that pop</li>
                <li>• Stress-free review replies</li>
              </ul>
            </div>
            
            <div>
              <Heading level={4} color="orange" className="mb-3">🎯 Fix Headaches</Heading>
              <ul className="space-y-2 text-sm text-charcoal/80">
                <li>• Never run out of anything</li>
                <li>• Paperwork done in half the time</li>
                <li>• Get your Sundays back</li>
                <li>• Actually leave on time</li>
                <li>• Sleep better at night</li>
              </ul>
            </div>
          </div>
          
          <Text align="center" className="mt-8 text-charcoal/60">
            These are all things we actually do at The Anchor. Pick what matters most to you.
          </Text>
        </div>

        {/* Training Section */}
        <div className="bg-teal text-white rounded-lg p-8">
          <Heading level={3} align="center" color="white" className="mb-4">Learn to Use AI Yourself</Heading>
          <Text className="mb-8 text-cream/90" align="center">
            Personal training on using AI for the boring bits, so you can focus on customers.
          </Text>
          
          {/* Individual Training */}
          <div className="mb-8">
            <Heading level={4} color="white" className="mb-4">Individual Training</Heading>
            <div className="grid md:grid-cols-3 gap-4">
              {trainingOptions.map((option) => (
                <div key={option.name} className="bg-teal-dark/30 rounded-lg p-4">
                  <Heading level={4} color="white" className="mb-1">{option.name}</Heading>
                  <Text size="sm" className="mb-2">{option.duration} - {option.price}</Text>
                  <Text size="xs" className="opacity-80">{option.description}</Text>
                </div>
              ))}
            </div>
          </div>

          {/* Group Training */}
          <div className="border-t border-cream/20 pt-6">
            <Heading level={4} color="white" className="mb-4">Group Training (up to 6 people)</Heading>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-teal-dark/30 rounded-lg p-4">
                <Heading level={4} color="white">Half Day Workshop</Heading>
                <Text size="sm">{PRICING.services.teamTraining.halfDay.display}</Text>
                <Text size="xs" className="opacity-80 mt-1">Perfect for pub groups or local licensees</Text>
              </div>
              <div className="bg-teal-dark/30 rounded-lg p-4">
                <Heading level={4} color="white">Full Day Intensive</Heading>
                <Text size="sm">{PRICING.services.teamTraining.fullDay.display}</Text>
                <Text size="xs" className="opacity-80 mt-1">Comprehensive training for teams</Text>
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
          <Heading level={3} align="center" className="mb-4">Every Package Designed for Profit</Heading>
          <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto text-sm">
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Average ROI: 300-500% in year one
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Results guaranteed or money back
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Most packages pay for themselves in 30 days
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              No contracts - stop when you want
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              Payment plans to spread the cost
            </div>
            <div className="flex items-center justify-center">
              <span className="text-orange mr-2">✓</span>
              All prices clearly shown + VAT
            </div>
          </div>
          <Text size="xs" className="mt-4 text-charcoal/60">
            *Travel included within 30 miles of Stanwell. Small charge may apply for longer distances.
          </Text>
        </div>
      </Section>

      <CTASection
        title="Not Sure What ROI You'll Get?"
        subtitle="Every pub is different. Tell me your biggest problem and current numbers - I'll calculate exactly how much extra profit our solution will generate. Most see 3-5x return in year one."
        whatsappMessage="I want to calculate my potential ROI"
        buttonText="Calculate My ROI"
      />
    </>
  );
}
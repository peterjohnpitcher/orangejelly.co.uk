// Voice search optimized content component
// Structures content to answer common voice queries naturally

interface VoiceSearchContentProps {
  question: string;
  answer: string;
  schema?: boolean;
  className?: string;
}

export default function VoiceSearchContent({
  question,
  answer,
  schema = true,
  className = ''
}: VoiceSearchContentProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Question",
    "name": question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": answer
    }
  };

  return (
    <div className={`voice-search-content ${className}`}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      )}
      <h3 className="text-lg font-semibold mb-2 text-charcoal">
        {question}
      </h3>
      <p className="text-charcoal/80 leading-relaxed">
        {answer}
      </p>
    </div>
  );
}

interface VoiceSearchSectionProps {
  title: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
  className?: string;
}

export function VoiceSearchSection({
  title,
  items,
  className = ''
}: VoiceSearchSectionProps) {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": items.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className={`voice-search-section ${className}`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <h2 className="text-2xl font-bold mb-6 text-center">{title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((item, index) => (
          <VoiceSearchContent
            key={index}
            question={item.question}
            answer={item.answer}
            schema={false} // Already included in section schema
          />
        ))}
      </div>
    </section>
  );
}

// Common voice search queries for pubs
export const commonPubQueries = [
  {
    question: "How can I get more customers in my pub?",
    answer: "Orange Jelly helps UK pubs attract more customers through AI-powered marketing, menu optimization, and social media automation. Our proven strategies have helped pubs increase covers by up to 300%."
  },
  {
    question: "How much does pub marketing cost?",
    answer: "Orange Jelly's pub marketing services start from £99+VAT for menu makeovers, with full marketing packages from £499+VAT. All services include a money-back guarantee if you don't save at least 5 hours per week."
  },
  {
    question: "What's the best way to promote my pub?",
    answer: "The most effective pub promotion combines compelling social media content, optimized menus that sell high-margin items, and targeted local marketing. Orange Jelly automates these tasks using AI, saving you 5+ hours weekly."
  },
  {
    question: "How do I fill my pub on quiet nights?",
    answer: "Orange Jelly specializes in filling quiet nights like Tuesdays. We create targeted promotions, quiz nights, and special events that work. The Anchor went from 20 to 60+ covers on Tuesday nights using our strategies."
  }
];
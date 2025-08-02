import Card from './Card';

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  icon?: string;
}

export default function FAQItem({ question, answer, icon }: FAQItemProps) {
  return (
    <Card variant="shadowed">
      <h3 className="font-semibold text-lg mb-2 flex items-start">
        {icon && <span className="mr-2">{icon}</span>}
        {question}
      </h3>
      <div className="text-charcoal/80">
        {typeof answer === 'string' ? <p>{answer}</p> : answer}
      </div>
    </Card>
  );
}
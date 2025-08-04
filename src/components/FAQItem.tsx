import Card from './Card';
import Heading from './Heading';
import Text from './Text';

interface FAQItemProps {
  question: string;
  answer: string | React.ReactNode;
  icon?: string;
}

export default function FAQItem({ question, answer, icon }: FAQItemProps) {
  return (
    <Card variant="shadowed">
      <Heading level={3} className="mb-2 flex items-start">
        {icon && <span className="mr-2">{icon}</span>}
        {question}
      </Heading>
      <div className="text-charcoal/80">
        {typeof answer === 'string' ? <Text>{answer}</Text> : answer}
      </div>
    </Card>
  );
}
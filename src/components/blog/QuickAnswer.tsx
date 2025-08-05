import React from 'react';
import Heading from '@/components/Heading';
import Text from '@/components/Text';
import Card from '@/components/Card';

interface QuickAnswerProps {
  answer: string;
  className?: string;
}

export default function QuickAnswer({ answer, className = '' }: QuickAnswerProps) {
  if (!answer) return null;

  return (
    <Card 
      variant="colored" 
      background="orange-light" 
      className={`border-l-4 border-orange ${className}`}
    >
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 text-2xl">🎯</div>
        <div>
          <Heading level={4} className="mb-2 text-orange-dark">
            Quick Answer
          </Heading>
          <Text className="font-medium leading-relaxed">
            {answer}
          </Text>
        </div>
      </div>
    </Card>
  );
}
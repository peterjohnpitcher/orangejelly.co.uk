'use client';

import { useState } from 'react';
import { Form, Input, FormButton } from '@/components/forms';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');
    
    // TODO: Implement actual newsletter subscription
    console.log('Newsletter signup:', email);
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <Form 
      className={`max-w-md mx-auto flex gap-4 ${className}`}
      onSubmit={handleSubmit}
    >
      <Input
        type="email"
        placeholder="Your email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="flex-1"
        disabled={status === 'loading'}
      />
      <FormButton 
        variant="primary" 
        size="md"
        loading={status === 'loading'}
        loadingText="Subscribing..."
      >
        {status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
      </FormButton>
    </Form>
  );
}
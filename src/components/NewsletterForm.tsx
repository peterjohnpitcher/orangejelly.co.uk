'use client';

import { useState } from 'react';
import { Form, Input, FormButton } from '@/components/forms';
import { newsletterSchema, type NewsletterFormData } from '@/lib/validation';
import { useFormValidation } from '@/hooks/useFormValidation';

interface NewsletterFormProps {
  className?: string;
}

export default function NewsletterForm({ className = '' }: NewsletterFormProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const { errors, isSubmitting, validateField, handleSubmit } = useFormValidation<NewsletterFormData>({
    schema: newsletterSchema,
    onSubmit: async (data) => {
      // TODO: Implement actual newsletter subscription
      console.log('Newsletter signup validated:', data);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    },
  });

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit({ email });
  };

  return (
    <Form 
      className={`max-w-md mx-auto ${className}`}
      onSubmit={onSubmit}
      loading={isSubmitting}
    >
      <div className="flex gap-4">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateField('email', e.target.value);
          }}
          onBlur={(e) => validateField('email', e.target.value)}
          error={errors.email}
          required
          className="flex-1"
          disabled={isSubmitting}
          aria-label="Email address for newsletter"
          aria-describedby={errors.email ? 'email-error' : undefined}
          aria-invalid={!!errors.email}
        />
        <FormButton 
          variant="primary" 
          size="md"
          loading={isSubmitting}
          loadingText="Subscribing..."
          disabled={isSubmitting || status === 'success'}
          aria-label={status === 'success' ? 'Successfully subscribed' : 'Subscribe to newsletter'}
        >
          {status === 'success' ? '✓ Subscribed!' : 'Subscribe'}
        </FormButton>
      </div>
      {errors.form && (
        <p className="mt-2 text-sm text-red-600" role="alert">{errors.form}</p>
      )}
    </Form>
  );
}
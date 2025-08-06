'use client';

import { useState } from 'react';
import Form from './Form';
import Input from './Input';
import FormButton from './FormButton';
import { contactFormSchema, type ContactFormData, sanitizeInput } from '@/lib/validation';
import { useFormValidation } from '@/hooks/useFormValidation';

interface ContactFormProps {
  className?: string;
  onSuccess?: () => void;
}

export default function ContactForm({ className = '', onSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    pubName: '',
    message: '',
  });

  const { errors, isSubmitting, validateField, handleSubmit } = useFormValidation<ContactFormData>({
    schema: contactFormSchema,
    onSubmit: async (data) => {
      // Sanitize all inputs before submission
      const sanitizedData = {
        name: sanitizeInput(data.name),
        email: sanitizeInput(data.email),
        phone: data.phone ? sanitizeInput(data.phone) : undefined,
        pubName: sanitizeInput(data.pubName),
        message: sanitizeInput(data.message),
      };

      // TODO: Implement actual form submission
      console.log('Contact form submitted:', sanitizedData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form on success
      setFormData({
        name: '',
        email: '',
        phone: '',
        pubName: '',
        message: '',
      });
      
      onSuccess?.();
    },
  });

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSubmit(formData);
  };

  return (
    <Form
      className={`space-y-6 ${className}`}
      onSubmit={onSubmit}
      loading={isSubmitting}
      noValidate // Use our custom validation
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="Your Name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          onBlur={(e) => validateField('name', e.target.value)}
          error={errors.name}
          required
          fullWidth
          autoComplete="name"
          disabled={isSubmitting}
        />

        <Input
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          onBlur={(e) => validateField('email', e.target.value)}
          error={errors.email}
          required
          fullWidth
          autoComplete="email"
          disabled={isSubmitting}
        />

        <Input
          label="Phone Number (Optional)"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
          onBlur={(e) => validateField('phone', e.target.value)}
          error={errors.phone}
          fullWidth
          autoComplete="tel"
          disabled={isSubmitting}
          helperText="UK mobile or landline"
        />

        <Input
          label="Pub Name"
          name="pubName"
          type="text"
          value={formData.pubName}
          onChange={(e) => handleInputChange('pubName', e.target.value)}
          onBlur={(e) => validateField('pubName', e.target.value)}
          error={errors.pubName}
          required
          fullWidth
          autoComplete="organization"
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-sm font-medium text-charcoal mb-2"
        >
          How can we help?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          onBlur={(e) => validateField('message', e.target.value)}
          className={`
            w-full px-4 py-3 rounded-lg border-2 transition-all
            bg-white border-charcoal/20 focus:border-orange
            focus:outline-none focus:ring-2 focus:ring-orange/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${errors.message ? 'border-red-500 focus:border-red-500' : ''}
          `}
          required
          disabled={isSubmitting}
          aria-describedby={errors.message ? 'message-error' : undefined}
          aria-invalid={!!errors.message}
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      {errors.form && (
        <p className="text-sm text-red-600" role="alert">{errors.form}</p>
      )}

      <FormButton
        variant="primary"
        size="lg"
        loading={isSubmitting}
        loadingText="Sending..."
        fullWidth
      >
        Send Message
      </FormButton>

      <p className="text-sm text-charcoal/60 text-center">
        We'll respond within 24 hours. For urgent matters, WhatsApp us at 07941 266538.
      </p>
    </Form>
  );
}
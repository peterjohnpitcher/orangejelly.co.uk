import { z } from 'zod';

// Common validation schemas
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address')
  .toLowerCase()
  .trim();

export const phoneSchema = z
  .string()
  .min(1, 'Phone number is required')
  .regex(
    /^(\+44|0)?[1-9]\d{9,10}$/,
    'Please enter a valid UK phone number'
  );

export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .min(2, 'Name must be at least 2 characters')
  .max(50, 'Name must be less than 50 characters')
  .trim();

export const messageSchema = z
  .string()
  .min(1, 'Message is required')
  .min(10, 'Message must be at least 10 characters')
  .max(1000, 'Message must be less than 1000 characters')
  .trim();

// Newsletter form schema
export const newsletterSchema = z.object({
  email: emailSchema,
});

// Contact form schema (for future use)
export const contactFormSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema.optional(),
  pubName: z.string().min(1, 'Pub name is required').trim(),
  message: messageSchema,
});

// Type exports
export type NewsletterFormData = z.infer<typeof newsletterSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Validation helper
export function validateForm<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): { success: true; data: T } | { success: false; errors: Record<string, string> } {
  try {
    const validatedData = schema.parse(data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((issue) => {
        if (issue.path.length > 0) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { form: 'Validation failed' } };
  }
}

// Sanitization helpers
export function sanitizeInput(input: string): string {
  // Remove any HTML tags
  const withoutTags = input.replace(/<[^>]*>/g, '');
  // Remove any script tags content
  const withoutScripts = withoutTags.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
  // Trim whitespace
  return withoutScripts.trim();
}

// XSS prevention for display
export function escapeHtml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
export default {
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Brief description or tagline',
    },
    {
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      rows: 3,
      description: 'What challenge was faced',
    },
    {
      name: 'failed',
      title: 'What Failed',
      type: 'text',
      rows: 3,
      description: 'What we tried that didn\'t work',
    },
    {
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      rows: 3,
      description: 'What actually worked',
    },
    {
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of achieved results',
    },
    {
      name: 'timeInvestment',
      title: 'Time Investment',
      type: 'string',
      description: 'e.g., "4 hours setup, 2 hours per month"',
    },
    {
      name: 'learnings',
      title: 'Key Learnings',
      type: 'text',
      rows: 3,
      description: 'Insights and takeaways',
    },
    {
      name: 'quote',
      title: 'Customer Quote',
      type: 'text',
      rows: 2,
      description: 'Testimonial or feedback',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      order: 'order',
    },
    prepare(selection: any) {
      const { title, subtitle, order } = selection;
      return {
        title,
        subtitle: `#${order || 0} - ${subtitle || 'No subtitle'}`,
      };
    },
  },
};
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Optional emoji for the service card',
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    },
    {
      name: 'problem',
      title: 'Problem Statement',
      type: 'text',
      rows: 2,
      description: 'The problem this service solves',
    },
    {
      name: 'deliverable',
      title: 'Deliverable',
      type: 'string',
      description: 'Clear, specific deliverable',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
    },
    {
      name: 'timeEstimate',
      title: 'Time Estimate',
      type: 'string',
      description: 'e.g., "6 hours per month"',
    },
    {
      name: 'priceBreakdown',
      title: 'Price Breakdown',
      type: 'string',
      description: 'e.g., "6 hours × £62.50 = £375 + VAT"',
    },
    {
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Display price, e.g., "£375 + VAT"',
    },
    {
      name: 'timeline',
      title: 'Timeline',
      type: 'string',
      description: 'e.g., "Results in 2-3 weeks"',
    },
    {
      name: 'highlight',
      title: 'Highlight',
      type: 'boolean',
      description: 'Featured service?',
      initialValue: false,
    },
    {
      name: 'example',
      title: 'Example/Case Study',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before',
          type: 'string',
          description: 'Situation before the service',
        },
        {
          name: 'after',
          title: 'After',
          type: 'string',
          description: 'Situation after the service',
        },
        {
          name: 'result',
          title: 'Result',
          type: 'string',
          description: 'The measurable outcome',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'deliverable',
      order: 'order',
    },
    prepare(selection: any) {
      const { title, subtitle, order } = selection;
      return {
        title,
        subtitle: `#${order || 0} - ${subtitle || 'No deliverable'}`,
      };
    },
  },
};
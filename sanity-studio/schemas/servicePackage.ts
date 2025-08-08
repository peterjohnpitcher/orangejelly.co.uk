import { defineType } from 'sanity';

export default defineType({
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  fields: [
    {
      name: 'id',
      title: 'Service ID',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'emoji',
      title: 'Service Emoji',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'problem',
      title: 'Problem Statement',
      type: 'string',
      description: 'The problem this service solves',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'deliverable',
      title: 'Deliverable',
      type: 'string',
      description: 'What the customer gets',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Service Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'features',
      title: 'Service Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'example',
      title: 'Success Example',
      type: 'object',
      fields: [
        {
          name: 'before',
          title: 'Before',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'after',
          title: 'After',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'result',
          title: 'Result',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
    },
    {
      name: 'timeEstimate',
      title: 'Time Estimate',
      type: 'string',
      description: 'How long this service typically takes',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'priceBreakdown',
      title: 'Price Breakdown',
      type: 'string',
      description: 'Optional detailed price breakdown for complex services',
    },
    {
      name: 'price',
      title: 'Price Display',
      type: 'string',
      description: 'How price is displayed (e.g., "£62.50/hour + VAT")',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'highlight',
      title: 'Highlight Service',
      type: 'boolean',
      description: 'Mark this service as highlighted/featured',
      initialValue: false,
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which this service appears on the page',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this service is currently offered',
      initialValue: true,
    },
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'order',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Title A-Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'problem',
      media: 'emoji',
      order: 'order',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, order, active } = selection;
      return {
        title: `${order}. ${title}`,
        subtitle: `${active ? '✅' : '❌'} ${subtitle}`,
      };
    },
  },
});
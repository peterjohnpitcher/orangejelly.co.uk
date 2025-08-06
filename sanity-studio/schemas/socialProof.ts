import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'socialProof',
  title: 'Social Proof',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The achievement or metric',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The specific number or result (e.g., "£400+", "80%", "25-35")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      description: 'When this was achieved (e.g., "per week", "monthly", "since 2019")',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where this happened (e.g., "The Anchor", "Sunday lunch")',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Revenue', value: 'revenue' },
          { title: 'Attendance', value: 'attendance' },
          { title: 'Efficiency', value: 'efficiency' },
          { title: 'Growth', value: 'growth' },
          { title: 'Cost Savings', value: 'savings' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayText',
      title: 'Display Text',
      type: 'string',
      description: 'Full text to display in notifications (e.g., "Sunday roast sales up £400+ per week")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display (lower numbers first)',
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether to show this proof point',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      value: 'value',
      category: 'category',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, value, category, active } = selection;
      return {
        title: `${title}: ${value}`,
        subtitle: `${category} ${active ? '✓' : '✗'}`,
      };
    },
  },
})
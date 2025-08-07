import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'claims',
  title: 'Claims & Metrics',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Time Saving', value: 'timeSaving' },
          { title: 'Timeline', value: 'timeline' },
          { title: 'Performance', value: 'performance' },
          { title: 'Financial', value: 'financial' },
          { title: 'Guarantee', value: 'guarantee' },
          { title: 'Customer Numbers', value: 'customerNumbers' },
          { title: 'Partnership', value: 'partnership' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'key',
      title: 'Claim Key',
      type: 'string',
      description: 'Unique identifier for this claim (e.g., "hoursSavedWeekly")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'claim',
      title: 'The Claim',
      type: 'string',
      description: 'The actual claim text (e.g., "Save at least 15 hours a week")',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'value',
      title: 'Numeric Value',
      type: 'number',
      description: 'The numeric value if applicable (e.g., 15 for hours saved)',
      hidden: ({ parent }) => !['timeSaving', 'performance', 'financial', 'customerNumbers'].includes(parent?.category)
    }),
    defineField({
      name: 'unit',
      title: 'Unit',
      type: 'string',
      description: 'The unit of measurement (e.g., "hours", "percent", "pounds")',
      hidden: ({ parent }) => parent?.value === undefined || parent?.value === null
    }),
    defineField({
      name: 'context',
      title: 'Context',
      type: 'text',
      description: 'Important context or caveats for this claim',
      rows: 3
    }),
    defineField({
      name: 'timeframe',
      title: 'Timeframe',
      type: 'string',
      description: 'When this result can be expected (e.g., "within 30 days")',
      hidden: ({ parent }) => !['timeline', 'performance'].includes(parent?.category)
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Is this claim currently in use?',
      initialValue: true
    }),
    defineField({
      name: 'priority',
      title: 'Priority',
      type: 'number',
      description: 'Display priority (lower numbers show first)',
      initialValue: 100
    }),
    defineField({
      name: 'lastVerified',
      title: 'Last Verified',
      type: 'date',
      description: 'When was this claim last verified as accurate?'
    }),
    defineField({
      name: 'notes',
      title: 'Internal Notes',
      type: 'text',
      description: 'Internal notes about this claim (not shown to public)',
      rows: 3
    })
  ],
  preview: {
    select: {
      title: 'claim',
      subtitle: 'category',
      active: 'isActive'
    },
    prepare({ title, subtitle, active }) {
      return {
        title: title || 'Untitled Claim',
        subtitle: subtitle ? `${subtitle}${active === false ? ' (Inactive)' : ''}` : undefined
      }
    }
  }
})
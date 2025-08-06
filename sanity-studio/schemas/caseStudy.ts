import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
      description: 'Brief description of the case study',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
      description: 'Optional - leave blank for anonymous case studies',
    }),
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'failedAttempts',
      title: 'What They Tried That Failed',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'List of failed attempts (one per line)',
    }),
    defineField({
      name: 'solution',
      title: 'Our Solution',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'results',
      title: 'Results',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'metric',
              title: 'Metric',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'value',
              title: 'Value',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'improvement',
              title: 'Improvement',
              type: 'string',
              description: 'e.g., "+25%" or "up from 20"',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'timeInvestment',
      title: 'Time Investment',
      type: 'string',
      description: 'e.g., "4 hours setup + 30 mins weekly"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'learnings',
      title: 'Key Learnings',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet points of key takeaways',
    }),
    defineField({
      name: 'quote',
      title: 'Customer Quote',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Quote Text',
          type: 'text',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'author',
          title: 'Author',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          description: 'e.g., "Pub Owner"',
        },
      ],
    }),
    defineField({
      name: 'relatedService',
      title: 'Related Service',
      type: 'reference',
      to: [{ type: 'service' }],
      description: 'Link to the service used in this case study',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle',
      client: 'client',
    },
    prepare(selection) {
      const { title, subtitle, client } = selection
      return {
        title: client ? `${title} - ${client}` : title,
        subtitle,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
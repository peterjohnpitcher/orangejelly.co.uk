import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'resultsMetrics',
  title: 'Results Page Metrics',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
      initialValue: 'Results Metrics',
    }),
    defineField({
      name: 'metricsSection',
      title: 'Key Metrics Section',
      type: 'object',
      fields: [
        defineField({
          name: 'sectionTitle',
          title: 'Section Title',
          type: 'string',
          initialValue: 'The Numbers Don\'t Lie',
        }),
        defineField({
          name: 'metrics',
          title: 'Metrics',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              defineField({
                name: 'value',
                title: 'Value',
                type: 'string',
                validation: Rule => Rule.required(),
              }),
              defineField({
                name: 'label',
                title: 'Label',
                type: 'string',
                validation: Rule => Rule.required(),
              }),
              defineField({
                name: 'highlight',
                title: 'Highlight',
                type: 'boolean',
                initialValue: false,
                description: 'Highlight this metric',
              }),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'heroContent',
      title: 'Hero Content',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'trustSection',
      title: 'Trust Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        }),
      ],
    }),
    defineField({
      name: 'ctaSection',
      title: 'CTA Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
        }),
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Use this content on the results page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active',
    },
    prepare({ title, active }) {
      return {
        title: title || 'Results Metrics',
        subtitle: active ? 'Active' : 'Inactive',
      }
    },
  },
})
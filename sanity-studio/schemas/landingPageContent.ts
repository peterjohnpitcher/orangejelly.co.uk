import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPageContent',
  title: 'Landing Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Page Slug',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'text',
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
        }),
        defineField({
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'emergencyCategories',
      title: 'Emergency Categories',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'items',
            title: 'Items',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
      }],
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'week',
            title: 'Week',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
          }),
          defineField({
            name: 'actions',
            title: 'Actions',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
      }],
    }),
    defineField({
      name: 'strategies',
      title: 'Strategies',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
          }),
          defineField({
            name: 'points',
            title: 'Points',
            type: 'array',
            of: [{ type: 'string' }],
          }),
        ],
      }],
    }),
    defineField({
      name: 'howToSteps',
      title: 'How To Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'step',
            title: 'Step Number',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'title',
            title: 'Title',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'text',
          }),
        ],
      }],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'question',
            title: 'Question',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'answer',
            title: 'Answer',
            type: 'text',
            validation: Rule => Rule.required(),
          }),
        ],
      }],
    }),
    defineField({
      name: 'successMetrics',
      title: 'Success Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
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
              }),
              defineField({
                name: 'label',
                title: 'Label',
                type: 'string',
              }),
              defineField({
                name: 'description',
                title: 'Description',
                type: 'string',
              }),
            ],
          }],
        }),
      ],
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
    },
    prepare({ title, slug }) {
      return {
        title: title || 'Untitled',
        subtitle: slug || 'no-slug',
      }
    },
  },
})
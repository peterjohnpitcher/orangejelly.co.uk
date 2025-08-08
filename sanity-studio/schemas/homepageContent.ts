import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hero',
      title: 'Hero Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'subtitle',
          title: 'Subtitle',
          type: 'string'
        }),
        defineField({
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string'
        }),
        defineField({
          name: 'bottomText',
          title: 'Bottom Text',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'problems',
      title: 'Common Problems',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'emoji',
              title: 'Emoji',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'linkHref',
              title: 'Link Href',
              type: 'string',
              description: 'e.g., /services#empty-pub-recovery'
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'icon',
              title: 'Icon (Emoji)',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: Rule => Rule.required()
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'string',
              validation: Rule => Rule.required()
            })
          ]
        }
      ]
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'object',
      fields: [
        defineField({
          name: 'quizNight',
          title: 'Quiz Night Attendance',
          type: 'string',
          description: 'e.g., "25-35 regulars"'
        }),
        defineField({
          name: 'quizNightContext',
          title: 'Quiz Night Context',
          type: 'string',
          description: 'e.g., "Tuesday quiz (was 20)"'
        }),
        defineField({
          name: 'foodGP',
          title: 'Food GP',
          type: 'string',
          description: 'e.g., "71%"'
        }),
        defineField({
          name: 'foodGPContext',
          title: 'Food GP Context',
          type: 'string',
          description: 'e.g., "Food GP (was 58%)"'
        }),
        defineField({
          name: 'socialViews',
          title: 'Social Media Views',
          type: 'string',
          description: 'e.g., "60-70k"'
        }),
        defineField({
          name: 'socialViewsContext',
          title: 'Social Views Context',
          type: 'string',
          description: 'e.g., "Monthly social views"'
        }),
        defineField({
          name: 'hoursSaved',
          title: 'Hours Saved',
          type: 'string',
          description: 'e.g., "25 hours"'
        }),
        defineField({
          name: 'hoursSavedContext',
          title: 'Hours Saved Context',
          type: 'string',
          description: 'e.g., "Saved weekly with AI"'
        })
      ]
    }),
    defineField({
      name: 'faqs',
      title: 'Homepage FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }]
    }),
    defineField({
      name: 'seo',
      title: 'SEO Metadata',
      type: 'seoMetadata'
    })
  ],
  preview: {
    select: {
      title: 'title'
    }
  }
})
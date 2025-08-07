import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'footerContent',
  title: 'Footer Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Footer Content',
      hidden: true,
    }),
    defineField({
      name: 'brandSection',
      title: 'Brand Section',
      type: 'object',
      fields: [
        {
          name: 'tagline',
          title: 'Brand Tagline',
          type: 'string',
          description: 'e.g., "Save At Least 5 Hours a Week"',
        },
        {
          name: 'showLogo',
          title: 'Show Logo',
          type: 'boolean',
          initialValue: true,
        },
      ],
    }),
    defineField({
      name: 'anchorSection',
      title: 'The Anchor Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show The Anchor Section',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'preText',
          title: 'Pre Text',
          type: 'string',
          description: 'e.g., "Proven Daily At"',
        },
        {
          name: 'url',
          title: 'The Anchor Website URL',
          type: 'url',
        },
        {
          name: 'ctaText',
          title: 'CTA Text',
          type: 'string',
          description: 'e.g., "Visit our pub →"',
        },
      ],
    }),
    defineField({
      name: 'partnershipsSection',
      title: 'Partnerships Section',
      type: 'object',
      fields: [
        {
          name: 'enabled',
          title: 'Show Partnerships',
          type: 'boolean',
          initialValue: true,
        },
        {
          name: 'variant',
          title: 'Display Variant',
          type: 'string',
          options: {
            list: [
              { title: 'Minimal', value: 'minimal' },
              { title: 'Full', value: 'full' },
            ],
          },
          initialValue: 'minimal',
        },
      ],
    }),
    defineField({
      name: 'linkSections',
      title: 'Link Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Section Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'links',
              title: 'Links',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'title',
                      title: 'Link Title',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'href',
                      title: 'Link URL',
                      type: 'string',
                      validation: (Rule) => Rule.required(),
                    },
                    {
                      name: 'external',
                      title: 'External Link',
                      type: 'boolean',
                      initialValue: false,
                    },
                    {
                      name: 'isText',
                      title: 'Display as Text (not a link)',
                      type: 'boolean',
                      initialValue: false,
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'bottomBar',
      title: 'Bottom Bar',
      type: 'object',
      fields: [
        {
          name: 'copyrightText',
          title: 'Copyright Text',
          type: 'string',
          description: 'Use {year} for current year',
          initialValue: '© {year} Orange Jelly Limited',
        },
        {
          name: 'tagline',
          title: 'Company Tagline',
          type: 'string',
          description: 'e.g., "Run by licensees, for licensees"',
        },
      ],
    }),
    defineField({
      name: 'bottomLinks',
      title: 'Bottom Contact Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Link Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Link URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'external',
              title: 'External Link',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'disclaimerText',
      title: 'Disclaimer Text',
      type: 'text',
      rows: 2,
      description: 'Bottom disclaimer text',
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
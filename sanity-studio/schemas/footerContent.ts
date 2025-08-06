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
      name: 'companyInfo',
      title: 'Company Information',
      type: 'object',
      fields: [
        {
          name: 'description',
          title: 'Company Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'registrationInfo',
          title: 'Registration Information',
          type: 'string',
          description: 'e.g., "Company Registration No: 12345678"',
        },
        {
          name: 'vatInfo',
          title: 'VAT Information',
          type: 'string',
          description: 'e.g., "VAT Registration No: GB123456789"',
        },
      ],
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
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
      name: 'services',
      title: 'Services Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Service Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'href',
              title: 'Service URL',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal Links',
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
          ],
        },
      ],
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Contact Title',
          type: 'string',
          initialValue: 'Get in Touch',
        },
        {
          name: 'phone',
          title: 'Phone Number',
          type: 'string',
        },
        {
          name: 'email',
          title: 'Email Address',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'TikTok', value: 'tiktok' },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'label',
              title: 'Accessibility Label',
              type: 'string',
              description: 'e.g., "Follow us on Facebook"',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'newsletter',
      title: 'Newsletter Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Newsletter Title',
          type: 'string',
          initialValue: 'Stay Updated',
        },
        {
          name: 'description',
          title: 'Newsletter Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'buttonText',
          title: 'Subscribe Button Text',
          type: 'string',
          initialValue: 'Subscribe',
        },
        {
          name: 'privacyText',
          title: 'Privacy Text',
          type: 'string',
          description: 'e.g., "We respect your privacy. Unsubscribe anytime."',
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
          initialValue: '© {year} Orange Jelly Limited. All rights reserved.',
        },
        {
          name: 'additionalText',
          title: 'Additional Text',
          type: 'string',
          description: 'e.g., "Made with ❤️ in Stanwell Moor"',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
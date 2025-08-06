import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ctaMessage',
  title: 'CTA Message',
  type: 'document',
  fields: [
    defineField({
      name: 'identifier',
      title: 'Identifier',
      type: 'slug',
      description: 'Unique identifier for this CTA',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'heading',
      title: 'CTA Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'CTA Subheading',
      type: 'text'
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'buttonAction',
      title: 'Button Action',
      type: 'string',
      options: {
        list: [
          { title: 'WhatsApp', value: 'whatsapp' },
          { title: 'Phone Call', value: 'phone' },
          { title: 'Email', value: 'email' },
          { title: 'Internal Link', value: 'internal' },
          { title: 'External Link', value: 'external' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'actionValue',
      title: 'Action Value',
      type: 'string',
      description: 'WhatsApp message, link URL, etc.',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bottomText',
      title: 'Bottom Text',
      type: 'string',
      description: 'Text below the button'
    }),
    defineField({
      name: 'variant',
      title: 'Visual Variant',
      type: 'string',
      options: {
        list: [
          { title: 'Orange Background', value: 'orange' },
          { title: 'Teal Background', value: 'teal' },
          { title: 'White Background', value: 'white' },
          { title: 'Cream Background', value: 'cream' }
        ]
      },
      initialValue: 'orange'
    }),
    defineField({
      name: 'usage',
      title: 'Usage Context',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Where this CTA is used (e.g., "homepage", "services page")',
      options: {
        list: [
          { title: 'Homepage', value: 'homepage' },
          { title: 'Services Page', value: 'services' },
          { title: 'About Page', value: 'about' },
          { title: 'Contact Page', value: 'contact' },
          { title: 'Blog Posts', value: 'blog' },
          { title: 'Landing Pages', value: 'landing' }
        ]
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      heading: 'heading',
      usage: 'usage'
    },
    prepare({ title, heading, usage }) {
      return {
        title,
        subtitle: `${heading} | Used in: ${usage?.join(', ') || 'Not specified'}`
      }
    }
  }
})
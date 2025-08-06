import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serviceDetail',
  title: 'Service Detail',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Service ID',
      type: 'slug',
      validation: Rule => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Emoji to represent this service'
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'problem',
      title: 'Problem Statement',
      type: 'string',
      description: 'What problem does this service solve?',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'deliverable',
      title: 'Key Deliverable',
      type: 'string',
      description: 'What the customer gets',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Full Description',
      type: 'text',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'string' }],
      validation: Rule => Rule.required().min(3)
    }),
    defineField({
      name: 'example',
      title: 'Real Example',
      type: 'string',
      description: 'Real result from The Anchor'
    }),
    defineField({
      name: 'timeEstimate',
      title: 'Time Estimate',
      type: 'string',
      description: 'e.g., "15-25 hours over 30 days"'
    }),
    defineField({
      name: 'priceBreakdown',
      title: 'Price Breakdown',
      type: 'text',
      description: 'Explanation of typical costs'
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight Service',
      type: 'boolean',
      description: 'Show this service as featured/highlighted'
    }),
    defineField({
      name: 'faqs',
      title: 'Service FAQs',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'faq' }] }]
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this service'
    })
  ],
  preview: {
    select: {
      title: 'title',
      emoji: 'emoji',
      highlight: 'highlight'
    },
    prepare({ title, emoji, highlight }) {
      return {
        title: `${emoji ? emoji + ' ' : ''}${title}`,
        subtitle: highlight ? '⭐ Featured' : ''
      }
    }
  }
})
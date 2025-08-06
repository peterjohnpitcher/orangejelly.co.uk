import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
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
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
      description: 'SEO description - max 160 characters',
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'SEO keywords for this page',
    }),
    defineField({
      name: 'heroSection',
      title: 'Hero Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Hero Title',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'subtitle',
          title: 'Hero Subtitle',
          type: 'text',
          rows: 2,
        },
        {
          name: 'ctaText',
          title: 'CTA Button Text',
          type: 'string',
        },
        {
          name: 'ctaLink',
          title: 'CTA Button Link',
          type: 'string',
        },
        {
          name: 'backgroundImage',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    }),
    defineField({
      name: 'contentSections',
      title: 'Content Sections',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'contentBlock' }],
        },
      ],
      description: 'Reusable content blocks for this page',
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'faq' }],
        },
      ],
      description: 'Select FAQs to display on this page',
    }),
    defineField({
      name: 'ctaSettings',
      title: 'CTA Settings',
      type: 'object',
      fields: [
        {
          name: 'primaryCTA',
          title: 'Primary CTA Text',
          type: 'string',
          initialValue: 'Get Started',
        },
        {
          name: 'whatsappMessage',
          title: 'WhatsApp Message',
          type: 'string',
          description: 'Pre-filled WhatsApp message for this page',
        },
        {
          name: 'showCalculator',
          title: 'Show ROI Calculator',
          type: 'boolean',
          initialValue: false,
        },
      ],
    }),
    defineField({
      name: 'isActive',
      title: 'Is Active',
      type: 'boolean',
      initialValue: true,
      description: 'Toggle to show/hide this landing page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'slug.current',
      media: 'heroSection.backgroundImage',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `/${subtitle}`,
      }
    },
  },
})
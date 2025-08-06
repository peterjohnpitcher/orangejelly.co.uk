import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'seoMetadata',
  title: 'SEO Metadata',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page',
      type: 'string',
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Results', value: 'results' },
          { title: 'Contact', value: 'contact' },
          { title: 'Licensees Guide', value: 'licensees-guide' },
          { title: 'Default', value: 'default' },
        ],
      },
    }),
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
      description: 'SEO title - max 60 characters',
    }),
    defineField({
      name: 'description',
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
      name: 'openGraph',
      title: 'Open Graph Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'OG Title',
          type: 'string',
          description: 'Leave blank to use page title',
        },
        {
          name: 'description',
          title: 'OG Description',
          type: 'text',
          rows: 2,
          description: 'Leave blank to use meta description',
        },
        {
          name: 'image',
          title: 'OG Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Recommended: 1200x630px',
        },
      ],
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter Card Settings',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Twitter Title',
          type: 'string',
          description: 'Leave blank to use OG title',
        },
        {
          name: 'description',
          title: 'Twitter Description',
          type: 'text',
          rows: 2,
          description: 'Leave blank to use OG description',
        },
        {
          name: 'image',
          title: 'Twitter Image',
          type: 'image',
          options: {
            hotspot: true,
          },
          description: 'Leave blank to use OG image',
        },
      ],
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave blank for default',
    }),
    defineField({
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      initialValue: false,
      description: 'Prevent search engines from indexing this page',
    }),
    defineField({
      name: 'structuredData',
      title: 'Additional Structured Data',
      type: 'text',
      description: 'Additional JSON-LD structured data (advanced)',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'page',
    },
    prepare(selection) {
      const { title, subtitle } = selection
      return {
        title,
        subtitle: `Page: ${subtitle}`,
      }
    },
  },
})
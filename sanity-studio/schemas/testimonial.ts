import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Title',
      type: 'string',
    }),
    defineField({
      name: 'pubName',
      title: 'Pub Name',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'testimonialType',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Text', value: 'text' },
          { title: 'Video', value: 'video' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'quote',
      title: 'Quote/Testimonial',
      type: 'text',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      hidden: ({ parent }) => parent?.testimonialType !== 'video',
    }),
    defineField({
      name: 'thumbnailImage',
      title: 'Thumbnail Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'highlight',
      title: 'Highlight',
      type: 'string',
      description: 'Key metric or outcome to highlight',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show in featured testimonials section',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'pubName',
      media: 'thumbnailImage',
      type: 'testimonialType',
    },
    prepare({ title, subtitle, media, type }) {
      return {
        title: title || 'Untitled',
        subtitle: `${subtitle || 'No pub'} • ${type === 'video' ? 'Video' : 'Text'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
})
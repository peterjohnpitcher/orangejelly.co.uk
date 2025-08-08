import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactFAQ',
  title: 'Contact Page FAQ',
  type: 'document',
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
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Urgent Help', value: 'urgent' },
          { title: 'Contact Methods', value: 'contact' },
          { title: 'About Us', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Location', value: 'location' },
        ],
      },
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'question',
      category: 'category',
      active: 'active',
    },
    prepare({ title, category, active }) {
      return {
        title: title || 'Untitled FAQ',
        subtitle: `${category || 'No category'} ${active ? '' : '(Inactive)'}`,
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
      title: 'Category',
      name: 'categoryAsc',
      by: [{ field: 'category', direction: 'asc' }],
    },
  ],
})
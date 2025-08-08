import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'errorPage',
  title: 'Error Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'pageType',
      title: 'Page Type',
      type: 'string',
      options: {
        list: [
          { title: '404 Not Found', value: '404' },
          { title: '500 Server Error', value: '500' },
          { title: 'Maintenance', value: 'maintenance' },
        ],
      },
      validation: Rule => Rule.required(),
    }),
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
      name: 'message',
      title: 'Message',
      type: 'text',
      description: 'Main message to display to users',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Go to Homepage',
    }),
    defineField({
      name: 'suggestedLinks',
      title: 'Suggested Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'icon',
            title: 'Icon/Emoji',
            type: 'string',
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
            name: 'link',
            title: 'Link URL',
            type: 'string',
            validation: Rule => Rule.required(),
          }),
          defineField({
            name: 'buttonText',
            title: 'Button Text',
            type: 'string',
            initialValue: 'Learn More',
          }),
        ],
      }],
    }),
    defineField({
      name: 'contactSection',
      title: 'Contact Section',
      type: 'object',
      fields: [
        defineField({
          name: 'title',
          title: 'Title',
          type: 'string',
        }),
        defineField({
          name: 'message',
          title: 'Message',
          type: 'text',
        }),
        defineField({
          name: 'showWhatsApp',
          title: 'Show WhatsApp Button',
          type: 'boolean',
          initialValue: true,
        }),
      ],
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      initialValue: true,
      description: 'Use this content for the error page',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      pageType: 'pageType',
      active: 'active',
    },
    prepare({ title, pageType, active }) {
      return {
        title: title || 'Untitled',
        subtitle: `${pageType} Page ${active ? '(Active)' : '(Inactive)'}`,
      }
    },
  },
})
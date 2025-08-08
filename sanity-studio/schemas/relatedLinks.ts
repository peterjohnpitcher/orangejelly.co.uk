import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'relatedLinks',
  title: 'Related Links',
  type: 'document',
  fields: [
    defineField({
      name: 'cluster',
      title: 'Link Cluster',
      type: 'string',
      description: 'Which page/section these links belong to',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'About', value: 'about' },
          { title: 'Quick Wins', value: 'quickWins' },
          { title: 'Empty Pub', value: 'emptyPub' },
          { title: 'Competition', value: 'competition' },
          { title: 'Budget', value: 'budget' },
          { title: 'Time', value: 'time' },
          { title: 'Quick Start', value: 'quickStart' },
          { title: 'Services', value: 'services' },
          { title: 'Contact', value: 'contact' }
        ]
      }
    }),
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      description: 'Title shown above the links',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'text',
            title: 'Link Text',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'href',
            title: 'Link URL',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'description',
            title: 'Description',
            type: 'string',
            description: 'Optional description shown under the link'
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'string',
            description: 'Emoji or icon identifier'
          }),
          defineField({
            name: 'external',
            title: 'External Link',
            type: 'boolean',
            description: 'Opens in new tab',
            initialValue: false
          }),
          defineField({
            name: 'highlight',
            title: 'Highlight',
            type: 'boolean',
            description: 'Highlight this link for emphasis',
            initialValue: false
          })
        ]
      }],
      validation: Rule => Rule.required().min(1)
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order in which to display this cluster'
    })
  ],
  preview: {
    select: {
      title: 'title',
      cluster: 'cluster',
      linkCount: 'links'
    },
    prepare({ title, cluster, linkCount }) {
      return {
        title,
        subtitle: `${cluster} - ${linkCount?.length || 0} links`
      }
    }
  }
})
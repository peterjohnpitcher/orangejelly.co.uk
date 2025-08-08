import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'trustBar',
  title: 'Trust Bar',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference only',
      validation: Rule => Rule.required(),
      initialValue: 'Homepage Trust Bar'
    }),
    defineField({
      name: 'items',
      title: 'Trust Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'value',
            title: 'Value',
            type: 'string',
            description: 'The main value/metric to display',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            description: 'Supporting text for the value',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'order',
            title: 'Display Order',
            type: 'number',
            validation: Rule => Rule.required()
          })
        ],
        preview: {
          select: {
            title: 'value',
            subtitle: 'label'
          }
        }
      }],
      validation: Rule => Rule.required().min(1).max(3),
      initialValue: [
        {
          value: '15-20% Covers',
          label: 'Average increase in 6 weeks',
          order: 0
        },
        {
          value: '£62.50/hour',
          label: 'AI-powered marketing solutions',
          order: 1
        },
        {
          value: '14 Days',
          label: 'Guaranteed quick results',
          order: 2
        }
      ]
    }),
    defineField({
      name: 'active',
      title: 'Active',
      type: 'boolean',
      description: 'Show this trust bar on the site',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'active'
    },
    prepare({ title, active }) {
      return {
        title: title || 'Trust Bar',
        subtitle: active ? 'Active' : 'Inactive'
      };
    }
  }
});
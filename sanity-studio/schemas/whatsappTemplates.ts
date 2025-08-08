import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'whatsappTemplates',
  title: 'WhatsApp Templates',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Internal name for this set of templates',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'templates',
      title: 'Message Templates',
      type: 'object',
      fields: [
        defineField({
          name: 'default',
          title: 'Default Message',
          type: 'string',
          description: 'Standard greeting message',
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'services',
          title: 'Services Inquiry',
          type: 'string',
          description: 'When user clicks from services page'
        }),
        defineField({
          name: 'training',
          title: 'Training Inquiry',
          type: 'string',
          description: 'For AI training interest'
        }),
        defineField({
          name: 'quickWins',
          title: 'Quick Wins Package',
          type: 'string',
          description: 'For 30-day package interest'
        }),
        defineField({
          name: 'blog',
          title: 'From Blog Post',
          type: 'string',
          description: 'When coming from blog content'
        }),
        defineField({
          name: 'notListed',
          title: 'Custom Request',
          type: 'string',
          description: 'For services not listed'
        }),
        defineField({
          name: 'caseStudies',
          title: 'Case Studies',
          type: 'string',
          description: 'After reading case studies'
        }),
        defineField({
          name: 'lostPage',
          title: 'Lost/404 Page',
          type: 'string',
          description: 'From error or lost pages'
        }),
        defineField({
          name: 'emptyPub',
          title: 'Empty Pub Solutions',
          type: 'string',
          description: 'From empty pub landing page'
        }),
        defineField({
          name: 'pubRescue',
          title: 'Pub Rescue',
          type: 'string',
          description: 'From pub rescue landing page'
        }),
        defineField({
          name: 'roiCalculator',
          title: 'ROI Calculator',
          type: 'string',
          description: 'After using ROI calculator'
        }),
        defineField({
          name: 'contact',
          title: 'Contact Page',
          type: 'string',
          description: 'From contact page'
        })
      ]
    }),
    defineField({
      name: 'responseTime',
      title: 'Response Time Message',
      type: 'text',
      description: 'Message about expected response time',
      rows: 2
    }),
    defineField({
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Use these templates on the website',
      initialValue: true
    })
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive'
    },
    prepare({ title, active }) {
      return {
        title: title || 'WhatsApp Templates',
        subtitle: active ? 'Active' : 'Inactive'
      }
    }
  }
})
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'breadcrumbPaths',
  title: 'Breadcrumb Paths',
  type: 'document',
  fields: [
    defineField({
      name: 'page',
      title: 'Page Identifier',
      type: 'string',
      description: 'Which page this breadcrumb is for',
      validation: Rule => Rule.required(),
      options: {
        list: [
          { title: 'About', value: 'about' },
          { title: 'Services', value: 'services' },
          { title: 'Results', value: 'results' },
          { title: 'Contact', value: 'contact' },
          { title: 'Blog', value: 'blog' },
          { title: 'Blog Post', value: 'blogPost' },
          { title: 'Licensees Guide', value: 'licenseesGuide' },
          { title: 'Guide Article', value: 'guideArticle' },
          { title: 'Empty Pub Solutions', value: 'emptyPubSolutions' },
          { title: 'Pub Marketing No Budget', value: 'pubMarketingNoBudget' },
          { title: 'Compete with Pub Chains', value: 'competeWithChains' },
          { title: 'Quiet Midweek Solutions', value: 'quietMidweek' },
          { title: 'Legal', value: 'legal' }
        ]
      }
    }),
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      description: 'For internal reference',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'items',
      title: 'Breadcrumb Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'label',
            title: 'Label',
            type: 'string',
            validation: Rule => Rule.required()
          }),
          defineField({
            name: 'href',
            title: 'Link URL',
            type: 'string',
            validation: Rule => Rule.required()
          })
        ]
      }],
      validation: Rule => Rule.required().min(2)
    })
  ],
  preview: {
    select: {
      title: 'title',
      page: 'page',
      items: 'items'
    },
    prepare({ title, page, items }: any) {
      const breadcrumb = items?.map((item: any) => item.label).join(' > ') || 'No items';
      return {
        title,
        subtitle: `${page}: ${breadcrumb}`
      }
    }
  }
})
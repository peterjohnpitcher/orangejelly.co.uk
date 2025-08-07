import { defineType } from 'sanity';

export default defineType({
  name: 'servicesFAQ',
  title: 'Services FAQ',
  type: 'document',
  fields: [
    {
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'answer',
      title: 'Answer',
      type: 'text',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'FAQ Category',
      type: 'string',
      options: {
        list: [
          { title: 'Empty Pub Recovery', value: 'recovery' },
          { title: 'Menu Makeover', value: 'menu' },
          { title: 'Quiz Night Success', value: 'quiz' },
          { title: 'Social Media', value: 'social' },
          { title: 'Business Analysis', value: 'analysis' },
          { title: 'Event Planning', value: 'events' },
          { title: 'General Services', value: 'general' },
          { title: 'Consultation', value: 'consultation' },
          { title: 'Website & Online Presence', value: 'website' },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Order within the category (lower numbers appear first)',
      validation: (Rule) => Rule.required().min(1),
    },
    {
      name: 'isActive',
      title: 'Active',
      type: 'boolean',
      description: 'Whether this FAQ is currently displayed',
      initialValue: true,
    },
    {
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Keywords for search and filtering',
    },
    {
      name: 'relatedServices',
      title: 'Related Services',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'servicePackage' }],
        },
      ],
      description: 'Services this FAQ relates to',
    },
  ],
  orderings: [
    {
      title: 'Category & Order',
      name: 'categoryOrder',
      by: [
        { field: 'category', direction: 'asc' },
        { field: 'order', direction: 'asc' },
      ],
    },
    {
      title: 'Question A-Z',
      name: 'questionAsc',
      by: [{ field: 'question', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'category',
      order: 'order',
      active: 'isActive',
    },
    prepare(selection) {
      const { title, subtitle, order, active } = selection;
      const categoryMap: { [key: string]: string } = {
        recovery: 'Empty Pub Recovery',
        menu: 'Menu Makeover',
        quiz: 'Quiz Night',
        social: 'Social Media',
        analysis: 'Business Analysis',
        events: 'Event Planning',
        general: 'General',
        consultation: 'Consultation',
        website: 'Website',
      };
      
      return {
        title: title,
        subtitle: `${active ? '✅' : '❌'} ${categoryMap[subtitle] || subtitle} (#${order})`,
      };
    },
  },
});
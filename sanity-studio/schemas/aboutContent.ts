import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'aboutContent',
  title: 'About Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      initialValue: 'About Orange Jelly',
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
      ],
    }),
    defineField({
      name: 'story',
      title: 'Our Story',
      type: 'array',
      of: [{ type: 'block' }],
      validation: (Rule) => Rule.required(),
      description: 'The main story content',
    }),
    defineField({
      name: 'timeline',
      title: 'Timeline',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'date',
              title: 'Date',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Event Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'highlight',
              title: 'Highlight Event',
              type: 'boolean',
              initialValue: false,
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'values',
      title: 'Our Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              description: 'Emoji or icon identifier',
            },
            {
              name: 'title',
              title: 'Value Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule) => Rule.required(),
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'founderSection',
      title: 'Founder Section',
      type: 'object',
      fields: [
        {
          name: 'name',
          title: 'Founder Name',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'role',
          title: 'Role',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'bio',
          title: 'Biography',
          type: 'array',
          of: [{ type: 'block' }],
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'image',
          title: 'Founder Image',
          type: 'image',
          options: {
            hotspot: true,
          },
        },
        {
          name: 'quote',
          title: 'Featured Quote',
          type: 'text',
          rows: 3,
        },
      ],
    }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'role',
              title: 'Role',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'bio',
              title: 'Short Bio',
              type: 'text',
              rows: 2,
            },
            {
              name: 'image',
              title: 'Photo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'partnerships',
      title: 'Partnerships',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              title: 'Partner Name',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'description',
              title: 'Partnership Description',
              type: 'text',
              rows: 2,
            },
            {
              name: 'logo',
              title: 'Partner Logo',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'url',
              title: 'Partner Website',
              type: 'url',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'whyOrangeJelly',
      title: 'Why Orange Jelly Section',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'Section Title',
          type: 'string',
          initialValue: 'Why Orange Jelly?',
        },
        {
          name: 'content',
          title: 'Content',
          type: 'array',
          of: [{ type: 'block' }],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})
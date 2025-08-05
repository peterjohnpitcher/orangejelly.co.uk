export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 3,
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'role',
      title: 'Role',
      type: 'string',
      description: 'e.g., "Founder & Licensee"',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'image',
    },
  },
};
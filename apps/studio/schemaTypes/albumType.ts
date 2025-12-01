import {FolderIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const albumType = defineType({
  name: 'album',
  title: 'Album',
  type: 'document',
  icon: FolderIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().error('Album name is required'),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required().error('Slug is required to generate a URL'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      description: 'Brief description of this album',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: {hotspot: true},
      description: 'Main image shown on the album folder',
    }),
    defineField({
      name: 'createdAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
      media: 'coverImage',
    },
  },
})

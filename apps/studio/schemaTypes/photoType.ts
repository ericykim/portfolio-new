import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const photoType = defineType({
  name: 'photo',
  title: 'Photo',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required().error('Image is required'),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required().error('Title is required'),
    }),
    defineField({
      name: 'caption',
      type: 'text',
      rows: 2,
      description: 'Optional caption or description',
    }),
    defineField({
      name: 'dateTaken',
      title: 'Date Taken',
      type: 'datetime',
      description: 'When was this photo taken?',
    }),
    defineField({
      name: 'albums',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'album'}})],
      description: 'Albums this photo belongs to',
    }),
    defineField({
      name: 'hideFromGallery',
      title: 'Hide from Photos Page',
      type: 'boolean',
      description: 'Check this to prevent this photo from appearing on the photos page',
      initialValue: false,
    }),
    defineField({
      name: 'uploadedAt',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'caption',
      media: 'image',
    },
  },
})

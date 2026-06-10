import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'videoEmbed',
  title: 'Video Embed',
  type: 'object',
  fields: [
    defineField({
      name: 'url',
      title: 'YouTube or Vimeo Video URL',
      type: 'url',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'url'
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ? `Video: ${title}` : 'Video Embed'
      }
    }
  }
})

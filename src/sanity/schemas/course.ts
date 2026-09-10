import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'course',
  title: 'Course',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Course Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'img',
      title: 'Course Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: 'price',
      title: 'Current Price',
      type: 'string',
    }),
    defineField({
      name: 'original_price',
      title: 'Original Price',
      type: 'string',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'level',
      title: 'Level (e.g., Beginner, Advanced)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
    }),
    defineField({
      name: 'about_course',
      title: 'About This Course',
      type: 'text',
    }),
    defineField({
      name: 'curriculum',
      title: 'Curriculum (Modules)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Module Title (e.g. Module 1 - IoT)', type: 'string' },
          { name: 'lectures', title: 'Number of Lectures', type: 'string' },
          { name: 'duration', title: 'Duration (e.g. 45m)', type: 'string' },
          {
            name: 'items',
            title: 'Lectures / Topics',
            type: 'array',
            of: [{
              type: 'object',
              fields: [
                { name: 'title', title: 'Topic Title', type: 'string' },
                { 
                  name: 'type', 
                  title: 'Content Type', 
                  type: 'string', 
                  options: { list: [{ title: 'Video', value: 'video' }, { title: 'Document', value: 'document' }] },
                  initialValue: 'video'
                },
                { name: 'meta', title: 'Meta Info (e.g. 10m)', type: 'string' },
                { name: 'isPreview', title: 'Is Preview Available?', type: 'boolean', initialValue: false }
              ]
            }]
          }
        ]
      }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),

    defineField({
      name: 'materials_included',
      title: 'Materials Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'learning_objectives',
      title: 'What Will You Learn',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'syllabus_pdf',
      title: 'Syllabus PDF',
      type: 'file',
      options: {
        accept: 'application/pdf'
      }
    }),
    defineField({
      name: 'brochure_pdf',
      title: 'Brochure PDF',
      type: 'file',
      options: {
        accept: 'application/pdf'
      }
    }),
    defineField({
      name: 'feature_cards',
      title: 'Feature Cards',
      type: 'array',
      of: [{ 
        type: 'object',
        fields: [
          { name: 'icon', title: 'Icon (Material Symbol name)', type: 'string' },
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'string' }
        ]
      }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'img',
    },
  },
});

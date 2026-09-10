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
      name: 'inst',
      title: 'Instructor Name',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
    }),
    defineField({
      name: 'reviews',
      title: 'Number of Reviews',
      type: 'number',
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
      title: 'Curriculum',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'duration',
      title: 'Duration',
      type: 'string',
    }),
    defineField({
      name: 'last_updated',
      title: 'Last Updated Date',
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
      name: 'feature_cards',
      title: 'Feature Cards',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'enrolled_count',
      title: 'Enrolled Count',
      type: 'number',
    }),
    defineField({
      name: 'instructor_title',
      title: 'Instructor Title',
      type: 'string',
    }),
    defineField({
      name: 'instructor_bio',
      title: 'Instructor Bio',
      type: 'text',
    }),
    defineField({
      name: 'instructor_image',
      title: 'Instructor Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'inst',
      media: 'img',
    },
  },
});

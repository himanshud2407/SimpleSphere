import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './src/sanity/schemas'

export default defineConfig({
  name: 'default',
  title: 'simplesphere',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
  dataset: process.env.SANITY_STUDIO_DATASET as string,

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog')
              .child(
                S.list()
                  .title('Blog Documents')
                  .items([
                    S.documentTypeListItem('post').title('All Posts'),
                    S.documentTypeListItem('author').title('Authors'),
                    S.documentTypeListItem('category').title('Categories'),
                  ])
              ),
            S.divider(),
            S.documentTypeListItem('course').title('Courses'),
          ]),
    }),
    visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})

import { defineCliConfig } from 'sanity/cli'
import path from 'path'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID as string,
    dataset: process.env.SANITY_STUDIO_DATASET as string
  },
  vite: (config) => {
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve?.alias,
          '@': path.resolve(process.cwd(), './src')
        }
      }
    }
  }
})

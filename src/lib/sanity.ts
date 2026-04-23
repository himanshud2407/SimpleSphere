import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID || '4hou47s4',
  dataset: import.meta.env.VITE_SANITY_DATASET || 'production',
  useCdn: true, // Switched to true for better production performance
  apiVersion: '2024-03-15',
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

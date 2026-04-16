import { createClient } from '@sanity/client';
import { createImageUrlBuilder } from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: '4hou47s4', // Updated project ID from your new Sanity project
  dataset: 'production',
  useCdn: false, // Set to false for development to see fresh data instantly
  apiVersion: '2024-03-15',
});

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: any) {
  return builder.image(source);
}

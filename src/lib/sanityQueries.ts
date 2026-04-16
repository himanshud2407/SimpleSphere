import { sanityClient } from './sanity';

export const getBlogsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`;

export const getLatestBlogsQuery = `*[_type == "post"] | order(publishedAt desc) [0...3] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`;

export const getBlogPostBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  slug,
  mainImage,
  excerpt,
  publishedAt,
  body,
  "authorName": author->name,
  "authorImage": author->image,
  "categories": categories[]->title
}`;

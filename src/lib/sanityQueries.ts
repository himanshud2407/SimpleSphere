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

export const getCoursesQuery = `*[_type == "course"] | order(_createdAt desc) {
  "id": _id,
  title,
  "img": coalesce(img.asset->url, img),
  price,
  category,
  level,
  description,
  about_course,
  curriculum,
  duration,
  materials_included,
  learning_objectives,
  feature_cards,
  original_price,
  "syllabus_pdf": syllabus_pdf.asset->url,
  "brochure_pdf": brochure_pdf.asset->url
}`;

export const getCourseByIdQuery = `*[_type == "course" && _id == $id][0] {
  "id": _id,
  title,
  "img": coalesce(img.asset->url, img),
  price,
  category,
  level,
  description,
  about_course,
  curriculum,
  duration,
  materials_included,
  learning_objectives,
  feature_cards,
  original_price,
  "syllabus_pdf": syllabus_pdf.asset->url,
  "brochure_pdf": brochure_pdf.asset->url
}`;

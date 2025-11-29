import { defineQuery } from "next-sanity";

/**
 * Query for fetching all posts
 * Ordered by publish date (newest first)
 */
export const POSTS_QUERY = defineQuery(`*[
  _type == "post"
] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`);

/**
 * Query for fetching a single post by slug
 */
export const POST_BY_SLUG_QUERY = defineQuery(`*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`);

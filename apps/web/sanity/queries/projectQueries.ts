import { defineQuery } from "next-sanity";

/**
 * Query for fetching all projects
 * Ordered by publish date (newest first)
 */
export const PROJECTS_QUERY = defineQuery(`*[
  _type == "project"
] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  tags[]->{
    _id,
    name,
    slug
  }
}`);

/**
 * Query for fetching a single project by slug
 */
export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[
  _type == "project"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body,
  tags[]->{
    _id,
    name,
    slug
  }
}`);

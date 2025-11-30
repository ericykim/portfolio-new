import { defineQuery } from "next-sanity";

/**
 * Query for fetching all project tags
 * Ordered alphabetically by name
 */
export const ALL_PROJECT_TAGS_QUERY = defineQuery(`*[
  _type == "projectTag"
] | order(name asc){
  _id,
  name,
  slug
}`);

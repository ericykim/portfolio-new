import { defineQuery } from "next-sanity";

/**
 * Query for fetching all tags
 * Ordered alphabetically by name
 */
export const ALL_TAGS_QUERY = defineQuery(`*[
  _type == "tag"
] | order(name asc){
  _id,
  name,
  slug
}`);

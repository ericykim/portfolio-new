import { defineQuery } from "next-sanity";

/**
 * Query for fetching all post tags
 * Ordered alphabetically by name
 */
export const ALL_POST_TAGS_QUERY = defineQuery(`*[
  _type == "postTag"
] | order(name asc){
  _id,
  name,
  slug
}`);


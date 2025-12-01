import { defineQuery } from "next-sanity";

/**
 * Query for fetching all photos with album references
 * Ordered by date taken (newest first), falls back to upload date if dateTaken is null
 */
export const PHOTOS_QUERY = defineQuery(`*[
  _type == "photo"
] | order(coalesce(dateTaken, uploadedAt) desc){
  _id,
  image,
  title,
  caption,
  dateTaken,
  uploadedAt,
  albums[]->{
    _id,
    name,
    slug
  }
}`);

/**
 * Query for fetching photos filtered by album slug
 * Ordered by date taken (newest first), falls back to upload date if dateTaken is null
 */
export const PHOTOS_BY_ALBUM_QUERY = defineQuery(`*[
  _type == "photo"
  && $albumId in albums[]._ref
] | order(coalesce(dateTaken, uploadedAt) desc){
  _id,
  image,
  title,
  caption,
  dateTaken,
  uploadedAt,
  albums[]->{
    _id,
    name,
    slug
  }
}`);


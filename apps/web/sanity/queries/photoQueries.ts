import { defineQuery } from "next-sanity";

/**
 * Query for fetching all photos with album references
 * Ordered by date taken (newest first), falls back to upload date if dateTaken is null
 * Excludes photos with hideFromGallery: true UNLESS they belong to an album
 * This allows hidden photos to still appear in album views
 */
export const PHOTOS_QUERY = defineQuery(`*[
  _type == "photo"
  && (hideFromGallery != true || count(albums[]) > 0)
] | order(coalesce(dateTaken, uploadedAt) desc){
  _id,
  image,
  title,
  caption,
  dateTaken,
  uploadedAt,
  hideFromGallery,
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

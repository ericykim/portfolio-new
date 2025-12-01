import { defineQuery } from "next-sanity";

/**
 * Query for fetching all albums with photo count and preview images
 * Ordered by creation date (newest first)
 */
export const ALBUMS_QUERY = defineQuery(`*[
  _type == "album"
] | order(createdAt desc){
  _id,
  name,
  slug,
  description,
  coverImage,
  createdAt,
  "photoCount": count(*[_type == "photo" && references(^._id)]),
  "previewImages": *[_type == "photo" && references(^._id)] | order(coalesce(dateTaken, uploadedAt) desc)[0...3].image
}`);

/**
 * Query for fetching a single album by slug with all its photos
 * Photos ordered by date taken (newest first), falls back to upload date if dateTaken is null
 */
export const ALBUM_BY_SLUG_QUERY = defineQuery(`*[
  _type == "album"
  && slug.current == $slug
][0]{
  _id,
  name,
  slug,
  description,
  coverImage,
  createdAt,
  "photos": *[_type == "photo" && references(^._id)] | order(coalesce(dateTaken, uploadedAt) desc){
    _id,
    image,
    title,
    caption,
    dateTaken,
    uploadedAt
  }
}`);

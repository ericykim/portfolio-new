import {defineQuery} from 'next-sanity'

/**
 * Query for fetching the profile data (About Me section)
 * Returns a single profile document with bio
 */
export const PROFILE_QUERY = defineQuery(`*[
  _type == "profile"
][0]{
  _id,
  bio
}`)


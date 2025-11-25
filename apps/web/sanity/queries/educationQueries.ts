import {defineQuery} from 'next-sanity'

/**
 * Query for fetching all education entries
 */
export const EDUCATION_QUERY = defineQuery(`*[
  _type == "education"
]{
  _id,
  place,
  description
}`)


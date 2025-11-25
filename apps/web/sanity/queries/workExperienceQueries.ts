import {defineQuery} from 'next-sanity'

/**
 * Query for fetching all work experience entries
 * Ordered by custom order field first, then by start date (newest first)
 */
export const WORK_EXPERIENCE_QUERY = defineQuery(`*[
  _type == "workExperience"
] | order(order asc, startDate desc){
  _id,
  company,
  role,
  startDate,
  endDate,
  current,
  order
}`)


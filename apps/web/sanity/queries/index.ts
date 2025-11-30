// Export all individual queries
export * from "./educationQueries";
export * from "./postQueries";
export * from "./postTagQueries";
export * from "./profileQueries";
export * from "./projectQueries";
export * from "./projectTagQueries";
export * from "./workExperienceQueries";

import { defineQuery } from "next-sanity";

/**
 * Combined home page query
 * Fetches all home page data in a single request for better performance
 * Returns profile, work experience, and education
 */
export const HOME_PAGE_QUERY = defineQuery(`{
  "profile": *[_type == "profile"][0]{
    _id,
    bio
  },
  "workExperience": *[_type == "workExperience"] | order(order asc, startDate desc){
    _id,
    company,
    role,
    startDate,
    endDate,
    current,
    order
  },
  "education": *[_type == "education"]{
    _id,
    place,
    description
  }
}`);

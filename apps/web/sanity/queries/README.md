# Sanity GROQ Queries

This folder contains all GROQ queries for fetching data from Sanity CMS.

## Organization Pattern

Each file contains queries related to a specific schema type:

- `profileQueries.ts` - Queries for the profile/about me section
- `workExperienceQueries.ts` - Queries for work experience entries
- `educationQueries.ts` - Queries for education entries
- `postQueries.ts` - Queries for blog posts
- `index.ts` - Re-exports all queries + combined queries

## Available Queries

### Profile

- `PROFILE_QUERY` - Fetches the single profile document with bio

### Work Experience

- `WORK_EXPERIENCE_QUERY` - Fetches all work experience (ordered by display order, then start date)

### Education

- `EDUCATION_QUERY` - Fetches all education entries (place and description)

### Posts

- `POSTS_QUERY` - Fetches all posts (ordered by publish date)
- `POST_BY_SLUG_QUERY` - Fetches a single post by slug parameter

### Combined

- `HOME_PAGE_QUERY` - Fetches all home page data in one request (profile, work, education)

## Usage

```typescript
import { HOME_PAGE_QUERY, POSTS_QUERY } from "@/sanity/queries";
import { client } from "@/sanity/client";

// Fetch home page data
const homeData = await client.fetch(HOME_PAGE_QUERY);

// Fetch posts
const posts = await client.fetch(POSTS_QUERY);

// Fetch single post with parameter
const post = await client.fetch(POST_BY_SLUG_QUERY, { slug: "my-post" });
```

## Adding New Queries

1. Create a new file: `queries/myTypeQueries.ts`
2. Define queries using `defineQuery` from `next-sanity`
3. Add exports to `index.ts`

Example:

```typescript
// queries/myTypeQueries.ts
import { defineQuery } from 'next-sanity'

export const MY_TYPE_QUERY = defineQuery(\`*[
  _type == "myType"
]{
  _id,
  field1,
  field2
}\`)
```

## Schema Types

Schema type definitions are located in `apps/studio/schemaTypes/`

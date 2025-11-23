# Sanity Schemas and GROQ Queries Guide

## Adding New Schemas in Sanity Studio

### Step 1: Create a New Schema Type File

Create a new file in `apps/studio/schemaTypes/` directory:

```typescript
// apps/studio/schemaTypes/projectType.ts
import { defineField, defineType } from "sanity";

export const projectType = defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().error("Title is required"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (rule) =>
        rule.required().error("Slug is required for URL generation"),
    }),
    defineField({
      name: "description",
      type: "text",
      description: "Brief description of the project",
      validation: (rule) => rule.warning().min(50).max(200),
    }),
    defineField({
      name: "image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "technologies",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "url",
      type: "url",
    }),
    defineField({
      name: "featured",
      type: "string",
      options: {
        list: ["yes", "no"],
        layout: "radio",
      },
      initialValue: "no",
    }),
  ],
});
```

### Step 2: Register Schema in Index

Add to `apps/studio/schemaTypes/index.ts`:

```typescript
import { postType } from "./postType";
import { projectType } from "./projectType";

export const schemaTypes = [postType, projectType];
```

### Step 3: Restart Dev Server

```bash
cd apps/studio && bun run dev
```

## Common Schema Patterns

### Object Type (Reusable Field Group)

```typescript
// apps/studio/schemaTypes/seoType.ts
import { defineField, defineType } from "sanity";

export const seoType = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) =>
        rule.max(60).warning("Should be under 60 characters"),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (rule) =>
        rule.max(160).warning("Should be under 160 characters"),
    }),
  ],
});
```

### References

```typescript
defineField({
  name: "author",
  type: "reference",
  to: [{ type: "author" }],
});

// Array of references
defineField({
  name: "categories",
  type: "array",
  of: [{ type: "reference", to: [{ type: "category" }] }],
});
```

### Block Content (Rich Text)

```typescript
// apps/studio/schemaTypes/blockContentType.ts
import { defineField, defineType } from "sanity";

export const blockContentType = defineType({
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    defineField({
      type: "block",
      styles: [
        { title: "Normal", value: "normal" },
        { title: "H1", value: "h1" },
        { title: "H2", value: "h2" },
        { title: "Quote", value: "blockquote" },
      ],
    }),
  ],
});
```

## GROQ Query Examples

### Basic Queries

```typescript
import { defineQuery } from "groq";

// Get all documents of a type
export const POSTS_QUERY = defineQuery(`*[
  _type == "post"
]{
  _id,
  title,
  slug,
  publishedAt,
  image
}`);

// Get single document by slug
export const POST_BY_SLUG_QUERY = defineQuery(`*[
  _type == "post"
  && slug.current == $slug
][0]{
  _id,
  title,
  slug,
  publishedAt,
  image,
  body
}`);

// Order and limit results
export const RECENT_POSTS_QUERY = defineQuery(`*[
  _type == "post"
] | order(publishedAt desc)[0...5]{
  _id,
  title,
  slug,
  publishedAt
}`);
```

### Advanced Queries

```typescript
// Query with reference expansion
export const POST_WITH_AUTHOR_QUERY = defineQuery(`*[
  _type == "post"
]{
  _id,
  title,
  slug,
  author->{
    _id,
    name,
    image,
    bio
  }
}`);

// Query with multiple filters
export const FEATURED_POSTS_QUERY = defineQuery(`*[
  _type == "post"
  && featured == "yes"
  && publishedAt < now()
] | order(publishedAt desc){
  _id,
  title,
  slug,
  publishedAt
}`);

// Query with array filtering
export const POSTS_BY_CATEGORY_QUERY = defineQuery(`*[
  _type == "post"
  && $categoryId in categories[]->_id
]{
  _id,
  title,
  slug,
  categories[]->{
    _id,
    title
  }
}`);

// Count documents
export const POSTS_COUNT_QUERY = defineQuery(`count(*[
  _type == "post"
])`);
```

### Image URL Handling

```typescript
import imageUrlBuilder from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = imageUrlBuilder(client);

export function urlFor(source: any) {
  return builder.image(source);
}

// Usage in GROQ - get image asset data
export const POST_WITH_IMAGE_QUERY = defineQuery(`*[
  _type == "post"
][0]{
  _id,
  title,
  image{
    asset->{
      _id,
      url
    },
    alt,
    hotspot
  }
}`);
```

## GROQ Best Practices

1. **Variable Naming**: Use `SCREAMING_SNAKE_CASE` for query constants
2. **Type Safety**: Always use `defineQuery` to wrap queries
3. **Explicit Projections**: Write out each field explicitly (no `...` spread)
4. **Parameterization**: Use parameters (`$slug`) instead of string interpolation
5. **Formatting**: One filter/field per line for readability
6. **Ordering**: Use `order()` before array slicing `[0...10]`

## Testing Queries

### In Sanity Studio (Vision Plugin)

1. Start studio: `cd apps/studio && bun run dev`
2. Open Vision tab in studio
3. Test queries with live data

### Common GROQ Operators

- `*` - All documents
- `==` - Equals
- `!=` - Not equals
- `&&` - AND
- `||` - OR
- `->` - Follow reference
- `[]` - Array access
- `[0]` - First item
- `[0...10]` - Slice (first 10)
- `in` - Check if value in array
- `match` - Text search
- `|` - Pipe (for ordering, etc.)

## TypeScript Generation

### Setup TypeGen (if using monorepo with web app)

```json
// apps/studio/sanity-typegen.json
{
  "path": "./**/*.{ts,tsx,js,jsx}",
  "schema": "../web/sanity/extract.json",
  "generates": "../web/sanity/types.ts"
}
```

### Add Scripts to package.json

```json
{
  "scripts": {
    "typegen": "sanity schema extract && sanity typegen generate --enforce-required-fields",
    "typecheck": "tsc --noEmit"
  }
}
```

### Run After Schema Changes

```bash
cd apps/studio
bun run typegen
bun run typecheck
bun run build
```

## Common Schema Field Types

- `string` - Short text
- `text` - Long text
- `number` - Numbers
- `boolean` - True/false (avoid, use string with list)
- `date` - Date only
- `datetime` - Date and time
- `url` - URL validation
- `slug` - URL-friendly string
- `image` - Image upload
- `file` - File upload
- `array` - Array of items
- `object` - Nested object
- `reference` - Reference to another document
- `block` - Portable Text (rich text)

## Resources

- Test queries in Vision plugin in Studio
- Sanity docs: `npx sanity docs search "<query>"`
- CLI help: `npx sanity --help`
- GROQ Cheat Sheet: https://www.sanity.io/docs/query-cheat-sheet

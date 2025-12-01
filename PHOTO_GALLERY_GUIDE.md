# Photo Gallery Implementation Guide

## Overview

A performant masonry photo gallery with desktop-inspired album folders, built with Sanity CMS and Next.js 15. Features include responsive design, lightbox modal with keyboard/swipe navigation, and optimized image loading.

## What Was Built

### 1. Sanity Schema Types

**Album Type** (`apps/studio/schemaTypes/albumType.ts`)

- Fields: name, slug, description, coverImage, createdAt
- Desktop folder icon in Sanity Studio
- Preview configuration with cover image

**Photo Type** (`apps/studio/schemaTypes/photoType.ts`)

- Fields: image, title, caption, dateTaken, albums (references), uploadedAt
- Photos can belong to multiple albums
- Image preview in Sanity Studio

### 2. GROQ Queries

**Album Queries** (`apps/web/sanity/queries/albumQueries.ts`)

- `ALBUMS_QUERY`: Fetches all albums with photo count
- `ALBUM_BY_SLUG_QUERY`: Fetches single album with all photos

**Photo Queries** (`apps/web/sanity/queries/photoQueries.ts`)

- `PHOTOS_QUERY`: Fetches all photos with album references
- `PHOTOS_BY_ALBUM_QUERY`: Filters photos by album

### 3. UI Components

**AlbumFolder** (`apps/web/components/photos/AlbumFolder.tsx`)

- Desktop-style folder icon with preview thumbnail
- Shows photo count
- Responsive sizing (smaller on mobile, larger on desktop)

**MasonryGallery** (`apps/web/components/photos/MasonryGallery.tsx`)

- Responsive grid layout (1 col mobile → 4 cols desktop)
- Next.js Image optimization with lazy loading
- Hover overlay with photo title/caption
- Priority loading for above-fold images

**PhotoLightbox** (`apps/web/components/photos/PhotoLightbox.tsx`)

- Full-screen modal with backdrop blur
- Keyboard navigation (Arrow keys, ESC)
- Touch swipe gestures for mobile
- Shows photo metadata (title, caption, date taken)
- Navigation buttons (desktop) and touch controls (mobile)

**PhotoViewToggle** (`apps/web/components/photos/PhotoViewToggle.tsx`)

- Toggle between "Albums" and "All Photos" views
- Clean tab-style UI

### 4. Pages

**Main Photos Page** (`apps/web/app/photos/page.tsx`)

- Client-side state management
- Two views: Albums grid or All Photos masonry
- Integrated lightbox
- Loading state

**Album Detail Page** (`apps/web/app/photos/[slug]/page.tsx`)

- Server component for better performance
- Breadcrumb navigation back to photos
- Uses same masonry gallery component

### 5. Utilities

**Sanity Image Helper** (`apps/web/utils/sanityImage.ts`)

- `urlFor()`: Basic image URL builder
- `getSanityImageUrl()`: Advanced builder with width, height, quality, format options
- `getSanityImageDimensions()`: Extracts dimensions from Sanity image refs

## Performance Optimizations

1. **Next.js Image Component**: Automatic optimization, responsive srcsets
2. **Sanity CDN**: On-the-fly image transformations
3. **Priority Loading**: First 4 images load immediately
4. **Lazy Loading**: Below-fold images load as needed
5. **Proper Sizing**: Prevents layout shift with aspect ratios

## Responsive Design

### Desktop

- 3-4 column masonry grid
- 6 album folders per row
- Hover effects on images and folders
- Keyboard navigation in lightbox
- Large navigation arrows

### Mobile

- 1-2 column masonry grid
- 2 album folders per row
- Touch-friendly taps
- Swipe gestures in lightbox
- Bottom navigation buttons in lightbox

## Getting Started

### 1. Add Content in Sanity Studio

1. Navigate to your Sanity Studio (likely `http://localhost:3333` or deployed URL)
2. Create Albums:
   - Go to "Album" content type
   - Add name, description, cover image
   - Generate slug from name
3. Create Photos:
   - Go to "Photo" content type
   - Upload image
   - Add title, optional caption, date taken
   - Select which album(s) it belongs to

### 2. View Your Photos

Navigate to `/photos` in your web app to see:

- Albums view (default): Desktop-style folders
- All Photos view: Masonry gallery of all photos
- Click any photo to open the lightbox

### 3. Optional: Direct Album Links

Access albums directly via `/photos/[album-slug]`

## File Structure

\`\`\`
apps/
├── studio/
│ └── schemaTypes/
│ ├── albumType.ts
│ ├── photoType.ts
│ └── index.ts
└── web/
├── app/
│ └── photos/
│ ├── page.tsx (main gallery)
│ └── [slug]/
│ ├── page.tsx (album detail)
│ └── MasonryGalleryClient.tsx
├── components/
│ └── photos/
│ ├── AlbumFolder.tsx
│ ├── MasonryGallery.tsx
│ ├── PhotoLightbox.tsx
│ └── PhotoViewToggle.tsx
├── sanity/
│ └── queries/
│ ├── albumQueries.ts
│ ├── photoQueries.ts
│ └── index.ts
└── utils/
└── sanityImage.ts
\`\`\`

## Next Steps

1. **Add Content**: Upload photos and create albums in Sanity Studio
2. **Customize**: Adjust colors, folder designs, or layout in the components
3. **Enhance**: Consider adding:
   - Photo sorting (by date, title, etc.)
   - Album sorting
   - Favorites/likes
   - Download functionality
   - Share functionality
   - EXIF data display (camera, settings, location)

## Technical Notes

- All components are TypeScript with proper types
- No linting errors
- Follows Next.js 15 App Router conventions
- Uses Tailwind CSS for styling
- Client components where interactivity is needed
- Server components for data fetching when possible


# Building Components Guide

This is a living document that tracks the component architecture, file structure, and guidelines for building new components in the portfolio project.

## 📁 File Structure

```
apps/web/
├── app/                    # Next.js App Router - ROUTES ONLY
│   ├── [slug]/            # Dynamic route pages
│   ├── ama/               # Static route pages
│   ├── demo/
│   ├── listening/
│   ├── work/
│   ├── writing/
│   ├── layout.tsx         # Root layout (special file)
│   └── page.tsx           # Home page
│
├── components/            # UI Components (non-route)
│   └── CollapsibleSidebar.tsx
│
├── context/               # React Context Providers
│   ├── SidebarContext.tsx
│   └── ThemeContext.tsx
│
├── styles/                # Global styles & fonts
│   ├── globals.css
│   └── typography.ts
│
├── public/                # Static assets
│   ├── favicon.ico
│   └── font/
│
└── sanity/                # Sanity CMS integration
    └── client.ts
```

## 🎨 Component Guidelines

### Location Rules

1. **Routes Only in `app/`**
   - Only route folders and special files (`layout.tsx`, `page.tsx`, `loading.tsx`, etc.)
   - NO components, utilities, or non-route files

2. **UI Components in `components/`**
   - All reusable UI components
   - Layout components that are NOT routes
   - Should be presentational and composable

3. **Context Providers in `context/`**
   - React Context providers
   - Global state management
   - Theme, auth, sidebar state, etc.

4. **Styles in `styles/`**
   - Global CSS (`globals.css`)
   - Font definitions (`typography.ts`)
   - Shared style utilities

### Dark Mode Support

**ALL components MUST support dark mode using Tailwind's `dark:` variant.**

#### Dark Mode Implementation

We use Tailwind CSS v4's class-based dark mode:

```css
/* globals.css */
@custom-variant dark (&:where(.dark, .dark *));
```

#### How Dark Mode Works

1. **Theme Toggle**: `ThemeContext` manages theme state
2. **Class Application**: `.dark` class is added to `<html>` element
3. **Persistence**: Theme preference saved in `localStorage.theme`
4. **System Preference**: Falls back to OS preference if no saved theme
5. **No FOUC**: Script in `<head>` applies theme before page renders

#### Dark Mode Patterns

```tsx
// ✅ Correct - Always include dark: variants
<div className="bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
  <button className="bg-blue-500 dark:bg-blue-600 hover:bg-blue-600 dark:hover:bg-blue-700">
    Click me
  </button>
</div>

// ❌ Wrong - Missing dark mode support
<div className="bg-white text-black">
  <button className="bg-blue-500">
    Click me
  </button>
</div>
```

#### Color Palette

Use these Tailwind color classes for consistency:

**Backgrounds:**

- Light: `bg-white`, `bg-neutral-50`, `bg-neutral-100`
- Dark: `bg-neutral-950`, `bg-neutral-900`, `bg-neutral-800`

**Text:**

- Primary: `text-neutral-900 dark:text-neutral-100`
- Secondary: `text-neutral-600 dark:text-neutral-400`
- Muted: `text-neutral-400 dark:text-neutral-500`

**Borders:**

- `border-neutral-200 dark:border-neutral-800`

**Interactive States:**

- Hover BG: `hover:bg-neutral-50 dark:hover:bg-neutral-900/50`
- Active BG: `bg-neutral-100 dark:bg-neutral-900`

## 🏗️ Built Components

### 1. CollapsibleSidebar

**Location:** `components/CollapsibleSidebar.tsx`

**Features:**

- Collapsible navigation sidebar
- Persistent state (localStorage)
- Mobile responsive with overlay
- Active route highlighting
- Dark mode support
- Theme toggle button at bottom

**Dependencies:**

- `context/SidebarContext.tsx` - Sidebar state
- `context/ThemeContext.tsx` - Theme state
- `lucide-react` - Icons

**Usage:**

```tsx
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

<CollapsibleSidebar />;
```

### 2. SidebarContext

**Location:** `context/SidebarContext.tsx`

**Purpose:** Manages global sidebar open/closed state

**API:**

```tsx
const { isOpen, toggle, close } = useSidebar();
```

### 3. ThemeContext

**Location:** `context/ThemeContext.tsx`

**Purpose:** Manages light/dark theme state

**API:**

```tsx
const { theme, toggleTheme } = useTheme();
// theme: 'light' | 'dark'
```

**Implementation:**

- Reads initial theme from DOM (set by inline script)
- Persists to `localStorage.theme`
- Adds/removes `.dark` class on `<html>`

## 📦 Typography

**Location:** `styles/typography.ts`

Two custom font families:

1. **PP Telegraf** (Sans-serif)
   - Weights: 200, 400, 700, 800, 900
   - Variable: `--font-pp-telegraf`
   - Usage: Body text, UI components

2. **PP Woodland** (Display)
   - Weights: 200, 400, 700, 900
   - Variable: `--font-pp-woodland`
   - Usage: Headings (h1-h6)

**CSS Variables:**

```css
font-family: var(--font-pp-telegraf);
font-family: var(--font-pp-woodland);
```

## 🎯 Component Checklist

When building a new component:

- [ ] Place in correct folder (`components/` or `context/`)
- [ ] Add dark mode support for ALL colors
- [ ] Use consistent color palette (neutral colors)
- [ ] Make responsive (mobile-first)
- [ ] Add to this document under "Built Components"
- [ ] Use TypeScript with proper types
- [ ] Use 'use client' directive if using hooks
- [ ] Follow existing naming conventions

## 🚀 Next.js Patterns

### Layout Structure

The root layout (`app/layout.tsx`) uses a fixed-height, non-scrolling structure:

```tsx
<body className="overflow-hidden">
  <ThemeProvider>
    <SidebarProvider>
      <div className="flex h-dvh">
        <CollapsibleSidebar />
        <div className="flex-1 overflow-hidden">
          {/* Scrollable content area */}
        </div>
      </div>
    </SidebarProvider>
  </ThemeProvider>
</body>
```

**Key points:**

- Body has `overflow-hidden`
- Main container uses `h-dvh` (dynamic viewport height for mobile)
- Only inner content areas scroll
- Sticky headers remain visible

**Why `h-dvh` instead of `h-screen`?**

- `h-dvh` adapts to mobile browser UI (address bar appearing/disappearing)
- Provides better mobile experience
- Standard `h-screen` can cause layout issues on mobile browsers

### Client vs Server Components

- **Server Components** (default): Pages, layouts that don't use hooks
- **Client Components** (`'use client'`): Components using hooks, context, event handlers

## 🔄 Updates Log

### 2024-11-24

- Initial component structure established
- CollapsibleSidebar with theme toggle created
- ThemeContext and SidebarContext implemented
- Dark mode fully functional with Tailwind v4
- Typography system with PP Telegraf and PP Woodland fonts
- Fixed-height layout with internal scrolling

---

**Remember:** This is a living document. Update it whenever you:

- Add new components
- Change file structure
- Update design patterns
- Add new utilities or contexts

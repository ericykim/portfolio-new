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
│   ├── CollapsibleSidebar.tsx
│   ├── PageHeader.tsx
│   └── Providers.tsx      # Client-side providers wrapper
│
├── context/               # React Context Providers
│   ├── SidebarContext.tsx
│   └── ThemeContext.tsx
│
├── styles/                # Global styles & fonts
│   ├── globals.css
│   └── typography.ts
│
├── hero.ts                # HeroUI plugin configuration
│
├── public/                # Static assets
│   ├── favicon.ico
│   └── font/
│
└── sanity/                # Sanity CMS integration
    └── client.ts
```

## 🎨 Component Guidelines

### UI Component Library

**We use HeroUI (formerly NextUI)** - A beautiful, fast, and modern React UI library built on top of Tailwind CSS.

- **Documentation:** https://www.heroui.com/docs/
- **Version:** 2.8.5
- **Peer Dependencies:** framer-motion (for animations)

#### Why HeroUI?

- Pre-built, accessible components
- Full dark mode support
- Seamless Tailwind CSS v4 integration
- TypeScript support
- Customizable theming
- Production-ready with consistent design

#### Using HeroUI Components

Import components from `@heroui/react`:

```tsx
import { Button, Card, CardBody, Chip } from "@heroui/react";

function MyComponent() {
  return (
    <Card>
      <CardBody>
        <Button color="primary">Click me</Button>
        <Chip color="success">New</Chip>
      </CardBody>
    </Card>
  );
}
```

#### Available Components

HeroUI provides 70+ components including:

- **Actions:** Button, Link, Pagination
- **Forms:** Input, Select, Checkbox, Switch, Slider, Textarea
- **Data Display:** Card, Table, Avatar, Badge, Chip
- **Feedback:** Alert, Progress, Spinner, Skeleton, Toast
- **Navigation:** Navbar, Breadcrumbs, Tabs, Drawer
- **Overlays:** Modal, Popover, Dropdown, Tooltip
- **Date & Time:** Calendar, Date Picker, Time Input
- **And more...**

See full list: https://www.heroui.com/docs/components/

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

### 1. Providers

**Location:** `components/Providers.tsx`

**Purpose:** Client-side providers wrapper to enable HeroUI and context usage while keeping root layout as a Server Component.

**Features:**

- Wraps `HeroUIProvider` for component library access
- Wraps `ThemeProvider` for dark mode management
- Wraps `SidebarProvider` for sidebar state
- Marked with `"use client"` directive

**Why it exists:**

Next.js doesn't allow exporting `metadata` from client components. By isolating all client providers in this component, the root `layout.tsx` remains a Server Component and can export metadata.

**Usage:**

```tsx
// app/layout.tsx
import { Providers } from "@/components/Providers";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
```

### 2. CollapsibleSidebar

**Location:** `components/CollapsibleSidebar.tsx`

**Features:**

- Collapsible navigation sidebar
- Persistent state (localStorage)
- Mobile responsive with overlay
- Active route highlighting
- Dark mode support
- Theme toggle button at bottom (uses HeroUI Button)

**Dependencies:**

- `context/SidebarContext.tsx` - Sidebar state
- `context/ThemeContext.tsx` - Theme state
- `lucide-react` - Icons
- `@heroui/react` - Button component

**Usage:**

```tsx
import { CollapsibleSidebar } from "@/components/CollapsibleSidebar";

<CollapsibleSidebar />;
```

### 3. PageHeader

**Location:** `components/PageHeader.tsx`

**Features:**

- Displays current page name based on route
- Shows Beta badge (using HeroUI Chip)
- Sticky positioning
- Dark mode support

**Usage:**

```tsx
import { PageHeader } from "@/components/PageHeader";

<PageHeader />;
```

### 4. SidebarContext

**Location:** `context/SidebarContext.tsx`

**Purpose:** Manages global sidebar open/closed state

**API:**

```tsx
const { isOpen, toggle, close } = useSidebar();
```

### 5. ThemeContext

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

## ⚙️ HeroUI Configuration

### Setup Files

**1. `hero.ts`** - HeroUI plugin export for Tailwind v4

```ts
import { heroui } from "@heroui/react";

export default heroui();
```

**2. `styles/globals.css`** - CSS imports

```css
@import "tailwindcss";
@plugin "../hero.ts";

@custom-variant dark (&:where(.dark, .dark *));
```

The `@plugin` directive loads the HeroUI plugin using Tailwind v4's CSS-first approach.

### Dark Mode Integration

HeroUI components automatically support dark mode and respect the `.dark` class on the `<html>` element. No additional configuration needed - it works seamlessly with our existing `ThemeContext`.

### Customizing HeroUI

To customize the HeroUI theme, update `hero.ts`:

```ts
import { heroui } from "@heroui/react";

export default heroui({
  themes: {
    light: {
      colors: {
        primary: "#0070f3",
        // ... more colors
      },
    },
    dark: {
      colors: {
        primary: "#3291ff",
        // ... more colors
      },
    },
  },
});
```

See: https://www.heroui.com/docs/customization/theme

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
- [ ] **Consider using HeroUI components** instead of building from scratch
- [ ] Ensure HeroUI components have proper dark mode styling

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

**Important Pattern for HeroUI:**

Since `HeroUIProvider` is a client component, you cannot export `metadata` from a layout that uses it directly. Solution:

```tsx
// ✅ Correct - Separate Providers component
// components/Providers.tsx
"use client";
export function Providers({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}

// app/layout.tsx (Server Component)
export const metadata = { ... }; // ✅ Works!
export default function RootLayout({ children }) {
  return <Providers>{children}</Providers>;
}

// ❌ Wrong - Directly using HeroUIProvider
// app/layout.tsx
"use client"; // This makes it a client component
export const metadata = { ... }; // ❌ Error!
export default function RootLayout({ children }) {
  return <HeroUIProvider>{children}</HeroUIProvider>;
}
```

## 🔄 Updates Log

### 2024-11-24

**Morning:**

- Initial component structure established
- CollapsibleSidebar with theme toggle created
- ThemeContext and SidebarContext implemented
- Dark mode fully functional with Tailwind v4
- Typography system with PP Telegraf and PP Woodland fonts
- Fixed-height layout with internal scrolling

**Afternoon:**

- ✨ **HeroUI Integration Complete**
- Installed `@heroui/react@2.8.5` and `framer-motion@12.23.24`
- Created `hero.ts` configuration file for Tailwind v4
- Updated `globals.css` with `@plugin` directive
- Created `Providers.tsx` wrapper component for client-side providers
- Refactored layout to keep metadata export working
- Updated CollapsibleSidebar to use HeroUI Button components
- Added PageHeader with HeroUI Chip component
- Created `/demo` page showcasing HeroUI components (Buttons, Cards, Chips, etc.)
- Full dark mode compatibility with HeroUI maintained

---

**Remember:** This is a living document. Update it whenever you:

- Add new components
- Change file structure
- Update design patterns
- Add new utilities or contexts

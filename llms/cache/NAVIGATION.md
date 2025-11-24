# Collapsible Navigation System

A Brian Lovin-inspired collapsible sidebar navigation built with Next.js 16, React, Tailwind CSS, and Lucide React icons.

## 🎯 Key Features

- ✅ **Collapsible Sidebar**: Opens/closes with smooth animations
- ✅ **Persistent State**: Remembers open/closed state via localStorage
- ✅ **Responsive**: Adapts to all screen sizes
- ✅ **Fixed Header When Closed**: Shows page title + menu button at the top
- ✅ **Overlay Navigation**: Sidebar slides over content (not pushing it)
- ✅ **Active State Highlighting**: Current page is highlighted
- ✅ **Auto-close on Mobile**: Closes after navigation on small screens
- ✅ **Backdrop Overlay**: Dark overlay behind open sidebar on mobile
- ✅ **Scroll Lock**: Prevents body scroll when sidebar is open on mobile

## 📁 Components

### 1. `SidebarContext.tsx`
Manages the global sidebar open/closed state using React Context.

**API:**
```typescript
const { isOpen, toggle, close } = useSidebar();
```

### 2. `CollapsibleSidebar.tsx`
The main sidebar component containing navigation links.

**Features:**
- Fixed position overlay
- Slides in/out from the left
- 224px width (w-56)
- Collapse button (desktop only)
- Grouped navigation (main + projects)

### 3. `PageHeader.tsx`
Fixed header that only shows when sidebar is closed.

**Features:**
- Shows page title + hamburger menu
- Fixed at top of viewport
- Only renders when `isOpen === false`

## 🎨 Styling Guidelines

### Colors (Tailwind Classes)
```
Background: bg-white dark:bg-neutral-950
Border: border-neutral-200 dark:border-neutral-800
Text (Primary): text-neutral-900 dark:text-neutral-100
Text (Secondary): text-neutral-600 dark:text-neutral-400
Text (Muted): text-neutral-400 dark:text-neutral-500
Active BG: bg-neutral-100 dark:bg-neutral-900
Hover BG: hover:bg-neutral-50 dark:hover:bg-neutral-900/50
```

### Typography
```
Page Title: text-xl font-semibold
Nav Item: text-sm font-medium
Section Label: text-xs font-medium
Icon Size: w-[18px] h-[18px]
```

### Spacing
```
Sidebar Width: w-56 (224px)
Sidebar Padding: p-3
Nav Item Padding: px-2 py-1.5
Nav Item Gap: gap-2.5
Header Padding: px-6 py-3
Content Padding: p-8 pt-24 (when header shows)
```

## 🔧 Customization

### Update Navigation Items

Edit both components (`CollapsibleSidebar.tsx`):

```typescript
const mainNavItems: NavItem[] = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/writing', label: 'Writing', icon: FileText },
  // Add more...
];

const projectNavItems: NavItem[] = [
  { href: '/work', label: 'Work', icon: Briefcase },
  // Add more...
];
```

### Change Sidebar Width

1. Update `CollapsibleSidebar.tsx`: Change `w-56` to desired width
2. No need to update page padding - content doesn't shift

### Add New Icons

Browse [Lucide Icons](https://lucide.dev/icons) and import:

```typescript
import { YourNewIcon } from 'lucide-react';
```

### Adjust Breakpoints

Currently uses `md:` (768px) for mobile/desktop split. Change throughout:
- `md:hidden` → `lg:hidden` (for larger mobile breakpoint)
- `window.innerWidth < 768` → `window.innerWidth < 1024`

## 📱 Responsive Behavior

### Desktop (≥768px)
- Sidebar overlay on left side
- Can be toggled open/closed
- Collapse button visible in sidebar
- State persists via localStorage

### Mobile (<768px)  
- Sidebar closed by default
- Opens as full-height overlay
- Dark backdrop behind sidebar
- Auto-closes after navigation
- No collapse button (always toggles)

## 🚀 Usage in Pages

```typescript
import { PageHeader } from "./components/PageHeader";

export default function YourPage() {
  return (
    <>
      <PageHeader title="Your Page Title" />
      <main className="min-h-screen p-8 pt-24">
        <div className="container mx-auto max-w-3xl">
          {/* Your content */}
        </div>
      </main>
    </>
  );
}
```

**Important:** Always use the fragment wrapper and include `pt-24` for proper spacing when the header appears.

## 🎭 Animations

- Sidebar: `transition-transform duration-200 ease-in-out`
- Nav items: `transition-colors duration-150 ease-in-out`
- Backdrop: Fades in/out automatically

## 💡 Tips

1. **Icon Library**: Lucide React is tree-shakeable - only imports what you use
2. **Dark Mode**: All components support dark mode via Tailwind's `dark:` variant
3. **Persistence**: Sidebar state survives page refreshes via localStorage
4. **Accessibility**: All buttons have `aria-label` attributes
5. **Performance**: Uses React Context to avoid prop drilling

## 🐛 Troubleshooting

**Sidebar won't close on mobile:**
- Check that window width detection is working
- Ensure `close()` is called in useEffect when pathname changes

**State not persisting:**
- Check localStorage is enabled
- Verify 'sidebar-open' key in DevTools

**Layout shifts:**
- Ensure sidebar is `fixed` position, not `absolute`
- Content should NOT have responsive left padding

## 📝 TODO Ideas

- [ ] Add keyboard shortcuts (e.g., Cmd+B to toggle)
- [ ] Add animation for page transitions
- [ ] Support nested navigation groups
- [ ] Add search functionality
- [ ] Collapsible project sections


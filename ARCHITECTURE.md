# Scriptae Architecture

## Tech Stack

- **Framework**: React 19.2.0
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with custom properties (CSS variables)
- **Markdown**: ReactMarkdown with remark-gfm
- **Code Highlighting**: react-syntax-highlighter with Prism

## Project Structure

```
scriptae/
├── public/
│   └── templates/          # All template files stored here
│       ├── template.json        # Base template config (theme-agnostic)
│       ├── template-light.json  # Light theme color overrides
│       ├── template-dark.json   # Dark theme color overrides
│       ├── header.html          # Reusable header template
│       ├── home.html            # Homepage template
│       ├── post.html            # Blog post template
│       └── post-list-item.html  # Post list item template
├── content/
│   ├── posts/              # Published blog posts (.md)
│   └── drafts/             # Draft posts (.md)
└── src/
    ├── components/         # React components
    ├── pages/              # Page components (Home, Post)
    └── utils/              # Utility functions
        ├── template.ts          # Template loading and theme management
        ├── templateEngine.ts    # HTML template rendering engine
        └── posts.ts             # Markdown post loading
```

## Template System

### Overview
The template system uses a three-tier structure:
1. **Base Template** (`template.json`) - Contains all theme-agnostic configuration
2. **Theme Overrides** (`template-light.json`, `template-dark.json`) - Color and visual overrides
3. **HTML Templates** (`.html` files) - Reusable HTML structure with variable substitution

### Template Loading Flow
1. Load base `template.json` from `/templates/`
2. Load theme-specific file (`template-light.json` or `template-dark.json`)
3. Deep merge theme overrides into base config
4. Apply CSS custom properties to `:root`
5. Load and render HTML templates with merged data

### Template Configuration Structure
```typescript
{
  site: {
    title, description, tagline, footer
  },
  theme: {
    colors: { ... },          // CSS color variables
    fonts: { ... },           // Font stacks
    spacing: { ... },         // Layout spacing
    borderRadius,             // Border radius
    headerGradient            // Header background
  },
  layout: {
    home: { ... },            // Homepage settings
    post: { ... },            // Post page settings
    postList: { ... }         // Post list settings
  },
  text: {
    // All UI text/labels for easy customization
    loading, showingPosts, showAllButton, etc.
  }
}
```

### Theme Inheritance
- **Base template** contains ALL properties (site, fonts, spacing, layout, text)
- **Theme files** contain ONLY overrides (colors, headerGradient)
- Deep merge ensures theme overrides replace base values while preserving structure
- Missing theme files fall back to base template

### CSS Custom Properties
All theme values are applied as CSS variables on `:root`:
- Colors: `--color-primary`, `--color-text`, `--color-background`, etc.
- Fonts: `--font-primary`, `--font-headings`, `--font-code`
- Spacing: `--spacing-contentMaxWidth`, `--spacing-postSpacing`, etc.
- Other: `--border-radius`, `--header-gradient`

Components use these variables for theme-aware styling:
```css
.post-title {
  color: var(--color-text);
  font-family: var(--font-headings);
}
```

## HTML Template Engine

### Syntax
- **Variables**: `{{variableName}}` - Simple substitution
- **Conditionals**: `{{#if condition}}...{{/if}}` - Show/hide blocks
- **Includes**: `{{>templateName}}` - Embed other templates

### Template Loading
- Templates cached in production (`import.meta.env.PROD`)
- Cache-busting in development for hot reload
- Located in `/public/templates/` directory
- Accessed via `/templates/name.html`

## Content Management

### Blog Posts
- Stored in `/content/posts/` as Markdown (.md) files
- Loaded via Vite glob imports: `import.meta.glob('/content/posts/*.md')`
- Parsed with gray-matter for frontmatter
- Sorted by date (newest first)

### Frontmatter Structure
```yaml
---
title: "Post Title"
date: "2024-01-15"
author: "Author Name"
excerpt: "Brief description"
draft: false
---
```

### Drafts
- Stored in `/content/drafts/`
- Not shown on public site
- Same structure as posts

## Pagination System

### Implementation
- **Page-based**: Uses `currentPage` state to calculate slice indices
- **Configurable**: Posts per page set via `postsToShow` state
- **Controls**: Newer/Older navigation links, "Show All" toggle, posts limit input
- **Reset behavior**: Returns to page 1 when changing posts per page or toggling "Show All"

### Navigation
- **Newer Posts** (←) - Shows when `currentPage > 0`
- **Older Posts** (→) - Shows when more posts exist beyond current page
- Both hidden when "Show All" is active

## Code Block Styling

### Features
- Line numbers with green gutter line (#6ce26c)
- Highlighted lines with gray background
- Monaco font stack
- Theme-aware text colors (black in light, white in dark)
- Continuous vertical gutter line via CSS ::before

### Implementation
- Component: `CodeBlock.tsx`
- Library: react-syntax-highlighter with Prism
- Styles: `CodeBlock.css` using CSS custom properties
- Line number styling: Centered, custom colors, transparent background
- Gutter: 2px green vertical line at left: 2.7em

## State Management

### No External Libraries
- Pure React hooks (useState, useEffect, useRef)
- Template configuration loaded once and cached
- Theme preference stored in localStorage
- Event delegation for dynamic HTML template interactions

### Event Handling Pattern
- HTML templates use `data-action` attributes
- React event listeners on container element
- Event delegation handles clicks/inputs on dynamically rendered HTML
- Event listeners re-attached when `renderedHTML` changes

## Design Principles

1. **Template-First**: All visual customization through JSON/HTML templates
2. **Theme Inheritance**: Minimize duplication via base + override pattern
3. **CSS Variables**: Enable dynamic theming without CSS rewrites
4. **Type Safety**: TypeScript interfaces for all configuration
5. **Performance**: Template caching, glob imports, React optimizations
6. **Developer Experience**: Hot reload, clear separation of concerns

## Development Workflow

1. Content changes: Edit .md files in `/content/posts/`
2. Visual changes: Edit JSON templates in `/public/templates/`
3. Layout changes: Edit HTML templates in `/public/templates/`
4. Component changes: Edit React components in `/src/`
5. Theme changes: Edit `template-light.json` or `template-dark.json`

## Key Files

- `src/utils/template.ts` - Template loading, theme management, CSS variable application
- `src/utils/templateEngine.ts` - HTML template parsing and rendering
- `src/utils/posts.ts` - Markdown post loading and parsing
- `src/pages/Home.tsx` - Homepage with post list and pagination
- `src/components/Post.tsx` - Individual post display
- `public/templates/template.json` - Base configuration (source of truth)

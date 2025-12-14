# Template Customization Guide

This blog application uses a JSON-based template system that allows you to customize the appearance and behavior of your blog **without touching any code**. All customization is done through the `public/template.json` file.

## Table of Contents

- [Overview](#overview)
- [Template File Location](#template-file-location)
- [Template Structure](#template-structure)
- [Customization Options](#customization-options)
  - [Site Information](#site-information)
  - [Theme Colors](#theme-colors)
  - [Fonts](#fonts)
  - [Spacing](#spacing)
  - [Layout Options](#layout-options)
  - [Text and Labels](#text-and-labels)
- [Examples](#examples)
- [Tips and Best Practices](#tips-and-best-practices)

## Overview

The template system provides three main areas of customization:

1. **Site Settings** - Your blog's title, description, and optional tagline/footer
2. **Theme** - Colors, fonts, spacing, and visual styling
3. **Layout** - Control what elements are shown and how they behave
4. **Text** - Customize all user-facing text and labels

## Template File Location

The template configuration file is located at:
```
public/template.json
```

**Important**: After making changes to `template.json`, refresh your browser to see the updates.

## Template Structure

The template is organized into four main sections:

```json
{
  "site": { ... },      // Site information
  "theme": { ... },     // Visual styling
  "layout": { ... },    // Layout controls
  "text": { ... }       // Text and labels
}
```

## Customization Options

### Site Information

Located in the `"site"` section:

```json
"site": {
  "title": "My Blog",                                    // Main blog title
  "description": "A markdown-based blog built with React", // Subtitle
  "tagline": "",                                         // Optional additional text
  "footer": ""                                           // Optional footer text
}
```

**Example**:
```json
"site": {
  "title": "Tech Insights",
  "description": "Exploring the world of software development",
  "tagline": "Code, Coffee, and Creativity",
  "footer": "© 2025 Tech Insights. All rights reserved."
}
```

### Theme Colors

Located in `"theme" → "colors"`:

```json
"colors": {
  "primary": "#667eea",       // Primary brand color
  "secondary": "#764ba2",     // Secondary brand color
  "accent": "#3498db",        // Accent color (buttons, links)
  "accentHover": "#2980b9",   // Accent color on hover
  "text": "#2c3e50",          // Main text color
  "textLight": "#7f8c8d",     // Lighter text (metadata)
  "background": "#ffffff",    // Page background
  "headerText": "#ffffff",    // Text color in header
  "border": "#ddd",           // Border colors
  "draft": "#e74c3c"          // Draft indicator color
}
```

**Dark Theme Example**:
```json
"colors": {
  "primary": "#1a1a2e",
  "secondary": "#16213e",
  "accent": "#0f3460",
  "accentHover": "#533483",
  "text": "#eaeaea",
  "textLight": "#a0a0a0",
  "background": "#0f0f0f",
  "headerText": "#ffffff",
  "border": "#333",
  "draft": "#ff6b6b"
}
```

### Fonts

Located in `"theme" → "fonts"`:

```json
"fonts": {
  "primary": "-apple-system, BlinkMacSystemFont, 'Segoe UI', ...",
  "headings": "inherit",   // Font for headings (or "inherit" to use primary)
  "code": "'Courier New', Courier, monospace"
}
```

**Example with Google Fonts**:
```json
"fonts": {
  "primary": "'Open Sans', sans-serif",
  "headings": "'Playfair Display', serif",
  "code": "'Fira Code', monospace"
}
```
*Note: Don't forget to add the Google Fonts link in your `index.html`*

### Spacing

Located in `"theme" → "spacing"`:

```json
"spacing": {
  "headerPadding": "60px 20px 40px",  // Header padding
  "contentMaxWidth": "800px",          // Maximum content width
  "postSpacing": "40px"                // Space between posts
}
```

**Example for wider layout**:
```json
"spacing": {
  "headerPadding": "80px 40px 50px",
  "contentMaxWidth": "1000px",
  "postSpacing": "50px"
}
```

### Other Theme Options

```json
"borderRadius": "4px",  // Border radius for buttons, inputs, etc.
"headerGradient": "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
```

**Solid Color Header**:
```json
"headerGradient": "#2c3e50"
```

### Layout Options

Control what elements are displayed and how they behave.

#### Home Page Layout

Located in `"layout" → "home"`:

```json
"home": {
  "showPostCount": true,          // Show "Showing X of Y posts"
  "showControls": true,            // Show post controls
  "defaultPostsToShow": 5,         // Number of posts shown initially
  "dateFormat": "long"             // "long", "short", or "numeric"
}
```

**Date Format Examples**:
- `"long"`: "December 14, 2025"
- `"short"`: "Dec 14, 2025"
- `"numeric"`: "12/14/2025"

#### Post Page Layout

Located in `"layout" → "post"`:

```json
"post": {
  "showAuthor": true,                    // Show author name
  "showDate": true,                      // Show publication date
  "showBackButton": true,                // Show back to home link
  "backButtonText": "← Back to Home",   // Back button text
  "dateFormat": "long"                   // Date format
}
```

#### Post List Layout

Located in `"layout" → "postList"`:

```json
"postList": {
  "showExcerpt": true,              // Show post excerpt
  "showAuthor": true,               // Show author name
  "showDraftIndicator": true,       // Show draft badge
  "draftIndicatorText": "[DRAFT]",  // Draft badge text
  "readMoreText": "Read more →"     // Read more link text
}
```

### Text and Labels

Located in `"text"`:

```json
"text": {
  "loading": "Loading posts...",
  "loadingPost": "Loading...",
  "noPostsFound": "No posts found.",
  "postNotFound": "Post not found",
  "errorLoading": "Failed to load post",
  "showingPosts": "Showing {current} of {total} posts",  // {current} and {total} are placeholders
  "postsToShowLabel": "Posts to show: ",
  "showAllButton": "Show All",
  "showLessButton": "Show Less"
}
```

**Localization Example (Spanish)**:
```json
"text": {
  "loading": "Cargando publicaciones...",
  "loadingPost": "Cargando...",
  "noPostsFound": "No se encontraron publicaciones.",
  "postNotFound": "Publicación no encontrada",
  "errorLoading": "Error al cargar la publicación",
  "showingPosts": "Mostrando {current} de {total} publicaciones",
  "postsToShowLabel": "Publicaciones a mostrar: ",
  "showAllButton": "Mostrar Todo",
  "showLessButton": "Mostrar Menos"
}
```

## Examples

### Example 1: Minimal Clean Theme

```json
{
  "site": {
    "title": "Minimalist Blog",
    "description": "Less is more",
    "tagline": "",
    "footer": ""
  },
  "theme": {
    "colors": {
      "primary": "#000000",
      "secondary": "#333333",
      "accent": "#666666",
      "accentHover": "#333333",
      "text": "#000000",
      "textLight": "#666666",
      "background": "#ffffff",
      "headerText": "#ffffff",
      "border": "#e0e0e0",
      "draft": "#999999"
    },
    "headerGradient": "#000000"
  },
  "layout": {
    "home": {
      "showPostCount": false,
      "defaultPostsToShow": 10
    },
    "postList": {
      "showExcerpt": false,
      "showAuthor": false,
      "readMoreText": "→"
    }
  }
}
```

### Example 2: Vibrant and Colorful

```json
{
  "site": {
    "title": "Creative Corner",
    "description": "Where imagination meets code",
    "tagline": "✨ Building beautiful things"
  },
  "theme": {
    "colors": {
      "primary": "#ff6b6b",
      "secondary": "#4ecdc4",
      "accent": "#ffe66d",
      "accentHover": "#ffd93d",
      "text": "#2d3561",
      "textLight": "#95aac9",
      "background": "#f7f9fb",
      "headerText": "#ffffff",
      "border": "#d4e4f7",
      "draft": "#ff8c42"
    },
    "headerGradient": "linear-gradient(135deg, #ff6b6b 0%, #4ecdc4 100%)",
    "borderRadius": "12px"
  }
}
```

### Example 3: Professional Corporate

```json
{
  "site": {
    "title": "Enterprise Insights",
    "description": "Industry analysis and thought leadership",
    "footer": "© 2025 Enterprise Insights. All rights reserved."
  },
  "theme": {
    "colors": {
      "primary": "#1e3a8a",
      "secondary": "#1e40af",
      "accent": "#3b82f6",
      "accentHover": "#2563eb",
      "text": "#1e293b",
      "textLight": "#64748b",
      "background": "#ffffff",
      "headerText": "#ffffff",
      "border": "#e2e8f0",
      "draft": "#ef4444"
    },
    "fonts": {
      "primary": "'Inter', sans-serif",
      "headings": "'Montserrat', sans-serif"
    },
    "spacing": {
      "contentMaxWidth": "900px",
      "postSpacing": "50px"
    }
  }
}
```

## Tips and Best Practices

### 1. Color Contrast
Ensure sufficient contrast between text and background colors for readability. Use tools like [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/).

### 2. Backup Your Template
Before making major changes, save a copy of your `template.json` file:
```bash
cp public/template.json public/template.backup.json
```

### 3. Gradual Changes
Make small changes and refresh to see the effect. This helps identify what works best.

### 4. Browser Caching
If changes don't appear, try a hard refresh:
- **Windows/Linux**: `Ctrl + Shift + R`
- **Mac**: `Cmd + Shift + R`

### 5. Validate JSON
Use a JSON validator to ensure your template file is properly formatted:
- [JSONLint](https://jsonlint.com/)
- VS Code has built-in JSON validation

### 6. Color Palette Tools
Use these tools to create harmonious color schemes:
- [Coolors.co](https://coolors.co/)
- [Adobe Color](https://color.adobe.com/)
- [Paletton](https://paletton.com/)

### 7. Font Pairing
For font combinations:
- [Google Fonts](https://fonts.google.com/) - Browse popular pairings
- [FontPair](https://www.fontpair.co/) - Curated font combinations

### 8. Testing
Test your template with:
- Different screen sizes (mobile, tablet, desktop)
- Different browsers
- Both light and dark room environments

### 9. Accessibility
- Use semantic color choices (e.g., red for draft/error states)
- Maintain sufficient color contrast
- Test with screen readers if possible

### 10. Default Fallback
If the template file fails to load or has errors, the application will use built-in defaults, so your blog won't break.

---

## Need Help?

If you encounter issues:
1. Check browser console for errors (F12)
2. Validate your JSON syntax
3. Compare your template with the examples above
4. Restore from backup if needed

Happy customizing! 🎨

# Template System - Quick Reference

## File Location
📁 `public/template.json`

## Main Sections

### 1. Site (`site`)
```json
{
  "title": "Blog Title",
  "description": "Subtitle",
  "tagline": "Optional tagline",
  "footer": "Optional footer"
}
```

### 2. Colors (`theme.colors`)
```json
{
  "primary": "#667eea",      // Brand color
  "secondary": "#764ba2",    // Secondary brand
  "accent": "#3498db",       // Links, buttons
  "accentHover": "#2980b9",  // Hover state
  "text": "#2c3e50",         // Main text
  "textLight": "#7f8c8d",    // Meta text
  "background": "#ffffff",   // Page background
  "headerText": "#ffffff",   // Header text
  "border": "#ddd",          // Borders
  "draft": "#e74c3c"         // Draft indicator
}
```

### 3. Fonts (`theme.fonts`)
```json
{
  "primary": "Font for body text",
  "headings": "Font for headings (or 'inherit')",
  "code": "Font for code blocks"
}
```

### 4. Spacing (`theme.spacing`)
```json
{
  "headerPadding": "60px 20px 40px",
  "contentMaxWidth": "800px",
  "postSpacing": "40px"
}
```

### 5. Layout Options

#### Home Page (`layout.home`)
- `showPostCount`: Show post counter
- `showControls`: Show post controls
- `defaultPostsToShow`: Initial number of posts
- `dateFormat`: "long" | "short" | "numeric"

#### Post Page (`layout.post`)
- `showAuthor`: Display author name
- `showDate`: Display date
- `showBackButton`: Show back link
- `backButtonText`: Back button label
- `dateFormat`: Date format

#### Post List (`layout.postList`)
- `showExcerpt`: Display excerpts
- `showAuthor`: Display authors
- `showDraftIndicator`: Show draft badges
- `draftIndicatorText`: Draft badge text
- `readMoreText`: Read more link text

### 6. Text Labels (`text`)
All user-facing text can be customized for localization or personalization.

## Quick Tips

✅ **DO:**
- Validate JSON before saving
- Make small changes and test
- Use web-safe colors or hex codes
- Keep backups of working templates

❌ **DON'T:**
- Remove required fields
- Use invalid JSON syntax
- Forget to refresh browser after changes

## Common Tasks

**Change blog title:**
```json
"site": { "title": "Your New Title" }
```

**Switch to dark theme:**
See `public/template-dark.json.example`

**Change date format:**
```json
"layout": { "home": { "dateFormat": "short" } }
```

**Hide elements:**
```json
"layout": { "postList": { "showExcerpt": false } }
```

**Localize to another language:**
Edit all values in the `"text"` section

## Resources

- Full documentation: [TEMPLATE.md](TEMPLATE.md)
- Color picker: https://coolors.co/
- Font pairings: https://fonts.google.com/
- JSON validator: https://jsonlint.com/

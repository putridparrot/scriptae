# Browser Tab Title & Logo Configuration

## Overview
The site title (browser tab title) and logo/favicon can now be configured through the template system without touching any code.

## Configuration

Add these optional properties to your `public/template.json` file:

```json
{
  "site": {
    "title": "My Blog",
    "description": "A markdown-based blog",
    "siteTitle": "My Blog - Thoughts & Ideas",  // ← Browser tab title
    "logoPath": "/logo.svg"                      // ← Path to favicon/logo
  }
}
```

## Properties

### `siteTitle` (optional)
- **Type**: String
- **Default**: "scriptae"
- **Description**: Sets the text shown in the browser tab/window title
- **Example**: `"Tech Insights - Software Development Blog"`

### `logoPath` (optional)
- **Type**: String  
- **Default**: "/logo.svg"
- **Description**: Path to your favicon/logo file (relative to `public` folder)
- **Supported formats**: `.svg`, `.png`, `.ico`, `.jpg`
- **Examples**: 
  - `"/logo.svg"` - Uses `public/logo.svg`
  - `"/images/favicon.ico"` - Uses `public/images/favicon.ico`
  - `"/custom-icon.png"` - Uses `public/custom-icon.png`

## Examples

### Example 1: Custom Browser Title Only
```json
{
  "site": {
    "title": "DevBytes",
    "description": "Quick tech tips and tutorials",
    "siteTitle": "DevBytes - Byte-sized Development Tips"
  }
}
```
Result: Browser tab shows "DevBytes - Byte-sized Development Tips"

### Example 2: Custom Logo Only
```json
{
  "site": {
    "title": "My Tech Blog",
    "logoPath": "/favicon-32x32.png"
  }
}
```
Result: Browser uses `public/favicon-32x32.png` as the favicon

### Example 3: Full Branding
```json
{
  "site": {
    "title": "Code Chronicles",
    "description": "Stories from the developer's journey",
    "tagline": "Debugging life, one commit at a time",
    "footer": "© 2025 Code Chronicles. Built with ❤️ and TypeScript",
    "siteTitle": "Code Chronicles | Developer Stories & Tutorials",
    "logoPath": "/brand/logo.svg"
  }
}
```

## Adding Your Own Logo

1. Place your logo file in the `public` folder (or subfolder like `public/brand/`)
2. Update `logoPath` in `template.json`:
   ```json
   "logoPath": "/brand/my-logo.svg"
   ```
3. Refresh your browser

### Recommended Logo Specs
- **Format**: SVG (recommended for scalability) or PNG
- **Size**: 32x32px or 16x16px for favicon
- **Size**: 192x192px or larger for app icons
- **Background**: Transparent recommended

## How It Works

When the app loads:
1. Reads `siteTitle` from template configuration
2. Sets `document.title` to the configured value
3. Reads `logoPath` from template configuration  
4. Updates the `<link rel="icon">` href to the new path

This happens in `App.tsx` during the initial theme setup, so your branding appears immediately when the page loads.

## Migration from Default

If you were using the default "scriptae" title and want to customize:

**Before** (index.html):
```html
<title>scriptae</title>
```

**After** (template.json):
```json
{
  "site": {
    "siteTitle": "My Custom Blog Title"
  }
}
```

The template configuration takes precedence and dynamically sets the title.

## Notes

- Changes take effect immediately on page refresh
- If `siteTitle` is not specified, the title remains as set in `index.html` ("scriptae")
- If `logoPath` is not specified, the default `/logo.svg` is used
- Logo path is relative to the `public` folder
- The logo file must exist in your `public` folder for it to display

## Example File

See `public/template-custom-branding.json.example` for a complete example with branding configuration.

# HTML Template System Guide

## Overview

The blog now supports **fully customizable HTML templates**, giving you complete control over the structure and layout of your blog posts, post lists, and header without touching any React code!

## How It Works

1. **HTML Templates** in `public/templates/` define the structure
2. **Template Engine** processes placeholders and conditionals
3. **Components** render using your custom HTML

## Template Files

### Available Templates

- **`post.html`** - Individual blog post page
- **`post-list-item.html`** - Single post in the list view
- **`header.html`** - Blog header/hero section

## Template Syntax

### Variables

Use double curly braces `{{variable}}` for dynamic content:

```html
<h1>{{title}}</h1>
<p>{{description}}</p>
<span>{{author}}</span>
```

### Conditionals

Use `{{#if condition}}...{{/if}}` blocks:

```html
{{#if author}}
  <span class="author">by {{author}}</span>
{{/if}}

{{#if draft}}
  <div class="draft-badge">DRAFT</div>
{{/if}}
```

### Nested Conditionals

You can nest conditionals:

```html
{{#if showAuthor}}
  {{#if author}}
    <span>by {{author}}</span>
  {{/if}}
{{/if}}
```

### Template Includes (Partials)

Use `{{>templateName}}` to embed other templates:

```html
<article class="post">
  {{>header}}
  
  <div class="post-content">
    {{content}}
  </div>
</article>
```

This will automatically load and render the `header.html` template at that location. The included template has access to the same data as the parent template, making it easy to reuse components across different pages **without modifying any code**.

**Benefits:**
- Reuse common elements (headers, footers, navigation) across templates
- No code changes needed - just edit the HTML templates
- Nested includes are supported (templates can include other templates)
- Changes take effect immediately on page refresh

## Available Variables

### post.html

| Variable | Type | Description |
|----------|------|-------------|
| `{{title}}` | string | Post title |
| `{{author}}` | string | Author name |
| `{{date}}` | string | Formatted publication date |
| `{{content}}` | HTML | Rendered markdown content |
| `{{draft}}` | boolean | Draft status |
| `{{showBackButton}}` | boolean | Layout setting |
| `{{showDate}}` | boolean | Layout setting |
| `{{showAuthor}}` | boolean | Layout setting |
| `{{backButtonText}}` | string | Back button label |

### post-list-item.html

| Variable | Type | Description |
|----------|------|-------------|
| `{{title}}` | string | Post title |
| `{{slug}}` | string | URL slug |
| `{{author}}` | string | Author name |
| `{{date}}` | string | Formatted date |
| `{{excerpt}}` | string | Post excerpt |
| `{{draft}}` | boolean | Draft status |
| `{{showExcerpt}}` | boolean | Layout setting |
| `{{showAuthor}}` | boolean | Layout setting |
| `{{showDraftIndicator}}` | boolean | Layout setting |
| `{{draftIndicatorText}}` | string | Draft badge text |
| `{{readMoreText}}` | string | Read more link text |

### header.html

| Variable | Type | Description |
|----------|------|-------------|
| `{{title}}` | string | Blog title |
| `{{description}}` | string | Blog description |
| `{{tagline}}` | string | Optional tagline |

## Example Templates

### Example 1: Minimal Post Template

```html
<article class="post minimal">
  <h1>{{title}}</h1>
  <div class="content">
    {{content}}
  </div>
</article>
```

### Example 2: Magazine-Style Post

```html
<article class="post magazine-style">
  <div class="post-hero">
    <div class="post-meta-top">
      {{#if draft}}
      <span class="badge badge-draft">DRAFT</span>
      {{/if}}
      <span class="post-date">{{date}}</span>
    </div>
    
    <h1 class="post-title">{{title}}</h1>
    
    {{#if author}}
    <div class="author-info">
      <span class="by-line">Written by</span>
      <span class="author-name">{{author}}</span>
    </div>
    {{/if}}
  </div>
  
  <div class="post-body">
    {{content}}
  </div>
  
  {{#if showBackButton}}
  <footer class="post-footer">
    <a href="/" class="back-link">{{backButtonText}}</a>
  </footer>
  {{/if}}
</article>
```

### Example 3: Card-Style Post List Item

```html
<div class="post-card">
  <div class="card-header">
    {{#if draft}}
    <span class="draft-pill">{{draftIndicatorText}}</span>
    {{/if}}
  </div>
  
  <div class="card-body">
    <h3 class="card-title">
      <a href="/post/{{slug}}">{{title}}</a>
    </h3>
    
    <div class="card-meta">
      <time class="card-date">{{date}}</time>
      {{#if showAuthor}}
      {{#if author}}
      <span class="card-author">{{author}}</span>
      {{/if}}
      {{/if}}
    </div>
    
    {{#if showExcerpt}}
    {{#if excerpt}}
    <p class="card-excerpt">{{excerpt}}</p>
    {{/if}}
    {{/if}}
  </div>
  
  <div class="card-footer">
    <a href="/post/{{slug}}" class="card-link">
      {{readMoreText}}
    </a>
  </div>
</div>
```

### Example 4: Timeline Post List Item

```html
<div class="timeline-item">
  <div class="timeline-marker"></div>
  <div class="timeline-content">
    <time class="timeline-date">{{date}}</time>
    <h3>
      <a href="/post/{{slug}}">{{title}}</a>
    </h3>
    {{#if showExcerpt}}
    {{#if excerpt}}
    <p>{{excerpt}}</p>
    {{/if}}
    {{/if}}
  </div>
</div>
```

### Example 5: Hero Header

```html
<header class="hero-header">
  <div class="hero-content">
    <h1 class="hero-title">{{title}}</h1>
    <p class="hero-subtitle">{{description}}</p>
    {{#if tagline}}
    <p class="hero-tagline">{{tagline}}</p>
    {{/if}}
    <div class="hero-decoration"></div>
  </div>
</header>
```

### Example 6: Centered Simple Header

```html
<header class="simple-header">
  <div class="container">
    <h1>{{title}}</h1>
    <p>{{description}}</p>
  </div>
</header>
```

## Styling Your Templates

### CSS Classes

Keep these CSS classes for compatibility with existing styles:
- `.post` - Main post container
- `.post-header` - Post header section
- `.post-content` - Post content area
- `.post-meta` - Metadata section
- `.post-preview` - Post list item
- `.blog-header` - Site header

### Custom Styles

Add your own classes and style them in the CSS files:

**In your template:**
```html
<article class="post modern-layout">
  <div class="featured-area">
    <h1>{{title}}</h1>
  </div>
  <div class="main-content">
    {{content}}
  </div>
</article>
```

**In Post.css:**
```css
.modern-layout .featured-area {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
  color: white;
}

.modern-layout .main-content {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
}
```

## Best Practices

### 1. Keep Semantic HTML
```html
<!-- Good -->
<article>
  <header>
    <h1>{{title}}</h1>
  </header>
  <div class="content">{{content}}</div>
</article>

<!-- Avoid -->
<div>
  <div><span>{{title}}</span></div>
  <div>{{content}}</div>
</div>
```

### 2. Use Accessibility Features
```html
<!-- Add ARIA labels -->
<article aria-labelledby="post-title">
  <h1 id="post-title">{{title}}</h1>
  <time datetime="{{date}}">{{date}}</time>
</article>

<!-- Use semantic elements -->
<header>, <article>, <nav>, <time>, etc.
```

### 3. Test Responsiveness
```html
<!-- Use responsive classes -->
<div class="post-grid responsive-grid">
  <div class="content-column">{{content}}</div>
  <aside class="sidebar-column">...</aside>
</div>
```

### 4. Keep Variables Safe
- Variables are automatically HTML-escaped
- `{{content}}` is pre-rendered as safe HTML
- Don't inject user input directly

### 5. Backup Before Changes
```bash
cp public/templates/post.html public/templates/post.backup.html
```

## Troubleshooting

### Template Not Loading
- Check file exists in `public/templates/`
- Verify filename ends with `.html`
- Check browser console for errors
- Try hard refresh: `Ctrl+Shift+R`

### Variables Not Showing
- Ensure variable name matches exactly
- Check for typos: `{{titel}}` vs `{{title}}`
- Verify variable is available (check docs above)

### Conditionals Not Working
- Ensure proper syntax: `{{#if var}}...{{/if}}`
- Close all conditional blocks
- Don't nest too deeply (max 3-4 levels)

### Styling Issues
- CSS classes may need updating
- Check browser DevTools for rendered HTML
- Verify CSS file is loaded
- Clear browser cache

## Advanced Techniques

### Creating New Layout Variants

Create multiple versions and switch between them:

```bash
# Save variations
cp post.html post-magazine.html
cp post.html post-minimal.html

# Switch layouts
cp post-magazine.html post.html  # Use magazine layout
cp post-minimal.html post.html   # Use minimal layout
```

### Combining with CSS

**Template:**
```html
<article class="post post-{{postType}}">
  <h1>{{title}}</h1>
  {{content}}
</article>
```

**CSS:**
```css
.post-featured {
  background: #f5f5f5;
  border-left: 4px solid #667eea;
}

.post-tutorial {
  border: 2px solid #3498db;
}
```

### Adding Custom Sections

```html
<article class="post">
  <header class="post-header">
    <h1>{{title}}</h1>
    
    <!-- Add reading time -->
    <div class="post-stats">
      <span class="reading-time">5 min read</span>
    </div>
  </header>
  
  <div class="post-content">
    {{content}}
  </div>
  
  <!-- Add social sharing -->
  <footer class="post-footer">
    <div class="share-buttons">
      <button class="share-twitter">Share</button>
      <button class="share-linkedin">Share</button>
    </div>
  </footer>
</article>
```

## Migration from JSX

If you previously had JSX customizations, convert them to HTML templates:

**Before (in JSX):**
```tsx
<article className="post">
  <h1>{post.title}</h1>
  {post.author && <span>by {post.author}</span>}
</article>
```

**After (in HTML template):**
```html
<article class="post">
  <h1>{{title}}</h1>
  {{#if author}}
  <span>by {{author}}</span>
  {{/if}}
</article>
```

## Complete Example: Blog Redesign

Here's a complete set of templates for a modern blog design:

### post.html
```html
<article class="modern-post">
  <div class="post-hero">
    {{#if draft}}
    <div class="status-banner draft">{{draftIndicatorText}}</div>
    {{/if}}
    
    <div class="breadcrumb">
      {{#if showBackButton}}
      <a href="/">{{backButtonText}}</a>
      {{/if}}
    </div>
    
    <h1 class="display-title">{{title}}</h1>
    
    <div class="post-byline">
      {{#if showDate}}
      <time>{{date}}</time>
      {{/if}}
      {{#if showAuthor}}
      {{#if author}}
      <span class="separator">•</span>
      <span class="author">{{author}}</span>
      {{/if}}
      {{/if}}
    </div>
  </div>
  
  <div class="post-main">
    {{content}}
  </div>
</article>
```

### Corresponding CSS
```css
.modern-post {
  max-width: 900px;
  margin: 0 auto;
}

.post-hero {
  text-align: center;
  padding: 80px 20px 60px;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.display-title {
  font-size: 3.5em;
  font-weight: 800;
  margin: 30px 0;
  line-height: 1.2;
}

.post-byline {
  color: #6c757d;
  font-size: 1.1em;
}

.post-main {
  padding: 40px 20px;
  font-size: 1.1em;
  line-height: 1.8;
}
```

---

## Next Steps

1. **Experiment**: Try modifying existing templates
2. **Create**: Build your own layouts
3. **Style**: Add custom CSS
4. **Share**: Share your templates with the community

For JSON configuration (colors, fonts, etc.), see [TEMPLATE.md](../TEMPLATE.md)

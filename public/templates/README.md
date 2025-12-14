# HTML Templates

This folder contains HTML templates that define the structure and layout of your blog's components.

## Available Templates

- **post.html** - Individual post page layout
- **post-list-item.html** - Single post preview in the list
- **header.html** - Blog header/hero section

## Template Syntax

Templates use a simple but powerful syntax with placeholders and conditionals.

### Variables

Use double curly braces for variables:
```html
<h1>{{title}}</h1>
<p>{{description}}</p>
```

### Conditionals

Use `{{#if condition}}...{{/if}}` for conditional rendering:
```html
{{#if author}}
<span class="post-author">by {{author}}</span>
{{/if}}
```

### Available Variables

#### post.html
- `{{title}}` - Post title
- `{{author}}` - Author name
- `{{date}}` - Formatted date
- `{{content}}` - Rendered markdown content
- `{{draft}}` - Boolean for draft status
- `{{showBackButton}}` - Layout setting
- `{{showDate}}` - Layout setting
- `{{showAuthor}}` - Layout setting
- `{{backButtonText}}` - Text for back button

#### post-list-item.html
- `{{title}}` - Post title
- `{{slug}}` - Post URL slug
- `{{author}}` - Author name
- `{{date}}` - Formatted date
- `{{excerpt}}` - Post excerpt
- `{{draft}}` - Boolean for draft status
- `{{showExcerpt}}` - Layout setting
- `{{showAuthor}}` - Layout setting
- `{{showDraftIndicator}}` - Layout setting
- `{{draftIndicatorText}}` - Draft badge text
- `{{readMoreText}}` - Read more link text

#### header.html
- `{{title}}` - Blog title
- `{{description}}` - Blog description
- `{{tagline}}` - Optional tagline

## Customization Examples

### Example 1: Minimal Post Template
```html
<article class="post">
  <h1>{{title}}</h1>
  <div class="post-content">
    {{content}}
  </div>
</article>
```

### Example 2: Post with Featured Image
```html
<article class="post">
  {{#if featuredImage}}
  <img src="{{featuredImage}}" alt="{{title}}" class="featured-image">
  {{/if}}
  
  <h1>{{title}}</h1>
  <div class="post-content">
    {{content}}
  </div>
</article>
```

### Example 3: Card-style Post List Item
```html
<article class="post-card">
  <div class="card-body">
    <span class="post-date-badge">{{date}}</span>
    <h3>{{title}}</h3>
    {{#if excerpt}}
    <p>{{excerpt}}</p>
    {{/if}}
    <a href="/post/{{slug}}" class="btn-read-more">{{readMoreText}}</a>
  </div>
</article>
```

## Tips

- Keep CSS class names to maintain styling compatibility
- Test your templates after changes
- Back up working templates before experimenting
- Use browser DevTools to inspect the rendered HTML
- Validate HTML structure for accessibility

## Backup

Before making changes, save a backup:
```bash
cp post.html post.backup.html
```

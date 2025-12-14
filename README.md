# scriptae

A blog engine which generates from your .MD files

## Features

- 📝 Markdown-based blog posts with frontmatter support
- 🎨 Clean, responsive UI built with React and TypeScript
- 🎨 **Template System** - Customize colors, fonts, layout, and text without touching code
- 🎭 **HTML Templates** - Design custom post layouts with simple HTML templates
- 🔍 List last N posts with configurable limit
- 📂 Organized content structure (posts and drafts)
- 🐙 GitHub integration for fetching markdown files
- 🚀 Built with Vite for fast development and builds
- 💪 Full TypeScript support for type safety

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

This will start the development server at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Customization

### Template System

You can customize the entire look and feel of your blog **without touching any code**! Simply edit the `public/template.json` file to change:

- 🎨 **Colors** - Primary, accent, text, background, and more
- 🔤 **Fonts** - Typography for body text, headings, and code
- 📐 **Layout** - Control what elements are shown and their behavior
- 📝 **Text** - Customize all labels, messages, and UI text
- 🌍 **Localization** - Translate the interface to any language

**Quick Example:**
```json
{
  "site": {
    "title": "My Awesome Blog",
    "description": "Thoughts on code and coffee"
  },
  "theme": {
    "colors": {
      "primary": "#667eea",
      "accent": "#3498db"
    }
  }
}
```

📖 **For complete customization guide, see [TEMPLATE.md](TEMPLATE.md)**

### Template Documentation

- 📘 [GETTING-STARTED.md](GETTING-STARTED.md) - Quick start checklist
- 📖 [TEMPLATE.md](TEMPLATE.md) - Complete customization guide (JSON config)
- 🎭 [HTML-TEMPLATES.md](HTML-TEMPLATES.md) - HTML template design guide
- 📋 [TEMPLATE-QUICKREF.md](TEMPLATE-QUICKREF.md) - Quick reference card
- 🎨 [TEMPLATE-EXAMPLES.md](TEMPLATE-EXAMPLES.md) - Example themes gallery
- 🔄 [MIGRATION.md](MIGRATION.md) - Migration guide for existing users

### Two Ways to Customize

1. **JSON Configuration** (`public/template.json`) - Change colors, fonts, text, layout options
2. **HTML Templates** (`public/templates/*.html`) - Design custom post layouts with your own HTML structure

Both systems work together to give you complete control!

## Adding Blog Posts

### Published Posts

Create markdown files in the `/content/posts` directory with frontmatter:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
author: "Your Name"
excerpt: "A brief description of your post"
---

# Your Post Content

Your markdown content goes here...
```

### Draft Posts

Create markdown files in the `/content/drafts` directory. Drafts are:
- Not shown in the main post listing
- Accessible via direct URL (e.g., `/post/draft-slug`)
- Marked with a visible "DRAFT" badge

```markdown
---
title: "Work in Progress"
date: "2024-01-15"
author: "Your Name"
excerpt: "Coming soon"
draft: true
---

# Draft Content

This post is still being written...
```

### Frontmatter Fields

- `title` (required): The title of your blog post
- `date` (required): Publication date in YYYY-MM-DD format
- `author` (optional): Author name
- `excerpt` (optional): Brief description shown in post listings
- `draft` (optional): Automatically set to true for files in `/content/drafts`

### Markdown Features

The blog supports:
- GitHub Flavored Markdown (GFM)
- Code syntax highlighting
- Tables
- Task lists
- Strikethrough
- And more!

## GitHub Integration

You can fetch markdown files from a GitHub repository using the `fetchFromGitHub` utility:

```typescript
import { fetchFromGitHub } from './utils/posts';

const posts = await fetchFromGitHub('owner', 'repo', 'content/posts');
```

This will fetch all `.md` files from the specified path in the repository.

## Customization

### Limiting Posts Displayed

The home page allows users to:
- See the last N posts (default: 5)
- Change the number of posts to display
- Show all posts with a button click

You can modify the default limit in `src/pages/Home.tsx`:

```typescript
const [postsToShow, setPostsToShow] = useState<number>(5); // Change 5 to your preferred default
```

### Styling

**Recommended**: Use the [Template System](#template-system) to customize colors, fonts, and layout without touching code.

**Advanced**: For custom CSS beyond the template system, modify:
- `src/pages/Home.css` - Home page styles
- `src/components/Post.css` - Individual post styles
- `src/components/PostList.css` - Post listing styles
- `src/index.css` - Global styles and CSS variables

All CSS files now use CSS custom properties (variables) that are automatically set by the template system.

## Project Structure

```
scriptae/
├── content/              # Markdown blog posts
│   ├── posts/           # Published posts
│   │   ├── first-post.md
│   │   └── second-post.md
│   └── drafts/          # Draft posts
│       └── work-in-progress.md
├── public/              # Public assets
│   ├── template.json    # Template configuration (customize this!)
│   ├── template-dark.json.example  # Dark theme example
│   └── README.md        # Template examples guide
├── src/
│   ├── components/       # React components (TypeScript)
│   │   ├── Post.tsx
│   │   ├── Post.css
│   │   ├── PostList.tsx
│   │   └── PostList.css
│   ├── pages/           # Page components (TypeScript)
│   │   ├── Home.tsx
│   │   └── Home.css
│   ├── utils/           # Utility functions (TypeScript)
│   │   ├── posts.ts     # Post loading and GitHub integration
│   │   └── template.ts  # Template loading and utilities
│   ├── App.tsx          # Main app component with routing
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts    # TypeScript declarations
├── TEMPLATE.md          # Template customization guide
├── TEMPLATE-QUICKREF.md # Template quick reference
├── TEMPLATE-EXAMPLES.md # Example templates gallery
├── GETTING-STARTED.md   # Quick start checklist
├── MIGRATION.md         # Migration guide
├── tsconfig.json        # TypeScript configuration
├── tsconfig.node.json   # TypeScript config for Vite
├── package.json
└── vite.config.ts
```

## TypeScript

This project is built with TypeScript for enhanced type safety and developer experience. Key types:

```typescript
interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  draft?: boolean;
}

interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}
```

## Dependencies

- **React 19** - UI framework
- **TypeScript** - Type-safe JavaScript
- **React Router DOM** - Client-side routing
- **react-markdown** - Markdown rendering
- **gray-matter** - Frontmatter parsing
- **remark-gfm** - GitHub Flavored Markdown support
- **Vite** - Build tool and dev server

## License

MIT

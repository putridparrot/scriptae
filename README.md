# scriptae

A blog engine which generates from your .MD files

## Sample

https://putridparrot.github.io/scriptae/

## Features

- 📝 Markdown-based blog posts with frontmatter support
- 🎨 Clean, responsive UI built with React and TypeScript
- 🎨 **Template System** - Customize colors, fonts, layout, and text without touching code
- 🎭 **HTML Templates** - Design custom post layouts with simple HTML templates
- 🌓 **Theme Support** - Built-in light/dark mode with template inheritance
- 📄 **Pagination** - Navigate through posts with newer/older navigation
- 💻 **Code Highlighting** - Syntax highlighting with customizable themes
- 🔍 List last N posts with configurable limit
- 📂 Organized content structure (posts and drafts)
- 🐙 GitHub integration for fetching markdown files
- 🚀 Built with Vite for fast development and builds
- 💪 Full TypeScript support for type safety
- ✅ Comprehensive E2E testing with Playwright
- 🚢 CI/CD pipeline with GitHub Actions

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

You can customize the entire look and feel of your blog **without touching any code**! The template system uses a powerful inheritance model:

#### Template Inheritance

- 📄 **Base Template** (`public/templates/template.json`) - Contains all default values (fonts, spacing, text, layout)
- 🌞 **Light Theme** (`public/templates/template-light.json`) - Color overrides for light mode
- 🌙 **Dark Theme** (`public/templates/template-dark.json`) - Color overrides for dark mode

The system uses **deep merging** to combine templates:
1. Load base template with all defaults
2. Merge theme-specific colors on top
3. Apply resulting CSS custom properties to the page

This approach minimizes duplication - colors go in theme files, everything else in the base template.

#### What You Can Customize

- 🎨 **Colors** - Primary, accent, text, background, code blocks, and more (in theme files)
- 🔤 **Fonts** - Typography for body text, headings, and code (in base template)
- 🏷️ **Branding** - Site title (browser tab), logo/favicon path
- 📐 **Layout** - Control what elements are shown and their behavior
- 📝 **Text** - Customize all labels, messages, and UI text
- 🌍 **Localization** - Translate the interface to any language
- 📄 **Pagination** - Configure posts per page, button labels

**Quick Example:**
```json
// public/templates/template-dark.json
{
  "theme": {
    "colors": {
      "primary": "#667eea",
      "background": "#1f2937",
      "text": "#ffffff"
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
- 🏗️ [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture documentation
- 🚀 [DEPLOYMENT.md](DEPLOYMENT.md) - Deployment and CI/CD guide

### Three Ways to Customize

1. **JSON Configuration** (`public/templates/template.json`) - Change fonts, spacing, text, layout options
2. **Theme Files** (`public/templates/template-light.json` / `template-dark.json`) - Customize colors for each theme
3. **HTML Templates** (`public/templates/*.html`) - Design custom post layouts with your own HTML structure

All three systems work together to give you complete control!

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
├── .github/
│   └── workflows/
│       └── deploy.yml       # CI/CD pipeline for GitHub Pages
├── content/                 # Markdown blog posts
│   ├── posts/              # Published posts
│   │   ├── first-post.md
│   │   ├── second-post.md
│   │   ├── third-post.md
│   │   ├── fourth-post.md
│   │   ├── fifth-post.md
│   │   └── sixth-post.md
│   └── drafts/             # Draft posts
│       └── advanced-react-patterns.md
├── public/                 # Public assets
│   ├── templates/          # Template system files
│   │   ├── template.json   # Base template (fonts, spacing, text, layout)
│   │   ├── template-light.json  # Light theme colors
│   │   ├── template-dark.json   # Dark theme colors
│   │   ├── header.html     # Header HTML template
│   │   ├── home.html       # Home page HTML template
│   │   ├── post.html       # Post page HTML template
│   │   ├── post-list-item.html  # Post list item HTML template
│   │   └── README.md       # Template system documentation
│   ├── template.json       # Legacy: User's custom base template (optional)
│   ├── template-dark.json.example  # Example dark theme
│   └── README.md           # Template examples guide
├── src/
│   ├── components/         # React components
│   │   ├── CodeBlock.tsx   # Syntax-highlighted code blocks
│   │   ├── CodeBlock.css   # Code block styling (gutter, line numbers)
│   │   ├── Post.tsx        # Individual post component
│   │   ├── Post.css        # Post styling
│   │   ├── PostList.tsx    # Post listing component
│   │   └── PostList.css    # Post list styling
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Home page with pagination
│   │   └── Home.css        # Home page styling
│   ├── utils/              # Utility functions
│   │   ├── posts.ts        # Post loading and GitHub integration
│   │   ├── template.ts     # Template loading with deep merge
│   │   └── templateEngine.ts  # Handlebars-style template engine
│   ├── App.tsx             # Main app component with routing
│   ├── App.css             # App-level styling
│   ├── index.css           # Global styles and CSS variables
│   ├── main.tsx            # Application entry point
│   └── vite-env.d.ts       # TypeScript declarations
├── tests/                  # E2E tests with Playwright
│   ├── home.spec.ts        # Home page tests
│   ├── pagination.spec.ts  # Pagination tests
│   ├── post.spec.ts        # Post page tests
│   ├── code-blocks.spec.ts # Code highlighting tests
│   ├── theme.spec.ts       # Theme switching tests
│   └── README.md           # Testing documentation
├── playwright.config.ts    # Playwright test configuration
├── ARCHITECTURE.md         # Technical architecture guide
├── DEPLOYMENT.md           # Deployment guide
├── GETTING-STARTED.md      # Quick start checklist
├── HTML-TEMPLATES.md       # HTML template guide
├── IMPLEMENTATION-SUMMARY.md  # Implementation notes
├── MIGRATION.md            # Migration guide
├── QUICKSTART.md           # Quick start guide
├── TEMPLATE.md             # Template system guide
├── TEMPLATE-EXAMPLES.md    # Template examples
├── TEMPLATE-QUICKREF.md    # Template quick reference
├── tsconfig.json           # TypeScript configuration
├── tsconfig.node.json      # TypeScript config for Vite
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
└── eslint.config.js        # ESLint configuration
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
- **react-syntax-highlighter** - Code syntax highlighting with Prism
- **gray-matter** - Frontmatter parsing
- **remark-gfm** - GitHub Flavored Markdown support
- **Vite** - Build tool and dev server
- **Playwright** - E2E testing framework

## Testing

Run the comprehensive E2E test suite:

```bash
npm test
```

The test suite includes:
- ✅ Home page functionality (6 tests × 3 browsers = 18 tests)
- ✅ Pagination navigation (6 tests × 3 browsers = 18 tests)
- ✅ Post page rendering (7 tests × 3 browsers = 21 tests)
- ✅ Code block syntax highlighting (5 tests × 3 browsers = 15 tests)
- ✅ Theme switching (6 tests × 3 browsers = 18 tests)
- **Total: 90 tests** across Chromium, Firefox, and WebKit

See [tests/README.md](tests/README.md) for more details.

## Deployment

The project includes a CI/CD pipeline for automatic deployment to GitHub Pages:

1. Push to `main` branch
2. GitHub Actions runs build and tests
3. If tests pass, deploys to GitHub Pages
4. Site available at `https://username.github.io/scriptae/`

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment instructions.

## License

MIT

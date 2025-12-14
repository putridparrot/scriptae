# scriptae

A blog engine which generates from your .MD files

## Features

- 📝 Markdown-based blog posts with frontmatter support
- 🎨 Clean, responsive UI built with React and TypeScript
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

Customize the appearance by modifying the CSS files:
- `src/pages/Home.css` - Home page styles
- `src/components/Post.css` - Individual post styles (includes draft badge)
- `src/components/PostList.css` - Post listing styles (includes draft indicator)
- `src/index.css` - Global styles

## Project Structure

```
scriptae/
├── content/              # Markdown blog posts
│   ├── posts/           # Published posts
│   │   ├── first-post.md
│   │   └── second-post.md
│   └── drafts/          # Draft posts
│       └── work-in-progress.md
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
│   │   └── posts.ts     # Post loading and GitHub integration
│   ├── App.tsx          # Main app component with routing
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts    # TypeScript declarations
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

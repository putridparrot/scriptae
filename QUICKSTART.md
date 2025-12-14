# Quick Start Guide

## Running the Blog

### Development Mode
```bash
npm install
npm run dev
```

The blog will be available at `http://localhost:5173`

### Production Build
```bash
npm run build
npm run preview
```

## Adding New Posts

### Published Posts

1. Create a new `.md` file in the `/content/posts` directory
2. Add frontmatter at the top:

```markdown
---
title: "Your Post Title"
date: "2024-01-15"
author: "Your Name"
excerpt: "Brief description of your post"
---

# Your Content Here

Write your blog post content using markdown...
```

3. The post will automatically appear on the home page, sorted by date (newest first)

### Draft Posts

1. Create a new `.md` file in the `/content/drafts` directory
2. Add frontmatter at the top:

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

3. Drafts won't appear in the main listing but can be accessed via direct URL
4. Drafts display a prominent "DRAFT" badge

## Content Organization

```
content/
├── posts/          # Published posts (shown in listing)
│   ├── first-post.md
│   └── second-post.md
└── drafts/         # Work in progress (not in listing)
    └── wip-post.md
```

## Using GitHub Integration

To fetch posts from a GitHub repository:

```typescript
import { fetchFromGitHub } from './utils/posts';

// Fetch published posts
const posts = await fetchFromGitHub('username', 'repository', 'content/posts');

// Fetch drafts
const drafts = await fetchFromGitHub('username', 'repository', 'content/drafts');
```

This will fetch all markdown files from the specified path in the repository.

## Customizing the Blog

### Change Default Number of Posts
Edit `src/pages/Home.tsx`, line 10:
```typescript
const [postsToShow, setPostsToShow] = useState<number>(5); // Change to your preferred number
```

### Styling
- `src/pages/Home.css` - Home page and header styles
- `src/components/Post.css` - Individual post page styles + draft badge
- `src/components/PostList.css` - Post listing styles + draft indicator
- `src/index.css` - Global styles

### Blog Title and Description
Edit `src/pages/Home.tsx`, lines 37-41:
```typescript
<header className="blog-header">
  <h1>My Blog</h1>
  <p className="blog-description">
    A markdown-based blog built with React
  </p>
</header>
```

## TypeScript Features

This project uses TypeScript for type safety:

```typescript
// Types are defined in src/utils/posts.ts
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

## Markdown Features

The blog supports GitHub Flavored Markdown including:
- Headers, paragraphs, lists
- Code blocks with syntax highlighting
- Links and images
- Tables
- Task lists
- Strikethrough
- And more!

## Deployment

Build the static files:
```bash
npm run build
```

The output in the `dist` directory can be deployed to any static hosting service:
- GitHub Pages
- Netlify
- Vercel
- AWS S3
- Azure Static Web Apps
- And more!

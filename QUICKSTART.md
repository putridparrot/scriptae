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

1. Create a new `.md` file in the `/content` directory
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

## Using GitHub Integration

To fetch posts from a GitHub repository:

```javascript
import { fetchFromGitHub } from './utils/posts';

// Fetch posts from a GitHub repository
const posts = await fetchFromGitHub('username', 'repository', 'content');
```

This will fetch all markdown files from the specified path in the repository.

## Customizing the Blog

### Change Default Number of Posts
Edit `src/pages/Home.jsx`, line 11:
```javascript
const [postsToShow, setPostsToShow] = useState(5); // Change to your preferred number
```

### Styling
- `src/pages/Home.css` - Home page and header styles
- `src/components/Post.css` - Individual post page styles
- `src/components/PostList.css` - Post listing styles
- `src/index.css` - Global styles

### Blog Title and Description
Edit `src/pages/Home.jsx`, lines 38-42:
```javascript
<header className="blog-header">
  <h1>My Blog</h1>
  <p className="blog-description">
    A markdown-based blog built with React
  </p>
</header>
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

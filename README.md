# scriptae

A blog engine which generates from your .MD files

## Features

- 📝 Markdown-based blog posts with frontmatter support
- 🎨 Clean, responsive UI built with React
- 🔍 List last N posts with configurable limit
- 📂 Local content directory support (/content)
- 🐙 GitHub integration for fetching markdown files
- 🚀 Built with Vite for fast development and builds

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

### Local Content Directory

Create markdown files in the `/content` directory with frontmatter:

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

### Frontmatter Fields

- `title` (required): The title of your blog post
- `date` (required): Publication date in YYYY-MM-DD format
- `author` (optional): Author name
- `excerpt` (optional): Brief description shown in post listings

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

```javascript
import { fetchFromGitHub } from './utils/posts';

const posts = await fetchFromGitHub('owner', 'repo', 'content');
```

This will fetch all `.md` files from the specified path in the repository.

## Customization

### Limiting Posts Displayed

The home page allows users to:
- See the last N posts (default: 5)
- Change the number of posts to display
- Show all posts with a button click

You can modify the default limit in `src/pages/Home.jsx`:

```javascript
const [postsToShow, setPostsToShow] = useState(5); // Change 5 to your preferred default
```

### Styling

Customize the appearance by modifying the CSS files:
- `src/pages/Home.css` - Home page styles
- `src/components/Post.css` - Individual post styles
- `src/components/PostList.css` - Post listing styles
- `src/index.css` - Global styles

## Project Structure

```
scriptae/
├── content/              # Markdown blog posts
│   ├── first-post.md
│   ├── second-post.md
│   └── third-post.md
├── src/
│   ├── components/       # React components
│   │   ├── Post.jsx
│   │   ├── Post.css
│   │   ├── PostList.jsx
│   │   └── PostList.css
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   └── Home.css
│   ├── utils/           # Utility functions
│   │   └── posts.js     # Post loading and GitHub integration
│   ├── App.jsx          # Main app component with routing
│   ├── App.css
│   ├── index.css
│   └── main.jsx
├── package.json
└── vite.config.js
```

## Dependencies

- **React** - UI framework
- **React Router DOM** - Client-side routing
- **react-markdown** - Markdown rendering
- **gray-matter** - Frontmatter parsing
- **remark-gfm** - GitHub Flavored Markdown support
- **Vite** - Build tool and dev server

## License

MIT

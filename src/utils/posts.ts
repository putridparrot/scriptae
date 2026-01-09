import matter from 'gray-matter';
import { loadTemplate, getThemePreference } from './template';

export interface PostFrontmatter {
  title: string;
  date: string;
  author?: string;
  excerpt?: string;
  draft?: boolean;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

export interface PostMetadata {
  slug: string;
  frontmatter: PostFrontmatter;
}

// Lazy content loaders - only loaded when needed
const postContentLoaders = import.meta.glob('/content/posts/*.md', { 
  query: '?raw', 
  import: 'default'
});

const draftContentLoaders = import.meta.glob('/content/drafts/*.md', { 
  query: '?raw', 
  import: 'default'
});

// Separate metadata extraction - lightweight
const extractMetadata = (content: string, slug: string, isDraft = false): PostMetadata => {
  const { data } = matter(content);
  return {
    slug,
    frontmatter: isDraft ? { ...data, draft: true } as PostFrontmatter : data as PostFrontmatter,
  };
};

// Function to get all post metadata (lightweight - for list view)
export const getAllPostsMetadata = async (): Promise<PostMetadata[]> => {
  const postPaths = Object.keys(postContentLoaders);
  
  // Load only metadata by parsing frontmatter
  const postMetadataPromises = postPaths.map(async (path) => {
    const loader = postContentLoaders[path];
    if (!loader) return null;
    const content = await loader() as string;
    const slug = path.replace('/content/posts/', '').replace('.md', '');
    return extractMetadata(content, slug);
  });
  
  const results = await Promise.all(postMetadataPromises);
  const postList = results.filter((p): p is PostMetadata => p !== null);
  
  // Sort by date (newest first)
  return postList.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Function to get all draft metadata
export const getAllDraftsMetadata = async (): Promise<PostMetadata[]> => {
  const draftPaths = Object.keys(draftContentLoaders);
  
  const draftMetadataPromises = draftPaths.map(async (path) => {
    const loader = draftContentLoaders[path];
    if (!loader) return null;
    const content = await loader() as string;
    const slug = path.replace('/content/drafts/', '').replace('.md', '');
    return extractMetadata(content, slug, true);
  });
  
  const results = await Promise.all(draftMetadataPromises);
  const draftList = results.filter((d): d is PostMetadata => d !== null);
  
  // Sort by date (newest first)
  return draftList.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Legacy function - loads full posts (kept for backward compatibility)
export const getAllPosts = async (): Promise<Post[]> => {
  const metadata = await getAllPostsMetadata();
  const posts = await Promise.all(
    metadata.map(async (meta) => {
      const content = await getPostContent(meta.slug);
      return {
        ...meta,
        content
      };
    })
  );
  return posts;
};

// Function to get post content by slug (lazy loaded)
export const getPostContent = async (slug: string): Promise<string> => {
  const templateConfig = await loadTemplate(getThemePreference());
  if (templateConfig.content.source === 'github' && templateConfig.content.github) {
    const { owner, repo, postsPath, draftsPath } = templateConfig.content.github;
    // Try posts first
    const postUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${postsPath}/${slug}.md`;
    let response = await fetch(postUrl, { cache: 'no-store' });
    if (response.ok) {
      const content = await response.text();
      const { content: markdown } = matter(content);
      return markdown;
    }
    // Try drafts if not found in posts
    if (draftsPath) {
      const draftUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${draftsPath}/${slug}.md`;
      response = await fetch(draftUrl, { cache: 'no-store' });
      if (response.ok) {
        const content = await response.text();
        const { content: markdown } = matter(content);
        return markdown;
      }
    }
    throw new Error(`Post not found on GitHub: ${slug}`);
  } else {
    // Local fallback
    const postPath = `/content/posts/${slug}.md`;
    const draftPath = `/content/drafts/${slug}.md`;
    if (postContentLoaders[postPath]) {
      const content = await postContentLoaders[postPath]() as string;
      const { content: markdown } = matter(content);
      return markdown;
    }
    if (draftContentLoaders[draftPath]) {
      const content = await draftContentLoaders[draftPath]() as string;
      const { content: markdown } = matter(content);
      return markdown;
    }
    throw new Error(`Post not found: ${slug}`);
  }
};

// Function to get a single post by slug with full content
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    const templateConfig = await loadTemplate(getThemePreference());
    if (templateConfig.content.source === 'github' && templateConfig.content.github) {
      const { owner, repo, postsPath, draftsPath } = templateConfig.content.github;
      // Try posts first
      const postUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${postsPath}/${slug}.md`;
      let response = await fetch(postUrl, { cache: 'no-store' });
      if (response.ok) {
        const contentRaw = await response.text();
        const { data, content } = matter(contentRaw);
        return {
          slug,
          frontmatter: data as PostFrontmatter,
          content
        };
      }
      // Try drafts if not found in posts
      if (draftsPath) {
        const draftUrl = `https://raw.githubusercontent.com/${owner}/${repo}/main/${draftsPath}/${slug}.md`;
        response = await fetch(draftUrl, { cache: 'no-store' });
        if (response.ok) {
          const contentRaw = await response.text();
          const { data, content } = matter(contentRaw);
          return {
            slug,
            frontmatter: { ...data, draft: true } as PostFrontmatter,
            content
          };
        }
      }
      return null;
    } else {
      // Local fallback
      const allMetadata = [...await getAllPostsMetadata(), ...await getAllDraftsMetadata()];
      const metadata = allMetadata.find(m => m.slug === slug);
      if (!metadata) {
        return null;
      }
      const content = await getPostContent(slug);
      return {
        ...metadata,
        content
      };
    }
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
};

// Function to get the last N posts
export const getRecentPosts = async (limit: number = 5): Promise<Post[]> => {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
};

interface GitHubFile {
  name: string;
  download_url: string;
}

// Function to fetch markdown files from GitHub
export const fetchFromGitHub = async (
  owner: string, 
  repo: string, 
  path: string = 'content/posts'
): Promise<Post[]> => {
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }
    
    const files: GitHubFile[] = await response.json();
    const markdownFiles = files.filter(file => file.name.endsWith('.md'));
    
    const posts = await Promise.all(
      markdownFiles.map(async (file): Promise<Post> => {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        const { data, content: markdown } = matter(content);
        const slug = file.name.replace('.md', '');
        
        return {
          slug,
          frontmatter: data as PostFrontmatter,
          content: markdown,
        };
      })
    );
    
    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB.getTime() - dateA.getTime();
    });
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return [];
  }
};

import matter from 'gray-matter';

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

interface GlobResult {
  [key: string]: string;
}

// Function to get all published posts from the posts directory
export const getAllPosts = async (): Promise<Post[]> => {
  const posts = import.meta.glob('/content/posts/*.md', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  }) as GlobResult;
  
  const postList: Post[] = Object.entries(posts).map(([path, content]) => {
    const { data, content: markdown } = matter(content);
    const slug = path.replace('/content/posts/', '').replace('.md', '');
    
    return {
      slug,
      frontmatter: data as PostFrontmatter,
      content: markdown,
    };
  });
  
  // Sort by date (newest first)
  return postList.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Function to get all drafts from the drafts directory
export const getAllDrafts = async (): Promise<Post[]> => {
  const drafts = import.meta.glob('/content/drafts/*.md', { 
    query: '?raw', 
    import: 'default', 
    eager: true 
  }) as GlobResult;
  
  const draftList: Post[] = Object.entries(drafts).map(([path, content]) => {
    const { data, content: markdown } = matter(content);
    const slug = path.replace('/content/drafts/', '').replace('.md', '');
    
    return {
      slug,
      frontmatter: { ...data, draft: true } as PostFrontmatter,
      content: markdown,
    };
  });
  
  // Sort by date (newest first)
  return draftList.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB.getTime() - dateA.getTime();
  });
};

// Function to get a single post by slug (checks both posts and drafts)
export const getPostBySlug = async (slug: string): Promise<Post | null> => {
  try {
    // Try to find in posts first
    const posts = import.meta.glob('/content/posts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    }) as GlobResult;
    
    const postPath = `/content/posts/${slug}.md`;
    
    if (posts[postPath]) {
      const { data, content } = matter(posts[postPath]);
      
      return {
        slug,
        frontmatter: data as PostFrontmatter,
        content,
      };
    }
    
    // If not found in posts, try drafts
    const drafts = import.meta.glob('/content/drafts/*.md', { 
      query: '?raw', 
      import: 'default', 
      eager: true 
    }) as GlobResult;
    
    const draftPath = `/content/drafts/${slug}.md`;
    
    if (drafts[draftPath]) {
      const { data, content } = matter(drafts[draftPath]);
      
      return {
        slug,
        frontmatter: { ...data, draft: true } as PostFrontmatter,
        content,
      };
    }
    
    return null;
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

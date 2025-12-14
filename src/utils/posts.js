import matter from 'gray-matter';

// Function to get all markdown files from the content directory
export const getAllPosts = async () => {
  // In a production environment, you would fetch from GitHub API
  // For now, we'll import from the content directory
  const posts = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true });
  
  const postList = Object.entries(posts).map(([path, content]) => {
    const { data, content: markdown } = matter(content);
    const slug = path.replace('/content/', '').replace('.md', '');
    
    return {
      slug,
      frontmatter: data,
      content: markdown,
    };
  });
  
  // Sort by date (newest first)
  return postList.sort((a, b) => {
    const dateA = new Date(a.frontmatter.date);
    const dateB = new Date(b.frontmatter.date);
    return dateB - dateA;
  });
};

// Function to get a single post by slug
export const getPostBySlug = async (slug) => {
  try {
    const posts = import.meta.glob('/content/*.md', { query: '?raw', import: 'default', eager: true });
    const postPath = `/content/${slug}.md`;
    
    if (!posts[postPath]) {
      return null;
    }
    
    const { data, content } = matter(posts[postPath]);
    
    return {
      slug,
      frontmatter: data,
      content,
    };
  } catch (error) {
    console.error('Error loading post:', error);
    return null;
  }
};

// Function to get the last N posts
export const getRecentPosts = async (limit = 5) => {
  const allPosts = await getAllPosts();
  return allPosts.slice(0, limit);
};

// Function to fetch markdown files from GitHub
export const fetchFromGitHub = async (owner, repo, path = 'content') => {
  try {
    const apiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      throw new Error('Failed to fetch from GitHub');
    }
    
    const files = await response.json();
    const markdownFiles = files.filter(file => file.name.endsWith('.md'));
    
    const posts = await Promise.all(
      markdownFiles.map(async (file) => {
        const contentResponse = await fetch(file.download_url);
        const content = await contentResponse.text();
        const { data, content: markdown } = matter(content);
        const slug = file.name.replace('.md', '');
        
        return {
          slug,
          frontmatter: data,
          content: markdown,
        };
      })
    );
    
    // Sort by date (newest first)
    return posts.sort((a, b) => {
      const dateA = new Date(a.frontmatter.date);
      const dateB = new Date(b.frontmatter.date);
      return dateB - dateA;
    });
  } catch (error) {
    console.error('Error fetching from GitHub:', error);
    return [];
  }
};

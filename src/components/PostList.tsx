import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { List } from 'react-window';
import { PostMetadata } from '../utils/posts';
import { TemplateConfig, formatDate } from '../utils/template';
import './PostList.css';

interface PostListProps {
  posts: PostMetadata[];
  template: TemplateConfig;
  limit?: number;
  useVirtualScrolling?: boolean;
}

const ITEM_HEIGHT = 180; // Approximate height of each post preview in pixels

const PostList = ({ posts, template, limit, useVirtualScrolling = false }: PostListProps) => {
  const displayPosts = useMemo(() => 
    limit ? posts.slice(0, limit) : posts,
    [posts, limit]
  );
  
  if (!displayPosts || displayPosts.length === 0) {
    return <div className="no-posts">{template.text.noPostsFound}</div>;
  }

  const renderPostItem = (post: PostMetadata) => {
    const formattedDate = formatDate(
      new Date(post.frontmatter.date), 
      template.layout.home.dateFormat
    );
    
    return (
      <article key={post.slug} className="post-preview">
        <h2>
          <Link to={`/post/${post.slug}`}>
            {post.frontmatter.title}
            {post.frontmatter.draft && template.layout.postList.showDraftIndicator && (
              <span className="draft-indicator"> {template.layout.postList.draftIndicatorText}</span>
            )}
          </Link>
        </h2>
        
        <div className="post-meta">
          <span className="post-date">{formattedDate}</span>
          
          {template.layout.postList.showAuthor && post.frontmatter.author && (
            <span className="post-author"> by {post.frontmatter.author}</span>
          )}
        </div>
        
        {template.layout.postList.showExcerpt && post.frontmatter.excerpt && (
          <p className="post-excerpt">{post.frontmatter.excerpt}</p>
        )}
        
        <Link to={`/post/${post.slug}`} className="read-more">
          {template.layout.postList.readMoreText}
        </Link>
      </article>
    );
  };

  return (
    <div className="post-list">
      {displayPosts.map(post => renderPostItem(post))}
    </div>
  );
};

export default PostList;

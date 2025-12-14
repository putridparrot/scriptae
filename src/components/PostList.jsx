import { Link } from 'react-router-dom';
import './PostList.css';

const PostList = ({ posts, limit }) => {
  const displayPosts = limit ? posts.slice(0, limit) : posts;
  
  if (!displayPosts || displayPosts.length === 0) {
    return <div className="no-posts">No posts found.</div>;
  }
  
  return (
    <div className="post-list">
      {displayPosts.map((post) => (
        <article key={post.slug} className="post-preview">
          <h2>
            <Link to={`/post/${post.slug}`}>{post.frontmatter.title}</Link>
          </h2>
          <div className="post-meta">
            <span className="post-date">
              {new Date(post.frontmatter.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            {post.frontmatter.author && (
              <span className="post-author"> by {post.frontmatter.author}</span>
            )}
          </div>
          {post.frontmatter.excerpt && (
            <p className="post-excerpt">{post.frontmatter.excerpt}</p>
          )}
          <Link to={`/post/${post.slug}`} className="read-more">
            Read more →
          </Link>
        </article>
      ))}
    </div>
  );
};

export default PostList;

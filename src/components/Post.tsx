import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, Post as PostType } from '../utils/posts';
import './Post.css';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError('Post not found');
        } else {
          setPost(postData);
        }
      } catch (err) {
        setError('Failed to load post');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>{error}</h2>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <article className="post">
      <div className="post-header">
        <Link to="/" className="back-link">← Back to all posts</Link>
        {post.frontmatter.draft && (
          <div className="draft-badge">DRAFT</div>
        )}
        <h1>{post.frontmatter.title}</h1>
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
      </div>
      
      <div className="post-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  );
};

export default Post;

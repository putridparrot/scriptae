import { useEffect, useState } from 'react';
import PostList from '../components/PostList';
import { getAllPosts, Post } from '../utils/posts';
import './Home.css';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [postsToShow, setPostsToShow] = useState<number>(5);

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const allPosts = await getAllPosts();
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  const displayPosts = showAll ? posts : posts.slice(0, postsToShow);

  return (
    <div className="home">
      <header className="blog-header">
        <h1>My Blog</h1>
        <p className="blog-description">
          A markdown-based blog built with React
        </p>
      </header>

      <div className="posts-controls">
        <div className="post-count">
          Showing {displayPosts.length} of {posts.length} posts
        </div>
        {!showAll && posts.length > postsToShow && (
          <div className="show-more-controls">
            <label htmlFor="posts-limit">Posts to show: </label>
            <input
              id="posts-limit"
              type="number"
              min="1"
              max={posts.length}
              value={postsToShow}
              onChange={(e) => setPostsToShow(Math.max(1, parseInt(e.target.value) || 1))}
              className="posts-limit-input"
            />
            <button onClick={() => setShowAll(true)} className="show-all-btn">
              Show All Posts
            </button>
          </div>
        )}
        {showAll && (
          <button onClick={() => setShowAll(false)} className="show-less-btn">
            Show Less
          </button>
        )}
      </div>

      <PostList posts={displayPosts} />
    </div>
  );
};

export default Home;

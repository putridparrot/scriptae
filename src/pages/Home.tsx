import { useEffect, useState, useMemo, useCallback } from 'react';
import { getAllPosts, fetchFromGitHub, Post } from '../utils/posts';
import { loadTemplate, replaceTemplateVars, TemplateConfig, getThemePreference } from '../utils/template';
import PostList from '../components/PostList';
import './Home.css';
import '../components/PostList.css';
import '../components/Post.css';

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [postsToShow, setPostsToShow] = useState<number>(5);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [template, setTemplate] = useState<TemplateConfig | null>(null);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load template first (use current theme preference)
        const templateConfig = await loadTemplate(getThemePreference());
        setTemplate(templateConfig);

        // Set default posts to show from template
        setPostsToShow(templateConfig.layout.home.defaultPostsToShow);

        // Load posts based on configured source
        let allPosts: Post[];
        if (templateConfig.content.source === 'github' && templateConfig.content.github) {
          const { owner, repo, postsPath } = templateConfig.content.github;
          allPosts = await fetchFromGitHub(owner, repo, postsPath);
        } else {
          allPosts = await getAllPosts();
        }
        
        setPosts(allPosts);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Memoize computed values
  const displayPosts = useMemo(() => {
    if (showAll) return posts;
    const startIndex = currentPage * postsToShow;
    const endIndex = startIndex + postsToShow;
    return posts.slice(startIndex, endIndex);
  }, [posts, showAll, currentPage, postsToShow]);

  const showingPostsText = useMemo(() => {
    if (!template) return '';
    return replaceTemplateVars(template.text.showingPosts, {
      current: displayPosts.length,
      total: posts.length
    });
  }, [template, displayPosts.length, posts.length]);

  const hasNewerPosts = currentPage > 0;
  const hasOlderPosts = useMemo(() => {
    const endIndex = (currentPage + 1) * postsToShow;
    return endIndex < posts.length;
  }, [currentPage, postsToShow, posts.length]);

  // Memoize event handlers
  const handleShowAll = useCallback(() => {
    setShowAll(true);
    setCurrentPage(0);
  }, []);

  const handleShowLess = useCallback(() => {
    setShowAll(false);
    setCurrentPage(0);
  }, []);

  const handleNewerPosts = useCallback(() => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  }, []);

  const handleOlderPosts = useCallback(() => {
    setCurrentPage(prev => prev + 1);
  }, []);

  const handlePostsToShowChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setPostsToShow(value);
    setCurrentPage(0);
  }, []);

  if (loading || !template) {
    return <div className="loading">{template?.text.loading || 'Loading posts...'}</div>;
  }

  return (
    <div className="home">
      <header className="blog-header">
        <h1>{template.site.title}</h1>
        <p className="blog-description">{template.site.description}</p>
        {template.site.tagline && (
          <p className="blog-tagline">{template.site.tagline}</p>
        )}
      </header>

      {template.layout.home.showControls && (
        <div className="posts-controls">
          {template.layout.home.showPostCount && (
            <div className="post-count">{showingPostsText}</div>
          )}
          {!showAll && posts.length > postsToShow && (
            <div className="show-more-controls">
              <label htmlFor="posts-limit">
                {template.text.postsToShowLabel}
              </label>
              <input
                id="posts-limit"
                type="number"
                min="1"
                max={posts.length}
                value={postsToShow}
                onChange={handlePostsToShowChange}
                className="posts-limit-input"
                data-action="change-posts-limit"
              />
              <button className="show-all-btn" data-action="show-all" onClick={handleShowAll}>
                {template.text.showAllButton}
              </button>
            </div>
          )}
          {showAll && (
            <button className="show-less-btn" data-action="show-less" onClick={handleShowLess}>
              {template.text.showLessButton}
            </button>
          )}
        </div>
      )}

      <div className="post-list-container">
        <PostList posts={displayPosts} template={template} />
      </div>

      {!showAll && (hasNewerPosts || hasOlderPosts) && (
        <div className="pagination">
          {hasNewerPosts && (
            <a href="#" className="pagination-link newer" data-action="newer-posts" onClick={(e) => { e.preventDefault(); handleNewerPosts(); }}>
              {template.text.newerPostsButton}
            </a>
          )}
          {hasOlderPosts && (
            <a href="#" className="pagination-link older" data-action="older-posts" onClick={(e) => { e.preventDefault(); handleOlderPosts(); }}>
              {template.text.olderPostsButton}
            </a>
          )}
        </div>
      )}

      {template.site.footer && (
        <footer dangerouslySetInnerHTML={{ __html: template.site.footer }} />
      )}
    </div>
  );
};

export default Home;

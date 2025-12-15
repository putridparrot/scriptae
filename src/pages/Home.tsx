import { useEffect, useState, useRef } from 'react';
import { getAllPosts, fetchFromGitHub, Post } from '../utils/posts';
import { loadTemplate, applyTheme, replaceTemplateVars, TemplateConfig } from '../utils/template';
import { renderHTMLTemplate } from '../utils/templateEngine';
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
  const [renderedHTML, setRenderedHTML] = useState<string>('');
  const containerRef = useRef<HTMLDivElement>(null);

  // Re-render when state changes
  useEffect(() => {
    if (!template || posts.length === 0) return;

    const renderPage = async () => {
      const startIndex = currentPage * postsToShow;
      const endIndex = startIndex + postsToShow;
      const displayPosts = showAll ? posts : posts.slice(startIndex, endIndex);
      const showingPostsText = replaceTemplateVars(template.text.showingPosts, {
        current: displayPosts.length,
        total: posts.length
      });

      // Pagination controls
      const hasNewerPosts = currentPage > 0;
      const hasOlderPosts = endIndex < posts.length;

      // Render post list items
      const baseUrl = import.meta.env.BASE_URL;
      const postListItems = await Promise.all(
        displayPosts.map(post =>
          renderHTMLTemplate('post-list-item', {
            baseUrl,
            title: post.frontmatter.title,
            slug: post.slug,
            author: post.frontmatter.author,
            date: new Date(post.frontmatter.date).toLocaleDateString(),
            excerpt: post.frontmatter.excerpt,
            draft: post.frontmatter.draft,
            showExcerpt: template.layout.postList.showExcerpt,
            showAuthor: template.layout.postList.showAuthor,
            showDraftIndicator: template.layout.postList.showDraftIndicator,
            draftIndicatorText: template.layout.postList.draftIndicatorText,
            readMoreText: template.layout.postList.readMoreText
          })
        )
      );

      const postListHTML = `<div class="post-list">${postListItems.join('')}</div>`;

      // Render home page HTML
      const html = await renderHTMLTemplate('home', {
        showControls: template.layout.home.showControls,
        showPostCount: template.layout.home.showPostCount,
        showingPostsText,
        showShowMoreControls: !showAll && posts.length > postsToShow,
        postsToShowLabel: template.text.postsToShowLabel,
        postsToShow: postsToShow.toString(),
        totalPosts: posts.length.toString(),
        showAllButton: template.text.showAllButton,
        showShowLessButton: showAll,
        showLessButton: template.text.showLessButton,
        postListHTML,
        footer: template.site.footer,
        // Pagination
        showPagination: !showAll && (hasNewerPosts || hasOlderPosts),
        showNewerPosts: hasNewerPosts,
        showOlderPosts: hasOlderPosts,
        newerPostsButton: template.text.newerPostsButton,
        olderPostsButton: template.text.olderPostsButton,
        // Include site data for nested templates
        ...template.site
      });

      setRenderedHTML(html);
    };

    renderPage();
  }, [posts, showAll, postsToShow, currentPage, template]);

  // Load initial data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        // Load template first
        const templateConfig = await loadTemplate();
        setTemplate(templateConfig);
        applyTheme(templateConfig);

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

  // Handle clicks on interactive elements
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const action = target.getAttribute('data-action');

      if (action === 'show-all') {
        e.preventDefault();
        setShowAll(true);
        setCurrentPage(0);
      } else if (action === 'show-less') {
        e.preventDefault();
        setShowAll(false);
        setCurrentPage(0);
      } else if (action === 'newer-posts') {
        e.preventDefault();
        setCurrentPage(prev => Math.max(0, prev - 1));
      } else if (action === 'older-posts') {
        e.preventDefault();
        setCurrentPage(prev => prev + 1);
      }
    };

    const handleInput = (e: Event) => {
      const target = e.target as HTMLInputElement;
      const action = target.getAttribute('data-action');

      if (action === 'change-posts-limit') {
        const value = Math.max(1, parseInt(target.value) || 1);
        setPostsToShow(value);
        setCurrentPage(0);
      }
    };

    container.addEventListener('click', handleClick);
    container.addEventListener('input', handleInput);

    return () => {
      container.removeEventListener('click', handleClick);
      container.removeEventListener('input', handleInput);
    };
  }, [renderedHTML]); // Re-attach event listeners when HTML changes

  if (loading || !template) {
    return <div className="loading">{template?.text.loading || 'Loading posts...'}</div>;
  }

  return (
    <div ref={containerRef} dangerouslySetInnerHTML={{ __html: renderedHTML }} />
  );
};

export default Home;

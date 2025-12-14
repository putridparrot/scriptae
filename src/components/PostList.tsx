import { useEffect, useState } from 'react';
import { Post } from '../utils/posts';
import { TemplateConfig, formatDate } from '../utils/template';
import { renderHTMLTemplate } from '../utils/templateEngine';
import './PostList.css';

interface PostListProps {
  posts: Post[];
  template: TemplateConfig;
  limit?: number;
}

const PostList = ({ posts, template, limit }: PostListProps) => {
  const displayPosts = limit ? posts.slice(0, limit) : posts;
  const [renderedItems, setRenderedItems] = useState<string[]>([]);
  
  useEffect(() => {
    const renderPosts = async () => {
      const items = await Promise.all(
        displayPosts.map(post => 
          renderHTMLTemplate('post-list-item', {
            title: post.frontmatter.title,
            slug: post.slug,
            author: post.frontmatter.author,
            date: formatDate(new Date(post.frontmatter.date), template.layout.home.dateFormat),
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
      setRenderedItems(items);
    };
    
    renderPosts();
  }, [displayPosts, template]);
  
  if (!displayPosts || displayPosts.length === 0) {
    return <div className="no-posts">{template.text.noPostsFound}</div>;
  }
  
  return (
    <div className="post-list">
      {renderedItems.map((html, index) => (
        <div key={displayPosts[index].slug} dangerouslySetInnerHTML={{ __html: html }} />
      ))}
    </div>
  );
};

export default PostList;

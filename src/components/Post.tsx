import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { renderToString } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { getPostBySlug, Post as PostType } from '../utils/posts';
import { loadTemplate, applyTheme, formatDate, TemplateConfig } from '../utils/template';
import { renderHTMLTemplate } from '../utils/templateEngine';
import CodeBlock from './CodeBlock';
import './Post.css';

const Post = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<PostType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [template, setTemplate] = useState<TemplateConfig | null>(null);
  const [renderedHTML, setRenderedHTML] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      if (!slug) {
        setError('No slug provided');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      try {
        // Load template first
        const templateConfig = await loadTemplate();
        setTemplate(templateConfig);
        applyTheme(templateConfig);
        
        // Load post
        const postData = await getPostBySlug(slug);
        
        if (!postData) {
          setError(templateConfig.text.postNotFound);
        } else {
          setPost(postData);
          
          // Render markdown content to HTML string
          const contentHTML = renderToString(
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code: CodeBlock as any,
              }}
            >
              {postData.content}
            </ReactMarkdown>
          );
          
          // Render HTML template
          const html = await renderHTMLTemplate('post', {
            // Include site data for nested templates first
            ...templateConfig.site,
            // Post-specific data (overwrites any conflicting site properties)
            title: postData.frontmatter.title,
            author: postData.frontmatter.author,
            date: formatDate(new Date(postData.frontmatter.date), templateConfig.layout.post.dateFormat),
            content: contentHTML,
            draft: postData.frontmatter.draft,
            showBackButton: templateConfig.layout.post.showBackButton,
            showDate: templateConfig.layout.post.showDate,
            showAuthor: templateConfig.layout.post.showAuthor,
            backButtonText: templateConfig.layout.post.backButtonText
          });
          
          setRenderedHTML(html);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [slug]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!post || !template || !renderedHTML) {
    return null;
  }

  return (
    <div dangerouslySetInnerHTML={{ __html: renderedHTML }} />
  );
};

export default Post;

export interface TemplateConfig {
  site: {
    title: string;
    description: string;
    tagline?: string;
    footer?: string;
  };
  theme: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      accentHover: string;
      text: string;
      textLight: string;
      background: string;
      headerText: string;
      border: string;
      draft: string;
    };
    fonts: {
      primary: string;
      headings: string;
      code: string;
    };
    spacing: {
      headerPadding: string;
      contentMaxWidth: string;
      postSpacing: string;
    };
    borderRadius: string;
    headerGradient: string;
  };
  layout: {
    home: {
      showPostCount: boolean;
      showControls: boolean;
      defaultPostsToShow: number;
      dateFormat: 'short' | 'long' | 'numeric';
    };
    post: {
      showAuthor: boolean;
      showDate: boolean;
      showBackButton: boolean;
      backButtonText: string;
      dateFormat: 'short' | 'long' | 'numeric';
    };
    postList: {
      showExcerpt: boolean;
      showAuthor: boolean;
      showDraftIndicator: boolean;
      draftIndicatorText: string;
      readMoreText: string;
    };
  };
  text: {
    loading: string;
    loadingPost: string;
    noPostsFound: string;
    postNotFound: string;
    errorLoading: string;
    showingPosts: string;
    postsToShowLabel: string;
    showAllButton: string;
    showLessButton: string;
  };
}

let cachedTemplate: TemplateConfig | null = null;

/**
 * Load the template configuration from the public folder
 */
export async function loadTemplate(): Promise<TemplateConfig> {
  if (cachedTemplate) {
    return cachedTemplate;
  }

  try {
    const response = await fetch('/template.json');
    if (!response.ok) {
      throw new Error('Failed to load template');
    }
    cachedTemplate = await response.json();
    return cachedTemplate as TemplateConfig;
  } catch (error) {
    console.error('Error loading template:', error);
    // Return default template as fallback
    return getDefaultTemplate();
  }
}

/**
 * Apply theme CSS variables to the document
 */
export function applyTheme(template: TemplateConfig): void {
  const root = document.documentElement;
  const { colors, fonts, spacing, borderRadius, headerGradient } = template.theme;

  // Apply color variables
  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--color-${key}`, value);
  });

  // Apply font variables
  Object.entries(fonts).forEach(([key, value]) => {
    root.style.setProperty(`--font-${key}`, value);
  });

  // Apply spacing variables
  Object.entries(spacing).forEach(([key, value]) => {
    root.style.setProperty(`--spacing-${key}`, value);
  });

  // Apply other theme variables
  root.style.setProperty('--border-radius', borderRadius);
  root.style.setProperty('--header-gradient', headerGradient);
}

/**
 * Format a date according to template configuration
 */
export function formatDate(date: Date, format: 'short' | 'long' | 'numeric'): string {
  const options: Intl.DateTimeFormatOptions = 
    format === 'long' 
      ? { year: 'numeric', month: 'long', day: 'numeric' }
      : format === 'short'
      ? { year: 'numeric', month: 'short', day: 'numeric' }
      : { year: 'numeric', month: '2-digit', day: '2-digit' };

  return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Replace template placeholders in text
 */
export function replaceTemplateVars(text: string, vars: Record<string, string | number>): string {
  let result = text;
  Object.entries(vars).forEach(([key, value]) => {
    result = result.replace(new RegExp(`\\{${key}\\}`, 'g'), String(value));
  });
  return result;
}

/**
 * Default template configuration (fallback)
 */
function getDefaultTemplate(): TemplateConfig {
  return {
    site: {
      title: "My Blog",
      description: "A markdown-based blog built with React",
      tagline: "",
      footer: ""
    },
    theme: {
      colors: {
        primary: "#667eea",
        secondary: "#764ba2",
        accent: "#3498db",
        accentHover: "#2980b9",
        text: "#2c3e50",
        textLight: "#7f8c8d",
        background: "#ffffff",
        headerText: "#ffffff",
        border: "#ddd",
        draft: "#e74c3c"
      },
      fonts: {
        primary: "-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
        headings: "inherit",
        code: "'Courier New', Courier, monospace"
      },
      spacing: {
        headerPadding: "60px 20px 40px",
        contentMaxWidth: "800px",
        postSpacing: "40px"
      },
      borderRadius: "4px",
      headerGradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    layout: {
      home: {
        showPostCount: true,
        showControls: true,
        defaultPostsToShow: 5,
        dateFormat: "long"
      },
      post: {
        showAuthor: true,
        showDate: true,
        showBackButton: true,
        backButtonText: "← Back to Home",
        dateFormat: "long"
      },
      postList: {
        showExcerpt: true,
        showAuthor: true,
        showDraftIndicator: true,
        draftIndicatorText: "[DRAFT]",
        readMoreText: "Read more →"
      }
    },
    text: {
      loading: "Loading posts...",
      loadingPost: "Loading...",
      noPostsFound: "No posts found.",
      postNotFound: "Post not found",
      errorLoading: "Failed to load post",
      showingPosts: "Showing {current} of {total} posts",
      postsToShowLabel: "Posts to show: ",
      showAllButton: "Show All",
      showLessButton: "Show Less"
    }
  };
}

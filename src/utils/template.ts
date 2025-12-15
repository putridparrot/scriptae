export interface TemplateConfig {
  site: {
    title: string;
    description: string;
    tagline?: string;
    footer?: string;
  };
  content: {
    source: 'local' | 'github';
    github?: {
      owner: string;
      repo: string;
      postsPath: string;
      draftsPath?: string;
    };
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
    newerPostsButton: string;
    olderPostsButton: string;
  };
}

let cachedTemplate: TemplateConfig | null = null;
let currentTheme: 'light' | 'dark' = 'light';

/**
 * Get the current theme preference from localStorage or system preference
 */
export function getThemePreference(): 'light' | 'dark' {
  const stored = localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  
  // Check system preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Set the theme preference
 */
export function setThemePreference(theme: 'light' | 'dark'): void {
  localStorage.setItem('theme', theme);
  // Don't update currentTheme here - let loadTemplate handle it
  // Clear cache to force reload with new theme
  cachedTemplate = null;
}

/**
 * Deep merge two objects
 */
function deepMerge<T>(base: T, override: Partial<T>): T {
  const result = { ...base };
  
  for (const key in override) {
    const overrideValue = override[key];
    const baseValue = result[key];
    
    if (overrideValue && typeof overrideValue === 'object' && !Array.isArray(overrideValue) &&
        baseValue && typeof baseValue === 'object' && !Array.isArray(baseValue)) {
      (result as any)[key] = deepMerge(baseValue, overrideValue);
    } else if (overrideValue !== undefined) {
      (result as any)[key] = overrideValue;
    }
  }
  
  return result;
}

/**
 * Load the template configuration from the public folder
 * First loads base template.json, then merges theme-specific overrides
 */
export async function loadTemplate(theme?: 'light' | 'dark'): Promise<TemplateConfig> {
  const selectedTheme = theme || getThemePreference();
  
  // Clear cache if theme changed
  if (theme && theme !== currentTheme) {
    cachedTemplate = null;
    currentTheme = theme;
  }
  
  if (cachedTemplate && currentTheme === selectedTheme) {
    return cachedTemplate;
  }

  try {
    // Use BASE_URL to handle subdirectory deployments
    const baseUrl = import.meta.env.BASE_URL || '/';
    const useCache = import.meta.env.PROD;
    
    // Load base template
    const baseResponse = await fetch(`${baseUrl}templates/template.json`, {
      cache: useCache ? 'force-cache' : 'no-store'
    });
    if (!baseResponse.ok) {
      throw new Error('Failed to load base template');
    }
    const baseTemplate = await baseResponse.json();
    
    // Load theme-specific overrides
    const themeResponse = await fetch(`${baseUrl}templates/template-${selectedTheme}.json`, {
      cache: useCache ? 'force-cache' : 'no-store'
    });
    if (!themeResponse.ok) {
      // If theme-specific template doesn't exist, just use the base template
      console.log(`No theme-specific template found for ${selectedTheme}, using base template`);
      cachedTemplate = baseTemplate as TemplateConfig;
      currentTheme = selectedTheme;
      return cachedTemplate;
    }
    const themeOverrides = await themeResponse.json();
    
    // Merge base with theme overrides
    cachedTemplate = deepMerge(baseTemplate, themeOverrides);
    currentTheme = selectedTheme;
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
    content: {
      source: "local",
      github: {
        owner: "your-username",
        repo: "your-repo",
        postsPath: "content/posts",
        draftsPath: "content/drafts"
      }
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
      showLessButton: "Show Less",
      newerPostsButton: "← Newer Posts",
      olderPostsButton: "Older Posts →"
    }
  };
}

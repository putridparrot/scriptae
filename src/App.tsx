import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThemeSwitcher from './components/ThemeSwitcher';
import { loadTemplate, applyTheme, getThemePreference } from './utils/template';
import './App.css';

// Lazy load Post component for code splitting
const Post = lazy(() => import('./components/Post'));

function App() {
  // Apply theme on initial load
  useEffect(() => {
    const initTheme = async () => {
      const theme = getThemePreference();
      const templateConfig = await loadTemplate(theme);
      applyTheme(templateConfig);
      
      // Set document title from template config
      if (templateConfig.site.siteTitle) {
        document.title = templateConfig.site.siteTitle;
      }
      
      // Update favicon if logoPath is specified
      if (templateConfig.site.logoPath) {
        const favicon = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
        if (favicon) {
          favicon.href = templateConfig.site.logoPath;
        }
      }
    };
    initTheme();
  }, []);

  const handleThemeChange = async (theme: 'light' | 'dark') => {
    // Load template with new theme and apply colors
    const templateConfig = await loadTemplate(theme);
    applyTheme(templateConfig);
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ThemeSwitcher onThemeChange={handleThemeChange} />
      <Suspense fallback={<div className="loading">Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<Post />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;

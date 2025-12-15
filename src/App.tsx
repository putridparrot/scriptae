import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ThemeSwitcher from './components/ThemeSwitcher';
import { loadTemplate, applyTheme } from './utils/template';
import './App.css';

// Lazy load Post component for code splitting
const Post = lazy(() => import('./components/Post'));

function App() {
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

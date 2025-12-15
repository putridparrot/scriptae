import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Post from './components/Post';
import ThemeSwitcher from './components/ThemeSwitcher';
import { loadTemplate, applyTheme } from './utils/template';
import './App.css';

function App() {
  const [, setThemeVersion] = useState(0);

  const handleThemeChange = async (theme: 'light' | 'dark') => {
    const templateConfig = await loadTemplate(theme);
    applyTheme(templateConfig);
    setThemeVersion(v => v + 1); // Force re-render
    window.location.reload(); // Reload to apply new template
  };

  return (
    <Router basename={import.meta.env.BASE_URL}>
      <ThemeSwitcher onThemeChange={handleThemeChange} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<Post />} />
      </Routes>
    </Router>
  );
}

export default App;

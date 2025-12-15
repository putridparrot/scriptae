import { useState, useEffect } from 'react';
import { getThemePreference, setThemePreference } from '../utils/template';
import './ThemeSwitcher.css';

interface ThemeSwitcherProps {
  onThemeChange: (theme: 'light' | 'dark') => void;
}

const ThemeSwitcher = ({ onThemeChange }: ThemeSwitcherProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(getThemePreference());

  useEffect(() => {
    // Apply initial theme
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    // Update state first
    setTheme(newTheme);
    
    // Set the data-theme attribute immediately for CSS
    document.documentElement.setAttribute('data-theme', newTheme);
    
    // Save preference
    setThemePreference(newTheme);
    
    // Notify parent to reload template colors
    onThemeChange(newTheme);
  };

  return (
    <button 
      className="theme-switcher" 
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeSwitcher;

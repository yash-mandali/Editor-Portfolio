/**
 * CONTROLLER LAYER - Theme
 * Manages Dark/Light mode state and persistence.
 */
import { useState, useEffect } from 'react';

export const useThemeController = () => {
  // Initialize state based on localStorage or system preference
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        return savedTheme;
      }
      // Default to dark for this premium portfolio
      return 'dark'; 
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    
    // Remove previous classes
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return { theme, toggleTheme };
};

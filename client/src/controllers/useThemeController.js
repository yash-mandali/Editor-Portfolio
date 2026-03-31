/**
 * CONTROLLER LAYER - Theme
 * Manages Dark/Light mode state and persistence.
 */
import { useState, useEffect } from 'react';

export const useThemeController = () => {
  // Initialize state based on localStorage or system preference
  const [theme] = useState('dark');

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
    // Theme is locked to dark
    console.log('Theme is locked to dark for professional cinematic experience.');
  };

  return { theme, toggleTheme };
};

import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { motion } from 'framer-motion';
import { useThemeController } from '../../controllers/useThemeController';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useThemeController();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-full bg-neutral-200 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors focus:outline-none focus:ring-2 focus:ring-amber-500"
      aria-label="Toggle Dark Mode"
    >
      <motion.div
        initial={false}
        animate={{ rotate: theme === 'dark' ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {theme === 'dark' ? <Moon size={20} /> : <Sun size={20} />}
      </motion.div>
    </button>
  );
};

export default ThemeToggle;

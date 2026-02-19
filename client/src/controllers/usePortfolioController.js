/**
 * CONTROLLER LAYER - Portfolio
 * Manages portfolio filtering and category logic with API data.
 */

import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { PORTFOLIO } from '../models/data';

export const usePortfolioController = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [items, setItems] = useState(PORTFOLIO);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  // Fetch portfolio from API
  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/portfolio`);
        setItems(res.data.data && res.data.data.length > 0 ? res.data.data : PORTFOLIO);
      } catch (err) {
        console.error('Fetch portfolio error:', err);
        // Fallback to hard-coded data
        setItems(PORTFOLIO);
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  // Extract unique categories from portfolio items
  const categories = useMemo(() => {
    const cats = ['All', ...new Set(items.map(item => item.category))];
    return cats;
  }, [items]);

  // Filter items based on active category
  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return items;
    return items.filter(item => item.category === activeCategory);
  }, [activeCategory, items]);

  return {
    activeCategory,
    setActiveCategory,
    categories,
    filteredItems,
    loading
  };
};

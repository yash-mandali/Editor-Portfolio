/**
 * CONTROLLER LAYER - Videos
 * Manages video filtering and category logic with API data.
 */

import { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import { VIDEOS } from '../models/data';

export const useVideoController = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [items, setItems] = useState(VIDEOS);
    const [loading, setLoading] = useState(true);

    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

    // Fetch videos from API
    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/videos`);
                setItems(res.data.data && res.data.data.length > 0 ? res.data.data : VIDEOS);
            } catch (err) {
                console.error('Fetch videos error:', err);
                // Fallback to hard-coded data
                setItems(VIDEOS);
            } finally {
                setLoading(false);
            }
        };
        fetchVideos();
    }, []);

    // Extract unique categories from videos
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

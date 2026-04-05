/**
 * CONTROLLER LAYER - Contact
 * Manages contact form state and submission logic.
 */

import { useState, useEffect } from 'react';
import axios from 'axios';

/* Maps service page IDs → contact form projectType values */
const SERVICE_MAP = {
  'short-form': 'reels',
  'long-form': 'youtube',
  'promotional': 'commercial',
  'corporate-events': 'commercial',
  'creative': 'other',
};

const getPreselectedType = () => {
  if (typeof window === 'undefined') return '';
  const param = new URLSearchParams(window.location.search).get('service');
  return SERVICE_MAP[param] || '';
};

export const useContactController = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: getPreselectedType(),
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

  /* Re-read param if URL changes (e.g. navigating from services) */
  useEffect(() => {
    const type = getPreselectedType();
    if (type) setFormData(prev => ({ ...prev, projectType: type }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/contacts`, formData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: '', email: '', projectType: '', budget: '', message: '' });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return { formData, handleChange, handleSubmit, isSubmitting, submitted, error };
};

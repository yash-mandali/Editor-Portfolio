/**
 * CONTROLLER LAYER - Contact
 * Manages contact form state and submission logic.
 */

import { useState } from 'react';
import axios from 'axios';

export const useContactController = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await axios.post(`${API_URL}/api/contacts`, formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.data.success) {
        // console.log("Form Submitted Successfully:", response.data);
        setSubmitted(true);
        // Reset form data after successful submission
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          message: ''
        });
      }
    } catch (err) {
      console.error('Form submission error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to submit form. Please try again.';
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitted,
    error
  };
};

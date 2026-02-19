import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAdmin = ({ children }) => {
    if (typeof window === 'undefined') return null;
    const isAdmin = localStorage.getItem('isAdmin') === 'true';
    if (!isAdmin) return <Navigate to="/admin/login" replace />;
    return children;
};

export default RequireAdmin;

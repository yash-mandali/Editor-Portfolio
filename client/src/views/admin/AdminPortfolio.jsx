import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, ExternalLink } from 'lucide-react';
import { convertDriveImageUrl, convertDriveVideoUrl } from '../../utils/driveUtils';


const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const AdminPortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', category: '', image: '', description: '', videoUrl: '', published: true });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchPortfolio();
    }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/portfolio/all/list`);
            setItems(res.data.data || []);
        } catch (err) {
            console.error('Fetch portfolio error:', err);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setForm({ title: '', category: '', image: '', description: '', videoUrl: '', published: true });
        setEditing(null);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.title.trim()) newErrors.title = 'Title is required';
        if (!form.category.trim()) newErrors.category = 'Category is required';
        if (!form.videoUrl.trim()) newErrors.videoUrl = 'Video URL is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setUploading(true);
            const payload = {
                title: form.title,
                category: form.category,
                image:form.image,
                description: form.description,
                videoUrl: form.videoUrl,
                published: form.published
            };
            if (editing) {
                await axios.put(`${API_URL}/api/portfolio/${editing._id}`, payload);
            } else {
                await axios.post(`${API_URL}/api/portfolio`, payload);
            }
            fetchPortfolio();
            resetForm();
        } catch (err) {
            console.error('Save error:', err);
            alert('Failed to save: ' + err.response?.data?.message);
        } finally {
            setUploading(false);
        }
    };

    const handleEdit = (item) => {
        setEditing(item);
        setForm({
            title: item.title,
            category: item.category,
            image: item.image || '',
            description: item.description || '',
            videoUrl: item.videoUrl || '',
            published: item.published
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure? This action cannot be undone.')) return;
        try {
            await axios.delete(`${API_URL}/api/portfolio/${id}`);
            fetchPortfolio();
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete');
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: null }));
        }
    };



    return (
        <div className="space-y-6">
            {/* Form Section */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
                        {editing ? 'Edit Portfolio Item' : 'Add Portfolio Item'}
                    </h2>
                    {editing && (
                        <button
                            onClick={resetForm}
                            className="px-3 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition"
                        >
                            New Item
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Title *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="e.g., Neon City Nightlife"
                                className={`w-full px-4 py-2 rounded-lg border ${errors.title
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950'
                                    } text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                            />
                            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-1">Category *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className={`w-full px-3 py-2 rounded-lg border ${errors.category ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'} dark:bg-neutral-950 dark:text-white`}
                            >
                                <option value="">Select a category</option>
                                <option value="Reels / Shorts">Reels / Shorts</option>
                                <option value="YouTube Videos">YouTube Videos</option>
                                <option value="Promotional Videos">Promotional Videos</option>
                                <option value="Corporate Videos">Corporate Videos</option>
                                <option value="Music & Cinematic">Music & Cinematic</option>
                                <option value="Podcast & Interviews">Podcast & Interviews</option>
                                <option value="Event Videos">Event Videos</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Describe your portfolio item..."
                            rows="3"
                            className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Image URL
                            </label>
                            <input
                                type="url"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full px-4 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                            />
                        </div>

                        {/* Video URL input only */}
                        <div className="col-span-full">
                            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                Video URL * (YouTube or direct)
                            </label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={form.videoUrl}
                                onChange={handleChange}
                                placeholder="https://youtube.com/watch?v=... or Google Drive link"
                                className={`w-full px-4 py-2 rounded-lg border ${errors.videoUrl
                                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                                    : 'border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950'
                                    } text-neutral-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500`}
                            />
                            {errors.videoUrl && <p className="text-xs text-red-500 mt-1">{errors.videoUrl}</p>}
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input
                                type="checkbox"
                                name="published"
                                id="published"
                                checked={form.published}
                                onChange={handleChange}
                                className="w-4 h-4 rounded cursor-pointer"
                            />
                            <label htmlFor="published" className="text-sm font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer">
                                Published (visible to users)
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <button
                                type="submit"
                                disabled={uploading}
                                className={`flex-1 px-4 py-2 ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-amber-500 hover:bg-amber-600'} text-black font-semibold rounded-lg transition flex items-center justify-center gap-2`}
                            >
                                <Plus size={18} />
                                {uploading ? 'Uploading...' : (editing ? 'Update Item' : 'Add Item')}
                            </button>
                            {editing && (
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    disabled={uploading}
                                    className="px-4 py-2 bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-lg hover:bg-neutral-300 dark:hover:bg-neutral-700 transition disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                            )}
                        </div>
                    </div>
                </form>
            </div>

            {/* Items List Section */}
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md">
                <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-6">
                    Portfolio Items ({items.length})
                </h3>

                {loading ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="text-center py-12">
                        <p className="text-neutral-600 dark:text-neutral-400">No portfolio items yet. Create one above!</p>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {items.map(item => (
                            <div
                                key={item._id}
                                className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden hover:shadow-lg dark:hover:shadow-lg/20 transition group"
                            >
                                {/* Image/Video Preview */}
                                <div className="relative aspect-video bg-neutral-900 flex items-center justify-center overflow-hidden">
                                    {item.image ? (
                                        <img loading="lazy" decoding="async" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition" />
                                    ) : (
                                        <div className="text-neutral-500 text-center">
                                            <p className="text-sm">No image</p>
                                        </div>
                                    )}
                                    {!item.published && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                                            <span className="px-3 py-1 bg-yellow-500 text-black text-xs font-semibold rounded">Unpublished</span>
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <div className="mb-3">
                                        <h4 className="font-bold text-neutral-900 dark:text-white text-sm truncate">{item.title}</h4>
                                        <p className="text-xs text-amber-600 dark:text-amber-500 font-medium">{item.category}</p>
                                    </div>

                                    <p className="text-xs text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
                                        {item.description || 'No description'}
                                    </p>

                                    <div className="text-xs text-neutral-500 mb-3 flex items-start gap-1">
                                        <ExternalLink size={12} className="mt-0.5 flex-shrink-0" />
                                        <span className="break-all truncate">
                                            {item.videoUrl?.substring(0, 40)}...
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded text-xs font-medium transition"
                                        >
                                            <Edit2 size={14} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition"
                                        >
                                            <Trash2 size={14} />
                                            Delete
                                        </button>
                                    </div>

                                    <p className="text-xs text-neutral-500 mt-3 text-center">
                                        {new Date(item.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPortfolio;

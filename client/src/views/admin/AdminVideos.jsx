import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, ExternalLink } from 'lucide-react';
import { convertDriveImageUrl, convertDriveVideoUrl } from '../../utils/driveUtils';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const AdminVideos = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', category: '', image: '', description: '', videoUrl: '', published: true });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/videos/all/list`);
            setItems(res.data.data || []);
        } catch (err) {
            console.error('Fetch videos error:', err);
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
                image: convertDriveImageUrl(form.image),
                description: form.description,
                videoUrl: form.videoUrl,
                published: form.published
            };

            if (editing) {
                await axios.put(`${API_URL}/api/videos/${editing._id}`, payload);
            } else {
                await axios.post(`${API_URL}/api/videos`, payload);
            }

            fetchVideos();
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
            published: item.published !== undefined ? item.published : true,
        });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this video?')) return;

        try {
            await axios.delete(`${API_URL}/api/videos/${id}`);
            fetchVideos();
        } catch (err) {
            console.error('Delete error:', err);
            alert('Failed to delete: ' + err.response?.data?.message);
        }
    };



    if (loading && items.length === 0) {
        return <div className="flex items-center justify-center p-8">Loading videos...</div>;
    }

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800 p-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Manage Videos</h1>
                {!editing && (
                    <button
                        onClick={() => setForm({ title: '', category: '', image: '', description: '', videoUrl: '', published: true })}
                        className="flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 text-sm"
                    >
                        <Plus size={16} /> New Video
                    </button>
                )}
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 p-6 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
                <div>
                    <label className="block text-sm font-medium mb-1">Title *</label>
                    <input
                        type="text"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${errors.title ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'} dark:bg-neutral-700 dark:text-white`}
                        placeholder="Video title"
                    />
                    {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category *</label>
                    <select
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${errors.category ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'} dark:bg-neutral-700 dark:text-white`}
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

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <textarea
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                        placeholder="Video description"
                        rows="3"
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium mb-1">Image URL</label>
                    <input
                        type="text"
                        value={form.image}
                        onChange={(e) => setForm({ ...form, image: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-600 dark:bg-neutral-700 dark:text-white"
                        placeholder="https://example.com/image.jpg"
                    />
                </div>

                <div className="lg:col-span-2">
                    <label className="block text-sm font-medium mb-1">Video URL * (YouTube, Google Drive, or direct)</label>
                    <input
                        type="text"
                        value={form.videoUrl}
                        onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                        className={`w-full px-3 py-2 rounded-lg border ${errors.videoUrl ? 'border-red-500' : 'border-neutral-300 dark:border-neutral-600'} dark:bg-neutral-700 dark:text-white`}
                        placeholder="https://www.youtube.com/watch?v=... or Google Drive share link"
                    />
                    {errors.videoUrl && <p className="text-red-500 text-xs mt-1">{errors.videoUrl}</p>}
                </div>

                <div className="lg:col-span-2 flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="published"
                        checked={form.published}
                        onChange={(e) => setForm({ ...form, published: e.target.checked })}
                        className="w-4 h-4"
                    />
                    <label htmlFor="published" className="text-sm font-medium cursor-pointer">
                        Published (visible to public)
                    </label>
                </div>

                <div className="lg:col-span-2 flex gap-2">
                    <button
                        type="submit"
                        disabled={uploading}
                        className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50 text-sm font-medium"
                    >
                        {uploading ? 'Saving...' : editing ? 'Update Video' : 'Create Video'}
                    </button>
                    {editing && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="px-4 py-2 bg-neutral-300 dark:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg hover:bg-neutral-400 dark:hover:bg-neutral-600 text-sm font-medium"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            {/* Videos List */}
            <div className="space-y-3">
                {items.map((item) => (
                    <div
                        key={item._id}
                        className="flex flex-col md:flex-row md:items-center gap-4 p-4 bg-neutral-50 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700"
                    >
                        {item.image && (
                            <img
                                src={item.image}
                                alt={item.title}
                                className="w-full md:w-24 h-24 object-cover rounded-lg"
                            />
                        )}
                        <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900 dark:text-white">{item.title}</h3>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                {item.category} • {item.description}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className={`text-xs px-2 py-1 rounded-full ${item.published ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' : 'bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100'}`}>
                                    {item.published ? 'Published' : 'Draft'}
                                </span>
                                {item.videoUrl && (
                                    <a
                                        href={item.videoUrl.startsWith('http') ? item.videoUrl : '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-amber-500 hover:text-amber-600 text-xs flex items-center gap-1"
                                    >
                                        <ExternalLink size={12} /> View
                                    </a>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <button
                                onClick={() => handleEdit(item)}
                                className="p-2 text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors"
                                title="Edit"
                            >
                                <Edit2 size={18} />
                            </button>
                            <button
                                onClick={() => handleDelete(item._id)}
                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                title="Delete"
                            >
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {items.length === 0 && !loading && (
                <div className="text-center py-8 text-neutral-600 dark:text-neutral-400">
                    No videos yet. Create your first video!
                </div>
            )}
        </div>
    );
};

export default AdminVideos;

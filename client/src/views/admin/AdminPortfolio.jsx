import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, ExternalLink, Video, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

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
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Form Section */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Video size={20} className="text-amber-400" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                            {editing ? 'Edit Project' : 'New Project'}
                        </h2>
                    </div>
                    {editing && (
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] rounded border border-white/5 hover:text-white hover:border-white/20 transition-all"
                        >
                            Cancel Edit
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Project Title *</label>
                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="CLIENT_PROJECT_NAME"
                                className={`w-full px-4 py-4 rounded bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-neutral-700 focus:outline-none focus:border-amber-400/50 transition-all`}
                            />
                            {errors.title && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Asset Category *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-4 rounded bg-[#0a0a0f] border border-white/10 text-white focus:outline-none focus:border-amber-400/50 transition-all appearance-none"
                            >
                                <option value="">Select a category</option>
                                <option value="Reels / Shorts">Reels / Shorts</option>
                                <option value="YouTube Videos">YouTube Videos</option>
                                <option value="Promotional Videos">Promotional Videos</option>
                                <option value="Corporate Videos">Corporate Videos</option>
                                <option value="Music & Cinematic">Music & Cinematic</option>
                                <option value="Podcast & Interviews">Podcast & Interviews</option>
                                <option value="Event Videos">Event Videos</option>
                                <option value="Client Projects">Client Projects</option>
                                <option value="Others">Others</option>
                            </select>
                            {errors.category && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.category}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Logline / Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            placeholder="Brief project overview..."
                            rows="4"
                            className="w-full px-4 py-4 rounded bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-amber-400/50 transition-all resize-none"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Poster Frame URL</label>
                            <input
                                type="url"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                                placeholder="https://source.unsplash.com/..."
                                className="w-full px-4 py-4 rounded bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-amber-400/50 transition-all"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Master Video URL *</label>
                            <input
                                type="url"
                                name="videoUrl"
                                value={form.videoUrl}
                                onChange={handleChange}
                                placeholder="https://vimeo.com/..."
                                className={`w-full px-4 py-4 rounded bg-white/5 border ${errors.videoUrl ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-neutral-700 focus:outline-none focus:border-amber-400/50 transition-all`}
                            />
                            {errors.videoUrl && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.videoUrl}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                name="published"
                                id="published"
                                checked={form.published}
                                onChange={handleChange}
                                className="w-5 h-5 rounded bg-white/5 border-white/10 text-amber-400 focus:ring-amber-500/20"
                            />
                            <label htmlFor="published" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 cursor-pointer select-none">
                                Deploy to Public Gallery
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className={`w-full md:w-auto min-w-[200px] flex items-center justify-center gap-3 px-10 py-5 bg-amber-400 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_30px_rgba(0,212,255,0.2)] disabled:opacity-50`}
                        >
                            {uploading ? <Loader2 className="animate-spin" size={18} /> : (editing ? <CheckCircle2 size={18} /> : <Plus size={18} />)}
                            {uploading ? 'Processing...' : (editing ? 'Apply Changes' : 'Initialize Project')}
                        </button>
                    </div>
                </form>
            </div>

            {/* Items List Section */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                        Asset Archive <span className="text-[#2e2e42]">({items.length})</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded border border-white/10 border-dashed">
                        <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Syncing Archive...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded border border-white/10 border-dashed">
                        <AlertCircle className="w-10 h-10 text-neutral-700 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">No Assets Decoded</p>
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {items.map(item => (
                            <div
                                key={item._id}
                                className="bg-[#0a0a0f] border border-white/5 rounded-lg overflow-hidden group hover:border-amber-400/30 transition-all duration-500"
                            >
                                {/* Image/Video Preview */}
                                <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                                    {item.image ? (
                                        <img loading="lazy" src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-1000 opacity-60 group-hover:opacity-80" />
                                    ) : (
                                        <div className="flex items-center justify-center w-full h-full text-neutral-700">
                                            <Video size={40} />
                                        </div>
                                    )}
                                    {!item.published && (
                                        <div className="absolute inset-x-0 bottom-0 py-2 bg-red-500/80 text-white text-[8px] font-black uppercase tracking-[0.4em] text-center backdrop-blur-sm">
                                            Offline
                                        </div>
                                    )}
                                    <div className="absolute top-4 left-4 flex gap-2">
                                        <span className="px-2 py-1 bg-black/60 backdrop-blur-md text-amber-400 text-[8px] font-black uppercase tracking-[0.2em] rounded border border-amber-400/30">
                                            {item.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h4 className="text-lg font-black text-white uppercase tracking-tight truncate mb-2">{item.title}</h4>
                                    <p className="text-xs text-neutral-500 line-clamp-2 mb-6 font-medium leading-relaxed">
                                        {item.description || 'No descriptive metadata available for this asset.'}
                                    </p>

                                    {/* Actions */}
                                    <div className="flex gap-4">
                                        <button
                                            onClick={() => handleEdit(item)}
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-white/5 hover:bg-amber-400 hover:text-black text-white rounded text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border border-white/10 hover:border-amber-400"
                                        >
                                            <Edit2 size={12} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item._id)}
                                            className="flex items-center justify-center w-12 px-2 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded transition-all duration-300 border border-red-500/20"
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    </div>
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

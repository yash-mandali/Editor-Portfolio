import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, ExternalLink,Film } from 'lucide-react';

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
                image:form.image,
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
        window.scrollTo({ top: 0, behavior: 'smooth' });
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

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Form Section */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <Film size={20} className="text-cyan-400" />
                        <h2 className="text-2xl font-black text-white uppercase tracking-tighter">
                            {editing ? 'Modify Stream' : 'Initialize Stream'}
                        </h2>
                    </div>
                    {editing && (
                        <button
                            onClick={resetForm}
                            className="px-4 py-2 bg-white/5 text-neutral-400 text-[10px] font-black uppercase tracking-[0.2em] rounded border border-white/5 hover:text-white hover:border-white/20 transition-all"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Video Title *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className={`w-full px-4 py-4 rounded bg-white/5 border ${errors.title ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-all`}
                                placeholder="ASSET_IDENTIFIER"
                            />
                            {errors.title && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Video Category *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full px-4 py-4 rounded bg-[#0a0a0f] border border-white/10 text-white focus:outline-none focus:border-cyan-400/50 transition-all appearance-none"
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
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Metadata / Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full px-4 py-4 rounded bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-all resize-none"
                            placeholder="Brief asset synopsis..."
                            rows="3"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Thumbnail URL</label>
                            <input
                                type="text"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="w-full px-4 py-4 rounded bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-all"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Master Stream URL *</label>
                            <input
                                type="text"
                                value={form.videoUrl}
                                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                                className={`w-full px-4 py-4 rounded bg-white/5 border ${errors.videoUrl ? 'border-red-500' : 'border-white/10'} text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-all`}
                                placeholder="https://..."
                            />
                            {errors.videoUrl && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.videoUrl}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="published"
                                checked={form.published}
                                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                className="w-5 h-5 rounded bg-white/5 border-white/10 text-cyan-400 focus:ring-cyan-500/20"
                            />
                            <label htmlFor="published" className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-400 cursor-pointer select-none">
                                Transmit to Global Feed
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-3 px-10 py-5 bg-cyan-400 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_30px_rgba(0,212,255,0.2)] disabled:opacity-50"
                        >
                             {uploading ? <Loader2 className="animate-spin" size={18} /> : (editing ? <CheckCircle2 size={18} /> : <Plus size={18} />)}
                            {uploading ? 'Processing...' : editing ? 'Commit Changes' : 'Initialize Asset'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Videos List Section */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                        Asset Archive <span className="text-[#2e2e42]">({items.length})</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded border border-white/10 border-dashed">
                        <Loader2 className="w-10 h-10 text-cyan-400 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Syncing Archive...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-white/5 rounded border border-white/10 border-dashed">
                        <AlertCircle className="w-10 h-10 text-neutral-700 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">No Assets Decoded</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col md:flex-row md:items-center gap-8 p-6 bg-[#0a0a0f] rounded border border-white/5 hover:border-cyan-400/30 transition-all duration-500 group"
                            >
                                <div className="relative w-full md:w-40 aspect-video rounded overflow-hidden flex-shrink-0">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition duration-1000"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-700">
                                            <Film size={24} />
                                        </div>
                                    )}
                                    {!item.published && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Offline</span>
                                        </div>
                                    )}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-2">
                                        <h3 className="font-black text-white uppercase tracking-tight truncate">{item.title}</h3>
                                        <span className="text-[8px] font-black tracking-[0.2em] text-cyan-400 uppercase bg-cyan-400/10 px-2 py-0.5 rounded border border-cyan-400/20">
                                            {item.category}
                                        </span>
                                    </div>
                                    <p className="text-xs text-neutral-500 line-clamp-1 mb-4 font-medium">
                                        {item.description || "No descriptive metadata attached."}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={item.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-neutral-400 hover:text-cyan-400 transition-colors"
                                        >
                                            <ExternalLink size={12} /> Master_Feed
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="p-3 bg-white/5 text-neutral-400 hover:bg-cyan-400 hover:text-black rounded transition-all duration-300 border border-white/5 hover:border-cyan-400"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="p-3 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded transition-all duration-300 border border-red-500/10 hover:border-red-500"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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

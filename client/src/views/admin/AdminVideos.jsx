import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, ExternalLink, Film, Loader2, AlertCircle, CheckCircle2 } from 'lucide-react';

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
                image: form.image,
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
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.45)]">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_28%)]" />
                <div className="relative flex items-center justify-between mb-10 pb-6 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                        <Film size={20} className="text-cyan-700" />
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">
                            {editing ? 'Modify Stream' : 'Initialize Stream'}
                        </h2>
                    </div>
                    {editing && (
                        <button
                            onClick={resetForm}
                            className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 transition-all hover:border-cyan-400 hover:text-slate-950"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} className="relative space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Video Title *</label>
                            <input
                                type="text"
                                value={form.title}
                                onChange={(e) => setForm({ ...form, title: e.target.value })}
                                className={`w-full rounded-2xl border px-4 py-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all shadow-sm ${errors.title ? 'border-red-500/80 bg-red-50' : 'border-slate-300 bg-white/95 focus:border-cyan-500'}`}
                                placeholder="ASSET_IDENTIFIER"
                            />
                            {errors.title && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{errors.title}</p>}
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Video Category *</label>
                            <select
                                value={form.category}
                                onChange={(e) => setForm({ ...form, category: e.target.value })}
                                className="w-full appearance-none rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 shadow-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
                            >
                                <option value="" className="text-slate-500">Select a category</option>
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
                            {errors.category && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{errors.category}</p>}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Metadata / Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            className="w-full resize-none rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
                            placeholder="Brief asset synopsis..."
                            rows="3"
                        />
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Thumbnail URL</label>
                            <input
                                type="text"
                                value={form.image}
                                onChange={(e) => setForm({ ...form, image: e.target.value })}
                                className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70"
                                placeholder="https://..."
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Master Stream URL *</label>
                            <input
                                type="text"
                                value={form.videoUrl}
                                onChange={(e) => setForm({ ...form, videoUrl: e.target.value })}
                                className={`w-full rounded-2xl border px-4 py-4 text-slate-900 placeholder:text-slate-400 transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-200/70 ${errors.videoUrl ? 'border-red-500/80 bg-red-50' : 'border-slate-300 bg-white/95 focus:border-cyan-500'}`}
                                placeholder="https://..."
                            />
                            {errors.videoUrl && <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest">{errors.videoUrl}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6">
                        <div className="flex items-center gap-3">
                            <input
                                type="checkbox"
                                id="published"
                                checked={form.published}
                                onChange={(e) => setForm({ ...form, published: e.target.checked })}
                                className="h-5 w-5 rounded border-slate-400 bg-white text-cyan-600 focus:ring-cyan-500/20"
                            />
                            <label htmlFor="published" className="cursor-pointer select-none text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">
                                Transmit to Global Feed
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={uploading}
                            className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition-all shadow-[0_18px_45px_-22px_rgba(15,23,42,0.8)] hover:bg-cyan-600 disabled:opacity-50"
                        >
                            {uploading ? <Loader2 className="animate-spin" size={18} /> : (editing ? <CheckCircle2 size={18} /> : <Plus size={18} />)}
                            {uploading ? 'Processing...' : editing ? 'Commit Changes' : 'Initialize Asset'}
                        </button>
                    </div>
                </form>
            </div>

            {/* Videos List Section */}
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)]">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">
                        Asset Archive <span className="text-cyan-700">({items.length})</span>
                    </h3>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-300 bg-slate-50 border-dashed">
                        <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Syncing Archive...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-300 bg-slate-50 border-dashed">
                        <AlertCircle className="w-10 h-10 text-slate-500 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">No Assets Decoded</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map((item) => (
                            <div
                                key={item._id}
                                className="flex flex-col gap-8 rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-cyan-50/70 p-6 shadow-sm transition-all duration-500 group hover:border-cyan-400/60 hover:shadow-[0_24px_50px_-30px_rgba(6,182,212,0.55)] md:flex-row md:items-center"
                            >
                                <div className="relative w-full md:w-40 aspect-video rounded-3xl overflow-hidden flex-shrink-0 bg-slate-200">
                                    {item.image ? (
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition duration-700"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-600">
                                            <Film size={24} />
                                        </div>
                                    )}
                                    {!item.published && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/55">
                                            <span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Offline</span>
                                        </div>
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-4 mb-2 flex-wrap">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight truncate">{item.title}</h3>
                                        <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-800">
                                            {item.category}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-600 line-clamp-1 mb-4 font-medium">
                                        {item.description || "No descriptive metadata attached."}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <a
                                            href={item.videoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700 transition-colors hover:text-cyan-900"
                                        >
                                            <ExternalLink size={12} /> Master_Feed
                                        </a>
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="rounded-2xl border border-slate-300 bg-white p-3 text-slate-700 transition-all duration-300 hover:border-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
                                    >
                                        <Edit2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        className="rounded-2xl border border-red-200 bg-red-50 p-3 text-red-500 transition-all duration-300 hover:border-red-500 hover:bg-red-500 hover:text-white"
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
                <div className="py-8 text-center text-slate-500">
                    No videos yet. Create your first video!
                </div>
            )}
        </div>
    );
};

export default AdminVideos;

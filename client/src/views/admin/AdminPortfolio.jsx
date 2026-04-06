import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Edit2, Plus, Video, CheckCircle2, AlertCircle, Loader2, ExternalLink } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const inputCls = (err) =>
    `w-full rounded-2xl border px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all ${err ? 'border-red-400 bg-red-50' : 'border-slate-300 bg-white/95 focus:border-cyan-500'
    }`;

const CATEGORIES = ['Reels / Shorts', 'YouTube Videos', 'Promotional Videos', 'Corporate Videos', 'Music & Cinematic', 'Podcast & Interviews', 'Event Videos', 'Client Projects', 'Others'];

const AdminPortfolio = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', category: '', image: '', description: '', videoUrl: '', published: true });
    const [errors, setErrors] = useState({});
    const [uploading, setUploading] = useState(false);

    useEffect(() => { fetchPortfolio(); }, []);

    const fetchPortfolio = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/portfolio/all/list`);
            setItems(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const resetForm = () => { setForm({ title: '', category: '', image: '', description: '', videoUrl: '', published: true }); setEditing(null); setErrors({}); };

    const validateForm = () => {
        const e = {};
        if (!form.title.trim()) e.title = 'Title is required';
        if (!form.category.trim()) e.category = 'Category is required';
        if (!form.videoUrl.trim()) e.videoUrl = 'Video URL is required';
        setErrors(e);
        return Object.keys(e).length === 0;
    };

    const handleSubmit = async (ev) => {
        ev.preventDefault();
        if (!validateForm()) return;
        try {
            setUploading(true);
            const payload = { title: form.title, category: form.category, image: form.image, description: form.description, videoUrl: form.videoUrl, published: form.published };
            editing ? await axios.put(`${API_URL}/api/portfolio/${editing._id}`, payload) : await axios.post(`${API_URL}/api/portfolio`, payload);
            fetchPortfolio(); resetForm();
        } catch (err) { alert('Failed: ' + err.response?.data?.message); }
        finally { setUploading(false); }
    };

    const handleEdit = (item) => {
        setEditing(item);
        setForm({ title: item.title, category: item.category, image: item.image || '', description: item.description || '', videoUrl: item.videoUrl || '', published: item.published });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this project?')) return;
        try { await axios.delete(`${API_URL}/api/portfolio/${id}`); fetchPortfolio(); }
        catch { alert('Failed to delete'); }
    };

    return (
        <div className="space-y-10 animate-in fade-in duration-700">
            {/* Form */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.45)]">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.18),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.16),transparent_28%)]" />
                <div className="relative flex items-center justify-between mb-10 pb-6 border-b border-slate-300/80">
                    <div className="flex items-center gap-3">
                        <Video size={20} className="text-cyan-700" />
                        <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">{editing ? 'Edit Project' : 'New Project'}</h2>
                    </div>
                    {editing && <button onClick={resetForm} className="rounded-xl border border-slate-300 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:border-cyan-400 hover:text-slate-950 transition-all">Cancel</button>}
                </div>
                <form onSubmit={handleSubmit} className="relative space-y-8">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Project Title *</label>
                            <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputCls(errors.title)} placeholder="Project name" />
                            {errors.title && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.title}</p>}
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Category *</label>
                            <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full appearance-none rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all">
                                <option value="">Select a category</option>
                                {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                            {errors.category && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.category}</p>}
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Description</label>
                        <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full resize-none rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all" placeholder="Brief overview..." rows="3" />
                    </div>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Thumbnail URL</label>
                            <input type="text" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} className={inputCls(false)} placeholder="https://..." />
                        </div>
                        <div className="space-y-2">
                            <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Video URL *</label>
                            <input type="text" value={form.videoUrl} onChange={e => setForm({ ...form, videoUrl: e.target.value })} className={inputCls(errors.videoUrl)} placeholder="https://..." />
                            {errors.videoUrl && <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.videoUrl}</p>}
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-4">
                        <div className="flex items-center gap-3">
                            <input type="checkbox" id="pub" checked={form.published} onChange={e => setForm({ ...form, published: e.target.checked })} className="h-5 w-5 rounded border-slate-400 bg-white text-cyan-600 focus:ring-cyan-500/20" />
                            <label htmlFor="pub" className="cursor-pointer select-none text-[10px] font-black uppercase tracking-[0.3em] text-slate-700">Publish to Gallery</label>
                        </div>
                        <button type="submit" disabled={uploading} className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white shadow-[0_18px_45px_-22px_rgba(15,23,42,0.8)] hover:bg-cyan-600 disabled:opacity-50 transition-all">
                            {uploading ? <Loader2 className="animate-spin" size={18} /> : (editing ? <CheckCircle2 size={18} /> : <Plus size={18} />)}
                            {uploading ? 'Saving...' : editing ? 'Save Changes' : 'Add Project'}
                        </button>
                    </div>
                </form>
            </div>

            {/* List */}
            <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_30px_80px_-45px_rgba(15,23,42,0.35)]">
                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter mb-10">Projects <span className="text-cyan-600">({items.length})</span></h3>
                {loading ? (
                    <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-200 bg-slate-50 border-dashed">
                        <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading...</p>
                    </div>
                ) : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-200 bg-slate-50 border-dashed">
                        <AlertCircle className="w-10 h-10 text-slate-400 mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No Projects Yet</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {items.map(item => (
                            <div key={item._id} className="flex flex-col md:flex-row md:items-center gap-6 rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-cyan-50/70 p-6 shadow-sm hover:border-cyan-400/60 hover:shadow-[0_16px_40px_-20px_rgba(6,182,212,0.4)] transition-all duration-400 group">
                                <div className="relative w-full md:w-40 aspect-video rounded-2xl overflow-hidden flex-shrink-0 bg-slate-200">
                                    {item.image ? <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" /> : <div className="w-full h-full flex items-center justify-center text-slate-400"><Video size={24} /></div>}
                                    {!item.published && <div className="absolute inset-0 flex items-center justify-center bg-slate-950/55"><span className="text-[8px] font-black uppercase tracking-[0.4em] text-white">Offline</span></div>}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                                        <h3 className="font-black text-slate-900 uppercase tracking-tight truncate">{item.title}</h3>
                                        <span className="rounded-full border border-cyan-200 bg-cyan-100 px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-800">{item.category}</span>
                                    </div>
                                    <p className="text-sm text-slate-500 line-clamp-1 mb-3">{item.description || 'No description.'}</p>
                                    <a href={item.videoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-cyan-700 hover:text-cyan-900 transition-colors">
                                        <ExternalLink size={12} /> View Video
                                    </a>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={() => handleEdit(item)} className="rounded-2xl border border-slate-300 bg-white p-3 text-slate-700 hover:border-cyan-400 hover:bg-cyan-500 hover:text-white transition-all duration-300"><Edit2 size={16} /></button>
                                    <button onClick={() => handleDelete(item._id)} className="rounded-2xl border border-red-200 bg-red-50 p-3 text-red-500 hover:border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"><Trash2 size={16} /></button>
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

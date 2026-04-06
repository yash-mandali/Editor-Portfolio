import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Mail, Clock, MessageSquare, AlertCircle, Loader2, User } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const AdminContacts = () => {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => { fetchContacts(); }, []);

    const fetchContacts = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`${API_URL}/api/contacts`);
            setContacts(res.data.data || []);
        } catch (err) { console.error(err); }
        finally { setLoading(false); }
    };

    const deleteContact = async (id) => {
        if (!confirm('Delete this inquiry?')) return;
        try { await axios.delete(`${API_URL}/api/contacts/${id}`); fetchContacts(); }
        catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.35)]">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_35%)]" />
                <div className="relative flex items-center gap-3 mb-3">
                    <Mail size={20} className="text-cyan-700" />
                    <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Client <span className="text-cyan-600">Inquiries</span></h2>
                </div>
                <p className="relative text-slate-500 font-medium">All contact form submissions from your website.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-200 bg-white border-dashed">
                    <Loader2 className="w-10 h-10 text-cyan-600 animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Loading...</p>
                </div>
            ) : contacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 rounded-3xl border border-slate-200 bg-white border-dashed">
                    <AlertCircle className="w-10 h-10 text-slate-400 mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">No Inquiries Yet</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {contacts.map(c => (
                        <div key={c._id} className="rounded-3xl border border-slate-200 bg-gradient-to-r from-white to-cyan-50/60 p-8 shadow-sm hover:border-cyan-400/50 hover:shadow-[0_16px_40px_-20px_rgba(6,182,212,0.35)] transition-all duration-400 group">

                            {/* Top row */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 mb-6 pb-6 border-b border-slate-200">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 border border-cyan-200 flex items-center justify-center text-cyan-700 font-black text-lg">
                                        {c.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <h3 className="text-base font-black text-slate-900 uppercase tracking-tight">{c.name}</h3>
                                        <a href={`mailto:${c.email}`} className="text-xs text-cyan-600 hover:text-cyan-800 transition-colors font-medium">{c.email}</a>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-2">
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest flex items-center gap-1.5">
                                        <Clock size={11} /> {new Date(c.createdAt).toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' })}
                                    </p>
                                    <button onClick={() => deleteContact(c._id)}
                                        className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-red-400 hover:text-red-600 transition-colors">
                                        <Trash2 size={11} /> Delete
                                    </button>
                                </div>
                            </div>

                            {/* Message */}
                            <div className="flex items-start gap-3 mb-5">
                                <MessageSquare size={15} className="text-cyan-600 mt-1 flex-shrink-0" />
                                <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 border border-slate-200 rounded-2xl px-5 py-4 w-full italic">
                                    "{c.message}"
                                </p>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {c.projectType && (
                                    <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-cyan-600 mb-1">Project Type</p>
                                        <p className="text-xs font-black text-slate-900 uppercase">{c.projectType}</p>
                                    </div>
                                )}
                                {c.budget && (
                                    <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-green-600 mb-1">Budget</p>
                                        <p className="text-xs font-black text-slate-900">{c.budget}</p>
                                    </div>
                                )}
                                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Received</p>
                                    <p className="text-xs font-black text-slate-700">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdminContacts;

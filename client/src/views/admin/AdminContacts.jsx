import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2, Mail, Clock, MessageSquare, Shield, AlertCircle, Loader2 } from 'lucide-react';

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
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const updateStatus = async (id, status) => {
        try { await axios.patch(`${API_URL}/api/contacts/${id}`, { status }); fetchContacts(); } catch (err) { console.error(err); }
    };

    const deleteContact = async (id) => {
        if (!confirm('Permanently delete this transmission?')) return;
        try { await axios.delete(`${API_URL}/api/contacts/${id}`); fetchContacts(); } catch (err) { console.error(err); }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                    <Mail size={20} className="text-amber-400" />
                    <h2 className="text-2xl font-black text-white uppercase tracking-tighter">Inbound <span className="text-[#2e2e42]">Transmissions</span></h2>
                </div>
                <p className="text-neutral-500 font-medium tracking-wide">Interface for managing strategic inquiries and partnership protocols.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-[#0d0d14] rounded-lg border border-white/5 border-dashed">
                    <Loader2 className="w-10 h-10 text-amber-400 animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Decoding Communications...</p>
                </div>
            ) : contacts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 bg-[#0d0d14] rounded-lg border border-white/5 border-dashed">
                    <AlertCircle className="w-10 h-10 text-neutral-700 mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">No Signal Detected</p>
                </div>
            ) : (
                <div className="grid gap-6">
                    {contacts.map(c => {
                        const statusColors = {
                            new: 'text-amber-400 border-amber-400/20 bg-amber-400/5',
                            contacted: 'text-blue-400 border-blue-400/20 bg-blue-400/5',
                            'in-progress': 'text-purple-400 border-purple-400/20 bg-purple-400/5',
                            completed: 'text-green-400 border-green-400/20 bg-green-400/5',
                            rejected: 'text-red-400 border-red-400/20 bg-red-400/5'
                        };

                        return (
                            <div key={c._id} className="bg-[#0d0d14] p-8 rounded-lg border border-white/5 hover:border-amber-400/20 transition-all duration-500 group">
                                <div className="flex flex-col md:flex-row justify-between gap-6 mb-8 pb-6 border-b border-white/5">
                                    <div className="flex items-start gap-4">
                                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-amber-400 font-black text-xl border border-white/10 group-hover:border-amber-400/30 transition-all">
                                            {c.name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-black text-white uppercase tracking-tight">{c.name}</h3>
                                            <p className="text-xs text-neutral-500 font-medium flex items-center gap-2 mt-1">
                                                <Shield size={12} className="text-amber-400/50" /> {c.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-3 text-right">
                                        <p className="text-[10px] text-neutral-600 font-black uppercase tracking-widest flex items-center gap-2">
                                            <Clock size={12} /> {new Date(c.createdAt).toLocaleString()}
                                        </p>
                                        <button
                                            onClick={() => deleteContact(c._id)}
                                            className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-red-500/60 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={12} /> Erase Signal
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <MessageSquare size={16} className="text-amber-400 mt-1 flex-shrink-0" />
                                        <p className="text-neutral-400 text-sm leading-relaxed font-medium bg-white/5 p-4 rounded border border-white/5 w-full italic">
                                            "{c.message}"
                                        </p>
                                    </div>

                                    {/* Project details */}
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {c.projectType && (
                                            <div className="bg-white/[0.03] border border-white/5 rounded p-3">
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1">Project Type</p>
                                                <p className="text-xs font-black text-amber-400 uppercase tracking-wide">{c.projectType}</p>
                                            </div>
                                        )}
                                        {c.budget && (
                                            <div className="bg-white/[0.03] border border-white/5 rounded p-3">
                                                <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1">Budget</p>
                                                <p className="text-xs font-black text-green-400 uppercase tracking-wide">${c.budget}</p>
                                            </div>
                                        )}
                                        <div className="bg-white/[0.03] border border-white/5 rounded p-3">
                                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-neutral-600 mb-1">Received</p>
                                            <p className="text-xs font-black text-neutral-400">{new Date(c.createdAt).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</p>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 pt-4">
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500">Current Protocol:</span>
                                        <div className="relative">
                                            <select
                                                value={c.status}
                                                onChange={(e) => updateStatus(c._id, e.target.value)}
                                                className={`pl-4 pr-10 py-2 text-[10px] font-black uppercase tracking-[0.2em] rounded border appearance-none transition-all cursor-pointer focus:outline-none ${statusColors[c.status] || statusColors.new}`}
                                            >
                                                <option value="new">PROTOCOL: NEW_S</option>
                                                <option value="contacted">PROTOCOL: CONTACTED</option>
                                                <option value="in-progress">PROTOCOL: ACTIVE_OPS</option>
                                                <option value="completed">PROTOCOL: FINALIZED</option>
                                                <option value="rejected">PROTOCOL: TERMINATED</option>
                                            </select>
                                            <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                                <Clock size={10} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default AdminContacts;

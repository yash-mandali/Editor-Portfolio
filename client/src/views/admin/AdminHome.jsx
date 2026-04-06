import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Grid3x3, Activity, ArrowUpRight, Film, Play, Video, LayoutDashboard } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const AdminHome = () => {
    const [stats, setStats] = useState({ portfolio: 0, contacts: 0, videos: 0 });
    const [recentContacts, setRecentContacts] = useState([]);
    const [recentVideos, setRecentVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [pRes, cRes, vRes] = await Promise.all([
                    axios.get(`${API_URL}/api/portfolio/all/list`),
                    axios.get(`${API_URL}/api/contacts`),
                    axios.get(`${API_URL}/api/videos`),
                ]);
                setStats({ portfolio: pRes.data.count || 0, contacts: cRes.data.count || 0, videos: vRes.data.count || 0 });
                setRecentContacts((cRes.data.data || []).slice(0, 3));
                setRecentVideos((vRes.data.data || []).slice(0, 6));
            } catch (err) {
                console.error('Fetch stats error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const statCards = [
        { icon: Grid3x3, label: 'Portfolio Assets', value: stats.portfolio, accent: 'border-amber-300 bg-amber-50 text-amber-700' },
        { icon: Film, label: 'Video Assets', value: stats.videos, accent: 'border-cyan-300 bg-cyan-50 text-cyan-700' },
        { icon: Mail, label: 'Inbound Inquiries', value: stats.contacts, accent: 'border-purple-300 bg-purple-50 text-purple-700' },
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">

            {/* Header */}
            <div className="relative overflow-hidden rounded-3xl border border-cyan-300/35 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.35)]">
                <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_35%)]" />
                <div className="absolute top-6 right-8 opacity-5">
                    <LayoutDashboard size={100} className="text-slate-900" />
                </div>
                <div className="relative">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 border border-cyan-300 rounded-full mb-6">
                        <Activity size={12} className="text-cyan-700" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-700">System Online</span>
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter">Dashboard <span className="text-cyan-600">Overview</span></h2>
                    <p className="text-slate-500 font-medium">Real-time analytics and interaction metrics.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 rounded-3xl border border-slate-200 bg-white border-dashed">
                    <div className="w-10 h-10 border-2 border-cyan-300 border-t-cyan-600 rounded-full animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Retrieving Data...</p>
                </div>
            ) : (
                <>
                    {/* Stat cards */}
                    <div className="grid sm:grid-cols-3 gap-6">
                        {statCards.map((card, idx) => (
                            <div key={idx} className={`rounded-3xl border ${card.accent} p-8 shadow-sm hover:shadow-md transition-all duration-300 group`}>
                                <div className="flex items-center gap-3 mb-4">
                                    <card.icon size={20} />
                                    <p className="text-[10px] font-black uppercase tracking-[0.3em]">{card.label}</p>
                                </div>
                                <p className="text-5xl font-black text-slate-900 tracking-tighter">{card.value}</p>
                            </div>
                        ))}
                    </div>

                    {/* Recent contacts */}
                    {recentContacts.length > 0 && (
                        <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)]">
                            <div className="flex items-center gap-3 mb-8">
                                <Mail size={18} className="text-purple-500" />
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Recent <span className="text-purple-500">Inquiries</span></h3>
                            </div>
                            <div className="space-y-3">
                                {recentContacts.map(c => (
                                    <div key={c._id} className="flex items-center justify-between p-5 rounded-2xl border border-slate-200 bg-slate-50 hover:border-purple-300 hover:bg-purple-50/40 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-100 border border-purple-200 flex items-center justify-center text-purple-600 font-black text-sm">
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-slate-900">{c.name}</p>
                                                <p className="text-[11px] text-slate-500">{c.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded-full border ${c.status === 'new' ? 'text-amber-700 border-amber-300 bg-amber-50' :
                                                    c.status === 'completed' ? 'text-green-700 border-green-300 bg-green-50' :
                                                        'text-blue-700 border-blue-300 bg-blue-50'
                                                }`}>{c.status}</span>
                                            <p className="text-[10px] text-slate-400 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick guide */}
                    <div className="rounded-3xl border border-slate-200 bg-white p-10 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.15)]">
                        <h3 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-8">Quick <span className="text-cyan-600">Guide</span></h3>
                        <div className="grid md:grid-cols-3 gap-5">
                            {[
                                { num: '01', color: 'text-amber-600 bg-amber-50 border-amber-200', title: 'Portfolio', desc: 'Add and manage portfolio projects.' },
                                { num: '02', color: 'text-cyan-600 bg-cyan-50 border-cyan-200', title: 'Videos', desc: 'Upload and manage video assets.' },
                                { num: '03', color: 'text-purple-600 bg-purple-50 border-purple-200', title: 'Contacts', desc: 'Review client inquiries.' },
                            ].map(d => (
                                <div key={d.num} className={`group p-6 rounded-2xl border ${d.color} hover:shadow-sm transition-all cursor-pointer`}>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-xs font-black uppercase tracking-[0.3em]">Section {d.num}</span>
                                        <ArrowUpRight size={14} className="opacity-40 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                    <h4 className="font-black uppercase tracking-tight mb-1 text-slate-900">{d.title}</h4>
                                    <p className="text-xs text-slate-500 leading-relaxed">{d.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default AdminHome;

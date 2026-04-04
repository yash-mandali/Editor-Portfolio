import { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Grid3x3, LayoutDashboard, Terminal, Activity, ArrowUpRight, Film, Play, Video } from 'lucide-react';

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
                    axios.get(`${API_URL}/api/videos`)
                ]);
                setStats({
                    portfolio: pRes.data.count || 0,
                    contacts: cRes.data.count || 0,
                    videos: vRes.data.count || 0
                });
                // Latest 3 contacts
                setRecentContacts((cRes.data.data || []).slice(0, 3));
                // Latest 6 videos
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
        { icon: Grid3x3, label: 'Portfolio Assets', value: stats.portfolio, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
        { icon: Film, label: 'Video Assets', value: stats.videos, color: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20' },
        { icon: Mail, label: 'Inbound Inquiries', value: stats.contacts, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header */}
            <div className="relative p-10 bg-[#0d0d14] rounded-lg border border-white/5 overflow-hidden group">
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                    <LayoutDashboard size={120} />
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/10 border border-amber-400/20 rounded-full mb-6">
                    <Activity size={12} className="text-amber-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-400">System.Status: ONLINE</span>
                </div>
                <h2 className="text-4xl font-black text-white mb-2 uppercase tracking-tighter">Dashboard <span className="text-[#2e2e42]">Overview</span></h2>
                <p className="text-neutral-500 font-medium tracking-wide">Real-time repository analytics and interaction metrics.</p>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 bg-[#0d0d14] rounded-lg border border-white/5 border-dashed">
                    <div className="w-10 h-10 border-2 border-amber-500/20 border-t-amber-500 rounded-full animate-spin mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">Retrieving Data...</p>
                </div>
            ) : (
                <>
                    {/* Stat cards */}
                    <div className="grid sm:grid-cols-3 gap-6">
                        {statCards.map((card, idx) => (
                            <div key={idx} className="bg-[#0d0d14] p-8 rounded-lg border border-white/5 hover:border-amber-400/30 transition-all duration-500 group">
                                <div className={`w-14 h-14 rounded-lg ${card.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <card.icon size={24} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-2">{card.label}</p>
                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-black text-white tracking-tighter">{card.value}</p>
                                    <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Videos overview */}
                    <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5">
                        <div className="flex items-center justify-between mb-8">
                            <div className="flex items-center gap-3">
                                <Film size={18} className="text-cyan-400" />
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                                    Video <span className="text-[#2e2e42]">Archive</span>
                                </h3>
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-neutral-600">{stats.videos} total</span>
                        </div>

                        {recentVideos.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-16 bg-white/[0.02] rounded border border-white/5 border-dashed">
                                <Video size={32} className="text-neutral-700 mb-3" />
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-600">No Videos Found</p>
                            </div>
                        ) : (
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                {recentVideos.map(v => (
                                    <div key={v._id} className="group relative bg-[#0a0a0f] border border-white/5 rounded-lg overflow-hidden hover:border-cyan-400/30 transition-all duration-400">
                                        {/* Thumbnail */}
                                        <div className="relative aspect-video bg-neutral-900 overflow-hidden">
                                            {v.image ? (
                                                <img
                                                    loading="lazy"
                                                    src={v.image}
                                                    alt={v.title}
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center w-full h-full text-neutral-700">
                                                    <Video size={32} />
                                                </div>
                                            )}
                                            {/* Play overlay */}
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="w-12 h-12 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center">
                                                    <Play size={16} className="text-cyan-400" fill="currentColor" />
                                                </div>
                                            </div>
                                            {/* Category badge */}
                                            <div className="absolute top-3 left-3">
                                                <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-cyan-400 text-[8px] font-black uppercase tracking-[0.2em] rounded border border-cyan-400/20">
                                                    {v.category}
                                                </span>
                                            </div>
                                        </div>
                                        {/* Info */}
                                        <div className="p-4">
                                            <h4 className="text-sm font-black text-white uppercase tracking-tight truncate mb-1">{v.title}</h4>
                                            <p className="text-[11px] text-neutral-500 line-clamp-2 leading-relaxed">{v.description || '—'}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recent contacts */}
                    {recentContacts.length > 0 && (
                        <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5">
                            <div className="flex items-center gap-3 mb-8">
                                <Mail size={18} className="text-purple-400" />
                                <h3 className="text-xl font-black text-white uppercase tracking-tighter">
                                    Recent <span className="text-[#2e2e42]">Inquiries</span>
                                </h3>
                            </div>
                            <div className="space-y-4">
                                {recentContacts.map(c => (
                                    <div key={c._id} className="flex items-center justify-between p-5 bg-white/[0.02] border border-white/5 rounded-lg hover:border-purple-400/20 transition-all">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-purple-400/10 border border-purple-400/20 flex items-center justify-center text-purple-400 font-black text-sm">
                                                {c.name.charAt(0).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-white">{c.name}</p>
                                                <p className="text-[11px] text-neutral-500">{c.email}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className={`inline-block px-2 py-1 text-[9px] font-black uppercase tracking-widest rounded border ${c.status === 'new' ? 'text-amber-400 border-amber-400/20 bg-amber-400/5' :
                                                    c.status === 'completed' ? 'text-green-400 border-green-400/20 bg-green-400/5' :
                                                        'text-blue-400 border-blue-400/20 bg-blue-400/5'
                                                }`}>{c.status}</span>
                                            <p className="text-[10px] text-neutral-600 mt-1">{new Date(c.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Quick guide */}
                    <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5">
                        <div className="flex items-center gap-3 mb-8">
                            <Terminal size={18} className="text-amber-400" />
                            <h3 className="text-lg font-black text-white uppercase tracking-tighter">Operational <span className="text-[#2e2e42]">Directives</span></h3>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {[
                                { num: '01', color: 'text-amber-400', title: 'Portfolio Management', desc: 'Update visual archives and project metadata for the gallery.' },
                                { num: '02', color: 'text-cyan-400', title: 'Video Management', desc: 'Upload and manage video assets for the showreel section.' },
                                { num: '03', color: 'text-purple-400', title: 'Inbound Comms', desc: 'Review and process strategic partnership requests.' },
                            ].map(d => (
                                <div key={d.num} className="group cursor-pointer p-6 bg-white/5 border border-white/5 hover:border-amber-400/20 transition-all">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className={`text-xs font-black uppercase tracking-[0.3em] ${d.color}`}>Section {d.num}</span>
                                        <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
                                    </div>
                                    <h4 className="text-white font-black uppercase tracking-tight mb-2">{d.title}</h4>
                                    <p className="text-xs text-neutral-500 leading-relaxed font-medium">{d.desc}</p>
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

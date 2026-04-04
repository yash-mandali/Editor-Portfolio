import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Grid3x3, LayoutDashboard, Terminal, Activity, ArrowUpRight } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'https://editor-portfolio-back.vercel.app';

const AdminHome = () => {
    const [stats, setStats] = useState({
        portfolio: 0,
        contacts: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    axios.get(`${API_URL}/api/portfolio/all/list`),
                    axios.get(`${API_URL}/api/contacts`)
                ]);

                setStats({
                    portfolio: pRes.data.count || 0,
                    contacts: cRes.data.count || 0
                });
            } catch (err) {
                console.error('Fetch stats error:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { icon: Grid3x3, label: 'Portfolio Assets', value: stats.portfolio, color: 'text-amber-400 bg-amber-400/10 border-amber-400/20' },
        { icon: Mail, label: 'Inbound Inquiries', value: stats.contacts, color: 'text-purple-400 bg-purple-400/10 border-purple-400/20' }
    ];

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* Header Section */}
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
                <div className="grid sm:grid-cols-2 gap-6">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="bg-[#0d0d14] p-8 rounded-lg border border-white/5 hover:border-amber-400/30 transition-all duration-500 group">
                                <div className={`w-14 h-14 rounded-lg ${card.color} border flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                                    <Icon size={24} />
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-neutral-500 mb-2">{card.label}</p>
                                <div className="flex items-baseline gap-4">
                                    <p className="text-5xl font-black text-white tracking-tighter">{card.value}</p>
                                    <span className="text-amber-400 text-xs font-black uppercase tracking-widest">Active</span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Quick Guide */}
            <div className="bg-[#0d0d14] p-10 rounded-lg border border-white/5 relative overflow-hidden">
                <div className="flex items-center gap-3 mb-8">
                    <Terminal size={18} className="text-amber-400" />
                    <h3 className="text-lg font-black text-white uppercase tracking-tighter">Operational <span className="text-[#2e2e42]">Directives</span></h3>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="group cursor-pointer p-6 bg-white/5 border border-white/5 hover:border-amber-400/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-amber-400">Section 01</span>
                            <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-amber-400 transition-colors" />
                        </div>
                        <h4 className="text-white font-black uppercase tracking-tight mb-2">Portfolio Management</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">Update visual archives and project metadata for the gallery.</p>
                    </div>
                    <div className="group cursor-pointer p-6 bg-white/5 border border-white/5 hover:border-amber-400/20 transition-all">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-xs font-black uppercase tracking-[0.3em] text-purple-400">Section 02</span>
                            <ArrowUpRight size={14} className="text-neutral-600 group-hover:text-purple-400 transition-colors" />
                        </div>
                        <h4 className="text-white font-black uppercase tracking-tight mb-2">Inbound Comms</h4>
                        <p className="text-xs text-neutral-500 leading-relaxed font-medium">Review and process strategic partnership requests.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;

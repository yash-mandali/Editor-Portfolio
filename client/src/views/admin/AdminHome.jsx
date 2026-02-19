import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Mail, Grid3x3 } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

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
        { icon: Grid3x3, label: 'Portfolio Items', value: stats.portfolio, color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400' },
        { icon: Mail, label: 'Contacts', value: stats.contacts, color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' }
    ];

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Dashboard Overview</h2>
                <p className="text-neutral-600 dark:text-neutral-400">Quick statistics across all sections</p>
            </div>

            {loading ? (
                <div className="text-center py-12 text-neutral-600 dark:text-neutral-400">
                    Loading stats...
                </div>
            ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {statCards.map((card, idx) => {
                        const Icon = card.icon;
                        return (
                            <div key={idx} className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md hover:shadow-lg transition">
                                <div className={`w-12 h-12 rounded-lg ${card.color} flex items-center justify-center mb-4`}>
                                    <Icon size={24} />
                                </div>
                                <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">{card.label}</p>
                                <p className="text-3xl font-bold text-neutral-900 dark:text-white">{card.value}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            <div className="bg-white dark:bg-neutral-900 p-6 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-4">Quick Guide</h3>
                <ul className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400">
                    <li className="flex gap-3">
                        <span className="text-amber-500">→</span>
                        <span><strong>Portfolio:</strong> Manage portfolio items with video uploads</span>
                    </li>
                    <li className="flex gap-3">
                        <span className="text-amber-500">→</span>
                        <span><strong>Contacts:</strong> Manage contact form submissions from users</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default AdminHome;

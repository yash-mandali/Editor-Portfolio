import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Video, Grid, Mail, Film, LogOut, Terminal } from 'lucide-react';

const links = [
    { to: '', label: 'Overview', icon: Grid },
    { to: 'portfolio', label: 'Portfolio', icon: Video },
    { to: 'videos', label: 'Videos', icon: Film },
    { to: 'contacts', label: 'Contacts', icon: Mail }
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login', { replace: true });
    };
    return (
        <div className="min-h-screen bg-[#0a0a0f] text-white selection:bg-cyan-400/30">
            {/* Background Accent */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="container mx-auto px-6 py-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="bg-[#0d0d14] p-8 rounded-lg border border-white/5 sticky top-12">
                            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-white/5">
                                <Terminal size={18} className="text-cyan-400" />
                                <h2 className="text-lg font-black tracking-tighter uppercase">Console</h2>
                            </div>
                            
                            <nav className="flex flex-col gap-2">
                                {links.map(l => {
                                    const Icon = l.icon;
                                    return (
                                        <NavLink
                                            key={l.to}
                                            to={l.to}
                                            end={l.to === ''}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-4 py-3 rounded-lg font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${
                                                    isActive 
                                                    ? 'bg-cyan-400 text-black shadow-[0_0_20px_rgba(0,212,255,0.2)]' 
                                                    : 'text-neutral-500 hover:text-white hover:bg-white/5'
                                                }`
                                            }
                                        >
                                            <Icon size={14} />
                                            <span>{l.label}</span>
                                        </NavLink>
                                    );
                                })}
                            </nav>

                            <div className="mt-12 pt-6 border-t border-white/5">
                                <button 
                                    onClick={handleLogout} 
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] rounded-lg bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <LogOut size={14} />
                                    Terminate
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Video, Grid, Mail, Film, LogOut, Layers } from 'lucide-react';

const links = [
    { to: '', label: 'Overview', icon: Grid },
    { to: 'portfolio', label: 'Portfolio', icon: Video },
    { to: 'videos', label: 'Videos', icon: Film },
    { to: 'contacts', label: 'Contacts', icon: Mail },
];

const AdminLayout = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/admin/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-slate-100 text-slate-900 selection:bg-cyan-200">
            {/* Subtle background */}
            <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.08),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.06),transparent_50%)]" />

            <div className="container mx-auto px-6 pt-32 pb-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-10">

                    {/* Sidebar */}
                    <aside className="w-full lg:w-64 flex-shrink-0">
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-[0_20px_60px_-30px_rgba(15,23,42,0.2)] sticky top-32">
                            <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-200">
                                <Layers size={18} className="text-cyan-600" />
                                <h2 className="text-lg font-black tracking-tighter uppercase text-slate-900">Console</h2>
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
                                                `flex items-center gap-3 px-4 py-3 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 ${isActive
                                                    ? 'bg-slate-950 text-white shadow-[0_8px_20px_-8px_rgba(15,23,42,0.5)]'
                                                    : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                                                }`
                                            }
                                        >
                                            <Icon size={14} />
                                            <span>{l.label}</span>
                                        </NavLink>
                                    );
                                })}
                            </nav>

                            <div className="mt-12 pt-6 border-t border-slate-200">
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center justify-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl bg-red-50 text-red-500 border border-red-200 hover:bg-red-500 hover:text-white transition-all duration-300"
                                >
                                    <LogOut size={14} />
                                    Log Out
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

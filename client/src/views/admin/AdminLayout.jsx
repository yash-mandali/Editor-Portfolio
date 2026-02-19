import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Video, Grid, Mail, Film } from 'lucide-react';

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
        <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
            <div className="container mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-6 gap-6">
                    <aside className="lg:col-span-1 bg-white dark:bg-neutral-900 p-4 rounded-lg border border-neutral-200 dark:border-neutral-800">
                        <h2 className="text-lg font-semibold mb-4">Admin</h2>
                        <nav className="flex flex-col gap-2">
                            {links.map(l => {
                                const Icon = l.icon;
                                return (
                                    <NavLink
                                        key={l.to}
                                        to={l.to}
                                        end={l.to === ''}
                                        className={({ isActive }) =>
                                            `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${isActive ? 'bg-amber-500 text-white' : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800'}`
                                        }
                                    >
                                        <Icon size={16} />
                                        <span className="text-sm">{l.label}</span>
                                    </NavLink>
                                );
                            })}
                        </nav>
                        <div className="mt-4">
                            <button onClick={handleLogout} className="w-full px-3 py-2 text-sm rounded-lg bg-red-500 hover:bg-red-600 text-white">Logout</button>
                        </div>
                    </aside>

                    <main className="lg:col-span-5">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
};

export default AdminLayout;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, ArrowRight, AlertCircle } from 'lucide-react';

const ADMIN_EMAIL = 'admin123@gmail.com';
const ADMIN_PASSWORD = '123';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError(null);
        if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
            localStorage.setItem('isAdmin', 'true');
            navigate('/admin', { replace: true });
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100 overflow-hidden relative">
            <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(34,211,238,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(59,130,246,0.08),transparent_50%)]" />

            <div className="w-full max-w-md relative z-10">
                {/* Card */}
                <div className="rounded-3xl border border-cyan-300/40 bg-gradient-to-br from-slate-100 via-white to-cyan-50 p-10 shadow-[0_30px_80px_-40px_rgba(6,182,212,0.4)]">
                    <div className="absolute inset-0 rounded-3xl pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(34,211,238,0.15),transparent_40%)]" />

                    <div className="relative">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 border border-cyan-300 rounded-full mb-8">
                            <Shield size={12} className="text-cyan-700" />
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-700">Secure Access</span>
                        </div>

                        <h2 className="text-4xl font-black mb-2 text-slate-900 tracking-tighter uppercase">Admin</h2>
                        <p className="text-slate-500 text-sm mb-10">Sign in to manage your portfolio.</p>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Email</label>
                                <input
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    type="email"
                                    placeholder="admin@example.com"
                                    className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-slate-600">Password</label>
                                <input
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-2xl border border-slate-300 bg-white/95 px-4 py-4 text-slate-900 placeholder:text-slate-400 shadow-sm focus:border-cyan-500 focus:outline-none focus:ring-4 focus:ring-cyan-200/70 transition-all"
                                />
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-2xl text-red-600">
                                    <AlertCircle size={14} />
                                    <p className="text-[11px] font-bold">{error}</p>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-3 rounded-2xl bg-slate-950 px-10 py-5 text-xs font-black uppercase tracking-[0.3em] text-white transition-all shadow-[0_18px_45px_-22px_rgba(15,23,42,0.8)] hover:bg-cyan-600"
                            >
                                Sign In <ArrowRight size={16} />
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;

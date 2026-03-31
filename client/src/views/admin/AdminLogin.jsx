import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Terminal, Shield, ArrowRight } from 'lucide-react';

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
            setError('Invalid credentials');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0a0a0f] overflow-hidden relative">
            {/* Background decorative elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-blue-600/5 blur-[100px] rounded-full" />
            </div>

            <div className="w-full max-w-md bg-[#0d0d14] p-10 rounded-lg border border-white/5 shadow-2xl relative z-10 transition-colors">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-8">
                    <Shield size={12} className="text-cyan-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400">Secure.Access</span>
                </div>

                <h2 className="text-4xl font-black mb-8 text-white tracking-tighter uppercase">Admin <span className="text-[#2e2e42]">Portal</span></h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-2">Access Email</label>
                        <input 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            required 
                            type="email" 
                            placeholder="ADMIN_ID"
                            className="w-full px-4 py-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-colors" 
                        />
                    </div>
                    <div>
                        <label className="block text-[10px] font-black uppercase tracking-[0.3em] text-neutral-500 mb-2">Security Key</label>
                        <input 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            type="password" 
                            placeholder="AUTH_TOKEN"
                            className="w-full px-4 py-4 rounded-lg bg-white/5 border border-white/10 text-white placeholder:text-neutral-700 focus:outline-none focus:border-cyan-400/50 transition-colors" 
                        />
                    </div>
                    {error && (
                        <div className="flex items-center gap-2 text-red-500 animate-pulse">
                            <Terminal size={14} />
                            <p className="text-[10px] font-black uppercase tracking-[0.1em]">{error}</p>
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="w-full flex items-center justify-center gap-3 px-10 py-5 bg-cyan-400 hover:bg-white text-black font-black uppercase tracking-[0.3em] text-xs transition-all shadow-[0_0_30px_rgba(0,212,255,0.2)]"
                    >
                        Initialize Bypass <ArrowRight size={16} />
                    </button>
                    
                    <p className="text-[10px] text-neutral-600 font-bold uppercase tracking-[0.2em] text-center mt-6">
                        Confidential Access • System Logs Active
                    </p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

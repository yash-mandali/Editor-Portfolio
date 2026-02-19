import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-950">
            <div className="w-full max-w-md bg-white dark:bg-neutral-900 p-8 rounded-lg border border-neutral-200 dark:border-neutral-800 shadow-md">
                <h2 className="text-xl font-bold mb-4 text-neutral-900 dark:text-white">Admin Login</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} required type="email" className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white" />
                    </div>
                    <div>
                        <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-1">Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} required type="password" className="w-full px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-white" />
                    </div>
                    {error && <p className="text-xs text-red-500">{error}</p>}
                    <div className="flex items-center justify-between">
                        <button type="submit" className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-black rounded-lg font-semibold">Sign In</button>
                        <button type="button" onClick={() => { setEmail(''); setPassword(''); setError(null); }} className="text-sm text-neutral-500">Reset</button>
                    </div>
                    <p className="text-xs text-neutral-500 mt-2">Use admin email and password to access admin panel.</p>
                </form>
            </div>
        </div>
    );
};

export default AdminLogin;

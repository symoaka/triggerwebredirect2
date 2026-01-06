'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthProvider';

export default function RegisterPage() {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                // Auto login is not automatic since register just returns user, but front-end route handler set the cookie logic in API.
                // Wait... I implemented register API to set cookie? Let me check.
                // Yes I did: (await cookies()).set('token'...) in register route.
                // So just calling login() context fn (which checks /me) is enough.
                login();
            } else {
                setError(data.error || 'Registration failed');
            }
        } catch {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-md">
                <h1 className="text-2xl font-bold text-white mb-6 text-center">Kayıt Ol</h1>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">Kullanıcı Adı</label>
                        <input
                            type="text"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>
                    <div>
                        <label className="text-zinc-400 text-sm mb-1 block">Şifre</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {loading ? 'Kaydediliyor...' : 'Kayıt Ol'}
                    </button>
                </form>

                <p className="text-zinc-500 text-sm text-center mt-6">
                    Zaten hesabın var mı? <Link href="/login" className="text-blue-400 hover:underline">Giriş Yap</Link>
                </p>
            </div>
        </div>
    );
}

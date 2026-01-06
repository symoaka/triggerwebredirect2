'use client';

import { useState, useEffect } from 'react';

export default function ProfilInceleme() {
    const [sessionId, setSessionId] = useState('');
    const [formData, setFormData] = useState({
        gameName: 'Valorant',
        rank: '',
        link: '',
        notes: '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    useEffect(() => {
        const stored = localStorage.getItem('chatSessionId');
        if (stored) setSessionId(stored);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sessionId) {
            alert("Session ID not found. Please refresh the page.");
            return;
        }

        setStatus('loading');
        try {
            const res = await fetch('/api/review-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, sessionId }),
            });

            if (res.ok) {
                setStatus('success');
                setFormData({ gameName: 'Valorant', rank: '', link: '', notes: '' });
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Profil İnceleme</h1>
                <p className="text-zinc-400 mt-2">Profesyönel oyuncularımız tarafından oyun performansın incelensin.</p>
            </div>

            <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 max-w-2xl">
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-zinc-300">Oyun</label>
                        <select
                            value={formData.gameName}
                            onChange={(e) => setFormData({ ...formData, gameName: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        >
                            <option value="Valorant">Valorant</option>
                            <option value="League of Legends">League of Legends</option>
                            <option value="CS2">CS2</option>
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-zinc-300">Rank / Lig</label>
                        <input
                            required
                            type="text"
                            placeholder="Örn: Diamond 3 / Ascendant 1"
                            value={formData.rank}
                            onChange={(e) => setFormData({ ...formData, rank: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-zinc-300">Profil Linki / VOD Linki</label>
                        <input
                            required
                            type="url"
                            placeholder="https://tracker.gg/..."
                            value={formData.link}
                            onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-bold text-zinc-300">Notlar (Opsiyonel)</label>
                        <textarea
                            rows={4}
                            placeholder="Hangi konuda yardım istiyorsun?"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            className="bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-blue-500 outline-none resize-none"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="mt-2 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-bold hover:shadow-lg transition-all disabled:opacity-50"
                    >
                        {status === 'loading' ? 'Gönderiliyor...' : 'İnceleme Talep Et'}
                    </button>

                    {status === 'success' && (
                        <div className="p-3 bg-green-500/10 border border-green-500/20 text-green-400 rounded-lg text-sm text-center">
                            Talebin başarıyla alındı! Profil sayfasından durumu takip edebilirsin.
                        </div>
                    )}
                    {status === 'error' && (
                        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg text-sm text-center">
                            Bir hata oluştu. Lütfen tekrar dene.
                        </div>
                    )}

                </form>
            </div>
        </div>
    );
}

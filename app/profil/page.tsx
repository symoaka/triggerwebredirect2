'use client';

import { useState, useEffect } from 'react';

type ReviewRequest = {
    id: string;
    gameName: string;
    rank: string;
    status: string;
    createdAt: string;
};

export default function Profil() {
    const [sessionId, setSessionId] = useState('');
    const [requests, setRequests] = useState<ReviewRequest[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const stored = localStorage.getItem('chatSessionId');
        if (stored) {
            setSessionId(stored);
            fetchRequests(stored);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchRequests = async (sid: string) => {
        try {
            const res = await fetch(`/api/review-request?sessionId=${sid}`);
            if (res.ok) {
                const data = await res.json();
                setRequests(data);
            }
        } catch {
            console.error("Failed to fetch requests");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="text-zinc-500">Yükleniyor...</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold text-white">Profilim</h1>
                <p className="text-zinc-400">Taleplerini ve hesap durumunu buradan takip edebilirsin.</p>
            </div>

            {/* Quick Stats or Session Info */}
            <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 p-6 rounded-2xl border border-white/5 flex items-center justify-between">
                <div>
                    <p className="text-zinc-500 text-xs font-mono uppercase tracking-widest">Session ID</p>
                    <p className="text-white font-mono mt-1 text-sm md:text-base">{sessionId || "Misafir"}</p>
                </div>
                <div className="h-10 w-10 bg-blue-500/20 rounded-full flex items-center justify-center text-blue-400">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
            </div>

            {/* Review Requests List */}
            <div>
                <h2 className="text-xl font-bold text-white mb-4">İnceleme Taleplerim</h2>
                <div className="bg-zinc-900/50 rounded-2xl border border-white/5 overflow-hidden">
                    {requests.length === 0 ? (
                        <div className="p-8 text-center">
                            <p className="text-zinc-500 mb-4">Henüz bir inceleme talebin bulunmuyor.</p>
                            <a href="/profil-inceleme" className="text-blue-400 hover:underline">İlk talebini oluştur →</a>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {/* Table Header */}
                            <div className="grid grid-cols-4 p-4 border-b border-white/5 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                                <div className="col-span-1">Oyun</div>
                                <div className="col-span-1">Rank</div>
                                <div className="col-span-1">Tarih</div>
                                <div className="col-span-1 text-right">Durum</div>
                            </div>
                            {/* Rows */}
                            {requests.map((req) => (
                                <div key={req.id} className="grid grid-cols-4 p-4 border-b border-white/5 text-sm hover:bg-white/5 transition-colors">
                                    <div className="col-span-1 font-medium text-white">{req.gameName}</div>
                                    <div className="col-span-1 text-zinc-400">{req.rank}</div>
                                    <div className="col-span-1 text-zinc-500">{new Date(req.createdAt).toLocaleDateString()}</div>
                                    <div className="col-span-1 text-right">
                                        <span className={`
                               px-2 py-1 rounded-full text-xs font-bold
                               ${req.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' : ''}
                               ${req.status === 'Completed' ? 'bg-green-500/20 text-green-400' : ''}
                               ${req.status === 'In Progress' ? 'bg-blue-500/20 text-blue-400' : ''}
                            `}>
                                            {req.status === 'Pending' ? 'Bekliyor' : req.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthProvider';
import { useState } from 'react';

export default function Header() {
    const pathname = usePathname();
    const { user, login, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);

    const isActive = (path: string) => {
        if (path === "/" && pathname !== "/") return false;
        return pathname === path;
    };

    const getLinkClass = (path: string) => {
        const active = isActive(path);
        const baseClass = "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 flex items-center gap-2";
        const activeClass = "bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)] border border-white/10";
        const inactiveClass = "text-zinc-500 hover:text-white hover:bg-white/5";

        return `${baseClass} ${active ? activeClass : inactiveClass}`;
    };

    return (
        <header className="h-full w-full flex items-center justify-between px-6 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl relative z-50">
            {/* Left: Navigation Menu (Moved from Sidebar) */}
            <nav className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                <Link href="/" className={getLinkClass("/")}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                    <span>Ana Sayfa</span>
                </Link>
                <Link href="/coaching" className={getLinkClass("/coaching")}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>
                    <span>Koçluk</span>
                </Link>
                <Link href="/kadromuz" className={getLinkClass("/kadromuz")}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                    <span>Kadromuz</span>
                </Link>
                <Link href="/roadmap" className={getLinkClass("/roadmap")}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 002 2h2a2 2 0 002-2z"></path></svg>
                    <span>Yol Haritası</span>
                </Link>
                <Link href="/socials" className={getLinkClass("/socials")}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                    <span>Güncellemeler</span>
                </Link>
                {user && (
                    <>
                        <Link href="/profil-inceleme" className={getLinkClass("/profil-inceleme")}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
                            <span>İnceleme İste</span>
                        </Link>
                        <Link href="/profil" className={getLinkClass("/profil")}>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            <span>Profil</span>
                        </Link>
                    </>
                )}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-4 relative">
                <div className="h-6 w-[1px] bg-zinc-800 mx-2"></div>
                {/* User Profile / Login */}
                {user ? (
                    <div className="relative">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-3 hover:bg-white/5 p-2 rounded-lg transition-colors"
                        >
                            <div className="h-8 w-8 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full border border-white/10 flex items-center justify-center text-xs font-bold">
                                {user.username.charAt(0).toUpperCase()}
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-xs font-bold text-white leading-none">{user.username}</p>
                                <p className="text-[10px] text-zinc-500 leading-none mt-1 uppercase">{user.role}</p>
                            </div>
                            <svg className={`w-4 h-4 text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>

                        {/* Dropdown */}
                        {isOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-zinc-900 border border-white/10 rounded-xl shadow-xl overflow-hidden py-1">
                                <Link href="/profil" className="block px-4 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-white" onClick={() => setIsOpen(false)}>
                                    Profilim
                                </Link>
                                <button
                                    onClick={() => { logout(); setIsOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5 hover:text-red-300"
                                >
                                    Çıkış Yap
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-2">
                        <Link href="/login" className="px-4 py-2 text-xs font-bold text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-colors">
                            Giriş Yap
                        </Link>
                        <Link href="/register" className="px-4 py-2 text-xs font-bold text-black bg-white hover:bg-zinc-200 rounded-lg transition-colors">
                            Kayıt Ol
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

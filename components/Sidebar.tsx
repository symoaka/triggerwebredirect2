"use client";

import Link from 'next/link';
import ThreeDLogo from './ThreeDLogo';

export default function Sidebar() {
    return (
        <aside className="h-full w-full flex flex-col gap-6 py-6 px-4 bg-zinc-900/50 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            {/* Logo area - Vertically Centered */}
            <div className="flex-1 w-full flex items-center justify-center relative -mt-12 overflow-visible">
                <div className="w-full flex items-center justify-center">
                    <ThreeDLogo />
                </div>
            </div>

            <div className="mt-auto px-2">
                {/* Social Icons (Moved from Dashboard) */}
                <div className="flex justify-center gap-4 mb-6">
                    {/* Discord */}
                    <a href="https://discord.gg/triggeraim" target="_blank" className="flex-1 h-14 flex items-center justify-center bg-white/5 hover:bg-[#5865F2] hover:-translate-y-1 transition-all duration-300 rounded-xl border border-white/5 shadow-lg group">
                        <svg className="w-6 h-6 fill-zinc-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037 13.48 13.48 0 0 0-.59 1.227 18.355 18.355 0 0 0-7.163 0 13.48 13.48 0 0 0-.59-1.227.074.074 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.418 2.157-2.418 1.21 0 2.176 1.085 2.157 2.419 0 1.334-.956 2.419-2.157 2.419zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.418 2.157-2.418 1.21 0 2.175 1.085 2.157 2.419 0 1.334-.946 2.419-2.157 2.419z" /></svg>
                    </a>
                    {/* X */}
                    <a href="https://x.com/triggeraimHQ" target="_blank" className="flex-1 h-14 flex items-center justify-center bg-white/5 hover:bg-black hover:-translate-y-1 transition-all duration-300 rounded-xl border border-white/5 shadow-lg group">
                        <svg className="w-6 h-6 fill-zinc-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                    </a>
                    {/* YouTube */}
                    <a href="https://www.youtube.com/@symoaka" target="_blank" className="flex-1 h-14 flex items-center justify-center bg-white/5 hover:bg-[#FF0000] hover:-translate-y-1 transition-all duration-300 rounded-xl border border-white/5 shadow-lg group">
                        <svg className="w-6 h-6 fill-zinc-400 group-hover:fill-white transition-colors" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                    </a>
                </div>

                <div className="p-4 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl border border-white/5">
                    <p className="text-white text-sm font-bold mb-1">Premium Plan</p>
                    <p className="text-xs text-zinc-500 mb-3">Access all features</p>
                    <button className="w-full py-2 bg-white text-black text-xs font-bold rounded-lg hover:bg-zinc-200 transition-colors">
                        Upgrade
                    </button>
                </div>
            </div>
        </aside>
    );
}

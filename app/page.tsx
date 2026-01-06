"use client";

import { useState } from "react";
import Card from "@/components/Card";

// Mock Data for KovaaKs Playlists
const PLAYLISTS = [
  { id: 1, name: "Valorant Radiant Warmup", author: "Symo", code: "KovaaKsTrackingSkybaseSmall", downloads: "12k" },
  { id: 2, name: "Smoothness Training V2", author: "Cartoon", code: "KovaaKsUplinkCheatingOp", downloads: "8.5k" },
  { id: 3, name: "Reactive Tracking God", author: "MattyOW", code: "KovaaKsFlickingBlueberrySpam", downloads: "25k" },
  { id: 4, name: "Static Clicking Fundamentals", author: "BardOZ", code: "KovaaKsPlinkingMap", downloads: "15k" },
  { id: 5, name: "Dynamic Clicking Expert", author: "Visose", code: "KovaaKsTargetSwitching", downloads: "5k" },
  { id: 6, name: "Voltaic Iron Fundamentals", author: "Voltaic", code: "KovaaKsIronFundamentals", downloads: "50k" },
  { id: 7, name: "Voltaic Bronze Fundamentals", author: "Voltaic", code: "KovaaKsBronzeFundamentals", downloads: "45k" },
  { id: 8, name: "Voltaic Silver Fundamentals", author: "Voltaic", code: "KovaaKsSilverFundamentals", downloads: "40k" },
  { id: 9, name: "Voltaic Gold Fundamentals", author: "Voltaic", code: "KovaaKsGoldFundamentals", downloads: "35k" },
  { id: 10, name: "Voltaic Platinum Fundamentals", author: "Voltaic", code: "KovaaKsPlatinumFundamentals", downloads: "30k" },
  { id: 11, name: "PureG Smoothness Routine", author: "PureG", code: "KovaaKsPureGSmoothness", downloads: "20k" },
  { id: 12, name: "Hna TacticalFPS Routine", author: "Hna", code: "KovaaKsHnaTactical", downloads: "18k" },
  { id: 13, name: "Zeeq Static Clicking", author: "Zeeq", code: "KovaaKsZeeqStatic", downloads: "10k" },
  { id: 14, name: "Apex Legends Warmup", author: "Ottr", code: "KovaaKsApexWarmup", downloads: "22k" },
  { id: 15, name: "Overwatch 2 Flex Support", author: "Ml7", code: "KovaaKsOW2Flex", downloads: "14k" },
  { id: 16, name: "Counter-Strike 2 Accuracy", author: "Monesy", code: "KovaaKsCS2Accuracy", downloads: "30k" },
  { id: 17, name: "Micro Adjustment Drill", author: "SilkyCrisp", code: "KovaaKsMicroAdjust", downloads: "8k" },
  { id: 18, name: "Wide Wall Flicking", author: "KovaaK", code: "KovaaKsWideWall", downloads: "100k" },
];

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaylists = PLAYLISTS.filter(playlist =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    playlist.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-4 space-y-8 max-w-[1600px] mx-auto">

      {/* 1. Search Section (Top) */}
      <div className="w-full">
        <div className="flex flex-col gap-1 mb-4">
          <h2 className="text-2xl font-black text-white tracking-tight">Dashboard</h2>
          <p className="text-zinc-400 text-xs">
            Explore community-created KovaaKs playlists, aim routines, and guides.
          </p>
        </div>

        <div className="relative group w-full mb-4">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg className="w-5 h-5 text-zinc-500 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          </div>
          <input
            type="text"
            placeholder="Search by name, author, or paste KovaaKs Code directly..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-white placeholder-zinc-500 outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all shadow-xl"
          />
        </div>

        {/* Search Tags/Keywords */}
        <div className="flex flex-wrap gap-2 mb-4 animate-fade-in">
          {["Valorant", "Tracking", "Flicking", "Dynamic", "Static", "Symo", "Voltaic"].map(tag => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full text-[10px] font-medium text-zinc-400 hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Search Results / Recommendations */}
        {/* Search Results / Recommendations */}
        <div className="mb-12 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar custom-scrollbar-thumb custom-scrollbar-thumb:hover">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            {filteredPlaylists.map(playlist => (
              <div key={playlist.id} className="bg-zinc-900 border border-white/10 p-3 rounded-lg hover:bg-white/5 group transition-colors flex flex-col">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-white group-hover:text-blue-400 transition-colors line-clamp-1">{playlist.name}</h4>
                    <p className="text-[10px] text-zinc-500">by {playlist.author}</p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <code className="flex-1 text-[10px] bg-black/50 px-2 py-1.5 rounded text-zinc-400 font-mono truncate select-all">{playlist.code}</code>
                  <button
                    onClick={() => navigator.clipboard.writeText(playlist.code)}
                    className="p-1.5 bg-white/5 hover:bg-white/20 text-zinc-400 hover:text-white rounded transition-colors"
                    title="Copy Code"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  </button>
                </div>

                <div className="mt-2 flex items-center justify-end">
                  <span className="text-[10px] text-zinc-600 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                    {playlist.downloads}
                  </span>
                </div>
              </div>
            ))}
            {filteredPlaylists.length === 0 && searchQuery && (
              <div className="col-span-full text-center py-8 text-zinc-500">
                No playlists found for "{searchQuery}"
              </div>
            )}
          </div>
        </div>
      </div>



    </div>
  );
}

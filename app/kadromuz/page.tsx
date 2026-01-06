"use client";

import { useState } from "react";
// Removed unused Card import

interface StaffMember {
    name: string;
    role: string;
    description: string;
    color: string;
    initial: string;
}

export default function KadromuzPage() {
    const [searchQuery, setSearchQuery] = useState("");

    const staff: StaffMember[] = [
        {
            name: "Symo",
            role: "Kurucu",
            description: "Trigger'ın arkasındaki vizyoner. Liderlik ediyor.",
            color: "text-red-500",
            initial: "S"
        },
        {
            name: "Soularis",
            role: "Yönetici",
            description: "Sorunsuz işleyişi ve topluluk yönetimini sağlıyor.",
            color: "text-blue-500",
            initial: "S"
        },
        {
            name: "Firo",
            role: "Moderatör",
            description: "( Herhangi bir adam )",
            color: "text-green-500",
            initial: "F"
        },
        {
            name: "skala",
            role: "Destekçi",
            description: "Uzun süreli destekçi ve topluluk üyesi.",
            color: "text-purple-500",
            initial: "S"
        },
        {
            name: "cyem",
            role: "Profesyonel",
            description: "Mükemmelliğe odaklanmış profesyonel oyuncu.",
            color: "text-yellow-500",
            initial: "C"
        },
        {
            name: "halis",
            role: "Moderatör",
            description: "hicbirsey yapmiyor.",
            color: "text-blue-500",
            initial: "H"
        },
        {
            name: "metehan",
            role: "Feedback guy",
            description: "hatalari soyluyor duzeltiyoruz.",
            color: "text-blue-500",
            initial: "M"
        },
    ];

    const filteredStaff = staff.filter(member =>
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2">Ekip Üyeleri</h1>
                    <p className="text-zinc-500 text-sm">{filteredStaff.length} toplam üye</p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-64">
                    <input
                        type="text"
                        placeholder="Ekip üyesi ara..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-zinc-700 transition-colors"
                    />
                    <svg className="w-4 h-4 text-zinc-500 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
            </div>

            {/* Table Layout */}
            <div className="w-full">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-zinc-500 uppercase tracking-wider border-b border-white/5">
                    <div className="col-span-4 md:col-span-3">Üye</div>
                    <div className="col-span-3 md:col-span-2">Rol</div>
                    <div className="col-span-5 md:col-span-7">Açıklama</div>
                </div>

                {/* Table Rows */}
                <div className="divide-y divide-white/5">
                    {filteredStaff.map((member, index) => (
                        <div key={index} className="grid grid-cols-12 gap-4 px-4 py-4 items-center hover:bg-white/5 transition-colors group rounded-lg">
                            {/* Member Column */}
                            <div className="col-span-4 md:col-span-3 flex items-center justify-start gap-3">
                                <div className="w-10 h-10 bg-zinc-800 rounded-full flex items-center justify-center text-sm font-bold text-white border border-zinc-700 shadow-sm relative overflow-hidden flex-shrink-0">
                                    <span className={member.color}>{member.initial}</span>
                                </div>
                                <span className="font-medium text-zinc-200 group-hover:text-white transition-colors">{member.name}</span>
                            </div>

                            {/* Role Column */}
                            <div className="col-span-3 md:col-span-2">
                                <span className="text-sm text-zinc-400">{member.role}</span>
                            </div>

                            {/* Description Column */}
                            <div className="col-span-5 md:col-span-7">
                                <p className="text-sm text-zinc-500 truncate group-hover:text-zinc-400 transition-colors">
                                    {member.description}
                                </p>
                            </div>
                        </div>
                    ))}

                    {filteredStaff.length === 0 && (
                        <div className="py-12 text-center text-zinc-600">
                            "{searchQuery}" ile eşleşen üye bulunamadı.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

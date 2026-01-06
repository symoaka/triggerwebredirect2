"use client";

import Card from "@/components/Card";
import { useState } from "react";
import BookingModal from "@/components/BookingModal";

export default function CoachingPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCoach, setSelectedCoach] = useState("");

    const handleBook = (coach: string) => {
        setSelectedCoach(coach);
        setIsModalOpen(true);
    };

    return (
        <div className="space-y-8">
            <BookingModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                coachName={selectedCoach}
            />

            {/* Page Header */}
            <section>
                <span className="text-zinc-500 font-medium tracking-wider uppercase text-sm">Seviye Atla</span>
                <h1 className="text-4xl font-light mt-2 mb-4">Koçluk</h1>
                <p className="text-zinc-400 max-w-2xl">
                    Onaylı koçlarımızla bir seans ayırtın ve size özel antrenman programlarıyla gelişin.
                </p>
            </section>

            {/* Coaches Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Coach 1 */}
                <Card title="Symo" className="h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <img
                            src="https://cdn.discordapp.com/avatars/789017086331715587/048be18bfa3b3a926da0db650860bab2.webp?size=128"
                            alt="Symo"
                            className="w-16 h-16 rounded-full object-cover border border-zinc-700"
                        />
                        <div>
                            <p className="text-sm text-zinc-400">Baş Koç</p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-red-500/10 text-red-500 px-2 py-0.5 rounded">Radiant</span>
                                <span className="text-xs bg-blue-500/10 text-blue-500 px-2 py-0.5 rounded">Aim Uzmanı</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Mikro düzeltmeler ve crosshair yerleştirme konusunda uzman. Platonuzu aşmanıza yardımcı olacağım.
                    </p>
                    <button
                        onClick={() => handleBook("Symo")}
                        className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Randevu Al
                    </button>
                </Card>

                {/* Coach 2 */}
                <Card title="Soularis" className="h-full">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center text-xl font-bold text-white border border-zinc-700">S</div>
                        <div>
                            <p className="text-sm text-zinc-400">Taktik Analisti</p>
                            <div className="flex gap-2 mt-1">
                                <span className="text-xs bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded">IGL Hazırlık</span>
                                <span className="text-xs bg-orange-500/10 text-orange-500 px-2 py-0.5 rounded">Takım Oyunu</span>
                            </div>
                        </div>
                    </div>
                    <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
                        Oyun ortası kararlar ve takım koordinasyonu uzmanı. Oyun zekanızı ve liderlik becerilerinizi geliştirin.
                    </p>
                    <button
                        onClick={() => handleBook("Soularis")}
                        className="w-full py-3 bg-white text-black font-medium rounded-xl hover:bg-zinc-200 transition-colors"
                    >
                        Randevu Al
                    </button>
                </Card>
            </div>
        </div>
    );
}

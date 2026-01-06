"use client";

import { useState, useEffect } from 'react';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    coachName: string;
}

export default function BookingModal({ isOpen, onClose, coachName }: BookingModalProps) {
    // Calendar State
    const [viewDate, setViewDate] = useState(new Date()); // The month we are looking at
    const [selectedDate, setSelectedDate] = useState(""); // The specific day selected (YYYY-MM-DD)

    // Form State
    const [discordId, setDiscordId] = useState("");
    const [note, setNote] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    // Müşterinin Webhook URL'si
    const WEBHOOK_URL = "https://discord.com/api/webhooks/1453426781288665291/puWV3nqSNWdot4E71AC_5P36LEcA2Q39whVcip4sd5_LDpDOVXF3D8GF9SDlLuhohK9i";

    // Hardcoded Dates (Örnek Dolu Tarihler)
    const initialBlockedDates = [
        "2025-05-15",
        "2025-05-16",
        "2025-06-01"
    ];

    // State to hold ALL blocked dates (Hardcoded + User Booked)
    const [blockedDates, setBlockedDates] = useState<string[]>(initialBlockedDates);

    // Load saved bookings from LocalStorage on mount
    useEffect(() => {
        const saved = localStorage.getItem('myBookings');
        if (saved) {
            const parsed = JSON.parse(saved);
            setBlockedDates(prev => [...new Set([...prev, ...parsed])]);
        }
    }, []);

    // Helper functions for calendar
    const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"];

    const getDaysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const changeMonth = (offset: number) => {
        const newDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + offset, 1);
        setViewDate(newDate);
    };

    const isDateBlocked = (year: number, month: number, day: number) => {
        const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        return blockedDates.includes(dateStr);
    };

    const isPastDate = (year: number, month: number, day: number) => {
        const checkDate = new Date(year, month, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return checkDate < today;
    };

    const handleDateClick = (day: number) => {
        const dateStr = `${viewDate.getFullYear()}-${String(viewDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        setSelectedDate(dateStr);
    };

    const handleSubmit = async () => {
        if (!selectedDate || !discordId) return;

        setIsSubmitting(true);
        setStatus('idle');

        try {
            if (WEBHOOK_URL.includes("BURAYA_DISCORD_WEBHOOK_URL")) {
                console.log("Webhook URL ayarlanmamış. Demo modunda çalışıyor.");
                await new Promise(resolve => setTimeout(resolve, 1000));
            } else {
                const response = await fetch(WEBHOOK_URL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        content: `📢 **Yeni Koçluk Talebi!**\n\n👤 **Kullanıcı:** ${discordId}\n📅 **Tarih:** ${selectedDate}\n👨‍🏫 **Koç:** ${coachName}\n📝 **Not:** ${note || "Yok"}`
                    })
                });
                if (!response.ok) throw new Error('Webhook error');
            }

            // AUTO UPDATE: Add to local blocked list and save to LocalStorage
            const newBlockedList = [...blockedDates, selectedDate];
            setBlockedDates(newBlockedList);

            const saved = localStorage.getItem('myBookings');
            const currentSaved = saved ? JSON.parse(saved) : [];
            localStorage.setItem('myBookings', JSON.stringify([...currentSaved, selectedDate]));

            setStatus('success');
            setTimeout(() => {
                onClose();
                setStatus('idle');
                setSelectedDate("");
                setDiscordId("");
                setNote("");
            }, 2000);
        } catch (error) {
            console.error(error);
            setStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen) return null;

    // Generate Calendar Grid
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = (getFirstDayOfMonth(year, month) + 6) % 7;

    const renderCalendarDays = () => {
        const days = [];
        // Empty slots
        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="w-9 h-9"></div>);
        }
        // Actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const isBlocked = isDateBlocked(year, month, i);
            const isPast = isPastDate(year, month, i);
            const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
            const isSelected = selectedDate === currentDateStr;

            days.push(
                <button
                    key={i}
                    onClick={() => !isBlocked && !isPast && handleDateClick(i)}
                    disabled={isBlocked || isPast}
                    className={`
                        w-9 h-9 rounded-full flex items-center justify-center text-sm transition-all
                        ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 scale-110' : ''}
                        ${!isSelected && !isBlocked && !isPast ? 'text-zinc-300 hover:bg-zinc-700 hover:text-white' : ''}
                        ${isBlocked ? 'bg-red-500/10 text-red-500 cursor-not-allowed border border-red-500/20' : ''}
                        ${isPast ? 'text-zinc-700 cursor-not-allowed' : ''}
                    `}
                    title={isBlocked ? "Dolu" : ""}
                >
                    {i}
                </button>
            );
        }
        return days;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

            <div className="relative w-full max-w-md bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl p-6 overflow-hidden max-h-[90vh] overflow-y-auto custom-scrollbar">
                {status === 'success' ? (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h3 className="text-xl font-bold text-white">Talep Alındı!</h3>
                        <p className="text-zinc-400 mt-2">Discord üzerinden iletişime geçeceğiz.</p>
                        <p className="text-green-500/50 text-xs mt-4">*Takviminiz güncellendi.</p>
                    </div>
                ) : (
                    <>
                        <div className="mb-6 text-center">
                            <h2 className="text-xl font-bold text-white mb-1">Randevu Oluştur</h2>
                            <p className="text-zinc-400 text-sm">{coachName} ile</p>
                        </div>

                        {/* Custom Calendar */}
                        <div className="mb-6 bg-zinc-900/50 rounded-xl p-2 border border-zinc-800">
                            {/* Calendar Header */}
                            <div className="flex justify-between items-center mb-4 px-2">
                                <button onClick={() => changeMonth(-1)} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path></svg>
                                </button>
                                <span className="font-bold text-white tracking-wide">{months[viewDate.getMonth()]} {viewDate.getFullYear()}</span>
                                <button onClick={() => changeMonth(1)} className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                </button>
                            </div>

                            {/* Weekday Headers */}
                            <div className="grid grid-cols-7 gap-1 text-center mb-2">
                                {['Pz', 'Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct'].map(day => (
                                    <span key={day} className="text-xs font-bold text-zinc-600 uppercase">{day}</span>
                                ))}
                            </div>

                            {/* Days Grid */}
                            <div className="grid grid-cols-7 gap-1 place-items-center">
                                {renderCalendarDays()}
                            </div>

                            {/* Legend */}
                            <div className="flex justify-center gap-4 mt-4 text-xs">
                                <div className="flex items-center gap-1.5 text-zinc-400">
                                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700"></div>
                                    Müsait
                                </div>
                                <div className="flex items-center gap-1.5 text-text-white font-bold">
                                    <div className="w-2.5 h-2.5 rounded-full bg-border border-zinc-500/20 bg-blue-600"></div>
                                    Seçili
                                </div>
                                <div className="flex items-center gap-1.5 text-red-500/80">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                                    Dolu
                                </div>
                            </div>
                        </div>

                        {/* Details Form */}
                        <div className={`space-y-4 transition-all duration-300 ${selectedDate ? 'opacity-100 max-h-96' : 'opacity-50 max-h-96 blur-[1px] pointer-events-none'}`}>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">2. Discord Kullanıcı Adı</label>
                                <input
                                    type="text"
                                    placeholder="örn: symo#1234"
                                    value={discordId}
                                    onChange={(e) => setDiscordId(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Not (Opsiyonel)</label>
                                <textarea
                                    rows={2}
                                    placeholder="Neye odaklanmak istersin?"
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
                                />
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={onClose}
                                className="flex-1 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-medium rounded-xl transition-colors"
                            >
                                İptal
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedDate || !discordId || isSubmitting}
                                className="flex-1 py-3 bg-white text-black font-bold rounded-xl hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                            >
                                {isSubmitting ? (
                                    <svg className="animate-spin h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                ) : (
                                    'Talep Gönder'
                                )}
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}

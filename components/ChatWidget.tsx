'use client';

import { useState, useRef, useEffect } from 'react';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'admin'; // Changed 'coach' to 'admin' to match DB/Schema
    createdAt: string;
};

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [sessionId, setSessionId] = useState<string>('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Initialize Session
    useEffect(() => {
        let storedSessionId = localStorage.getItem('chatSessionId');
        if (!storedSessionId) {
            storedSessionId = crypto.randomUUID();
            localStorage.setItem('chatSessionId', storedSessionId);
        }
        setSessionId(storedSessionId);
    }, []);

    // Fetch Messages periodically
    useEffect(() => {
        if (!sessionId || !isOpen) return;

        const fetchMessages = async () => {
            try {
                const res = await fetch(`/api/chat?sessionId=${sessionId}`);
                if (res.ok) {
                    const data = await res.json();
                    setMessages(data);
                }
            } catch (err) {
                console.error('Failed to fetch messages', err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds

        return () => clearInterval(interval);
    }, [sessionId, isOpen]);

    // Scroll to bottom on new messages
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isOpen]);

    const handleSendMessage = async () => {
        if (!inputValue.trim() || !sessionId) return;

        const textToSend = inputValue;
        setInputValue(''); // Optimistic clear

        // Optimistic UI update
        const tempMessage: Message = {
            id: Date.now().toString(),
            text: textToSend,
            sender: 'user',
            createdAt: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, tempMessage]);

        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId,
                    text: textToSend,
                    sender: 'user',
                }),
            });
            // The polling will fetch the real message with DB ID shortly
        } catch (error) {
            console.error("Failed to send", error);
            // Ideally show error state here
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 isolate">
            {/* Chat Window */}
            <div
                className={`
          transition-all duration-300 ease-in-out origin-bottom-right
          w-80 sm:w-96 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden
          flex flex-col
          ${isOpen ? 'scale-100 opacity-100 mb-2' : 'scale-0 opacity-0 h-0 w-0 mb-0'}
        `}
                style={{ maxHeight: '600px' }}
            >
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white backdrop-blur-sm">
                                CO
                            </div>
                            <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-indigo-600 rounded-full"></div>
                        </div>
                        <div>
                            <h3 className="text-white font-bold text-sm">Coaching Support</h3>
                            <p className="text-blue-100 text-xs text-opacity-80">Typically replies in 5m</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/70 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                    </button>
                </div>

                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900/95 min-h-[300px] max-h-[400px]">
                    {messages.length === 0 && (
                        <p className="text-center text-gray-500 text-sm mt-10">Start a conversation with us!</p>
                    )}
                    {messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`
                  max-w-[80%] rounded-2xl px-4 py-2.5 text-sm
                  ${msg.sender === 'user'
                                        ? 'bg-blue-600 text-white rounded-br-none'
                                        : 'bg-gray-800 text-gray-100 rounded-bl-none'
                                    }
                `}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-gray-900 border-t border-gray-800">
                    <div className="flex gap-2 items-center bg-gray-800/50 rounded-xl p-1 pr-2 border border-input focus-within:ring-2 focus-within:ring-blue-500/50 transition-all">
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                            placeholder="Type your message..."
                            className="flex-1 bg-transparent border-none focus:outline-none text-white px-3 py-2 text-sm placeholder:text-gray-500"
                        />
                        <button
                            onClick={handleSendMessage}
                            disabled={!inputValue.trim()}
                            className="p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                        </button>
                    </div>
                    <div className="text-center mt-2">
                        <span className="text-[10px] text-gray-500">Powered by YourCoach App</span>
                    </div>
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
          flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 active:scale-95
          ${isOpen
                        ? 'bg-gray-800 text-white rotate-90'
                        : 'bg-gradient-to-tr from-blue-600 to-indigo-600 text-white'
                    }
        `}
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                )}
            </button>
        </div>
    );
}

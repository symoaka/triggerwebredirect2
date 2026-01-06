'use client';

import { useState, useEffect, useRef } from 'react';

type Message = {
    id: string;
    text: string;
    sender: 'user' | 'admin';
    createdAt: string;
};

type Conversation = {
    id: string;
    sessionId: string;
    updatedAt: string;
    messages: Message[];
};

export default function AdminPage() {
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
    const [replyText, setReplyText] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Poll for conversations
    useEffect(() => {
        if (!isAuthenticated) return;

        const fetchChats = async () => {
            try {
                const res = await fetch('/api/admin/chats');
                if (res.ok) {
                    const data = await res.json();
                    setConversations(data);

                    // Update selected chat if it exists (live reload)
                    if (selectedChat) {
                        const updated = data.find((c: Conversation) => c.sessionId === selectedChat.sessionId);
                        if (updated) {
                            // Only update messages, keep selection
                            setSelectedChat(prev => prev ? { ...prev, messages: updated.messages } : updated);
                        }
                    }
                }
            } catch (err) {
                console.error('Failed to fetch chats', err);
            }
        };

        fetchChats();
        const interval = setInterval(fetchChats, 3000);
        return () => clearInterval(interval);
    }, [isAuthenticated, selectedChat?.sessionId]); // Depends on selectedChat ID to refresh it

    // Fetch full history when clicking a chat
    const handleSelectChat = async (sessionId: string) => {
        try {
            const res = await fetch(`/api/chat?sessionId=${sessionId}`);
            if (res.ok) {
                const msgs = await res.json();
                const conv = conversations.find(c => c.sessionId === sessionId);
                if (conv) {
                    setSelectedChat({ ...conv, messages: msgs });
                }
            }
        } catch (err) {
            console.error("Failed to load full chat", err);
        }
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') { // Hardcoded password for MVP
            setIsAuthenticated(true);
        } else {
            alert('Incorrect password');
        }
    };

    const handleReply = async () => {
        if (!replyText.trim() || !selectedChat) return;

        try {
            await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: selectedChat.sessionId,
                    text: replyText,
                    sender: 'admin',
                }),
            });
            setReplyText('');
            // Optimistic upate or wait for poll
            // For simplicity, we wait for next poll or trigger manual update? 
            // Let's trigger manual fetch of this chat
            handleSelectChat(selectedChat.sessionId);
        } catch (err) {
            console.error('Failed to send reply', err);
        }
    };

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [selectedChat?.messages]);


    if (!isAuthenticated) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-black text-white">
                <form onSubmit={handleLogin} className="flex flex-col gap-4 p-8 bg-zinc-900 rounded-2xl border border-zinc-800">
                    <h1 className="text-xl font-bold">Admin Login</h1>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        className="bg-black border border-zinc-700 rounded p-2 text-white"
                    />
                    <button type="submit" className="bg-blue-600 p-2 rounded hover:bg-blue-500">Login</button>
                </form>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-black text-white overflow-hidden">
            {/* Sidebar List */}
            <div className="w-1/3 border-r border-zinc-800 flex flex-col">
                <div className="p-4 border-b border-zinc-800 bg-zinc-900">
                    <h2 className="font-bold">Active Conversations</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                    {conversations.map((conv) => (
                        <div
                            key={conv.id}
                            className={`p-4 border-b border-zinc-800 cursor-pointer hover:bg-zinc-900 transition-colors ${selectedChat?.sessionId === conv.sessionId ? 'bg-zinc-800' : ''}`}
                            onClick={() => handleSelectChat(conv.sessionId)}
                        >
                            <div className="flex justify-between mb-1">
                                <span className="font-mono text-xs text-zinc-400">ID: {conv.sessionId.slice(0, 8)}...</span>
                                <span className="text-xs text-zinc-500">{new Date(conv.updatedAt).toLocaleTimeString()}</span>
                            </div>
                            <div className="text-sm text-zinc-300 truncate">
                                {conv.messages[0]?.text || "No messages"}
                            </div>
                        </div>
                    ))}
                    {conversations.length === 0 && <p className="p-4 text-gray-500">No conversations yet.</p>}
                </div>
            </div>

            {/* Chat View */}
            <div className="flex-1 flex flex-col bg-zinc-950">
                {selectedChat ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-zinc-800 bg-zinc-900 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold">Chat with User</h3>
                                <p className="text-xs text-zinc-400 font-mono">{selectedChat.sessionId}</p>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4">
                            {selectedChat.messages?.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className={`max-w-[70%] p-3 rounded-lg ${msg.sender === 'admin'
                                            ? 'bg-blue-600 text-white'
                                            : 'bg-zinc-800 text-zinc-200'
                                        }`}>
                                        <p className="text-sm">{msg.text}</p>
                                        <p className="text-[10px] opacity-50 mt-1 text-right">
                                            {new Date(msg.createdAt).toLocaleTimeString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Reply Input */}
                        <div className="p-4 border-t border-zinc-800 bg-zinc-900">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={replyText}
                                    onChange={(e) => setReplyText(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleReply()}
                                    placeholder="Type a reply..."
                                    className="flex-1 bg-black border border-zinc-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleReply}
                                    className="bg-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-blue-500 transition-colors"
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center text-zinc-500">
                        Select a conversation to view details
                    </div>
                )}
            </div>
        </div>
    );
}

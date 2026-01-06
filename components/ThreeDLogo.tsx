"use client";

import { useRef, useState } from "react";

export default function ThreeDLogo() {
    const panelRef = useRef<HTMLDivElement>(null);
    const [rotate, setRotate] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!panelRef.current) return;

        const rect = panelRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        // Calculate rotation (max 20 degrees)
        const rotateY = (mouseX / (rect.width / 2)) * 20;
        const rotateX = -(mouseY / (rect.height / 2)) * 20;

        setRotate({ x: rotateX, y: rotateY });
    };

    const handleMouseLeave = () => {
        setRotate({ x: 0, y: 0 });
    };

    return (
        <div
            ref={panelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="w-full h-[500px] flex flex-col items-center justify-center relative overflow-hidden group perspective-1000 cursor-pointer"
        >
            {/* Background Gradient REMOVED */}{/* 
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 pointer-events-none opacity-50"></div>
              */}

            {/* Brand Text Top */}
            <div className="absolute top-8 left-0 w-full text-center z-10 pointer-events-none">
                <h2 className="text-4xl font-black tracking-tighter text-white">TRIGGER</h2>
                <p className="text-zinc-400 text-sm tracking-wide">TURKISH AIM COMMUNITY</p>
            </div>

            {/* 3D T Object */}
            <div className="relative z-10 pointer-events-none">
                <div
                    className="relative text-[200px] font-black leading-none select-none transition-transform duration-100 ease-out transform-style-3d"
                    style={{
                        transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`
                    }}
                >
                    {/* Shadow Layer */}
                    <div className="absolute inset-0 text-blue-900/50 blur-sm transform translate-z-[-40px]" style={{ transform: 'translateZ(-40px)' }}>T</div>

                    {/* Thickness Layers */}
                    <div className="absolute inset-0 text-zinc-800" style={{ transform: 'translateZ(-30px)' }}>T</div>
                    <div className="absolute inset-0 text-zinc-700" style={{ transform: 'translateZ(-20px)' }}>T</div>
                    <div className="absolute inset-0 text-zinc-600" style={{ transform: 'translateZ(-10px)' }}>T</div>
                    <div className="absolute inset-0 text-zinc-500" style={{ transform: 'translateZ(-5px)' }}>T</div>

                    {/* Front Face */}
                    <div className="relative z-10 text-transparent bg-clip-text bg-gradient-to-tl from-white to-zinc-400 drop-shadow-2xl" style={{ transform: 'translateZ(0px)' }}>
                        T
                    </div>
                </div>
            </div>

        </div>
    );
}

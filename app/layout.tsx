import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Using Inter as closest match to Geist or original
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import ChatWidget from "@/components/ChatWidget";

import { AuthProvider } from "@/context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "New App Template",
  description: "Template based on wireframe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white antialiased overflow-hidden`}>
        <AuthProvider>
          {/* Animated Background Elements (Ported from Original) */}
          <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-[#020617]">

            {/* Shooting Stars Container */}
            <div className="absolute inset-0 z-0 top-[-20%]">
              {[...Array(5)].map((_, i) => (
                <div
                  key={`star-${i}`}
                  className="absolute w-[2px] h-[100px] bg-gradient-to-b from-white to-transparent animate-shooting-star opacity-0"
                  style={{
                    left: `${20 + Math.random() * 80}%`,
                    top: `${Math.random() * 50}%`,
                    '--star-duration': `${3 + Math.random() * 4}s`,
                    '--star-delay': `${Math.random() * 10}s`,
                  } as React.CSSProperties}
                ></div>
              ))}
            </div>

            {/* Fireflies Container */}
            <div className="absolute inset-0 z-0">
              {[...Array(30)].map((_, i) => {
                const size = Math.random() * 6 + 4; // 4px to 10px
                return (
                  <div
                    key={i}
                    className="absolute bg-yellow-300 rounded-full blur-[2px] animate-firefly"
                    style={{
                      width: `${size}px`,
                      height: `${size}px`,
                      top: `${Math.random() * 80}%`,
                      left: `${Math.random() * 100}%`,
                      '--move-x': `${(Math.random() - 0.5) * 400}px`,
                      '--move-y': `${(Math.random() - 0.5) * 300}px`,
                      '--duration': `${5 + Math.random() * 10}s`,
                      '--delay': `${Math.random() * 5}s`,
                    } as React.CSSProperties}
                  ></div>
                )
              })}
            </div>

            {/* Neon Wireframe Waves Container */}
            <div className="absolute bottom-[-50px] left-[-200%] w-[600%] h-[600px] z-10 opacity-60 will-change-transform">
              {/* Wave 1 (Back) */}
              <div className="absolute bottom-0 w-full h-full animate-wave-slow flex items-end">
                <div className="w-full h-full flex animate-swell-slow">
                  <svg className="w-1/2 h-full drop-shadow-neon" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                      d="M0,256 C240,256 480,192 720,192 C960,192 1200,256 1440,256 L1440,320 L0,320 Z"
                      className="fill-blue-900/10 stroke-blue-500/30 stroke-[2]"
                    ></path>
                    <path
                      d="M0,256 C240,256 480,192 720,192 C960,192 1200,256 1440,256"
                      className="fill-none stroke-blue-400/50 stroke-[3]"
                    ></path>
                  </svg>
                  <svg className="w-1/2 h-full drop-shadow-neon" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                      d="M0,256 C240,256 480,192 720,192 C960,192 1200,256 1440,256 L1440,320 L0,320 Z"
                      className="fill-blue-900/10 stroke-blue-500/30 stroke-[2]"
                    ></path>
                    <path
                      d="M0,256 C240,256 480,192 720,192 C960,192 1200,256 1440,256"
                      className="fill-none stroke-blue-400/50 stroke-[3]"
                    ></path>
                  </svg>
                </div>
              </div>

              {/* Wave 2 (Front) */}
              <div className="absolute bottom-0 w-full h-[85%] animate-wave flex items-end">
                <div className="w-full h-full flex animate-swell">
                  <svg className="w-1/2 h-full drop-shadow-neon" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                      d="M0,224 C240,224 480,160 720,160 C960,160 1200,224 1440,224 L1440,320 L0,320 Z"
                      className="fill-indigo-900/10 stroke-indigo-500/30 stroke-[2]"
                    ></path>
                    <path
                      d="M0,224 C240,224 480,160 720,160 C960,160 1200,224 1440,224"
                      className="fill-none stroke-indigo-400/80 stroke-[3]"
                    ></path>
                  </svg>
                  <svg className="w-1/2 h-full drop-shadow-neon" viewBox="0 0 1440 320" preserveAspectRatio="none">
                    <path
                      d="M0,224 C240,224 480,160 720,160 C960,160 1200,224 1440,224 L1440,320 L0,320 Z"
                      className="fill-indigo-900/10 stroke-indigo-500/30 stroke-[2]"
                    ></path>
                    <path
                      d="M0,224 C240,224 480,160 720,160 C960,160 1200,224 1440,224"
                      className="fill-none stroke-indigo-400/80 stroke-[3]"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

          </div>

          {/* Wireframe Layout Structure */}
          <div className="relative z-10 h-screen w-full flex p-4 gap-4">
            {/* Left: Sidebar (Fixed Width) */}
            <div className="h-full w-[450px] flex-shrink-0">
              <Sidebar />
            </div>

            {/* Right: Header + Content */}
            <div className="flex flex-col flex-1 h-full gap-4 min-w-0">
              {/* Header */}
              <div className="h-16 w-full flex-shrink-0">
                <Header />
              </div>

              {/* Main Content */}
              <div className="flex-1 w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/50 backdrop-blur-md relative">
                <div className="absolute inset-0 overflow-y-auto p-6 scroll-smooth">
                  {children}
                </div>
              </div>
            </div>
          </div>

          <ChatWidget />
        </AuthProvider>
      </body>
    </html>
  );
}

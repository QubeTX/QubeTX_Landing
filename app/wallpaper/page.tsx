import type { Metadata, Viewport } from "next";
import Image from "next/image";
import { WallpaperMatrix } from "@/components/effects/WallpaperMatrix";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: "QubeTX Wallpaper | Interactive Desktop",
  description: "Interactive dot matrix wallpaper for QubeTX.",
};

export default function WallpaperPage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden flex flex-col items-center justify-center bg-[#0a0f1c]">
      {/* Background Effect */}
      <div className="absolute inset-0 z-0">
        <WallpaperMatrix />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 p-4">
        {/* Glowing Logo Container */}
        <div className="relative group">
          {/* Radial Glow */}
          <div className="absolute -inset-12 bg-blue-600/20 rounded-full blur-[60px] opacity-40 animate-pulse-slow pointer-events-none" />

          {/* Logo */}
          <div className="relative transform transition-transform duration-700 hover:scale-[1.02]">
             <Image
              src="/logoQUBETX_horizontal.png"
              alt="QubeTX"
              width={600}
              height={150}
              className="w-auto h-[120px] md:h-[160px] lg:h-[200px] object-contain drop-shadow-[0_0_15px_rgba(0,102,255,0.3)]"
              priority
            />
          </div>
        </div>

        {/* Tagline */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-slate-700 to-transparent" />
          <p className="font-mono text-[10px] md:text-xs tracking-[0.2em] text-slate-500/60 uppercase text-center">
            A Department of ES Dev LLC
          </p>
        </div>
      </div>
    </main>
  );
}

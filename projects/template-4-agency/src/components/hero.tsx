"use client";

import { useState } from "react";

export default function Hero() {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);

  const toggleMute = () => {
    const bgVideo = document.getElementById("bg-showreel-video") as HTMLVideoElement;
    if (bgVideo) {
      bgVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const togglePlay = () => {
    const bgVideo = document.getElementById("bg-showreel-video") as HTMLVideoElement;
    if (bgVideo) {
      if (isPlaying) {
        bgVideo.pause();
      } else {
        bgVideo.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-transparent">
      <div className="relative z-10 flex h-full flex-col justify-end px-12 pb-24 md:px-20 md:pb-28">
        <div className="max-w-4xl">
          <div
            className="mb-4 inline-flex items-center gap-3 rounded-full border border-[#d4ff00]/40 bg-[#d4ff00]/10 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="h-2 w-2 rounded-full bg-[#d4ff00] animate-pulse" />
            <span className="font-mono text-xs font-bold tracking-widest text-[#d4ff00] uppercase">
              SHOWREEL // HORIZONTAL EDITION
            </span>
          </div>

          <h1
            className="font-mono text-5xl font-black leading-[0.92] tracking-tighter uppercase text-white md:text-8xl lg:text-9xl"
          >
            WE MAKE BRANDS <br />
            <span className="text-[#d4ff00]">
              MOVE FASTER.
            </span>
          </h1>

          <p
            className="mt-6 max-w-xl font-mono text-sm text-white/70 md:text-base font-light"
          >
            An award-winning digital design & motion studio engineering high-velocity scrollytelling websites, WebGL 3D worlds, and iconic brand systems.
          </p>

          <div
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <button
              onClick={toggleMute}
              className="flex items-center gap-3 rounded-full border border-[#d4ff00]/40 bg-black/60 px-5 py-2.5 backdrop-blur-md transition-transform duration-300 hover:scale-105 active:scale-95"
              data-cursor="AUDIO"
            >
              <div className="flex items-end gap-1 h-4">
                <span className={`w-0.5 bg-[#d4ff00] transition-all duration-300 ${!isMuted ? "h-4 animate-bounce" : "h-1"}`} />
                <span className={`w-0.5 bg-[#d4ff00] transition-all duration-300 ${!isMuted ? "h-3 animate-pulse" : "h-2"}`} />
                <span className={`w-0.5 bg-[#d4ff00] transition-all duration-300 ${!isMuted ? "h-4 animate-bounce" : "h-1"}`} />
              </div>
              <span className="font-mono text-xs font-bold tracking-widest text-[#d4ff00]">
                {isMuted ? "SOUND: OFF" : "SOUND: ON"}
              </span>
            </button>

            <button
              onClick={togglePlay}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-5 py-2.5 font-mono text-xs font-bold tracking-widest text-white/80 backdrop-blur-md transition hover:bg-white/10"
              data-cursor="PLAY"
            >
              {isPlaying ? "PAUSE REEL" : "PLAY REEL"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

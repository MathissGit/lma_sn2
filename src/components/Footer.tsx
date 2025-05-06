"use client";

import { Play, SkipBack, SkipForward, Shuffle, Repeat, VolumeX, Volume1, Volume2 } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [volume, setVolume] = useState(50); // État pour le volume (0 à 100)

  // Fonction pour déterminer l'icône de volume en fonction du niveau sonore
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} className="text-gray-400" />;
    if (volume > 0 && volume <= 50) return <Volume1 size={20} className="text-gray-400" />;
    return <Volume2 size={20} className="text-gray-400" />;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 z-50 bg-[#000000] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src="https://via.placeholder.com/48"
          alt="cover"
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="text-sm font-semibold text-white">Nom du morceau</p>
          <p className="text-xs text-gray-400">Artiste</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-4">
          <button className="text-gray-400 hover:text-[#03DAC6] transition">
            <Shuffle size={20} />
          </button>
          <button className="text-gray-400 hover:text-[#03DAC6] transition">
            <SkipBack size={20} />
          </button>
          <button className="text-[#03DAC6] hover:text-white rounded-full transition">
            <Play size={25} />
          </button>
          <button className="text-gray-400 hover:text-[#03DAC6] transition">
            <SkipForward size={20} />
          </button>
          <button className="text-gray-400 hover:text-[#03DAC6] transition">
            <Repeat size={20} />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400">0:00</span>
          <div className="w-64 h-1 bg-gray-600 rounded-full overflow-hidden">
            <div className="w-1/3 h-full bg-[#03DAC6]"></div>
          </div>
          <span className="text-xs text-gray-400">3:45</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        {getVolumeIcon()}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 h-1 bg-[#03DAC6] rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #03DAC6 ${volume}%, #444 ${volume}%)`,
          }}
        />
      </div>
    </footer>
  );
}

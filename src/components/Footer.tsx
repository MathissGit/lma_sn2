"use client";

import { Play, Pause, SkipBack, SkipForward, VolumeX, Volume1, Volume2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

// Simule la liste des morceaux téléchargés (remplace par ton vrai state/context si besoin)
const useDownloadedTracks = () => {
  // À remplacer par ton vrai fetch ou contexte global
  const [tracks, setTracks] = useState<any[]>([]);
  useEffect(() => {
    fetch("/api/files")
      .then((res) => res.json())
      .then((data) => setTracks(data.files || []));
  }, []);
  return tracks;
};

export default function Footer() {
  const { currentTrack, setCurrentTrack } = usePlayer();
  const tracks = useDownloadedTracks();
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(50);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Trouve l'index du morceau courant
  const currentIndex = tracks.findIndex((t) => t.url === currentTrack?.url);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      if (currentTrack?.url) {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  }, [currentTrack]);

  // Met à jour le volume du lecteur audio
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
    if (audioRef.current) {
      audioRef.current.volume = Number(e.target.value) / 100;
    }
  };

  // Joue ou met en pause la musique
  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Met à jour la progression
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
    }
  };

  // Met à jour la durée totale
  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  // Permet de cliquer sur la barre pour avancer/reculer
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setProgress(newTime);
    }
  };

  // Aller au morceau précédent
  const handlePrev = () => {
    if (tracks.length === 0) return;
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tracks.length - 1;
    setCurrentTrack(tracks[prevIndex]);
  };

  // Aller au morceau suivant
  const handleNext = () => {
    if (tracks.length === 0) return;
    const nextIndex = currentIndex < tracks.length - 1 ? currentIndex + 1 : 0;
    setCurrentTrack(tracks[nextIndex]);
  };

  // Fonction pour déterminer l'icône de volume
  const getVolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 50) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
  };

  // Format mm:ss
  const formatTime = (s: number) => {
    if (isNaN(s)) return "0:00";
    const min = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 h-24 z-50 bg-[#000000] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <img
          src={currentTrack?.thumbnail || "https://via.placeholder.com/48"}
          alt="cover"
          className="w-12 h-12 rounded"
        />
        <div>
          <p className="text-sm font-semibold text-white">{currentTrack?.title || "Aucune musique"}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-2 w-[350px]">
        <div className="flex items-center gap-4">
          <button
            className="text-gray-400 hover:text-[#03DAC6] transition"
            onClick={handlePrev}
            disabled={tracks.length === 0}
            title="Précédent"
          >
            <SkipBack size={24} />
          </button>
          <button
            className="text-[#03DAC6] hover:text-white rounded-full transition"
            onClick={handlePlayPause}
            disabled={!currentTrack?.url}
            title={isPlaying ? "Pause" : "Lecture"}
          >
            {isPlaying ? <Pause size={28} /> : <Play size={28} />}
          </button>
          <button
            className="text-gray-400 hover:text-[#03DAC6] transition"
            onClick={handleNext}
            disabled={tracks.length === 0}
            title="Suivant"
          >
            <SkipForward size={24} />
          </button>
        </div>
        {/* Barre de progression */}
        <div className="flex items-center gap-2 w-full">
          <span className="text-xs text-gray-400 w-10 text-right">{formatTime(progress)}</span>
          <input
            type="range"
            min={0}
            max={duration || 0}
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-[#03DAC6] rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #03DAC6 ${duration ? (progress / duration) * 100 : 0}%, #444 ${duration ? (progress / duration) * 100 : 0}%)`,
            }}
          />
          <span className="text-xs text-gray-400 w-10 text-left">{formatTime(duration)}</span>
        </div>
        {currentTrack?.url && (
          <audio
            ref={audioRef}
            src={currentTrack.url}
            autoPlay
            onEnded={handleNext}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            className="hidden"
          />
        )}
      </div>

      <div className="flex items-center gap-4">
        {getVolumeIcon()}
        <input
          type="range"
          min="0"
          max="100"
          value={volume}
          onChange={handleVolumeChange}
          className="w-24 h-1 bg-[#03DAC6] rounded-full appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #03DAC6 ${volume}%, #444 ${volume}%)`,
          }}
        />
      </div>
    </footer>
  );
}

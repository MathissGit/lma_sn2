"use client";
import { useState, useEffect } from "react";
import { Play, Heart, HeartFilled } from "lucide-react";
import { usePlayer } from "../../context/PlayerContext";

export default function Bibliotheque() {
  interface File {
    title: string;
    thumbnail?: string;
    url?: string;
  }

  const [downloadedFiles, setDownloadedFiles] = useState<File[]>([]);
  const [liked, setLiked] = useState<string[]>([]);
  const { setCurrentTrack } = usePlayer();

  const fetchDownloadedFiles = async () => {
    const res = await fetch("/api/files");
    const data = await res.json();
    setDownloadedFiles(data.files);
  };

  useEffect(() => {
    fetchDownloadedFiles();
  }, []);

  const toggleLike = (title: string) => {
    setLiked((prev) =>
      prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
    );
  };

  useEffect(() => {
    localStorage.setItem("likedTitles", JSON.stringify(liked));
  }, [liked]);

  return (
    <main className="flex flex-col gap-8 flex-grow text-white">
      <h1 className="text-3xl font-bold text-center sm:text-left">Bibliothèque</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {downloadedFiles.map((file) => (
          <div
            key={file.title}
            className="relative flex flex-col items-center bg-[#1E1E1E] p-2 rounded-md"
          >
            <div className="relative group">
              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.title}
                  className="w-32 h-32 object-cover rounded-md mb-2 transition-transform group-hover:blur-xs"
                />
              ) : (
                <div className="w-32 h-32 flex items-center justify-center bg-gray-700 text-gray-400 rounded-md mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19V6l12-2v13M9 10l12-2M9 14l12-2"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 flex items-center justify-center gap-4 rounded-md opacity-0 group-hover:opacity-50 transition-opacity">
                <button
                  className="p-2 bg-white rounded-full text-black hover:bg-gray-200"
                  onClick={() =>
                    setCurrentTrack({
                      title: file.title,
                      thumbnail: file.thumbnail,
                      url: file.url, // Assure-toi que file.url existe dans l'API /api/files
                    })
                  }
                >
                  <Play size={20} />
                </button>
                <button
                  className="p-2 bg-white rounded-full text-black hover:bg-gray-200 transition-colors"
                  onClick={() => toggleLike(file.title)}
                  title={
                    liked.includes(file.title)
                      ? "Retirer des favoris"
                      : "Ajouter aux favoris"
                  }
                >
                  <Heart
                    size={20}
                    fill={liked.includes(file.title) ? "#03DAC6" : "none"}
                    stroke={liked.includes(file.title) ? "#03DAC6" : "currentColor"}
                  />
                </button>
              </div>
            </div>
            <p className="text-sm font-medium text-center">{file.title}</p>
          </div>
        ))}
      </div>
      {downloadedFiles.length === 0 && (
        <p className="text-center text-gray-400">Aucun fichier téléchargé pour le moment.</p>
      )}
    </main>
  );
}

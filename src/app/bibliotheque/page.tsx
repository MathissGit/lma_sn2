"use client";
import { useState, useEffect } from "react";

export default function Home() {
  interface File {
    title: string;
    thumbnail?: string;
  }

  const [downloadedFiles, setDownloadedFiles] = useState<File[]>([]);

  const fetchDownloadedFiles = async () => {
    const res = await fetch('/api/files');
    const data = await res.json();
    setDownloadedFiles(data.files);
  };

  useEffect(() => {
    fetchDownloadedFiles(); // Charger les fichiers téléchargés au chargement de la page
  }, []);

  return (
    <div className="min-h-screen text-white p-8 sm:p-20">
      <main className="flex flex-col gap-8">
        <h1 className="text-3xl font-bold text-center">Bibliothèque</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {downloadedFiles.map((file) => (
            <div
              key={file.title}
              className="flex flex-col items-center bg-[#1E1E1E] p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              {file.thumbnail ? (
                <img
                  src={file.thumbnail}
                  alt={file.title}
                  className="w-48 h-48 object-cover rounded-lg mb-4"
                />
              ) : (
                <div className="w-48 h-48 flex items-center justify-center bg-gray-700 text-gray-400 rounded-lg mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16"
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
              <p className="text-lg font-semibold text-center">{file.title}</p>
            </div>
          ))}
        </div>
        {downloadedFiles.length === 0 && (
          <p className="text-center text-gray-400">Aucun fichier téléchargé pour le moment.</p>
        )}
      </main>
    </div>
  );
}

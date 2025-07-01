"use client";
import { Folder, FolderOpen, Play, Plus, Heart } from "lucide-react"; 
import { AiFillHeart } from "react-icons/ai";

const playlists = [
  { id: 1, name: "Chill" },
  { id: 2, name: "Workout" },
  { id: 3, name: "Lo-fi" },
];

export default function Sidebar() {
  return (
    <aside className="fixed top-24 bottom-24 left-0 w-[120px] z-40 bg-[#000000] overflow-auto">
      <nav className="flex flex-col items-center py-6 px-4 gap-6">
        <button
          className="relative group p-4 rounded-xl transition"
          title="Bibliothèque"
          onClick={() => window.location.href = '/bibliotheque'}
        >
          <Folder
            size={28}
            className="text-white group-hover:hidden transition-transform"
          />
          <FolderOpen
            size={28}
            className="text-[#03DAC6] hidden group-hover:inline transition-transform"
          />
        </button>

        <button
          className="relative group p-4 rounded-xl transition"
          title="Morceaux aimés"
          onClick={() => window.location.href = '/favoris'}
        >
          <Heart
            size={28}
            className="text-white group-hover:hidden transition-transform"
          />
          <AiFillHeart
            size={28}
            className="text-[#03DAC6] hidden group-hover:inline transition-transform"
          />
        </button>

        <div className="w-3/5 border-t-2 border-stone-700"></div>

        <div className="flex flex-col gap-5 mt-6 flex-1 overflow-y-auto">
          <button
            className="relative group p-4 rounded-xl transition bg-stone-800"
            title="Créer une playlist"
          >
            <Plus
              size={28}
              className="text-white group-hover:text-[#03DAC6] transition-transform "
            />
          </button>

          {playlists.map((playlist) => (
            <button
              key={playlist.id}
              className="relative group p-4 bg-stone-800 rounded-xl transition group-hover:bg-transparent"
              title={`Playlist ${playlist.id}`}
            >
              <Play
                size={28}
                className="text-white group-hover:text-[#03DAC6] transition-transform"
              />
            </button>
          ))}
        </div>
      </nav>
    </aside>
  );
}


"use client";

import { useState } from "react";
import { CircleArrowDown, User, Bell } from "lucide-react";

export default function Header({ onSubmit }: { onSubmit: (link: string) => void }) {
const [inputValue, setInputValue] = useState("");

const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
    onSubmit(inputValue); // Transmet le lien au parent
    setInputValue(""); // Réinitialise l'input
    }
};

return (
    <header className="fixed top-0 left-0 right-0 h-24 z-50 bg-[#000000] px-6 py-4 flex items-center justify-between">
    <div className="text-white text-2xl font-bold ml-2">WeScrap.mp3</div>

    <div className="flex-1 flex justify-center">
        <form onSubmit={handleSubmit} className="relative w-1/3">
        <CircleArrowDown className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Scarp it here..."
            className="w-full bg-zinc-800 text-white text-sm pl-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#03DAC6]"
        />
        </form>
    </div>

    <div className="flex items-center gap-6">
        <button className="relative group bg-zinc-800 p-2 rounded-full transition-colors">
        <Bell size={24} className="text-white group-hover:text-[#03DAC6] transition-colors" />
        </button>
        <button className="relative group bg-zinc-800 p-2 rounded-full transition-colors">
        <User size={24} className="text-white group-hover:text-[#03DAC6] transition-colors" />
        </button>
    </div>
    </header>
);
}

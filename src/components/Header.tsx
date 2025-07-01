import { Search, User, Bell } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Header() {
return (
    <header className="fixed top-0 left-0 right-0 h-24 z-50 bg-[#000000] px-6 py-4 flex items-center justify-between">
    <div className="text-white text-2xl font-bold ml-2">
        WeScrap.mp3
    </div>

    <div className="flex-1 flex justify-center">
        <div className="relative w-1/3">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
            type="text"
            placeholder="Rechercher..."
            className="w-full bg-zinc-800 text-white text-sm pl-10 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#03DAC6]"
        />
        </div>
    </div>

    <div className="flex items-center gap-6">
        <button className="relative group bg-zinc-800 p-2 rounded-full transition-colors">
        <Bell
            size={24}
            className="text-white group-hover:text-[#03DAC6] transition-colors"
        />
        </button>
        <button className="relative group bg-zinc-800 p-2 rounded-full transition-colors">
        <User
            size={24}
            className="text-white group-hover:text-[#03DAC6] transition-colors"
        />
        </button>
        <LogoutButton />
    </div>
    </header>
);
}

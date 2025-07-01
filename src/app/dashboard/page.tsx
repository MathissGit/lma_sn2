import { Music } from "lucide-react";

export default function Dashboard() {
return (
    <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start text-2xl">
    <div className="flex items-center gap-4">
        <Music size={25} /> WeScrap.mp3 Dashboard
    </div>
    </main>
);
}

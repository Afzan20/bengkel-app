import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#151515] border-b border-zinc-800 px-6 py-5">
      <div className="flex items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-zinc-400 mt-1">
            Welcome back, Admin Garage
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-zinc-900 px-4 py-3 rounded-2xl w-80">
            <Search className="text-zinc-500" size={18} />

            <input
              type="text"
              placeholder="Search service..."
              className="bg-transparent outline-none ml-3 text-sm w-full"
            />
          </div>

          <button className="w-12 h-12 rounded-2xl bg-zinc-900 flex items-center justify-center hover:bg-zinc-800 transition-all">
            <Bell size={20} />
          </button>

          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-12 h-12 rounded-2xl object-cover"
          />
        </div>
      </div>
    </header>
  );
}
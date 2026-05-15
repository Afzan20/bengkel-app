import { Bell, Search } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-[#F7F7F7] px-6 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-[32px] font-bold leading-[125%]">Hi, Admin Garage</h1>
        <p className="text-xs text-gray-400">Let&apos;s check your Garage today</p>
      </div>

      <div className="hidden md:flex items-center bg-white px-4 py-3 rounded-lg w-80">
        <Search size={16} className="text-gray-400" />
        <input
          placeholder="Search..."
          className="bg-transparent outline-none ml-3 text-sm w-full"
        />
      </div>

      <div className="flex items-center gap-4">
        <Bell size={18} className="text-black" />

        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full"
          />

          <div className="hidden md:block">
            <h2 className="text-sm font-bold text-black">Admin</h2>
            <p className="text-xs text-gray-400">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
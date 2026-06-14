import { Bell } from "lucide-react";

export default function NotificationButton() {
  return (
    <button className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white transition">
      <Bell size={18} className="text-black" />

      <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
    </button>
  );
}
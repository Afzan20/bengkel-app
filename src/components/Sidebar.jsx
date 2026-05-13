import {
  LayoutDashboard,
  Wrench,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },

    {
      title: "Services",
      icon: <Wrench size={20} />,
      path: "/services",
    },

    {
      title: "Bookings",
      icon: <CalendarDays size={20} />,
      path: "/bookings",
    },

    {
      title: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  return (
    <aside className="hidden lg:flex w-72 bg-[#151515] border-r border-zinc-800 flex-col">
      <div className="p-8 border-b border-zinc-800">
        <h1 className="text-3xl font-bold tracking-wide">
          Garage<span className="text-orange-500">Pro</span>
        </h1>
      </div>

      <div className="flex-1 p-5 space-y-3">
        {menus.map((menu, index) => (
          <button
            key={index}
            onClick={() => navigate(menu.path)}
            className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all duration-300"
          >
            {menu.icon}

            <span className="font-medium">{menu.title}</span>
          </button>
        ))}
      </div>

      <div className="p-5 border-t border-zinc-800">
        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center gap-3 px-5 py-4 rounded-2xl text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}
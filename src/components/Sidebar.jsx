import {
  LayoutDashboard,
  Wrench,
  Users,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";

export default function Sidebar() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const menus = [
    { title: "Dashboard", icon: <LayoutDashboard size={18} />, path: "/dashboard", active: true },
    { title: "Inventory", icon: <Wrench size={18} />, path: "/inventory" },
    { title: "Repair Tracker", icon: <Settings size={18} />, path: "/repair" },
    { title: "Customers", icon: <Users size={18} />, path: "/customers" },
    { title: "Bookings", icon: <CalendarDays size={18} />, path: "/bookings" },
  ];

  return (
    <aside className="hidden lg:flex w-56 bg-white flex-col p-6 sidebar-font">
      <div className="mb-10">
        <div className="flex gap-1 mb-3">
          <div className="w-5 h-10 bg-[#E5F12C] rounded-full rotate-[-15deg]" />
          <div className="w-5 h-10 bg-[#E5F12C] rounded-full rotate-[-15deg]" />
          <div className="w-5 h-10 bg-[#E5F12C] rounded-full rotate-[-15deg]" />
        </div>

        <h1 className="text-[32px] font-bold leading-[125%]">GaragePro</h1>
      </div>

      <nav className="space-y-3 flex-1">
        {menus.map((menu, index) => (
          <button
            key={index}
            onClick={() => navigate(menu.path)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
              menu.active
                ? "bg-[#E5F12C] text-black"
                : "text-gray-600 hover:bg-[#E5F12C]"
            }`}
          >
            {menu.icon}
            {menu.title}
          </button>
        ))}
      </nav>

      <button
        onClick={() => setOpenModal(true)}
        className="flex items-center gap-3 text-sm text-gray-600 hover:text-black"
      >
        <LogOut size={18} />
        Logout
      </button>

      <Modal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onConfirm={() => {
          setOpenModal(false);
          navigate("/");
        }}
      />
    </aside>
  );
}
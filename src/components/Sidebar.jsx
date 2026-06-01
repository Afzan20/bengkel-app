import {
  LayoutDashboard,
  Wrench,
  Users,
  CalendarDays,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import SidebarMenuItem from "./SidebarMenuItem";
import Modal from "./Modal";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);

  const menus = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      path: "/dashboard",
    },
    {
      title: "Inventory",
      icon: <Wrench size={18} />,
      path: "/inventory",
    },
    {
      title: "Repair Tracker",
      icon: <Settings size={18} />,
      path: "/repair",
    },
    {
      title: "Customers",
      icon: <Users size={18} />,
      path: "/customers",
    },
    {
      title: "Bookings",
      icon: <CalendarDays size={18} />,
      path: "/bookings",
    },
  ];

  return (
    <aside className="hidden lg:flex w-56 bg-white flex-col p-6 sidebar-font">
      <div className="mb-10">
        <div className="flex gap-1 mb-3">
          <div className="w-5 h-10 bg-[#DEE33E] rounded-full rotate-[-15deg]" />
          <div className="w-5 h-10 bg-[#DEE33E] rounded-full rotate-[-15deg]" />
          <div className="w-5 h-10 bg-[#DEE33E] rounded-full rotate-[-15deg]" />
        </div>

        <h1 className="font-bold text-black text-xl">
          GaragePro
        </h1>
      </div>

      <nav className="space-y-3 flex-1">
        {menus.map((menu) => (
          <SidebarMenuItem
            key={menu.path}
            icon={menu.icon}
            title={menu.title}
            active={location.pathname === menu.path}
            onClick={() => navigate(menu.path)}
          />
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
        onConfirm={() => navigate("/")}
      />
    </aside>
  );
}
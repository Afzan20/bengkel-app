import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Wrench,
  Package,
  Receipt,
  BarChart3,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

import SidebarMenuItem from "./SidebarMenuItem";
import Modal from "../common/Modal";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [openModal, setOpenModal] = useState(false);

  const menus = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={18} />,
    path: "/admin/dashboard",
  },
  {
    title: "Customers",
    icon: <Users size={18} />,
    path: "/admin/customers",
  },
  {
    title: "Bookings",
    icon: <CalendarDays size={18} />,
    path: "/admin/bookings",
  },
  {
    title: "Repair Tracker",
    icon: <Wrench size={18} />,
    path: "/admin/repair",
  },
  {
    title: "Inventory",
    icon: <Package size={18} />,
    path: "/admin/inventory",
  },
  {
    title: "Transactions",
    icon: <Receipt size={18} />,
    path: "/admin/transactions",
  },
  {
    title: "Reports",
    icon: <BarChart3 size={18} />,
    path: "/admin/reports",
  },
  {
    title: "Profile",
    icon: <UserRound size={18} />,
    path: "/admin/profile",
  },
  {
    title: "Settings",
    icon: <Settings size={18} />,
    path: "/admin/settings",
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

        <h1 className="font-bold text-black text-xl">GaragePro</h1>
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
        onConfirm={() => {
          localStorage.removeItem("currentUser");

          setOpenModal(false);

          navigate("/login");
        }}
      />
    </aside>
  );
}

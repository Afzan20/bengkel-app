import { Outlet } from "react-router-dom";
import Sidebar from "../components/layout/AdminSidebar";
import Header from "../components/layout/Header";
import AdminSidebar from "../components/layout/AdminSidebar";

export default function AdminLayout() {
  return (
    <div className="h-screen bg-[#2b2b2b] flex overflow-hidden">
      <AdminSidebar />

      <div className="flex-1 bg-[#F7F7F7] flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
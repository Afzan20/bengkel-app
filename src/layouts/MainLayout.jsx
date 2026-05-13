import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function MainLayout() {
  return (
    <div className="flex h-screen bg-[#0F0F0F] text-white overflow-hidden">

      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Header />

        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}
import { Outlet } from "react-router-dom";
import MemberSidebar from "../components/layout/MemberSidebar";
import Header from "../components/layout/Header";

export default function MemberLayout() {
  return (
    <div className="h-screen bg-[#2b2b2b] flex overflow-hidden">
      <MemberSidebar />

      <div className="flex-1 bg-[#F7F7F7] flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
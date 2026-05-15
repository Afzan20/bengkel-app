import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-[#E5F12C] flex flex-col items-center justify-center p-6">
      <div className="mb-8 text-center">
        <div className="flex justify-center gap-2 mb-3">
          <div className="w-7 h-14 bg-black rounded-full rotate-[-15deg]" />
          <div className="w-7 h-14 bg-black rounded-full rotate-[-15deg]" />
          <div className="w-7 h-14 bg-black rounded-full rotate-[-15deg]" />
        </div>

        <h1 className="text-[32px] font-bold leading-[125%]">
          GaragePro
        </h1>
      </div>

      <Outlet />
    </div>
  );
}
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="min-h-screen grid md:grid-cols-2 bg-zinc-950">
      
      <div className="hidden md:block">
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="car"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex items-center justify-center p-8">
        <Outlet />
      </div>
    </div>
  );
}
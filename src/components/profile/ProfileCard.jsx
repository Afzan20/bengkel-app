import { Camera } from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center">

      <img
        src="https://i.pravatar.cc/200"
        alt="Profile"
        className="w-32 h-32 rounded-full object-cover"
      />

      <h2 className="text-xl font-bold mt-4">
        Admin Garage
      </h2>

      <p className="text-gray-500">
        Administrator
      </p>

      <button className="mt-6 flex items-center gap-2 bg-[#DEE33E] px-5 py-2 rounded-xl font-semibold">
        <Camera size={18} />
        Change Photo
      </button>

    </div>
  );
}
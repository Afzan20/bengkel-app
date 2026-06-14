export default function ProfileMenu() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="flex items-center gap-3">
      <img
        src="https://i.pravatar.cc/100"
        alt="profile"
        className="w-10 h-10 rounded-full object-cover"
      />

      <div className="hidden md:block">
        <h2 className="text-sm font-bold text-black">
          {currentUser?.fullname || "Guest"}
        </h2>

        <p className="text-xs text-gray-400">
          @{currentUser?.username || "guest"}
        </p>
      </div>
    </div>
  );
}
export default function SidebarMenuItem({
  icon,
  title,
  active = false,
  onClick,
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-semibold transition ${
        active
          ? "bg-[#DEE33E] text-black"
          : "text-gray-600 hover:bg-[#DEE33E]"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}
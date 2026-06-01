import { Search } from "lucide-react";

export default function SearchInput() {
  return (
    <div className="hidden md:flex items-center bg-white px-4 py-3 rounded-lg w-80">
      <Search size={16} className="text-gray-400" />

      <input
        type="text"
        placeholder="Search..."
        className="bg-transparent outline-none ml-3 text-sm w-full"
      />
    </div>
  );
}
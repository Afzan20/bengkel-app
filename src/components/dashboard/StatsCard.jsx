import { MoreVertical } from "lucide-react";

export default function StatsCard({ title, value, growth = "+20% from last week" }) {
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm">
      <div className="flex justify-between">
        <p className="text-sm font-bold text-black">{title}</p>
        <MoreVertical size={18} />
      </div>

      <h1 className="text-[32px] font-bold leading-[125%] mt-8">
        {value}
      </h1>

      <p className="text-xs text-[#9FA324] mt-2">
        ↗ {growth}
      </p>
    </div>
  );
}
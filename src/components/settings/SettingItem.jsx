import { ChevronRight } from "lucide-react";

export default function SettingItem({
  icon,
  title,
  description,
}) {
  return (
    <button className="w-full flex justify-between items-center p-4 hover:bg-gray-50 rounded-xl transition">

      <div className="flex gap-4 items-center">

        <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center">
          {icon}
        </div>

        <div className="text-left">
          <h3 className="font-semibold">
            {title}
          </h3>

          <p className="text-sm text-gray-500">
            {description}
          </p>
        </div>

      </div>

      <ChevronRight size={18} />

    </button>
  );
}
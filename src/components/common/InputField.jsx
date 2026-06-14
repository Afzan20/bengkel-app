import { Input } from "@/components/ui/input";

export default function InputField({
  type = "text",
  placeholder,
  value,
  onChange,
  icon,
}) {
  return (
    <div className="relative">
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full bg-[#F7F7F7] px-4 py-6 rounded-lg outline-none text-sm border border-transparent focus-visible:ring-0 focus-visible:border-[#DEE33E]"
      />

      {icon && (
        <div className="absolute right-4 top-4 text-gray-400">
          {icon}
        </div>
      )}
    </div>
  );
}
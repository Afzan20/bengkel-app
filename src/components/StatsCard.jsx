export default function StatsCard({
  title,
  value,
  growth,
}) {
  return (
    <div className="bg-[#1B1B1B] rounded-3xl p-6 border border-zinc-800 hover:border-orange-500 transition-all duration-300">
      <p className="text-zinc-400 text-sm">{title}</p>

      <div className="flex items-end justify-between mt-5">
        <h1 className="text-[32px] font-bold leading-[125%]">{value}</h1>

        <span className="text-orange-500 text-sm font-semibold">
          {growth}
        </span>
      </div>
    </div>
  );
}
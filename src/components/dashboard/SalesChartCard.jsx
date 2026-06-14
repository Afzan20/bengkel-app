export default function SalesChartCard() {
  const chartData = [70, 120, 90, 160, 110, 140, 80];

  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">
      <div className="flex justify-between mb-6">
        <div>
          <p className="text-sm text-gray-400">Overall Sales</p>
          <h1 className="text-[32px] font-bold leading-[125%]">
            £56,345.98
          </h1>
        </div>

        <button className="bg-[#F7F7F7] px-4 py-2 rounded-lg text-sm">
          Last 7 month
        </button>
      </div>

      <div className="h-56 flex items-end gap-5">
        {chartData.map((height, index) => (
          <div
            key={index}
            className="flex-1 bg-[#DEE33E]/20 rounded-t-xl relative"
          >
            <div
              style={{ height: `${height}px` }}
              className="absolute bottom-0 w-full bg-[#DEE33E] rounded-t-xl"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
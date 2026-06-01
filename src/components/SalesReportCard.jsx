export default function SalesReportCard() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-[32px] font-bold leading-[125%]">
        Sales Report
      </h1>

      <div className="w-40 h-40 rounded-full border-[28px] border-[#DEE33E] mx-auto mt-8 flex items-center justify-center">
        <div className="w-12 h-12 bg-[#9FA324] rounded-full" />
      </div>

      <button className="w-full mt-8 bg-[#9FA324] text-white py-3 rounded-lg font-bold">
        Export Now
      </button>
    </div>
  );
}
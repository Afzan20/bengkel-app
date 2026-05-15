import { MoreVertical } from "lucide-react";
import Badge from "../components/Badge";

export default function Dashboard() {
  const cards = [
    { title: "New Net Income", value: "£8,245.00" },
    { title: "Total Bookings", value: "256" },
    { title: "Resolved Issues", value: "1,256" },
  ];

  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl p-5">
            <div className="flex justify-between">
              <p className="text-sm font-bold text-black">{card.title}</p>
              <MoreVertical size={18} />
            </div>

            <h1 className="text-[32px] font-bold leading-[125%]">{card.value}</h1>

            <p className="text-xs text-[#A7AF1D] mt-2">
              ↗ +20% from last week
            </p>
          </div>
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white rounded-xl p-6">
          <div className="flex justify-between mb-6">
            <div>
              <p className="text-sm text-gray-400">Overall Sales</p>
              <h1 className="text-[32px] font-bold leading-[125%]">£56,345.98</h1>
            </div>

            <button className="bg-[#F7F7F7] px-4 py-2 rounded-lg text-sm">
              Last 7 month
            </button>
          </div>

          <div className="h-56 flex items-end gap-5">
            {[70, 120, 90, 160, 110, 140, 80].map((h, i) => (
              <div key={i} className="flex-1 bg-[#E5F12C]/20 rounded-t-xl relative">
                <div
                  style={{ height: `${h}px` }}
                  className="absolute bottom-0 w-full bg-[#E5F12C] rounded-t-xl"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h1 className="text-[32px] font-bold leading-[125%]">Sales Report</h1>

          <div className="w-40 h-40 rounded-full border-[28px] border-[#E5F12C] mx-auto mt-8 flex items-center justify-center">
            <div className="w-12 h-12 bg-[#A7AF1D] rounded-full" />
          </div>

          <button className="w-full mt-8 bg-[#A7AF1D] text-white py-3 rounded-lg font-bold">
            Export Now
          </button>
        </div>
      </section>

      <section className="bg-white rounded-xl p-6">
  
          <h1 className="text-[32px] font-bold leading-[125%] text-black">
            Recent Order
          </h1>

          <table className="w-full text-sm mt-6">

            <thead>
              <tr className="text-left text-gray-400 border-b border-gray-100">
                
                <th className="pb-4 font-medium">
                  No
                </th>

                <th className="pb-4 font-medium">
                  User Name
                </th>

                <th className="pb-4 font-medium">
                  Order Date
                </th>

                <th className="pb-4 font-medium">
                  Status
                </th>

                <th className="pb-4 font-medium">
                  Price
                </th>

              </tr>
            </thead>

            <tbody className="text-black">

              {["Shift Creme", "Shift Creme", "Shift Creme"].map((name, i) => (

                <tr
                  key={i}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >

                  <td className="py-5">
                    0{i + 1}
                  </td>

                  <td className="font-semibold">
                    {name}
                  </td>

                  <td>
                    March 24, 2022
                  </td>

                  <td>
                    <Badge
                      type="success"
                      text="Repaired"
                    />
                  </td>

                  <td className="font-bold">
                    £130
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </section>
    </div>
  );
}
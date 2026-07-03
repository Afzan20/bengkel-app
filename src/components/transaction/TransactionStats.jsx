import {
  Wallet,
  CircleCheckBig,
  Clock3,
  CircleX,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "Rp125.000.000",
    icon: <Wallet size={22} />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Paid",
    value: "285",
    icon: <CircleCheckBig size={22} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Pending",
    value: "14",
    icon: <Clock3 size={22} />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    title: "Cancelled",
    value: "5",
    icon: <CircleX size={22} />,
    color: "bg-red-100 text-red-600",
  },
];

export default function TransactionStats() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
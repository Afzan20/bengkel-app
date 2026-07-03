import {
  Wallet,
  CalendarDays,
  Users,
  Wrench,
} from "lucide-react";

const stats = [
  {
    title: "Revenue",
    value: "Rp125.000.000",
    icon: <Wallet size={22} />,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Bookings",
    value: "285",
    icon: <CalendarDays size={22} />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Customers",
    value: "168",
    icon: <Users size={22} />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    title: "Completed Repairs",
    value: "241",
    icon: <Wrench size={22} />,
    color: "bg-orange-100 text-orange-600",
  },
];

export default function ReportStats() {
  return (
    <div className="grid grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-500">{item.title}</p>
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
import {
  Users,
  CalendarDays,
  Receipt,
} from "lucide-react";

const stats = [
  {
    title: "Customers",
    value: "168",
    icon: <Users size={20} />,
  },
  {
    title: "Bookings",
    value: "285",
    icon: <CalendarDays size={20} />,
  },
  {
    title: "Transactions",
    value: "125",
    icon: <Receipt size={20} />,
  },
];

export default function ProfileStats() {
  return (
    <div className="grid grid-cols-3 gap-6">

      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
        >
          <div>

            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>

          </div>

          <div className="w-12 h-12 rounded-xl bg-[#DEE33E] flex items-center justify-center">
            {item.icon}
          </div>

        </div>
      ))}

    </div>
  );
}
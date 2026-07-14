import {
  Wallet,
  CalendarDays,
  Users,
  Wrench,
} from "lucide-react";

export default function ReportStats({ data }) {
  const revenue = data.transactions.reduce(
    (sum, item) => sum + Number(item.total_amount || 0),
    0
  );

  const completedRepair = data.bookings.filter(
    (b) => b.status === "Completed"
  ).length;

  function rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  }

  const stats = [
    {
      title: "Revenue",
      value: rupiah(revenue),
      icon: <Wallet size={22} />,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Bookings",
      value: data.bookings.length,
      icon: <CalendarDays size={22} />,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Customers",
      value: data.customers.length,
      icon: <Users size={22} />,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Completed Repairs",
      value: completedRepair,
      icon: <Wrench size={22} />,
      color: "bg-orange-100 text-orange-600",
    },
  ];

  return (
    <div className="grid xl:grid-cols-4 md:grid-cols-2 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-5 flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-500">
              {item.title}
            </p>

            <h2 className="text-2xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div
            className={`w-12 h-12 rounded-xl flex items-center justify-center ${item.color}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}
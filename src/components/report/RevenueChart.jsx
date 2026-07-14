import {
  LineChart,
  Line,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export default function RevenueChart({ data }) {
  const monthly = {};

  data.forEach((trx) => {
    if (!trx.payment_date) return;

    const month = new Date(trx.payment_date).toLocaleString(
      "en-US",
      {
        month: "short",
      }
    );

    monthly[month] =
      (monthly[month] || 0) + Number(trx.total_amount);
  });

  const chart = Object.keys(monthly).map((month) => ({
    month,
    revenue: monthly[month],
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-[350px]">

      <h2 className="text-lg font-semibold mb-4">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height={260}>

        <LineChart data={chart}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#9FA324"
            strokeWidth={3}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>
  );
}
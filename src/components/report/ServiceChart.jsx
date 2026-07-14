import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#EAB308",
  "#3B82F6",
  "#8B5CF6",
  "#22C55E",
];

export default function ServiceChart({ bookings }) {
  const summary = {};

  bookings.forEach((item) => {
    summary[item.status] = (summary[item.status] || 0) + 1;
  });

  const chart = Object.keys(summary).map((status) => ({
    name: status,
    value: summary[status],
  }));

  return (
    <div className="bg-white rounded-2xl shadow p-6 h-[350px]">

      <h2 className="text-lg font-semibold mb-4">
        Booking Overview
      </h2>

      <ResponsiveContainer width="100%" height={260}>

        <PieChart>

          <Pie
            data={chart}
            dataKey="value"
            nameKey="name"
            outerRadius={90}
            label
          >
            {chart.map((_, index) => (
              <Cell
                key={index}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>

          <Tooltip />

        </PieChart>

      </ResponsiveContainer>

    </div>
  );
}
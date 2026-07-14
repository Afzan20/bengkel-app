import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

export default function SalesChartCard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    loadChart();
  }, []);

  async function loadChart() {
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select("status");

    if (error) {
      console.log(error);
      return;
    }

    const pending = bookings.filter(
      (b) => b.status === "Pending"
    ).length;

    const confirmed = bookings.filter(
      (b) => b.status === "Confirmed"
    ).length;

    const completed = bookings.filter(
      (b) => b.status === "Completed"
    ).length;

    const cancelled = bookings.filter(
      (b) => b.status === "Cancelled"
    ).length;

    setData([
      {
        status: "Pending",
        total: pending,
      },
      {
        status: "Confirmed",
        total: confirmed,
      },
      {
        status: "Completed",
        total: completed,
      },
      {
        status: "Cancelled",
        total: cancelled,
      },
    ]);
  }

  return (
    <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm">

      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-2xl font-bold">
            Booking Statistics
          </h2>

          <p className="text-gray-500 mt-2">
            Current booking status overview
          </p>

        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer
          width="100%"
          height="100%"
        >

          <BarChart data={data}>

            <CartesianGrid
              strokeDasharray="3 3"
            />

            <XAxis
              dataKey="status"
            />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="total"
              fill="#DEE33E"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  );
}
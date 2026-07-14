import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import StatsCard from "../../components/dashboard/StatsCard";
import SalesChartCard from "../../components/dashboard/SalesChartCard";
import SalesReportCard from "../../components/dashboard/SalesReportCard";
import RecentOrderTable from "../../components/dashboard/RecentOrderTable";

export default function Dashboard() {
  const [summary, setSummary] = useState({
    customers: 0,
    bookings: 0,
    revenue: 0,
    mechanics: 0,
    todayBookings: 0,
    completed: 0,
  });

  useEffect(() => {
    loadDashboard();
  }, []);

  async function loadDashboard() {
    const today = new Date().toISOString().split("T")[0];

    const [
      users,
      bookings,
      mechanics,
      transactions,
    ] = await Promise.all([
      supabase
        .from("users")
        .select("*", { count: "exact", head: true })
        .eq("role", "Member"),

      supabase
        .from("bookings")
        .select("*"),

      supabase
        .from("mechanics")
        .select("*", { count: "exact", head: true })
        .eq("status", "Available"),

      supabase
        .from("transactions")
        .select("total_amount")
        .eq("payment_status", "Paid"),
    ]);

    const revenue =
      transactions.data?.reduce(
        (sum, trx) => sum + Number(trx.total_amount),
        0
      ) || 0;

    const todayBookings =
      bookings.data?.filter(
        (b) => b.booking_date === today
      ).length || 0;

    const completed =
      bookings.data?.filter(
        (b) => b.status === "Completed"
      ).length || 0;

    setSummary({
      customers: users.count || 0,
      bookings: bookings.data?.length || 0,
      revenue,
      mechanics: mechanics.count || 0,
      todayBookings,
      completed,
    });
  }

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  const cards = [
    {
      title: "Revenue",
      value: rupiah(summary.revenue),
    },
    {
      title: "Bookings",
      value: summary.bookings,
    },
    {
      title: "Customers",
      value: summary.customers,
    },
    {
      title: "Available Mechanics",
      value: summary.mechanics,
    },
    {
      title: "Today's Booking",
      value: summary.todayBookings,
    },
    {
      title: "Completed Service",
      value: summary.completed,
    },
  ];

  return (
    <div className="space-y-6">

      <section className="grid lg:grid-cols-3 md:grid-cols-2 gap-5">

        {cards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
          />
        ))}

      </section>

      <section className="grid lg:grid-cols-3 gap-5">

        <SalesChartCard />

        <SalesReportCard />

      </section>

      <RecentOrderTable />

    </div>
  );
}
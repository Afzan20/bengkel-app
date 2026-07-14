import { useEffect, useState } from "react";
import {
  Car,
  CalendarDays,
  Wrench,
  ReceiptText,
} from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function SummaryCards() {
  const [summary, setSummary] = useState({
    vehicles: 0,
    bookings: 0,
    repairs: 0,
    transactions: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  async function loadSummary() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const [
      vehicles,
      bookings,
      repairs,
      transactions,
    ] = await Promise.all([
      supabase
        .from("vehicles")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id),

      supabase
        .from("bookings")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id)
        .neq("status", "Completed"),

      supabase
        .from("repair_tracker")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id)
        .neq("status", "Completed"),

      supabase
        .from("transactions")
        .select("*", { count: "exact", head: true })
        .eq("user_id", currentUser.id),
    ]);

    setSummary({
      vehicles: vehicles.count || 0,
      bookings: bookings.count || 0,
      repairs: repairs.count || 0,
      transactions: transactions.count || 0,
    });
  }

  const cards = [
    {
      title: "My Vehicles",
      value: summary.vehicles,
      icon: Car,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Active Booking",
      value: summary.bookings,
      icon: CalendarDays,
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      title: "Repair Progress",
      value: summary.repairs,
      icon: Wrench,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Transactions",
      value: summary.transactions,
      icon: ReceiptText,
      color: "bg-purple-100 text-purple-700",
    },
  ];

  return (
    <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white rounded-3xl p-6 shadow hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div
              className={`w-14 h-14 rounded-2xl flex items-center justify-center ${card.color}`}
            >
              <Icon size={28} />
            </div>

            <h2 className="text-4xl font-bold mt-6">
              {card.value}
            </h2>

            <p className="text-gray-500 mt-2">
              {card.title}
            </p>
          </div>
        );
      })}
    </section>
  );
}
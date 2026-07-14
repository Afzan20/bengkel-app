import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function StatisticsSection() {
  const [stats, setStats] = useState({
    customers: 0,
    bookings: 0,
    mechanics: 0,
    transactions: 0,
  });

  useEffect(() => {
    getStatistics();
  }, []);

  async function getStatistics() {
    try {
      const [
        usersResult,
        bookingsResult,
        mechanicsResult,
        transactionsResult,
      ] = await Promise.all([
        supabase
          .from("users")
          .select("*", { count: "exact", head: true })
          .eq("role", "Member"),

        supabase
          .from("bookings")
          .select("*", { count: "exact", head: true }),

        supabase
          .from("mechanics")
          .select("*", { count: "exact", head: true })
          .eq("status", "Active"),

        supabase
          .from("transactions")
          .select("*", { count: "exact", head: true }),
      ]);

      setStats({
        customers: usersResult.count || 0,
        bookings: bookingsResult.count || 0,
        mechanics: mechanicsResult.count || 0,
        transactions: transactionsResult.count || 0,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const items = [
    {
      title: "Happy Customers",
      value: stats.customers,
      icon: "👥",
    },
    {
      title: "Bookings",
      value: stats.bookings,
      icon: "📅",
    },
    {
      title: "Mechanics",
      value: stats.mechanics,
      icon: "🔧",
    },
    {
      title: "Transactions",
      value: stats.transactions,
      icon: "💳",
    },
  ];

  return (
    <section className="py-24 bg-[#DEE33E]">
      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <h2 className="text-5xl font-bold">
            Our Achievement
          </h2>

          <p className="mt-4 text-gray-700">
            Real-time statistics from GaragePro Management System
          </p>

        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 text-center shadow-lg"
            >

              <div className="text-5xl">
                {item.icon}
              </div>

              <h2 className="text-5xl font-bold mt-6">
                {item.value}
              </h2>

              <p className="mt-3 text-gray-500 font-medium">
                {item.title}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}
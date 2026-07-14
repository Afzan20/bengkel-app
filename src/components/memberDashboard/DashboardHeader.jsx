import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function DashboardHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data } = await supabase
      .from("users")
      .select("fullname")
      .eq("id", currentUser.id)
      .single();

    setUser(data);
  }

  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  return (
    <section className="bg-gradient-to-r from-[#DEE33E] to-[#C7D630] rounded-3xl p-8 shadow-lg text-black">
      <p className="text-lg font-medium">
        {greeting},
      </p>

      <h1 className="text-4xl font-extrabold mt-2">
        {user?.fullname || "Member"} 👋
      </h1>

      <p className="mt-3 text-gray-800">
        Welcome back to GaragePro. Check your latest booking,
        repair progress, and membership points.
      </p>
    </section>
  );
}
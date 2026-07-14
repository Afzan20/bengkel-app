import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Wrench, CalendarDays } from "lucide-react";

export default function RepairProgress() {
  const [repair, setRepair] = useState(null);

  useEffect(() => {
    loadRepair();
  }, []);

  async function loadRepair() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    // Ambil booking terbaru milik user
    const { data: booking } = await supabase
      .from("bookings")
      .select(`
        id,
        booking_code,
        booking_date,
        estimated_finish,
        services(service_name)
      `)
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!booking) return;

    // Ambil progress repair
    const { data: tracker } = await supabase
      .from("repair_tracker")
      .select("*")
      .eq("booking_id", booking.id)
      .single();

    setRepair({
      booking,
      tracker,
    });
  }

  if (!repair) {
    return (
      <div className="bg-white rounded-3xl shadow p-8">
        <h2 className="text-xl font-bold mb-4">
          Repair Progress
        </h2>

        <p className="text-gray-500">
          No repair is currently in progress.
        </p>
      </div>
    );
  }

  const progress = repair.tracker?.progress ?? 0;

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex items-center gap-3">

        <div className="w-14 h-14 rounded-2xl bg-[#DEE33E]/20 flex items-center justify-center">

          <Wrench className="text-[#9FA324]" size={28} />

        </div>

        <div>

          <h2 className="text-2xl font-bold">
            Repair Progress
          </h2>

          <p className="text-gray-500">
            {repair.booking.services?.service_name}
          </p>

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="font-medium">
            {repair.tracker?.current_status}
          </span>

          <span className="font-bold">
            {progress}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">

          <div
            className="bg-gradient-to-r from-[#DEE33E] to-[#9FA324] h-3 rounded-full transition-all duration-700"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <CalendarDays size={20} />

          <span>
            Estimated Finish :
            <strong className="ml-2">
              {repair.booking.estimated_finish || "-"}
            </strong>
          </span>

        </div>

        <div>

          <p className="text-gray-500">
            Mechanic Note
          </p>

          <div className="mt-2 rounded-xl bg-gray-50 border p-4">

            {repair.tracker?.notes || "No notes yet."}

          </div>

        </div>

      </div>

    </div>
  );
}
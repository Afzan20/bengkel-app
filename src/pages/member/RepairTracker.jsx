import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Wrench,
  CalendarDays,
  CarFront,
  ClipboardList,
} from "lucide-react";

export default function RepairTracker() {
  const [repairs, setRepairs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRepairs();
  }, []);

  async function loadRepairs() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("repair_tracker")
      .select(`
        *,
        bookings!inner(
          booking_code,
          booking_date,
          estimated_finish,
          user_id,
          vehicles(
            brand,
            model,
            plate_number
          ),
          services(
            service_name
          )
        )
      `)
      .eq("bookings.user_id", currentUser.id)
      .order("updated_at", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setRepairs(data || []);
    }

    setLoading(false);
  }

  function statusColor(status) {
    switch (status) {
      case "Waiting":
        return {
          badge: "bg-yellow-100 text-yellow-700",
          bar: "bg-yellow-500",
        };

      case "Checking":
        return {
          badge: "bg-blue-100 text-blue-700",
          bar: "bg-blue-500",
        };

      case "Repairing":
        return {
          badge: "bg-indigo-100 text-indigo-700",
          bar: "bg-indigo-500",
        };

      case "Completed":
        return {
          badge: "bg-green-100 text-green-700",
          bar: "bg-green-500",
        };

      default:
        return {
          badge: "bg-gray-100 text-gray-700",
          bar: "bg-gray-400",
        };
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading repair tracker...
      </div>
    );
  }

  if (repairs.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

        <Wrench
          size={60}
          className="mx-auto text-gray-300"
        />

        <h2 className="text-2xl font-bold mt-6">
          No Repair Found
        </h2>

        <p className="text-gray-500 mt-3">
          You don't have any repair process yet.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Repair Tracker
        </h1>

        <p className="text-gray-500 mt-2">
          Track your vehicle repair progress.
        </p>
      </div>

      {repairs.map((repair) => {
        const color = statusColor(repair.current_status);

        return (
          <div
            key={repair.id}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <div className="flex justify-between items-start">

              <div>

                <div className="flex items-center gap-3">

                  <CarFront
                    className="text-[#9FA324]"
                    size={26}
                  />

                  <div>

                    <h2 className="text-2xl font-bold">

                      {repair.bookings?.vehicles?.brand}{" "}
                      {repair.bookings?.vehicles?.model}

                    </h2>

                    <p className="text-gray-500">

                      {repair.bookings?.vehicles?.plate_number}

                    </p>

                  </div>

                </div>

              </div>

              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${color.badge}`}
              >
                {repair.current_status}
              </span>

            </div>

            <div className="mt-8">

              <div className="flex justify-between mb-2">

                <span className="font-semibold">
                  Repair Progress
                </span>

                <span className="font-bold">
                  {repair.progress}%
                </span>

              </div>

              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">

                <div
                  className={`${color.bar} h-4 rounded-full transition-all duration-700`}
                  style={{
                    width: `${repair.progress}%`,
                  }}
                />

              </div>

            </div>

            <div className="grid md:grid-cols-3 gap-6 mt-8">

              <div>

                <p className="text-sm text-gray-500">
                  Booking Code
                </p>

                <h3 className="font-bold mt-1">
                  {repair.bookings?.booking_code}
                </h3>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Service
                </p>

                <h3 className="font-bold mt-1">
                  {repair.bookings?.services?.service_name}
                </h3>

              </div>

              <div>

                <p className="text-sm text-gray-500">
                  Estimated Finish
                </p>

                <h3 className="font-bold mt-1">
                  {repair.bookings?.estimated_finish || "-"}
                </h3>

              </div>

            </div>

            <div className="mt-8">

              <div className="flex items-center gap-2 mb-3">

                <ClipboardList
                  size={20}
                  className="text-[#9FA324]"
                />

                <h3 className="font-bold">
                  Mechanic Notes
                </h3>

              </div>

              <div className="bg-gray-50 border rounded-2xl p-5 text-gray-600">

                {repair.notes || "No notes available."}

              </div>

            </div>

            <div className="mt-6 flex items-center gap-2 text-gray-500 text-sm">

              <CalendarDays size={18} />

              Last Updated :

              {new Date(repair.updated_at).toLocaleString("id-ID")}

            </div>

          </div>
        );
      })}
    </div>
  );
}
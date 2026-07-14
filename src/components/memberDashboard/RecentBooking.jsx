import { useEffect, useState } from "react";
import { CalendarDays, Clock3, CarFront } from "lucide-react";
import { supabase } from "../../lib/supabase";

export default function RecentBooking() {
  const [booking, setBooking] = useState(null);

  useEffect(() => {
    loadBooking();
  }, []);

  async function loadBooking() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        vehicles(brand,model,plate_number),
        services(service_name)
      `)
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setBooking(data);
  }

  function badgeColor(status) {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-700";

      case "Repairing":
        return "bg-blue-100 text-blue-700";

      case "Waiting":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (!booking) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">
          Recent Booking
        </h2>

        <p className="text-gray-500">
          No booking found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">

      <div className="flex justify-between items-center">

        <h2 className="text-2xl font-bold">
          Recent Booking
        </h2>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${badgeColor(
            booking.status
          )}`}
        >
          {booking.status}
        </span>

      </div>

      <div className="mt-8 space-y-6">

        <div className="flex items-center gap-3">

          <CarFront className="text-[#9FA324]" />

          <div>

            <p className="text-sm text-gray-500">
              Vehicle
            </p>

            <h3 className="font-bold">
              {booking.vehicles?.brand} {booking.vehicles?.model}
            </h3>

            <p className="text-sm text-gray-500">
              {booking.vehicles?.plate_number}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <CalendarDays className="text-[#9FA324]" />

          <div>

            <p className="text-sm text-gray-500">
              Booking Date
            </p>

            <h3 className="font-semibold">
              {booking.booking_date}
            </h3>

          </div>

        </div>

        <div className="flex items-center gap-3">

          <Clock3 className="text-[#9FA324]" />

          <div>

            <p className="text-sm text-gray-500">
              Booking Time
            </p>

            <h3 className="font-semibold">
              {booking.booking_time}
            </h3>

          </div>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Service
          </p>

          <h3 className="font-bold text-lg mt-1">
            {booking.services?.service_name}
          </h3>

        </div>

        <div>

          <p className="text-sm text-gray-500">
            Complaint
          </p>

          <div className="mt-2 rounded-xl bg-gray-50 p-4 border">
            {booking.complaint}
          </div>

        </div>

      </div>

    </div>
  );
}
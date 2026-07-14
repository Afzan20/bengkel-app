import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";
import BookingDetailModal from "../../components/memberBooking/BookingDetailModal";

export default function BookingHistory() {
  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("bookings")
      .select(
        `
        *,
        vehicles(
          brand,
          model,
          plate_number
        ),
        services(
          service_name
        ),
        transactions(
          total_amount
        )
      `,
      )
      .eq("user_id", currentUser.id)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setBookings(data);
  }

  const filtered = useMemo(() => {
    return bookings.filter((item) => {
      const keyword =
        item.booking_code.toLowerCase().includes(search.toLowerCase()) ||
        item.vehicles?.brand?.toLowerCase().includes(search.toLowerCase()) ||
        item.vehicles?.model?.toLowerCase().includes(search.toLowerCase());

      const statusFilter = status === "All" || item.status === status;

      return keyword && statusFilter;
    });
  }, [bookings, search, status]);

  function badge(status) {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Checking":
        return "bg-blue-100 text-blue-700";

      case "Repairing":
        return "bg-indigo-100 text-indigo-700";

      case "Completed":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100";
    }
  }

  function rupiah(value) {
    if (!value) return "-";

    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Booking History</h1>

        <p className="text-gray-500 mt-2">View all your booking history.</p>
      </div>

      <div className="bg-white rounded-3xl shadow p-6">
        <div className="flex justify-between gap-4 mb-6">
          <input
            placeholder="Search booking..."
            className="border rounded-xl px-4 py-3 w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            className="border rounded-xl px-4"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option>All</option>
            <option>Pending</option>
            <option>Checking</option>
            <option>Repairing</option>
            <option>Completed</option>
            <option>Cancelled</option>
          </select>
        </div>

        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-4">Booking</th>

                <th className="text-left">Vehicle</th>

                <th className="text-left">Service</th>

                <th className="text-left">Date</th>

                <th className="text-left">Status</th>

                <th className="text-left">Total</th>

                <th></th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-5 font-semibold">{item.booking_code}</td>

                  <td>
                    {item.vehicles?.brand} {item.vehicles?.model}
                    <p className="text-sm text-gray-500">
                      {item.vehicles?.plate_number}
                    </p>
                  </td>

                  <td>{item.services?.service_name}</td>

                  <td>{item.booking_date}</td>

                  <td>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${badge(
                        item.status,
                      )}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td>{rupiah(item.transactions?.total_amount)}</td>

                  <td>
                    <button
                      onClick={() => {
                        setSelectedBooking(item);
                        setOpenModal(true);
                      }}
                      className="px-4 py-2 rounded-lg bg-[#DEE33E] hover:bg-[#cad12d]"
                    >
                      Detail
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <BookingDetailModal
        booking={selectedBooking}
        open={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}

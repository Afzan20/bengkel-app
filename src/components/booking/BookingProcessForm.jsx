import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BookingProcessForm({ booking, onSuccess, onCancel }) {
  const [mechanics, setMechanics] = useState([]);

  const [mechanicId, setMechanicId] = useState("");
  const [estimatedFinish, setEstimatedFinish] = useState("");
  const [totalPrice, setTotalPrice] = useState("");
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    getMechanics();

    if (booking) {
      setMechanicId(booking.mechanic_id || "");
      setEstimatedFinish(booking.estimated_finish || "");
      setTotalPrice(booking.total_price || "");
      setAdminNote(booking.admin_note || "");
    }
  }, [booking]);

  async function getMechanics() {
    const { data } = await supabase
      .from("mechanics")
      .select("*")
      .eq("status", "Available");

    setMechanics(data || []);
  }

  async function approveBooking() {
    if (!mechanicId) {
      alert("Please select mechanic");
      return;
    }

    // Update Booking
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "Confirmed",
        mechanic_id: mechanicId,
        estimated_finish: estimatedFinish,
        total_price: totalPrice,
        admin_note: adminNote,
      })
      .eq("id", booking.id);

    if (error) {
      console.log(error);
      return;
    }

    // Cek apakah repair tracker sudah ada
    const { data: repair } = await supabase
      .from("repair_tracker")
      .select("id")
      .eq("booking_id", booking.id)
      .maybeSingle();

    // Kalau belum ada baru insert
    if (!repair) {
      await supabase.from("repair_tracker").insert([
        {
          booking_id: booking.id,
          current_status: "Waiting",
          progress: 0,
          notes: "Waiting for mechanic",
          started_at: null,
          completed_at: null,
          updated_at: new Date(),
        },
      ]);
    }

    onSuccess();
  }

  async function rejectBooking() {
    const { error } = await supabase
      .from("bookings")
      .update({
        status: "Cancelled",
        admin_note: adminNote,
      })
      .eq("id", booking.id);

    if (!error) {
      onSuccess();
    }
  }

  return (
    <div className="p-6 w-full max-w-3xl">
      <h2 className="text-2xl font-bold mb-6">Process Booking</h2>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-500">Customer</label>

          <p className="font-semibold mt-1">{booking?.users?.fullname}</p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Vehicle</label>

          <p className="font-semibold mt-1">
            {booking?.vehicles?.brand} {booking?.vehicles?.model}
          </p>

          <p className="text-sm text-gray-500">
            {booking?.vehicles?.plate_number}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Service</label>

          <p className="font-semibold mt-1">
            {booking?.services?.service_name}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">Complaint</label>

          <p className="font-semibold mt-1">{booking?.complaint}</p>
        </div>

        <div className="col-span-2">
          <label className="font-medium">Assign Mechanic</label>

          <select
            value={mechanicId}
            onChange={(e) => setMechanicId(e.target.value)}
            className="w-full border rounded-xl p-3 mt-2"
          >
            <option value="">Select Mechanic</option>

            {mechanics.map((mechanic) => (
              <option key={mechanic.id} value={mechanic.id}>
                {mechanic.fullname}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Estimated Finish</label>

          <input
            type="date"
            value={estimatedFinish}
            onChange={(e) => setEstimatedFinish(e.target.value)}
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Total Price</label>

          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(e.target.value)}
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>

        <div className="col-span-2">
          <label className="font-medium">Admin Note</label>

          <textarea
            rows="4"
            value={adminNote}
            onChange={(e) => setAdminNote(e.target.value)}
            className="w-full border rounded-xl p-3 mt-2"
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button onClick={onCancel} className="px-5 py-3 rounded-xl bg-gray-200">
          Close
        </button>

        <button
          onClick={rejectBooking}
          className="px-5 py-3 rounded-xl bg-red-500 text-white"
        >
          Reject
        </button>

        <button
          onClick={approveBooking}
          className="px-5 py-3 rounded-xl bg-[#DEE33E] font-semibold"
        >
          Approve Booking
        </button>
      </div>
    </div>
  );
}

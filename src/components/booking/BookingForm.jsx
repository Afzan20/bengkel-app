import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BookingForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [mechanics, setMechanics] = useState([]);

  const [userId, setUserId] = useState("");
  const [vehicleId, setVehicleId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [mechanicId, setMechanicId] = useState("");

  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [estimatedFinish, setEstimatedFinish] = useState("");

  const [status, setStatus] = useState("Pending");
  const [totalPrice, setTotalPrice] = useState("");
  const [complaint, setComplaint] = useState("");
  const [adminNote, setAdminNote] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    if (initialData) {
      setUserId(initialData.user_id || "");
      setVehicleId(initialData.vehicle_id || "");
      setServiceId(initialData.service_id || "");
      setMechanicId(initialData.mechanic_id || "");
      setBookingDate(initialData.booking_date || "");
      setBookingTime(initialData.booking_time || "");
      setEstimatedFinish(initialData.estimated_finish || "");
      setStatus(initialData.status || "Pending");
      setTotalPrice(initialData.total_price || "");
      setComplaint(initialData.complaint || "");
      setAdminNote(initialData.admin_note || "");
    }
  }, [initialData]);

  async function loadData() {
    const { data: userData } = await supabase
      .from("users")
      .select("*")
      .eq("role", "member");

    const { data: vehicleData } = await supabase
      .from("vehicles")
      .select("*");

    const { data: serviceData } = await supabase
      .from("services")
      .select("*");

    const { data: mechanicData } = await supabase
      .from("mechanics")
      .select("*");

    setUsers(userData || []);
    setVehicles(vehicleData || []);
    setServices(serviceData || []);
    setMechanics(mechanicData || []);
  }

  function handleSave(e) {
    e.preventDefault();

    onSubmit({
      booking_code:
        initialData?.booking_code ??
        `BK${Date.now()}`,
      user_id: userId,
      vehicle_id: vehicleId,
      service_id: serviceId,
      mechanic_id: mechanicId || null,
      booking_date: bookingDate,
      booking_time: bookingTime,
      estimated_finish: estimatedFinish,
      complaint,
      status,
      total_price: Number(totalPrice),
      admin_note: adminNote,
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="p-6 w-full"
    >
      <h2 className="text-2xl font-bold mb-6">
        {initialData ? "Edit Booking" : "New Booking"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <div>
          <label>Customer</label>

          <select
            value={userId}
            onChange={(e)=>setUserId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Customer</option>

            {users.map(user=>(
              <option
                key={user.id}
                value={user.id}
              >
                {user.fullname}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Vehicle</label>

          <select
            value={vehicleId}
            onChange={(e)=>setVehicleId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Vehicle</option>

            {vehicles
              .filter(v=>v.user_id===userId)
              .map(vehicle=>(
              <option
                key={vehicle.id}
                value={vehicle.id}
              >
                {vehicle.brand} {vehicle.model}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Service</label>

          <select
            value={serviceId}
            onChange={(e)=>setServiceId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Service</option>

            {services.map(service=>(
              <option
                key={service.id}
                value={service.id}
              >
                {service.service_name}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Mechanic</label>

          <select
            value={mechanicId}
            onChange={(e)=>setMechanicId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Mechanic</option>

            {mechanics.map(mechanic=>(
              <option
                key={mechanic.id}
                value={mechanic.id}
              >
                {mechanic.fullname}
              </option>
            ))}

          </select>
        </div>

        <div>
          <label>Date</label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e)=>setBookingDate(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Time</label>

          <input
            type="time"
            value={bookingTime}
            onChange={(e)=>setBookingTime(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Estimated Finish</label>

          <input
            type="date"
            value={estimatedFinish}
            onChange={(e)=>setEstimatedFinish(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label>Total Price</label>

          <input
            type="number"
            value={totalPrice}
            onChange={(e)=>setTotalPrice(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

      </div>

      <div className="mt-4">

        <label>Complaint</label>

        <textarea
          rows={3}
          value={complaint}
          onChange={(e)=>setComplaint(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2"
        />

      </div>

      <div className="mt-4">

        <label>Admin Note</label>

        <textarea
          rows={3}
          value={adminNote}
          onChange={(e)=>setAdminNote(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2"
        />

      </div>

      <div className="mt-4">

        <label>Status</label>

        <select
          value={status}
          onChange={(e)=>setStatus(e.target.value)}
          className="w-full border rounded-lg p-3 mt-2"
        >
          <option>Pending</option>
          <option>Confirmed</option>
          <option>In Progress</option>
          <option>Completed</option>
          <option>Cancelled</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 bg-gray-100 rounded-xl"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 bg-[#DEE33E] rounded-xl font-semibold"
        >
          {initialData ? "Update" : "Save"}
        </button>

      </div>

    </form>
  );
}

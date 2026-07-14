import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function BookingService() {
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);

  const [vehicleId, setVehicleId] = useState("");
  const [serviceId, setServiceId] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingTime, setBookingTime] = useState("");
  const [complaint, setComplaint] = useState("");

  useEffect(() => {
    getVehicles();
    getServices();
  }, []);

  async function getVehicles() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", currentUser.id);

    if (!error) {
      setVehicles(data);
    }
  }

  async function getServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("status", "Available")
      .order("service_name");

    console.log(data);
    console.log(error);

    if (error) {
      console.log(error);
      return;
    }

    setServices(data);
  }

  async function handleBooking() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (
      !vehicleId ||
      !serviceId ||
      !bookingDate ||
      !bookingTime ||
      !complaint
    ) {
      alert("Please complete all fields.");
      return;
    }

    const bookingCode = "BK" + Date.now().toString().slice(-8);

    const { error } = await supabase.from("bookings").insert([
      {
        booking_code: bookingCode,
        user_id: currentUser.id,
        vehicle_id: vehicleId,
        service_id: serviceId,
        booking_date: bookingDate,
        booking_time: bookingTime,
        complaint,
        status: "Pending",
      },
    ]);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Booking created successfully!");

    setVehicleId("");
    setServiceId("");
    setBookingDate("");
    setBookingTime("");
    setComplaint("");
  }

  return (
    <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow">
      <h1 className="text-3xl font-bold mb-8">Booking Service</h1>

      <div className="space-y-5">
        <div>
          <label className="font-medium">Vehicle</label>

          <select
            value={vehicleId}
            onChange={(e) => setVehicleId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Vehicle</option>

            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.brand} {vehicle.model} ({vehicle.plate_number})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Service</label>

          <select
            value={serviceId}
            onChange={(e) => setServiceId(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          >
            <option value="">Select Service</option>

            {services.map((service) => (
              <option key={service.id} value={service.id}>
                {service.service_name} - Rp{" "}
                {Number(service.price).toLocaleString("id-ID")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium">Booking Date</label>

          <input
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Booking Time</label>

          <input
            type="time"
            value={bookingTime}
            onChange={(e) => setBookingTime(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
          />
        </div>

        <div>
          <label className="font-medium">Complaint</label>

          <textarea
            rows={4}
            value={complaint}
            onChange={(e) => setComplaint(e.target.value)}
            className="w-full border rounded-lg p-3 mt-2"
            placeholder="Describe your vehicle problem..."
          />
        </div>

        <button
          onClick={handleBooking}
          className="w-full bg-[#DEE33E] py-3 rounded-xl font-bold"
        >
          Book Now
        </button>
      </div>
    </div>
  );
}

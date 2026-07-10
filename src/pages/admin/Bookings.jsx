import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import StatusSelect from "../../components/inventory/StatusSelect";
import FormModal from "../../components/common/FormModal";
import BookingForm from "../../components/booking/BookingForm";

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    getBookings();
  }, []);

  async function getBookings() {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        *,
        users (
          fullname
        ),
        vehicles (
          brand,
          model,
          plate_number
        ),
        services (
          service_name
        ),
        mechanics (
          fullname
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setBookings(data);
  }

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        booking.booking_code.toLowerCase().includes(keyword) ||
        booking.users?.fullname
          ?.toLowerCase()
          .includes(keyword) ||
        booking.services?.service_name
          ?.toLowerCase()
          .includes(keyword);

      const matchStatus =
        status === "all"
          ? true
          : status === "success"
          ? booking.status === "Completed"
          : status === "pending"
          ? booking.status === "Pending"
          : booking.status === "Cancelled";

      return matchSearch && matchStatus;
    });
  }, [bookings, search, status]);

  function handleAdd() {
    setSelectedBooking(null);
    setOpenModal(true);
  }

  function handleEdit(item) {
    setSelectedBooking(item);
    setOpenModal(true);
  }

  async function handleDelete(item) {
    if (
      !window.confirm(
        `Delete booking ${item.booking_code}?`
      )
    )
      return;

    const { error } = await supabase
      .from("bookings")
      .delete()
      .eq("id", item.id);

    if (!error) {
      getBookings();
    }
  }

  async function handleSubmit(form) {
    if (selectedBooking) {
      const { error } = await supabase
        .from("bookings")
        .update(form)
        .eq("id", selectedBooking.id);

      if (!error) {
        getBookings();
      }
    } else {
      const { error } = await supabase
        .from("bookings")
        .insert([form]);

      if (!error) {
        getBookings();
      }
    }

    setOpenModal(false);
    setSelectedBooking(null);
  }

  return (
    <>
      <section className="bg-white rounded-xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Bookings
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer bookings.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#DEE33E] px-5 py-3 rounded-xl font-semibold"
          >
            + Add Booking
          </button>

        </div>

        <div className="flex justify-between gap-4 mb-6">

          <input
            className="border rounded-lg px-4 py-2 w-80"
            placeholder="Search booking..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <StatusSelect
            value={status}
            onChange={setStatus}
          />

        </div>

        <Table
          headers={[
            "Code",
            "Customer",
            "Vehicle",
            "Service",
            "Date",
            "Status",
            "Mechanic",
            "Action",
          ]}
        >
          {filteredBookings.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No booking data found.
              </td>
            </tr>
          )}

          {filteredBookings.map((booking) => (
            <tr
              key={booking.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5 font-medium">
                {booking.booking_code}
              </td>

              <td>
                {booking.users?.fullname}
              </td>

              <td>
                {booking.vehicles?.brand}{" "}
                {booking.vehicles?.model}
                <br />
                <span className="text-xs text-gray-500">
                  {booking.vehicles?.plate_number}
                </span>
              </td>

              <td>
                {booking.services?.service_name}
              </td>

              <td>
                {booking.booking_date}
                <br />
                <span className="text-xs text-gray-500">
                  {booking.booking_time}
                </span>
              </td>

              <td>
                <Badge
                  type={
                    booking.status === "Completed"
                      ? "success"
                      : booking.status === "Pending"
                      ? "pending"
                      : booking.status === "Cancelled"
                      ? "warning"
                      : "default"
                  }
                  text={booking.status}
                />
              </td>

              <td>
                {booking.mechanics?.fullname ?? "-"}
              </td>

              <td className="space-x-2">

                <button
                  onClick={() =>
                    handleEdit(booking)
                  }
                  className="text-blue-600 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(booking)
                  }
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>

              </td>
            </tr>
          ))}
        </Table>
      </section>

      <FormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedBooking(null);
        }}
      >
        <BookingForm
          initialData={selectedBooking}
          onSubmit={handleSubmit}
          onCancel={() => {
            setOpenModal(false);
            setSelectedBooking(null);
          }}
        />
      </FormModal>
    </>
  );
}

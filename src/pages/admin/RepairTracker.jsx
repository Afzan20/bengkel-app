import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import StatusSelect from "../../components/inventory/StatusSelect";
import FormModal from "../../components/common/FormModal";
import RepairTrackerForm from "../../components/repair/RepairTrackerForm";

export default function RepairTracker() {
  const [repairs, setRepairs] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedRepair, setSelectedRepair] = useState(null);

  useEffect(() => {
    getRepairs();
  }, []);

  async function getRepairs() {
    const { data, error } = await supabase
      .from("repair_tracker")
      .select(
        `
      *,
      bookings!inner(
        id,
        booking_code,
        complaint,
        estimated_finish,
        total_price,
        status,
        users(
          fullname
        ),
        vehicles(
          brand,
          model,
          plate_number
        ),
        services(
          service_name
        ),
        mechanics(
          fullname
        )
      )
    `,
      )
      .eq("bookings.status", "Confirmed")
      .order("updated_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setRepairs(data);
  }

  const filteredRepairs = useMemo(() => {
    return repairs.filter((repair) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        repair.bookings?.booking_code?.toLowerCase().includes(keyword) ||
        repair.bookings?.users?.fullname?.toLowerCase().includes(keyword);

      const matchStatus =
        status === "all"
          ? true
          : status === "success"
            ? repair.current_status === "Completed"
            : status === "pending"
              ? repair.current_status === "Repair"
              : repair.current_status === "Waiting";

      return matchSearch && matchStatus;
    });
  }, [repairs, search, status]);

  function handleEdit(repair) {
    setSelectedRepair(repair);
    setOpenModal(true);
  }

  async function handleSubmit(form) {
    try {
      console.log("Selected Repair:", selectedRepair);
      console.log("Form:", form);

      const { data, error } = await supabase
        .from("repair_tracker")
        .update({
          progress: form.progress,
          current_status: form.current_status,
          notes: form.notes,
          started_at: form.started_at,
          completed_at: form.completed_at,
          updated_at: form.updated_at,
        })
        .eq("id", selectedRepair.id)
        .select();

      console.log("UPDATE DATA:", data);
      console.log("UPDATE ERROR:", error);

      if (error) {
        alert(error.message);
        return;
      }

      if (form.progress === 100) {
        const { error: bookingError } = await supabase
          .from("bookings")
          .update({
            status: "Completed",
          })
          .eq("id", selectedRepair.booking_id);

        if (bookingError) {
          console.log(bookingError);
        }

        const { data: trx } = await supabase
          .from("transactions")
          .select("id")
          .eq("booking_id", selectedRepair.booking_id)
          .maybeSingle();

        if (!trx) {
          const subtotal = Number(selectedRepair.bookings.total_price || 0);
          const tax = subtotal * 0.11;
          const discount = 0;
          const total = subtotal + tax - discount;

          const invoice =
            "INV-" + new Date().getFullYear() + String(Date.now()).slice(-6);

          const { error: trxError } = await supabase
            .from("transactions")
            .insert([
              {
                booking_id: selectedRepair.booking_id,

                invoice_number: invoice,

                subtotal,

                tax,

                discount,

                total_amount: total,

                payment_method: null,

                payment_status: "Unpaid",

                payment_date: null,
              },
            ]);

          if (trxError) {
            console.log(trxError);
          }
        }
      }

      await getRepairs();

      setOpenModal(false);
      setSelectedRepair(null);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <section className="bg-white rounded-xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Repair Tracker</h1>

            <p className="text-gray-500 mt-2">Track vehicle repair progress.</p>
          </div>

          <div className="flex gap-3">
            <StatusSelect value={status} onChange={setStatus} />
          </div>
        </div>

        <input
          className="border rounded-lg px-4 py-2 w-80 mb-6"
          placeholder="Search booking..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Table
          headers={[
            "Booking",
            "Customer",
            "Vehicle",
            "Service",
            "Progress",
            "Status",
            "Updated",
            "Action",
          ]}
        >
          {filteredRepairs.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center py-10 text-gray-500">
                No repair data found.
              </td>
            </tr>
          )}

          {filteredRepairs.map((repair) => (
            <tr key={repair.id} className="border-b hover:bg-gray-50">
              <td className="py-5 font-medium">
                {repair.bookings?.booking_code}
              </td>

              <td>{repair.bookings?.users?.fullname}</td>

              <td>
                {repair.bookings?.vehicles?.brand}{" "}
                {repair.bookings?.vehicles?.model}
                <br />
                <span className="text-xs text-gray-500">
                  {repair.bookings?.vehicles?.plate_number}
                </span>
              </td>

              <td>{repair.bookings?.services?.service_name}</td>

              <td className="w-60">
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${
                      repair.progress === 100
                        ? "bg-green-500"
                        : repair.progress >= 50
                          ? "bg-blue-500"
                          : "bg-[#DEE33E]"
                    }`}
                    style={{
                      width: `${repair.progress}%`,
                    }}
                  />
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-xs text-gray-500">
                    {repair.current_status}
                  </span>

                  <span className="font-semibold">{repair.progress}%</span>
                </div>
              </td>

              <td>
                <Badge
                  type={
                    repair.current_status === "Completed"
                      ? "success"
                      : repair.current_status === "Repair"
                        ? "pending"
                        : "warning"
                  }
                  text={repair.current_status}
                />
              </td>

              <td>
                {repair.updated_at
                  ? new Date(repair.updated_at).toLocaleDateString()
                  : "-"}
              </td>

              <td>
                <button
                  onClick={() => handleEdit(repair)}
                  className="text-blue-600 font-semibold"
                >
                  Update
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
          setSelectedRepair(null);
        }}
      >
        <RepairTrackerForm
          initialData={selectedRepair}
          onSubmit={handleSubmit}
          onCancel={() => {
            setOpenModal(false);
            setSelectedRepair(null);
          }}
        />
      </FormModal>
    </>
  );
}

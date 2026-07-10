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
      .select(`
        *,
        bookings (
          booking_code,
          user_id,
          vehicle_id,
          service_id,
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
          )
        )
      `)
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
        repair.bookings?.booking_code
          ?.toLowerCase()
          .includes(keyword) ||
        repair.bookings?.users?.fullname
          ?.toLowerCase()
          .includes(keyword);

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

  function handleEdit(item) {
    setSelectedRepair(item);
    setOpenModal(true);
  }

  async function handleSubmit(form) {
    const { error } = await supabase
      .from("repair_tracker")
      .update(form)
      .eq("id", selectedRepair.id);

    if (!error) {
      getRepairs();
    }

    setOpenModal(false);
  }

  return (
    <>
      <section className="bg-white rounded-xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Repair Tracker
            </h1>

            <p className="text-gray-500 mt-2">
              Track vehicle repair progress.
            </p>
          </div>

          <StatusSelect
            value={status}
            onChange={setStatus}
          />

        </div>

        <input
          className="border rounded-lg px-4 py-2 w-80 mb-6"
          placeholder="Search booking..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
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
              <td
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No repair data found.
              </td>
            </tr>
          )}

          {filteredRepairs.map((repair) => (
            <tr
              key={repair.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5 font-medium">
                {repair.bookings?.booking_code}
              </td>

              <td>
                {repair.bookings?.users?.fullname}
              </td>

              <td>
                {repair.bookings?.vehicles?.brand}{" "}
                {repair.bookings?.vehicles?.model}
                <br />

                <span className="text-xs text-gray-500">
                  {repair.bookings?.vehicles?.plate_number}
                </span>
              </td>

              <td>
                {repair.bookings?.services?.service_name}
              </td>

              <td className="w-60">

                <div className="w-full bg-gray-200 rounded-full h-3">

                  <div
                    className="bg-[#DEE33E] h-3 rounded-full"
                    style={{
                      width: `${repair.progress}%`,
                    }}
                  />

                </div>

                <p className="text-sm mt-2">
                  {repair.progress}%
                </p>

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
                  ? new Date(
                      repair.updated_at
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>

                <button
                  onClick={() =>
                    handleEdit(repair)
                  }
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
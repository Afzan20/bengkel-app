import { X } from "lucide-react";

function rupiah(value) {
  if (!value) return "-";

  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function BookingDetailModal({
  booking,
  open,
  onClose,
}) {
  if (!open || !booking) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center p-6">

      <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl">

        <div className="flex justify-between items-center p-6 border-b">

          <div>
            <h2 className="text-2xl font-bold">
              Booking Detail
            </h2>

            <p className="text-gray-500">
              {booking.booking_code}
            </p>
          </div>

          <button onClick={onClose}>
            <X size={28}/>
          </button>

        </div>

        <div className="grid md:grid-cols-2 gap-8 p-8">

          <div>

            <h3 className="font-bold mb-4">
              Vehicle
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Brand :</strong>{" "}
                {booking.vehicles?.brand}
              </p>

              <p>
                <strong>Model :</strong>{" "}
                {booking.vehicles?.model}
              </p>

              <p>
                <strong>Plate :</strong>{" "}
                {booking.vehicles?.plate_number}
              </p>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Booking
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Service :</strong>{" "}
                {booking.services?.service_name}
              </p>

              <p>
                <strong>Date :</strong>{" "}
                {booking.booking_date}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {booking.status}
              </p>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Payment
            </h3>

            <div className="space-y-3">

              <p>
                <strong>Total :</strong>{" "}
                {rupiah(booking.transactions?.total_amount)}
              </p>

              <p>
                <strong>Payment :</strong>{" "}
                {booking.transactions?.payment_method}
              </p>

              <p>
                <strong>Status :</strong>{" "}
                {booking.transactions?.payment_status}
              </p>

            </div>

          </div>

          <div>

            <h3 className="font-bold mb-4">
              Notes
            </h3>

            <p className="text-gray-500">
              {booking.notes || "-"}
            </p>

          </div>

        </div>

        <div className="border-t p-6 flex justify-end">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl bg-[#DEE33E] font-semibold"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  );
}
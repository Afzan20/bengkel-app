import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function TransactionProcessForm({
  transaction,
  onSuccess,
  onCancel,
}) {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (!transaction) return;

    setPaymentMethod(transaction.payment_method || "");
    setSubtotal(transaction.subtotal || 0);
    setTax(transaction.tax || 0);
    setDiscount(transaction.discount || 0);
    setTotal(transaction.total_amount || 0);
  }, [transaction]);

  function rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  async function handlePaid() {
    if (!paymentMethod) {
      alert("Please select payment method.");
      return;
    }

    const { error } = await supabase
      .from("transactions")
      .update({
        payment_method: paymentMethod,
        payment_status: "Paid",
        payment_date: new Date().toISOString(),
      })
      .eq("id", transaction.id);

    if (error) {
      console.log(error);
      alert(error.message);
      return;
    }

    alert("Payment successful.");

    onSuccess();
  }

  return (
    <div className="p-6 w-full max-w-3xl">

      <h2 className="text-2xl font-bold mb-8">
        Transaction Detail
      </h2>

      <div className="grid grid-cols-2 gap-6">

        <div>
          <label className="text-sm text-gray-500">
            Invoice
          </label>

          <p className="font-semibold mt-1">
            {transaction?.invoice_number}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Booking
          </label>

          <p className="font-semibold mt-1">
            {transaction?.bookings?.booking_code}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Customer
          </label>

          <p className="font-semibold mt-1">
            {transaction?.bookings?.users?.fullname}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Vehicle
          </label>

          <p className="font-semibold mt-1">
            {transaction?.bookings?.vehicles?.brand}
            {" "}
            {transaction?.bookings?.vehicles?.model}
          </p>

          <p className="text-sm text-gray-500">
            {transaction?.bookings?.vehicles?.plate_number}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Service
          </label>

          <p className="font-semibold mt-1">
            {transaction?.bookings?.services?.service_name}
          </p>
        </div>

        <div>
          <label className="text-sm text-gray-500">
            Payment Status
          </label>

          <p
            className={`font-semibold mt-1 ${
              transaction?.payment_status === "Paid"
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {transaction?.payment_status}
          </p>
        </div>

      </div>

      <hr className="my-8" />

      <div className="space-y-4">

        <div className="flex justify-between">
          <span>Subtotal</span>

          <span className="font-semibold">
            {rupiah(subtotal)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Tax</span>

          <span className="font-semibold">
            {rupiah(tax)}
          </span>
        </div>

        <div className="flex justify-between">
          <span>Discount</span>

          <span className="font-semibold">
            {rupiah(discount)}
          </span>
        </div>

        <div className="border-t pt-4 flex justify-between text-lg font-bold">
          <span>Total</span>

          <span>
            {rupiah(total)}
          </span>
        </div>

      </div>

      <div className="mt-8">

        <label className="font-medium">
          Payment Method
        </label>

        <select
          value={paymentMethod}
          onChange={(e) =>
            setPaymentMethod(e.target.value)
          }
          className="w-full border rounded-xl p-3 mt-2"
          disabled={transaction?.payment_status === "Paid"}
        >
          <option value="">
            Select Payment Method
          </option>

          <option value="Cash">
            Cash
          </option>

          <option value="Transfer">
            Bank Transfer
          </option>

          <option value="QRIS">
            QRIS
          </option>

          <option value="Debit Card">
            Debit Card
          </option>

          <option value="Credit Card">
            Credit Card
          </option>

        </select>

      </div>

      <div className="flex justify-end gap-3 mt-10">

        <button
          onClick={onCancel}
          className="px-5 py-3 rounded-xl bg-gray-200"
        >
          Close
        </button>

        {transaction?.payment_status !== "Paid" && (
          <button
            onClick={handlePaid}
            className="px-5 py-3 rounded-xl bg-[#DEE33E] font-semibold"
          >
            Mark as Paid
          </button>
        )}

      </div>

    </div>
  );
}
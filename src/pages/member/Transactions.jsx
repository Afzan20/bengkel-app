import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import {
  Wallet,
  CreditCard,
  CalendarDays,
  ReceiptText,
} from "lucide-react";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  async function loadTransactions() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        bookings!inner(
          booking_code,
          user_id,
          services(
            service_name
          ),
          vehicles(
            brand,
            model,
            plate_number
          )
        )
      `)
      .eq("bookings.user_id", currentUser.id)
      .order("transaction_date", { ascending: false });

    if (!error) {
      setTransactions(data || []);
    }

    setLoading(false);
  }

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  function badge(status) {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700";

      case "Pending":
        return "bg-yellow-100 text-yellow-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  }

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

        <Wallet
          size={60}
          className="mx-auto text-gray-300"
        />

        <h2 className="text-2xl font-bold mt-5">
          No Transactions
        </h2>

        <p className="text-gray-500 mt-2">
          You don't have any payment history yet.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>

        <h1 className="text-3xl font-bold">
          Transactions
        </h1>

        <p className="text-gray-500 mt-2">
          View all your payment history.
        </p>

      </div>

      <div className="grid gap-6">

        {transactions.map((trx) => (

          <div
            key={trx.id}
            className="bg-white rounded-3xl shadow-lg p-8"
          >

            <div className="flex justify-between items-start">

              <div>

                <h2 className="text-2xl font-bold">

                  {trx.bookings?.services?.service_name}

                </h2>

                <p className="text-gray-500 mt-1">

                  {trx.bookings?.vehicles?.brand}{" "}
                  {trx.bookings?.vehicles?.model}

                </p>

              </div>

              <span
                className={`px-4 py-2 rounded-full font-semibold ${badge(
                  trx.payment_status
                )}`}
              >
                {trx.payment_status}
              </span>

            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">

              <div>

                <div className="flex items-center gap-2 text-gray-500">

                  <ReceiptText size={18} />

                  Booking Code

                </div>

                <h3 className="font-bold mt-2">

                  {trx.bookings?.booking_code}

                </h3>

              </div>

              <div>

                <div className="flex items-center gap-2 text-gray-500">

                  <CreditCard size={18} />

                  Payment Method

                </div>

                <h3 className="font-bold mt-2">

                  {trx.payment_method}

                </h3>

              </div>

              <div>

                <div className="flex items-center gap-2 text-gray-500">

                  <Wallet size={18} />

                  Total

                </div>

                <h3 className="font-bold mt-2 text-[#9FA324]">

                  {rupiah(trx.total_amount)}

                </h3>

              </div>

              <div>

                <div className="flex items-center gap-2 text-gray-500">

                  <CalendarDays size={18} />

                  Date

                </div>

                <h3 className="font-bold mt-2">

                  {new Date(
                    trx.transaction_date
                  ).toLocaleDateString("id-ID")}

                </h3>

              </div>

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}
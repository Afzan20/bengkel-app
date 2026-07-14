import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import StatusSelect from "../../components/inventory/StatusSelect";
import FormModal from "../../components/common/FormModal";
import TransactionProcessForm from "../../components/transaction/TransactionProcessForm";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  useEffect(() => {
    getTransactions();
  }, []);

  async function getTransactions() {
    const { data, error } = await supabase
      .from("transactions")
      .select(`
        *,
        bookings(
          booking_code,
          booking_date,
          booking_time,
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
          )
        )
      `)
      .order("created_at", {
        ascending: false,
      });

    if (error) {
      console.log(error);
      return;
    }

    setTransactions(data);
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((trx) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        trx.invoice_number?.toLowerCase().includes(keyword) ||
        trx.bookings?.booking_code?.toLowerCase().includes(keyword) ||
        trx.bookings?.users?.fullname?.toLowerCase().includes(keyword);

      const matchStatus =
        status === "all"
          ? true
          : status === "success"
          ? trx.payment_status === "Paid"
          : status === "pending"
          ? trx.payment_status === "Unpaid"
          : trx.payment_status === "Cancelled";

      return matchSearch && matchStatus;
    });
  }, [transactions, search, status]);

  function handleProcess(transaction) {
    setSelectedTransaction(transaction);
    setOpenModal(true);
  }

  function formatCurrency(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value || 0);
  }

  return (
    <>
      <section className="bg-white rounded-xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Transactions
            </h1>

            <p className="text-gray-500 mt-2">
              Manage customer payments.
            </p>
          </div>

        </div>

        <div className="flex justify-between gap-4 mb-6">

          <input
            className="border rounded-lg px-4 py-2 w-80"
            placeholder="Search invoice..."
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
            "Invoice",
            "Booking",
            "Customer",
            "Service",
            "Total",
            "Status",
            "Date",
            "Action",
          ]}
        >
          {filteredTransactions.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="text-center py-10 text-gray-500"
              >
                No transaction found.
              </td>
            </tr>
          )}

          {filteredTransactions.map((trx) => (
            <tr
              key={trx.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5 font-semibold">
                {trx.invoice_number}
              </td>

              <td>
                {trx.bookings?.booking_code}
              </td>

              <td>
                {trx.bookings?.users?.fullname}
              </td>

              <td>
                {trx.bookings?.services?.service_name}
              </td>

              <td className="font-semibold">
                {formatCurrency(trx.total_amount)}
              </td>

              <td>
                <Badge
                  type={
                    trx.payment_status === "Paid"
                      ? "success"
                      : "pending"
                  }
                  text={trx.payment_status}
                />
              </td>

              <td>
                {trx.created_at
                  ? new Date(
                      trx.created_at
                    ).toLocaleDateString()
                  : "-"}
              </td>

              <td>

                <button
                  onClick={() =>
                    handleProcess(trx)
                  }
                  className="text-blue-600 font-semibold"
                >
                  View
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
          setSelectedTransaction(null);
        }}
      >
        <TransactionProcessForm
          transaction={selectedTransaction}
          onSuccess={() => {
            getTransactions();
            setOpenModal(false);
            setSelectedTransaction(null);
          }}
          onCancel={() => {
            setOpenModal(false);
            setSelectedTransaction(null);
          }}
        />
      </FormModal>
    </>
  );
}
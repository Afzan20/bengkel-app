import TransactionRow from "./TransactionRow";

const dummyTransactions = [
  {
    invoice: "INV-001",
    customer: "Afzan",
    vehicle: "Toyota Avanza",
    date: "03 Jul 2026",
    status: "Paid",
    total: "Rp350.000",
  },
  {
    invoice: "INV-002",
    customer: "Budi",
    vehicle: "Honda Brio",
    date: "02 Jul 2026",
    status: "Pending",
    total: "Rp175.000",
  },
  {
    invoice: "INV-003",
    customer: "Rizky",
    vehicle: "Suzuki Ertiga",
    date: "01 Jul 2026",
    status: "Paid",
    total: "Rp920.000",
  },
];

export default function TransactionTable() {
  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-4 text-left">Invoice</th>
            <th className="p-4 text-left">Customer</th>
            <th className="p-4 text-left">Vehicle</th>
            <th className="p-4 text-left">Date</th>
            <th className="p-4 text-left">Status</th>
            <th className="p-4 text-left">Total</th>
            <th className="p-4 text-center">Action</th>
          </tr>

        </thead>

        <tbody>

          {dummyTransactions.map((item) => (
            <TransactionRow
              key={item.invoice}
              transaction={item}
            />
          ))}

        </tbody>

      </table>

    </div>
  );
}
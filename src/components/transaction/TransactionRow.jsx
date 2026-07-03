import { Eye } from "lucide-react";

export default function TransactionRow({ transaction }) {
  return (
    <tr className="border-b hover:bg-gray-50">

      <td className="p-4">{transaction.invoice}</td>

      <td className="p-4">{transaction.customer}</td>

      <td className="p-4">{transaction.vehicle}</td>

      <td className="p-4">{transaction.date}</td>

      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            transaction.status === "Paid"
              ? "bg-green-100 text-green-600"
              : "bg-yellow-100 text-yellow-600"
          }`}
        >
          {transaction.status}
        </span>
      </td>

      <td className="p-4 font-semibold">
        {transaction.total}
      </td>

      <td className="p-4">
        <button className="text-blue-600 hover:text-blue-800">
          <Eye size={18} />
        </button>
      </td>

    </tr>
  );
}
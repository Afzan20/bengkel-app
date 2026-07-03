import { Search } from "lucide-react";

import TransactionStats from "../../components/transaction/TransactionStats";
import TransactionTable from "../../components/transaction/TransactionTable";

export default function Transactions() {
  return (
    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-3xl font-bold">
            Transactions
          </h1>

          <p className="text-gray-500">
            Manage customer payment transactions.
          </p>
        </div>

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search invoice..."
            className="pl-10 pr-4 py-2 border rounded-xl w-72"
          />

        </div>

      </div>

      <TransactionStats />

      <TransactionTable />

    </div>
  );
}
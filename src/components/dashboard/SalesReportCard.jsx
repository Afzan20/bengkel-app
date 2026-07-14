import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function SalesReportCard() {
  const [report, setReport] = useState({
    revenue: 0,
    paid: 0,
    unpaid: 0,
    completed: 0,
  });

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const { data: transactions } = await supabase
      .from("transactions")
      .select("payment_status,total_amount");

    const { count: completed } = await supabase
      .from("bookings")
      .select("*", {
        count: "exact",
        head: true,
      })
      .eq("status", "Completed");

    let revenue = 0;
    let paid = 0;
    let unpaid = 0;

    transactions?.forEach((trx) => {
      if (trx.payment_status === "Paid") {
        paid++;
        revenue += Number(trx.total_amount);
      } else {
        unpaid++;
      }
    });

    setReport({
      revenue,
      paid,
      unpaid,
      completed: completed || 0,
    });
  }

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number);
  }

  const total = report.paid + report.unpaid;

  const percentage =
    total === 0
      ? 0
      : Math.round((report.paid / total) * 100);

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">

      <h2 className="text-2xl font-bold">
        Sales Report
      </h2>

      <div className="mt-8 text-center">

        <h1 className="text-3xl font-bold text-[#9FA324]">
          {rupiah(report.revenue)}
        </h1>

        <p className="text-gray-500 mt-2">
          Total Revenue
        </p>

      </div>

      <div className="space-y-4 mt-10">

        <div className="flex justify-between">

          <span>Paid Transaction</span>

          <span className="font-bold text-green-600">
            {report.paid}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Unpaid Transaction</span>

          <span className="font-bold text-red-500">
            {report.unpaid}
          </span>

        </div>

        <div className="flex justify-between">

          <span>Completed Service</span>

          <span className="font-bold">
            {report.completed}
          </span>

        </div>

      </div>

      <div className="mt-8">

        <div className="flex justify-between mb-2">

          <span className="text-sm">
            Payment Completion
          </span>

          <span className="font-semibold">
            {percentage}%
          </span>

        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">

          <div
            className="bg-[#DEE33E] h-3 rounded-full"
            style={{
              width: `${percentage}%`,
            }}
          />

        </div>

      </div>

    </div>
  );
}
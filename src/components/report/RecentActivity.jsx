export default function RecentActivity({
  transactions,
}) {
  const recent = [...transactions]
    .sort(
      (a, b) =>
        new Date(b.created_at) -
        new Date(a.created_at)
    )
    .slice(0, 6);

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {recent.map((trx) => (

          <div
            key={trx.id}
            className="border-b pb-3"
          >

            <h3 className="font-semibold">
              {trx.invoice_number}
            </h3>

            <p className="text-sm text-gray-500">

              {trx.payment_method}

              {" • "}

              {trx.payment_status}

            </p>

          </div>

        ))}

      </div>

    </div>
  );
}
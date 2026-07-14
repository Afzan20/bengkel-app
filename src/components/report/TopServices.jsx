export default function TopServices({
  bookings,
  services,
}) {
  const result = {};

  bookings.forEach((booking) => {
    const service = services.find(
      (s) => s.id === booking.service_id
    );

    if (!service) return;

    result[service.service_name] =
      (result[service.service_name] || 0) + 1;
  });

  const top = Object.entries(result)
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => b.total - a.total);

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Top Services
      </h2>

      <div className="space-y-4">

        {top.map((item) => (

          <div
            key={item.name}
            className="flex justify-between border-b pb-2"
          >

            <span>{item.name}</span>

            <span className="font-bold">
              {item.total}
            </span>

          </div>

        ))}

      </div>

    </div>
  );
}
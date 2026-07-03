const services = [
  {
    name: "Oil Change",
    total: 85,
  },
  {
    name: "Engine Tune Up",
    total: 63,
  },
  {
    name: "Brake Service",
    total: 42,
  },
];

export default function TopServices() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Top Services
      </h2>

      <div className="space-y-4">

        {services.map((item) => (
          <div
            key={item.name}
            className="flex justify-between"
          >
            <span>{item.name}</span>

            <span className="font-semibold">
              {item.total}
            </span>
          </div>
        ))}

      </div>

    </div>
  );
}
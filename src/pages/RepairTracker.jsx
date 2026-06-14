import Badge from "../components/common/Badge";

export default function RepairTracker() {
  const repairs = [
    ["01", "Toyota Avanza", "Engine Repair", "In Progress"],
    ["02", "Honda Brio", "Oil Change", "Completed"],
    ["03", "Suzuki Ertiga", "Brake Service", "Pending"],
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-[32px] font-bold leading-[125%] text-black">
        Repair Tracker
      </h1>

      <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
        Tracking proses pengerjaan kendaraan pelanggan.
      </p>

      <div className="grid md:grid-cols-3 gap-5 mt-6">
        {repairs.map((repair) => (
          <div
            key={repair[0]}
            className="bg-[#F7F7F7] rounded-xl p-5 border border-gray-100"
          >
            <p className="text-[13px] leading-[160%] text-gray-400">
              Ticket #{repair[0]}
            </p>

            <h2 className="text-[20px] font-bold text-black mt-3">
              {repair[1]}
            </h2>

            <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
              {repair[2]}
            </p>

            <div className="mt-5">
              <Badge
                type={
                  repair[3] === "Completed"
                    ? "success"
                    : repair[3] === "Pending"
                    ? "pending"
                    : "warning"
                }
                text={repair[3]}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
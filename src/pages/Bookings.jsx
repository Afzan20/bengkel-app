import Badge from "../components/Badge";
import Table from "../components/Table";

export default function Bookings() {
  const bookings = [
    ["01", "Budi Santoso", "Engine Repair", "Pending", "12 June 2026"],
    ["02", "Andi Pratama", "Oil Change", "Completed", "13 June 2026"],
    ["03", "Siti Aulia", "Brake Service", "Warning", "14 June 2026"],
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-[32px] font-bold leading-[125%] text-black">
        Bookings
      </h1>

      <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
        Data booking service kendaraan pelanggan.
      </p>

      <Table headers={["No", "Customer", "Service", "Status", "Date"]}>
        {bookings.map((item) => (
          <tr
            key={item[0]}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td className="py-5">{item[0]}</td>

            <td className="font-semibold">{item[1]}</td>

            <td>{item[2]}</td>

            <td>
              <Badge
                type={
                  item[3] === "Completed"
                    ? "success"
                    : item[3] === "Pending"
                      ? "pending"
                      : "warning"
                }
                text={item[3]}
              />
            </td>

            <td>{item[4]}</td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

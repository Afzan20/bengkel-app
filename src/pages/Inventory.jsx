import Badge from "../components/Badge";
import Table from "../components/Table";

export default function Inventory() {
  const items = [
    ["01", "Engine Oil", "Sparepart", "120 pcs", "Available"],
    ["02", "Brake Pad", "Sparepart", "45 pcs", "Available"],
    ["03", "Car Battery", "Electrical", "8 pcs", "Pending"],
    ["04", "Air Filter", "Sparepart", "0 pcs", "Warning"],
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-[32px] font-bold leading-[125%] text-black">
        Inventory
      </h1>

      <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
        Data stok sparepart dan kebutuhan bengkel.
      </p>

      <Table headers={["No", "Item Name", "Category", "Stock", "Status"]}>
        {items.map((item) => (
          <tr
            key={item[0]}
            className="border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <td className="py-5">{item[0]}</td>
            <td className="font-semibold">{item[1]}</td>
            <td>{item[2]}</td>
            <td>{item[3]}</td>

            <td>
              <Badge
                type={
                  item[4] === "Available"
                    ? "success"
                    : item[4] === "Pending"
                      ? "pending"
                      : "warning"
                }
                text={item[4]}
              />
            </td>
          </tr>
        ))}
      </Table>
    </section>
  );
}

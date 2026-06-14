import TableRow from "../common/TableRow";

export default function RecentOrderTable() {
  const orders = [
    {
      no: "01",
      name: "Shift Creme",
      date: "March 24, 2022",
      status: "Repaired",
      price: "£130",
    },
    {
      no: "02",
      name: "Shift Creme",
      date: "March 24, 2022",
      status: "Repaired",
      price: "£130",
    },
    {
      no: "03",
      name: "Shift Creme",
      date: "March 24, 2022",
      status: "Repaired",
      price: "£130",
    },
  ];

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h1 className="text-[32px] font-bold leading-[125%] text-black">
        Recent Order
      </h1>

      <table className="w-full text-sm mt-6">
        <thead>
          <tr className="text-left text-gray-400 border-b border-gray-100">
            <th className="pb-4 font-medium">No</th>
            <th className="pb-4 font-medium">User Name</th>
            <th className="pb-4 font-medium">Order Date</th>
            <th className="pb-4 font-medium">Status</th>
            <th className="pb-4 font-medium">Price</th>
          </tr>
        </thead>

        <tbody className="text-black">
          {orders.map((order) => (
            <TableRow
              key={order.no}
              no={order.no}
              name={order.name}
              date={order.date}
              status={order.status}
              price={order.price}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Badge from "../common/Badge";

export default function RecentOrderTable() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    getRecentOrders();
  }, []);

  async function getRecentOrders() {
    const { data, error } = await supabase
      .from("bookings")
      .select(`
        booking_code,
        booking_date,
        total_price,
        status,
        users(fullname)
      `)
      .order("created_at", {
        ascending: false,
      })
      .limit(5);

    if (error) {
      console.log(error);
      return;
    }

    setOrders(data);
  }

  function rupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(number || 0);
  }

  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">

      <h1 className="text-[32px] font-bold">
        Recent Booking
      </h1>

      <table className="w-full mt-6">

        <thead>

          <tr className="border-b">

            <th className="text-left py-4">
              Booking
            </th>

            <th className="text-left">
              Customer
            </th>

            <th className="text-left">
              Date
            </th>

            <th className="text-left">
              Status
            </th>

            <th className="text-right">
              Price
            </th>

          </tr>

        </thead>

        <tbody>

          {orders.map((order) => (

            <tr
              key={order.booking_code}
              className="border-b hover:bg-gray-50"
            >

              <td className="py-5 font-semibold">
                {order.booking_code}
              </td>

              <td>
                {order.users?.fullname}
              </td>

              <td>
                {order.booking_date}
              </td>

              <td>

                <Badge
                  type={
                    order.status === "Completed"
                      ? "success"
                      : order.status === "Confirmed"
                      ? "pending"
                      : "warning"
                  }
                  text={order.status}
                />

              </td>

              <td className="text-right font-semibold">
                {rupiah(order.total_price)}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </section>
  );
}
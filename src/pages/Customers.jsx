import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [editingCustomer, setEditingCustomer] = useState(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    const { data, error } = await supabase
      .from("users")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setCustomers(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this customer?"
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("users")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      return;
    }

    fetchCustomers();
  };

  const handleEdit = (customer) => {
    setEditingCustomer(customer);
    setNewName(customer.fullname);
  };

  const handleUpdate = async () => {
    const { error } = await supabase
      .from("users")
      .update({
        fullname: newName,
      })
      .eq("id", editingCustomer.id);

    if (error) {
      console.log(error);
      return;
    }

    setEditingCustomer(null);
    fetchCustomers();
  };

  return (
    <div>
      {/* Header */}
      <div>
        <h1 className="text-[32px] font-bold leading-[125%] text-black">
          Customers
        </h1>

        <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
          Data pelanggan yang terdaftar pada sistem GaragePro.
        </p>
      </div>

      {/* Customer Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="w-12 h-12 rounded-full bg-[#DEE33E] flex items-center justify-center font-bold text-black">
              {customer.fullname?.charAt(0)}
            </div>

            <h2 className="font-bold text-black mt-4">
              {customer.fullname}
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              @{customer.username}
            </p>

            <p className="text-sm text-gray-400 mt-2">
              {customer.email}
            </p>

            <div className="mt-4 space-y-1">
              <p className="text-sm">
                <span className="font-semibold">
                  Membership:
                </span>{" "}
                {customer.membership || "-"}
              </p>

              <p className="text-sm text-[#9FA324] font-semibold">
                {customer.status}
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                onClick={() => handleEdit(customer)}
                className="flex-1 bg-blue-500 text-white py-2 rounded-lg"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(customer.id)}
                className="flex-1 bg-red-500 text-white py-2 rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Edit */}
      {editingCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h2 className="text-xl font-bold mb-4">
              Edit Customer
            </h2>

            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-3 rounded-lg"
            />

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleUpdate}
                className="flex-1 bg-green-500 text-white py-2 rounded-lg"
              >
                Save
              </button>

              <button
                onClick={() => setEditingCustomer(null)}
                className="flex-1 bg-gray-500 text-white py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
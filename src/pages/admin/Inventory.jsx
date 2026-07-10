import { useEffect, useMemo, useState } from "react";
import { supabase } from "../../lib/supabase";

import Table from "../../components/common/Table";
import Badge from "../../components/common/Badge";
import StatusSelect from "../../components/inventory/StatusSelect";
import FormModal from "../../components/common/FormModal";
import InventoryForm from "../../components/inventory/InventoryForm";

export default function Inventory() {
  const [status, setStatus] = useState("all");
  const [search, setSearch] = useState("");

  const [items, setItems] = useState([]);

  const [openModal, setOpenModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    getInventory();
  }, []);

  async function getInventory() {
    const { data, error } = await supabase
      .from("inventory")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setItems(data);
  }

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.part_name.toLowerCase().includes(keyword) ||
        item.category.toLowerCase().includes(keyword) ||
        item.supplier.toLowerCase().includes(keyword);

      const matchStatus =
        status === "all"
          ? true
          : status === "success"
          ? item.status === "Available"
          : status === "pending"
          ? item.status === "Pending"
          : item.status === "Warning";

      return matchSearch && matchStatus;
    });
  }, [items, search, status]);

  function handleAdd() {
    setSelectedItem(null);
    setOpenModal(true);
  }

  function handleEdit(item) {
    setSelectedItem(item);
    setOpenModal(true);
  }

  async function handleDelete(item) {
    const confirmDelete = window.confirm(
      `Delete ${item.part_name}?`
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("inventory")
      .delete()
      .eq("id", item.id);

    if (error) {
      console.log(error);
      return;
    }

    getInventory();
  }

  async function handleSubmit(form) {
    if (selectedItem) {
      const { error } = await supabase
        .from("inventory")
        .update(form)
        .eq("id", selectedItem.id);

      if (error) {
        console.log(error);
        return;
      }
    } else {
      const { error } = await supabase
        .from("inventory")
        .insert([form]);

      if (error) {
        console.log(error);
        return;
      }
    }

    setOpenModal(false);
    setSelectedItem(null);

    getInventory();
  }

  return (
    <>
      <section className="bg-white rounded-xl p-6 shadow-sm">

        <div className="flex justify-between items-center mb-6">

          <div>
            <h1 className="text-3xl font-bold">
              Inventory
            </h1>

            <p className="text-gray-500 mt-2">
              Manage sparepart inventory.
            </p>
          </div>

          <button
            onClick={handleAdd}
            className="bg-[#DEE33E] px-5 py-3 rounded-xl font-semibold"
          >
            + Add Item
          </button>

        </div>

        <div className="flex justify-between mb-6 gap-4">

          <input
            className="border rounded-lg px-4 py-2 w-80"
            placeholder="Search inventory..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <StatusSelect
            value={status}
            onChange={setStatus}
          />

        </div>

        <Table
          headers={[
            "No",
            "Item",
            "Category",
            "Stock",
            "Price",
            "Supplier",
            "Status",
            "Action",
          ]}
        >

          {filteredItems.length === 0 && (
            <tr>
              <td
                colSpan={8}
                className="py-12 text-center text-gray-500"
              >
                No inventory found.
              </td>
            </tr>
          )}

          {filteredItems.map((item, index) => (
            <tr
              key={item.id}
              className="border-b hover:bg-gray-50"
            >
              <td className="py-5">
                {index + 1}
              </td>

              <td className="font-semibold">
                {item.part_name}
              </td>

              <td>{item.category}</td>

              <td>{item.stock}</td>

              <td>
                Rp{" "}
                {Number(item.price).toLocaleString(
                  "id-ID"
                )}
              </td>

              <td>{item.supplier}</td>

              <td>
                <Badge
                  type={
                    item.status === "Available"
                      ? "success"
                      : item.status === "Pending"
                      ? "pending"
                      : "warning"
                  }
                  text={item.status}
                />
              </td>

              <td>

                <button
                  onClick={() =>
                    handleEdit(item)
                  }
                  className="text-blue-600 mr-4 font-medium"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(item)
                  }
                  className="text-red-500 font-medium"
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </Table>

      </section>

      <FormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedItem(null);
        }}
      >
        <InventoryForm
          initialData={selectedItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setOpenModal(false);
            setSelectedItem(null);
          }}
        />
      </FormModal>
    </>
  );
}
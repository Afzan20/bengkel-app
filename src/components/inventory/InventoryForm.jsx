import { useEffect, useState } from "react";

export default function InventoryForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [partName, setPartName] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");
  const [supplier, setSupplier] = useState("");
  const [status, setStatus] = useState("Available");

  useEffect(() => {
    if (initialData) {
      setPartName(initialData.part_name);
      setCategory(initialData.category);
      setStock(initialData.stock);
      setPrice(initialData.price);
      setSupplier(initialData.supplier);
      setStatus(initialData.status);
    } else {
      setPartName("");
      setCategory("");
      setStock("");
      setPrice("");
      setSupplier("");
      setStatus("Available");
    }
  }, [initialData]);

  function handleSave(e) {
    e.preventDefault();

    if (
      !partName ||
      !category ||
      !stock ||
      !price ||
      !supplier
    ) {
      alert("Please complete all fields.");
      return;
    }

    onSubmit({
      part_name: partName,
      category,
      stock: Number(stock),
      price: Number(price),
      supplier,
      status,
    });
  }

  return (
    <form
      onSubmit={handleSave}
      className="bg-white p-6 w-full"
    >
      <h2 className="text-2xl font-bold mb-6">
        {initialData
          ? "Edit Inventory"
          : "Add Inventory"}
      </h2>

      <div className="space-y-4">

        <div>
          <label className="block mb-2 font-medium">
            Item Name
          </label>

          <input
            type="text"
            value={partName}
            onChange={(e) =>
              setPartName(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Category
          </label>

          <input
            type="text"
            value={category}
            onChange={(e) =>
              setCategory(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">

          <div>
            <label className="block mb-2 font-medium">
              Stock
            </label>

            <input
              type="number"
              value={stock}
              onChange={(e) =>
                setStock(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Price
            </label>

            <input
              type="number"
              value={price}
              onChange={(e) =>
                setPrice(e.target.value)
              }
              className="w-full border rounded-lg p-3"
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 font-medium">
            Supplier
          </label>

          <input
            type="text"
            value={supplier}
            onChange={(e) =>
              setSupplier(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border rounded-lg p-3"
          >
            <option>Available</option>
            <option>Pending</option>
            <option>Warning</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end gap-3 mt-8">

        <button
          type="button"
          onClick={onCancel}
          className="px-5 py-3 rounded-xl bg-gray-100"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="px-5 py-3 rounded-xl bg-[#DEE33E] font-semibold"
        >
          {initialData ? "Update" : "Save"}
        </button>

      </div>
    </form>
  );
}
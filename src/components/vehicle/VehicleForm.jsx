import { useState, useEffect } from "react";

export default function VehicleForm({
  initialData,
  onSubmit,
  onCancel,
}) {
  const [form, setForm] = useState({
    plate_number: "",
    brand: "",
    model: "",
    year: "",
    color: "",
    transmission: "",
    fuel_type: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full p-6">

      <h2 className="text-xl font-bold mb-5">
        {initialData ? "Edit Vehicle" : "Add Vehicle"}
      </h2>

      <div className="space-y-3">

        <input
          name="plate_number"
          placeholder="Plate Number"
          className="w-full border p-2 rounded"
          value={form.plate_number}
          onChange={handleChange}
        />

        <input
          name="brand"
          placeholder="Brand"
          className="w-full border p-2 rounded"
          value={form.brand}
          onChange={handleChange}
        />

        <input
          name="model"
          placeholder="Model"
          className="w-full border p-2 rounded"
          value={form.model}
          onChange={handleChange}
        />

        <input
          name="year"
          placeholder="Year"
          className="w-full border p-2 rounded"
          value={form.year}
          onChange={handleChange}
        />

        <input
          name="color"
          placeholder="Color"
          className="w-full border p-2 rounded"
          value={form.color}
          onChange={handleChange}
        />

        <select
          name="transmission"
          className="w-full border p-2 rounded"
          value={form.transmission}
          onChange={handleChange}
        >
          <option value="">Transmission</option>
          <option>Automatic</option>
          <option>Manual</option>
        </select>

        <select
          name="fuel_type"
          className="w-full border p-2 rounded"
          value={form.fuel_type}
          onChange={handleChange}
        >
          <option value="">Fuel Type</option>
          <option>Gasoline</option>
          <option>Diesel</option>
          <option>Electric</option>
        </select>

      </div>

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={onCancel}
          className="px-4 py-2 rounded border"
        >
          Cancel
        </button>

        <button
          onClick={() => onSubmit(form)}
          className="px-4 py-2 bg-[#DEE33E] rounded font-semibold"
        >
          Save
        </button>

      </div>
    </div>
  );
}

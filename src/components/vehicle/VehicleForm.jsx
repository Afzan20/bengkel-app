import { useState, useEffect } from "react";
import Button from "../common/Button";
import InputField from "../common/InputField";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <InputField
        name="plate_number"
        placeholder="Plate Number"
        value={form.plate_number}
        onChange={handleChange}
      />

      <InputField
        name="brand"
        placeholder="Brand"
        value={form.brand}
        onChange={handleChange}
      />

      <InputField
        name="model"
        placeholder="Model"
        value={form.model}
        onChange={handleChange}
      />

      <InputField
        name="year"
        type="number"
        placeholder="Year"
        value={form.year}
        onChange={handleChange}
      />

      <InputField
        name="color"
        placeholder="Color"
        value={form.color}
        onChange={handleChange}
      />

      <select
        name="transmission"
        value={form.transmission}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
      >
        <option value="">Transmission</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>

      <select
        name="fuel_type"
        value={form.fuel_type}
        onChange={handleChange}
        className="w-full border rounded-lg px-4 py-3"
      >
        <option value="">Fuel Type</option>
        <option value="Bensin">Bensin</option>
        <option value="Diesel">Diesel</option>
        <option value="Hybrid">Hybrid</option>
        <option value="Electric">Electric</option>
      </select>

      <div className="flex justify-end gap-3 pt-4">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
        >
          Cancel
        </Button>

        <Button type="submit">
          Save Vehicle
        </Button>
      </div>

    </form>
  );
}
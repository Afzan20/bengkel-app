import { Car, Pencil, Trash2 } from "lucide-react";

export default function VehicleCard({
  vehicle,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 hover:shadow-lg transition">

      {/* Header */}
      <div className="flex items-center gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl bg-[#DEE33E] flex items-center justify-center">
          <Car className="text-black" size={28} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {vehicle.brand} {vehicle.model}
          </h2>

          <p className="text-gray-500">
            {vehicle.plate_number}
          </p>
        </div>
      </div>

      {/* Information */}
      <div className="grid grid-cols-2 gap-y-3 text-sm">

        <div>
          <p className="text-gray-400">Year</p>
          <p className="font-medium">{vehicle.year}</p>
        </div>

        <div>
          <p className="text-gray-400">Color</p>
          <p className="font-medium">{vehicle.color}</p>
        </div>

        <div>
          <p className="text-gray-400">Transmission</p>
          <p className="font-medium">{vehicle.transmission}</p>
        </div>

        <div>
          <p className="text-gray-400">Fuel</p>
          <p className="font-medium">{vehicle.fuel_type}</p>
        </div>

      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(vehicle)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(vehicle)}
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>
    </div>
  );
}
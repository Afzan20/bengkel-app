import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import VehicleCard from "../../components/vehicle/VehicleCard";
import VehicleForm from "../../components/vehicle/VehicleForm";
import FormModal from "../../components/common/FormModal";

export default function MyVehicles() {
  const [vehicles, setVehicles] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    getVehicles();
  }, []);

  async function getVehicles() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { data, error } = await supabase
      .from("vehicles")
      .select("*")
      .eq("user_id", currentUser.id)
      .order("created_at", { ascending: false });

    if (!error) {
      setVehicles(data);
    } else {
      console.log(error);
    }
  }

  const handleAddClick = () => {
    setSelectedVehicle(null);
    setOpenModal(true);
  };

  const handleEditVehicle = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenModal(true);
  };

  const handleDeleteVehicle = async (vehicle) => {
    const confirmDelete = window.confirm(
      `Delete ${vehicle.brand} ${vehicle.model}?`,
    );

    if (!confirmDelete) return;

    const { error } = await supabase
      .from("vehicles")
      .delete()
      .eq("id", vehicle.id);

    if (error) {
      console.log(error);
      return;
    }

    getVehicles();
  };

  const handleSubmit = async (form) => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (selectedVehicle) {
      // UPDATE
      const { error } = await supabase
        .from("vehicles")
        .update(form)
        .eq("id", selectedVehicle.id);

      if (error) {
        console.log(error);
        return;
      }
    } else {
      // INSERT
      const { error } = await supabase.from("vehicles").insert([
        {
          ...form,
          user_id: currentUser.id,
        },
      ]);

      if (error) {
        console.log(error);
        return;
      }
    }

    setOpenModal(false);
    setSelectedVehicle(null);
    getVehicles();
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Vehicles</h1>

        <button
          onClick={handleAddClick}
          className="bg-[#DEE33E] px-5 py-2 rounded-lg font-semibold"
        >
          + Add Vehicle
        </button>
      </div>

      <div className="grid grid-cols-2 gap-5">
        <div className="grid lg:grid-cols-2 gap-6">
          {vehicles.map((vehicle) => (
            <VehicleCard
              key={vehicle.id}
              vehicle={vehicle}
              onEdit={handleEditVehicle}
              onDelete={handleDeleteVehicle}
            />
          ))}
          {vehicles.length === 0 && (
            <div className="col-span-2 text-center py-16">
              <h2 className="text-xl font-semibold">No Vehicles Yet</h2>

              <p className="text-gray-500 mt-2">
                Click "Add Vehicle" to register your first vehicle.
              </p>
            </div>
          )}
        </div>
      </div>
      <FormModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedVehicle(null);
        }}
      >
        <VehicleForm
          initialData={selectedVehicle}
          onSubmit={handleSubmit}
          onCancel={() => {
            setOpenModal(false);
            setSelectedVehicle(null);
          }}
        />
      </FormModal>
    </div>
  );
}

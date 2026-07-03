import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import VehicleCard from "../../components/vehicle/VehicleCard";
import VehicleForm from "../../components/vehicle/VehicleForm";
import Modal from "../../components/common/Modal";

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
      .eq("user_id", currentUser.id);

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

  const handleDeleteVehicle = (vehicle) => {
    console.log(vehicle);
  };

  const handleSubmit = async (form) => {
    console.log(form);

    setOpenModal(false);
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
        </div>
      </div>
      <Modal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedVehicle(null);
        }}
      >
        <VehicleForm
          initialData={selectedVehicle}
          onSubmit={handleSubmit}
          onCancel={() => setOpenModal(false)}
        />
      </Modal>
    </div>
  );
}

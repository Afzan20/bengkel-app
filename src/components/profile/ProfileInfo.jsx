export default function ProfileInfo() {
  const data = [
    {
      label: "Full Name",
      value: "Admin Garage",
    },
    {
      label: "Username",
      value: "admin",
    },
    {
      label: "Email",
      value: "admin@garagepro.com",
    },
    {
      label: "Phone",
      value: "+62 812-3456-7890",
    },
    {
      label: "Address",
      value: "Jakarta, Indonesia",
    },
    {
      label: "Role",
      value: "Administrator",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-xl font-bold mb-6">
        Personal Information
      </h2>

      <div className="grid grid-cols-2 gap-6">

        {data.map((item) => (
          <div key={item.label}>

            <p className="text-sm text-gray-500">
              {item.label}
            </p>

            <h3 className="font-semibold mt-1">
              {item.value}
            </h3>

          </div>
        ))}

      </div>

    </div>
  );
}
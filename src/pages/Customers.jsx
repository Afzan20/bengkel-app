export default function Customers() {
  const customers = [
    ["Budi Santoso", "Toyota Avanza", "3 Services"],
    ["Andi Pratama", "Honda Brio", "2 Services"],
    ["Siti Aulia", "Suzuki Ertiga", "1 Service"],
    ["Rizky Ramadhan", "Daihatsu Xenia", "4 Services"],
  ];

  return (
    <div>
      <h1 className="text-[32px] font-bold leading-[125%] text-black">
        Customers
      </h1>

      <p className="text-[14px] leading-[160%] text-gray-500 mt-2">
        Data pelanggan yang pernah melakukan service kendaraan.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        {customers.map((customer, index) => (
          <div key={index} className="bg-white rounded-xl p-5 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#DEE33E] flex items-center justify-center font-bold text-black">
              {customer[0].charAt(0)}
            </div>

            <h2 className="font-bold text-black mt-4">
              {customer[0]}
            </h2>

            <p className="text-sm text-gray-400 mt-1">
              {customer[1]}
            </p>

            <p className="text-sm text-[#9FA324] font-semibold mt-4">
              {customer[2]}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
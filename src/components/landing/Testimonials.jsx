export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      vehicle: "Toyota Avanza",
      rating: 5,
      review:
        "Pelayanannya sangat cepat dan mekaniknya profesional. Mobil saya kembali seperti baru.",
    },
    {
      id: 2,
      name: "Andi Pratama",
      vehicle: "Honda Civic",
      rating: 5,
      review:
        "Harga transparan, pengerjaan tepat waktu, dan hasil servis sangat memuaskan.",
    },
    {
      id: 3,
      name: "Siti Aulia",
      vehicle: "Suzuki Ertiga",
      rating: 5,
      review:
        "Booking online sangat mudah. Saya juga bisa memantau progress perbaikan kendaraan.",
    },
  ];

  return (
    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        <div className="text-center mb-16">

          <span className="uppercase tracking-widest text-[#9FA324] font-semibold">
            Testimonials
          </span>

          <h2 className="text-5xl font-bold mt-4">
            What Our Customers Say
          </h2>

          <p className="text-gray-500 mt-5">
            Customer satisfaction is our priority.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {testimonials.map((item) => (

            <div
              key={item.id}
              className="bg-[#F8F9FA] rounded-3xl p-8 shadow-sm hover:shadow-xl transition"
            >

              <div className="text-yellow-500 text-2xl">
                {"⭐".repeat(item.rating)}
              </div>

              <p className="mt-6 text-gray-600 leading-8">
                "{item.review}"
              </p>

              <div className="mt-8 border-t pt-6">

                <h3 className="font-bold text-xl">
                  {item.name}
                </h3>

                <p className="text-gray-500">
                  {item.vehicle}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </section>
  );
}
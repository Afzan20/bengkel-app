import StatsCard from "../components/StatsCard";
import ServiceCard from "../components/ServiceCard";

export default function Dashboard() {
  const services = [
    {
      title: "Engine Repair",
      desc: "Professional engine repair with experienced mechanics.",
      image:
        "https://images.unsplash.com/photo-1487754180451-c456f719a1fc",
    },

    {
      title: "Brake Repair",
      desc: "Safe brake replacement and maintenance service.",
      image:
        "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e",
    },

    {
      title: "Oil Change",
      desc: "Premium oil replacement for better engine performance.",
      image:
        "https://images.unsplash.com/photo-1632823471565-1ecdf1f2c8dc",
    },
  ];

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[32px] p-8 md:p-12 overflow-hidden relative">
        <div className="max-w-2xl relative z-10">
          <p className="uppercase tracking-[5px] text-sm text-orange-100">
            GaragePro Workshop
          </p>

          <h1 className="text-4xl md:text-6xl font-bold mt-4 leading-tight">
            Professional Car Repair & Service
          </h1>

          <p className="mt-6 text-orange-100 text-lg leading-relaxed">
            Fast, trusted and professional automotive services for your vehicle.
          </p>

          <button className="mt-8 bg-black hover:bg-zinc-900 px-6 py-4 rounded-2xl font-semibold transition-all duration-300">
            Book Appointment
          </button>
        </div>

        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70"
          alt="car"
          className="absolute right-0 bottom-0 h-full w-[45%] object-cover hidden lg:block"
        />
      </section>

      <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Total Customers"
          value="1,240"
          growth="+12%"
        />

        <StatsCard
          title="Cars Repaired"
          value="890"
          growth="+8%"
        />

        <StatsCard
          title="Bookings"
          value="320"
          growth="+15%"
        />

        <StatsCard
          title="Mechanics"
          value="12"
          growth="+5%"
        />
      </section>

        <section>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">
              Popular Services
            </h1>

            <p className="text-zinc-400 mt-2">
              Most requested automotive services
            </p>
          </div>

          <button className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-2xl transition-all duration-300">
            View All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              desc={service.desc}
              image={service.image}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
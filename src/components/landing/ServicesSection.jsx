import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ServicesSection() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServices();
  }, []);

  async function getServices() {
    const { data, error } = await supabase
      .from("services")
      .select("*")
      .eq("status", "Available")
      .order("id");

    if (error) {
      console.log(error);
      return;
    }

    setServices(data);
  }

  function formatPrice(price) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  }

  return (
    <section id="services" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="text-[#9FA324] font-semibold uppercase tracking-widest">
            Our Services
          </span>

          <h2 className="text-5xl font-bold mt-4">
            Professional Auto Services
          </h2>

          <p className="text-gray-500 mt-5 max-w-2xl mx-auto">
            We provide complete vehicle maintenance and repair services
            performed by experienced mechanics using high quality spare parts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#F8F9FA] rounded-3xl p-8 hover:bg-[#DEE33E] transition duration-300 group shadow-sm hover:shadow-xl"
            >
              <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center text-3xl shadow">
                🔧
              </div>

              <h3 className="text-2xl font-bold mt-8 group-hover:text-black">
                {service.service_name}
              </h3>

              <p className="text-gray-600 mt-4 min-h-[70px]">
                {service.description}
              </p>

              <div className="mt-8 space-y-2">
                <p className="font-bold text-xl">
                  {formatPrice(service.price)}
                </p>

                <p className="text-sm text-gray-500">
                  Estimated Time : {service.estimated_time}
                </p>
              </div>

              <button className="mt-8 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition">
                Book Service
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

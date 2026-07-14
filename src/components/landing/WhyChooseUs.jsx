import {
  ShieldCheck,
  Wrench,
  Clock3,
  BadgeDollarSign,
  Car,
  Users,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      icon: <Wrench size={34} />,
      title: "Certified Mechanics",
      desc: "Our experienced mechanics are trained to handle all types of vehicle repairs professionally.",
    },
    {
      icon: <ShieldCheck size={34} />,
      title: "Genuine Spare Parts",
      desc: "We only use high-quality genuine spare parts to ensure maximum performance.",
    },
    {
      icon: <Clock3 size={34} />,
      title: "Fast Service",
      desc: "Efficient repair process with accurate completion estimates.",
    },
    {
      icon: <BadgeDollarSign size={34} />,
      title: "Transparent Pricing",
      desc: "No hidden costs. Every repair comes with a clear price estimate.",
    },
    {
      icon: <Car size={34} />,
      title: "Modern Equipment",
      desc: "Supported by modern diagnostic tools for accurate vehicle inspections.",
    },
    {
      icon: <Users size={34} />,
      title: "Customer Satisfaction",
      desc: "Thousands of customers trust our services for their vehicle maintenance.",
    },
  ];

  return (
    <section id="about" className="scroll-mt-28">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <span className="uppercase tracking-widest text-[#9FA324] font-semibold">
            Why Choose Us
          </span>

          <h2 className="text-5xl font-bold mt-4">Trusted Garage Since 2016</h2>

          <p className="text-gray-500 mt-5 max-w-3xl mx-auto">
            We combine experienced mechanics, transparent pricing, genuine spare
            parts, and modern technology to provide the best automotive service
            experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-8 shadow-sm hover:shadow-xl hover:-translate-y-2 transition duration-300"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#DEE33E] flex items-center justify-center">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mt-6">{item.title}</h3>

              <p className="text-gray-500 mt-4 leading-7">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

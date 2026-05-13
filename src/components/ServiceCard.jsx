export default function ServiceCard({
  title,
  desc,
  image,
}) {
  return (
    <div className="bg-[#1B1B1B] rounded-3xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition-all duration-300 group">
      <div className="h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
        />
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold">{title}</h2>

        <p className="text-zinc-400 mt-3 leading-relaxed">
          {desc}
        </p>

        <button className="mt-6 bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-2xl font-semibold transition-all duration-300">
          Book Service
        </button>
      </div>
    </div>
  );
}
export default function MemberInfoCard({ title, children }) {
  return (
    <section className="bg-white rounded-xl p-6 shadow-sm">
      <h2 className="text-[20px] font-bold text-black mb-5">
        {title}
      </h2>

      <div className="space-y-3 text-[14px] leading-[160%]">
        {children}
      </div>
    </section>
  );
}
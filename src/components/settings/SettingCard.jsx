export default function SettingCard({
  title,
  children,
}) {
  return (
    <div className="bg-white rounded-2xl shadow">

      <div className="border-b p-5">

        <h2 className="text-lg font-bold">
          {title}
        </h2>

      </div>

      <div className="p-2">

        {children}

      </div>

    </div>
  );
}
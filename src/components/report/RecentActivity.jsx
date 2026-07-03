const activities = [
  "Afzan completed payment INV-001",
  "Budi booked Oil Change",
  "Rizky completed Engine Repair",
  "Dimas upgraded membership",
];

export default function RecentActivity() {
  return (
    <div className="bg-white rounded-2xl shadow p-6">

      <h2 className="text-lg font-semibold mb-5">
        Recent Activity
      </h2>

      <div className="space-y-4">

        {activities.map((activity, index) => (
          <div
            key={index}
            className="border-b pb-2"
          >
            {activity}
          </div>
        ))}

      </div>

    </div>
  );
}
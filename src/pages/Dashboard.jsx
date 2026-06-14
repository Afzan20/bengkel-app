import StatsCard from "../components/dashboard/StatsCard";
import SalesChartCard from "../components/dashboard/SalesChartCard";
import SalesReportCard from "../components/dashboard/SalesReportCard";
import RecentOrderTable from "../components/dashboard/RecentOrderTable";

export default function Dashboard() {
  const cards = [
    { title: "New Net Income", value: "£8,245.00" },
    { title: "Total Bookings", value: "256" },
    { title: "Resolved Issues", value: "1,256" },
  ];

  return (
    <div className="space-y-6">
      <section className="grid md:grid-cols-3 gap-5">
        {cards.map((card, index) => (
          <StatsCard
            key={index}
            title={card.title}
            value={card.value}
          />
        ))}
      </section>

      <section className="grid lg:grid-cols-3 gap-5">
        <SalesChartCard />
        <SalesReportCard />
      </section>

      <RecentOrderTable />
    </div>
  );
}
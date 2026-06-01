import StatsCard from "../components/StatsCard";
import SalesChartCard from "../components/SalesChartCard";
import SalesReportCard from "../components/SalesReportCard";
import RecentOrderTable from "../components/RecentOrderTable";

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
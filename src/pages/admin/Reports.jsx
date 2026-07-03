import ReportStats from "../../components/report/ReportStats";
import RevenueChart from "../../components/report/RevenueChart";
import ServiceChart from "../../components/report/ServiceChart";
import TopServices from "../../components/report/TopServices";
import RecentActivity from "../../components/report/RecentActivity";

export default function Reports() {
  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <p className="text-gray-500">
          Business performance overview.
        </p>
      </div>

      <ReportStats />

      <div className="grid grid-cols-2 gap-6">
        <RevenueChart />
        <ServiceChart />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <TopServices />
        <RecentActivity />
      </div>

    </div>
  );
}
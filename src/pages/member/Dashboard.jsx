import DashboardHeader from "../../components/memberDashboard/DashboardHeader";
import MembershipCard from "../../components/memberDashboard/MembershipCard";
import SummaryCards from "../../components/memberDashboard/SummaryCards";
import RepairProgress from "../../components/memberDashboard/RepairProgress";
import RecentBooking from "../../components/memberDashboard/RecentBooking";
import QuickActions from "../../components/memberDashboard/QuickActions";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <DashboardHeader />

      <div className="mt-8">
        <MembershipCard />
      </div>

      <div className="mt-8">
        <SummaryCards />
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mt-8">
        <RepairProgress />
        <RecentBooking />
      </div>

      <div className="mt-8">
        <QuickActions />
      </div>

      <RecentBooking />
    </div>
  );
}

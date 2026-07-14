import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

import ReportStats from "../../components/report/ReportStats";
import RevenueChart from "../../components/report/RevenueChart";
import ServiceChart from "../../components/report/ServiceChart";
import TopServices from "../../components/report/TopServices";
import RecentActivity from "../../components/report/RecentActivity";

export default function Reports() {
  const [reportData, setReportData] = useState({
    bookings: [],
    transactions: [],
    services: [],
    customers: [],
    vehicles: [],
  });

  useEffect(() => {
    loadReport();
  }, []);

  async function loadReport() {
    const [bookingRes, transactionRes, serviceRes, customerRes, vehicleRes] =
      await Promise.all([
        supabase.from("bookings").select("*"),
        supabase.from("transactions").select("*"),
        supabase.from("services").select("*"),
        supabase.from("users").select("*").eq("role", "member"),
        supabase.from("vehicles").select("*"),
      ]);

    setReportData({
      bookings: bookingRes.data || [],
      transactions: transactionRes.data || [],
      services: serviceRes.data || [],
      customers: customerRes.data || [],
      vehicles: vehicleRes.data || [],
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Reports</h1>

        <p className="text-gray-500 mt-2">Business analytics dashboard.</p>
      </div>

      <ReportStats data={reportData} />

      <div className="grid xl:grid-cols-2 gap-8">
        <RevenueChart data={reportData.transactions} />

        <ServiceChart bookings={reportData.bookings} />
      </div>

      <div className="grid xl:grid-cols-2 gap-8">
        <TopServices
          bookings={reportData.bookings}
          services={reportData.services}
        />

        <RecentActivity transactions={reportData.transactions} />
      </div>
    </div>
  );
}

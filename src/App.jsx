import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import AdminLayout from "./layouts/AdminLayout";
import MemberLayout from "./layouts/MemberLayout";
import AuthLayout from "./layouts/AuthLayout";

// AUTH
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));

// ADMIN
const AdminDashboard = lazy(() => import("./pages/admin/Dashboard"));
const Customers = lazy(() => import("./pages/admin/Customers"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));
const Bookings = lazy(() => import("./pages/admin/Bookings"));
const RepairTracker = lazy(() => import("./pages/admin/RepairTracker"));
const Transactions = lazy(() => import("./pages/admin/Transactions"));
const Reports = lazy(() => import("./pages/admin/Reports"));
const AdminProfile = lazy(() => import("./pages/admin/Profile"));
const AdminSettings = lazy(() => import("./pages/admin/Settings"));

// MEMBER
const MemberDashboard = lazy(() => import("./pages/member/Dashboard"));
const MyVehicles = lazy(() => import("./pages/member/MyVehicles"));
const BookingService = lazy(() => import("./pages/member/BookingService"));
const BookingHistory = lazy(() => import("./pages/member/BookingHistory"));
const MemberRepair = lazy(() => import("./pages/member/RepairTracker"));
const MemberTransactions = lazy(() => import("./pages/member/Transactions"));
const Membership = lazy(() => import("./pages/member/Membership"));
const MemberProfile = lazy(() => import("./pages/member/Profile"));
const MemberSettings = lazy(() => import("./pages/member/Settings"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <Routes>

        {/* AUTH */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* ADMIN */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/customers" element={<Customers />} />
          <Route path="/admin/inventory" element={<Inventory />} />
          <Route path="/admin/bookings" element={<Bookings />} />
          <Route path="/admin/repair" element={<RepairTracker />} />
          <Route path="/admin/transactions" element={<Transactions />} />
          <Route path="/admin/reports" element={<Reports />} />
          <Route path="/admin/profile" element={<AdminProfile />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
        </Route>

        {/* MEMBER */}
        <Route element={<MemberLayout />}>
          <Route path="/member/dashboard" element={<MemberDashboard />} />
          <Route path="/member/my-vehicles" element={<MyVehicles />} />
          <Route path="/member/booking" element={<BookingService />} />
          <Route path="/member/history" element={<BookingHistory />} />
          <Route path="/member/repair" element={<MemberRepair />} />
          <Route path="/member/transactions" element={<MemberTransactions />} />
          <Route path="/member/membership" element={<Membership />} />
          <Route path="/member/profile" element={<MemberProfile />} />
          <Route path="/member/settings" element={<MemberSettings />} />
        </Route>

      </Routes>
    </Suspense>
  );
}
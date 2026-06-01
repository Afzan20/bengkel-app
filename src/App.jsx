import { lazy, Suspense } from "react";

import { Routes, Route } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Inventory = lazy(() => import("./pages/Inventory"));
const RepairTracker = lazy(() => import("./pages/RepairTracker"));
const Customers = lazy(() => import("./pages/Customers"));
const Bookings = lazy(() => import("./pages/Bookings"));

function App() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center bg-zinc-950 text-white">
          Loading...
        </div>
      }
    >
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/repair" element={<RepairTracker />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/bookings" element={<Bookings />} />
        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;

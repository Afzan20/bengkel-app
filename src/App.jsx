import { lazy, Suspense } from "react";

import {
  Routes,
  Route,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

const Dashboard = lazy(() => import("./pages/Dashboard"));
const Login = lazy(() => import("./pages/Login"));

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
          <Route
            path="/Dashboard"
            element={<Dashboard />}
          />
        </Route>

        <Route element={<AuthLayout />}>
          <Route
            path="/"
            element={<Login />}
          />
        </Route>

      </Routes>
    </Suspense>
  );
}

export default App;
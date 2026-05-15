import { useNavigate } from "react-router-dom";
import { Eye, Mail } from "lucide-react";
import { useState } from "react";
import Alert from "../components/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-[32px] font-bold leading-[125%]">
        Login to your account
      </h1>

      {error && (
          <Alert
            type="error"
            message={error}
          />
        )}

      <div className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-[#F7F7F7] px-4 py-4 rounded-lg outline-none text-sm"
        />

        <div className="relative">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#F7F7F7] px-4 py-4 rounded-lg outline-none text-sm"
          />
          <Eye size={18} className="absolute right-4 top-4 text-gray-400" />
        </div>

        <div className="flex justify-between text-xs">
          <label className="flex gap-2 items-center text-gray-600">
            <input type="radio" />
            Remember me
          </label>

          <button className="text-[#A7AF1D] font-semibold">
            Forgot Password?
          </button>
        </div>

        <button
          onClick={() => {

            if (!email || !password) {
              setError("All fields are required");
              return;
            }

            setError("");

            navigate("/dashboard");
          }}
          className="w-full bg-[#DDE33E] hover:bg-[#9FA324] text-black py-4 rounded-lg font-bold transition"
        >
          Sign in with email
        </button>

        <div className="flex items-center gap-3 text-xs text-gray-400">
          <div className="h-px flex-1 bg-gray-200" />
          Or login with
          <div className="h-px flex-1 bg-gray-200" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button className="border border-gray-200 py-3 rounded-lg text-sm">
            Google
          </button>

          <button className="border border-gray-200 py-3 rounded-lg text-sm">
            Apple
          </button>
        </div>

        <p className="text-center text-xs text-gray-500">
          Don&apos;t have an account?{" "}
          <span className="text-[#A7AF1D] font-bold">Get Started</span>
        </p>
      </div>
    </div>
  );
}
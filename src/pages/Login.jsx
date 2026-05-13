import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  return (
    <div className="w-full max-w-md bg-[#1B1B1B] border border-zinc-800 rounded-[32px] p-8">
      
      <h1 className="text-4xl font-bold text-white">
        Welcome Back
      </h1>

      <p className="text-zinc-400 mt-3">
        Login to continue using GaragePro
      </p>

      <div className="space-y-5 mt-10">

        <div>
          <label className="text-sm text-zinc-400">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 bg-zinc-900 p-4 rounded-2xl outline-none border border-zinc-800 focus:border-orange-500 transition-all"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 bg-zinc-900 p-4 rounded-2xl outline-none border border-zinc-800 focus:border-orange-500 transition-all"
          />
        </div>

        <button
          onClick={() => navigate("/dashboard")}
          className="w-full bg-orange-500 hover:bg-orange-600 p-4 rounded-2xl font-semibold transition-all duration-300"
        >
          Login
        </button>

      </div>
    </div>
  );
}
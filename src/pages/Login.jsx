import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Eye } from "lucide-react";
import { supabase } from "../lib/supabase";
import { Link } from "react-router-dom";
import InputField from "../components/common/InputField";
import Button from "../components/common/Button";
import Alert from "../components/common/Alert";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const emailRef = useRef(null);
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleLogin = async () => {
  if (!email || !password) {
    setError("All fields are required");
    return;
  }

  const { data: user, error: dbError } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  if (dbError || !user) {
    setError("Account not found");
    return;
  }

  if (password !== user.password) {
    setError("Email or password is incorrect");
    return;
  }

  localStorage.setItem(
    "currentUser",
    JSON.stringify(user)
  );

  setError("");
  navigate("/dashboard");
};

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-center text-[32px] font-bold leading-[125%] text-black">
        Login to your account
      </h1>

      {error && (
        <div className="mt-5">
          <Alert type="error" message={error} />
        </div>
      )}

      <div className="mt-8 space-y-4">
        <InputField
          ref={emailRef}
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          icon={<Eye size={18} />}
        />

        <div className="flex justify-between text-[13px] leading-[160%]">
          <label className="flex gap-2 items-center text-gray-600">
            <input type="radio" />
            Remember me
          </label>

          <button className="text-[#9FA324] font-semibold">
            Forgot Password?
          </button>
        </div>

        <Button onClick={handleLogin}>Sign in with email</Button>

        <div className="flex items-center gap-3 text-[13px] leading-[160%] text-gray-400">
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

        <p className="text-center text-[13px] leading-[160%] text-gray-500">
          Don&apos;t have an account?{" "}
          <Link
            to="/register"
            className="text-[#9FA324] font-bold hover:underline"
          >
            Get Started
          </Link>
        </p>
      </div>
    </div>
  );
}

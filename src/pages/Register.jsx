import { useState } from "react";
import { useNavigate } from "react-router-dom";

import InputField from "../components/InputField";
import Button from "../components/Button";
import Alert from "../components/Alert";

export default function Register() {
  const navigate = useNavigate();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = () => {
    if (!fullname || !email || !password) {
      setSuccess("");
      setError("All fields are required");
      return;
    }

    setError("");
    setSuccess("Account successfully created");

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 className="text-center text-[32px] font-bold leading-[125%] text-black">
        Create Account
      </h1>

      <p className="text-center text-[14px] leading-[160%] text-gray-500 mt-2">
        Register your GaragePro account
      </p>

      {error && (
        <div className="mt-5">
          <Alert type="error" message={error} />
        </div>
      )}

      {success && (
        <div className="mt-5">
          <Alert type="success" message={success} />
        </div>
      )}

      <div className="mt-8 space-y-4">
        <InputField
          type="text"
          placeholder="Full Name"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <InputField
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
        />

        <Button onClick={handleRegister}>
          Register
        </Button>

        <p className="text-center text-[13px] leading-[160%] text-gray-500">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/")}
            className="text-[#9FA324] font-bold"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
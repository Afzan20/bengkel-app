import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function Profile() {
  const [loading, setLoading] = useState(true);

  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [status, setStatus] = useState("");
  const [role, setRole] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", currentUser.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setFullname(data.fullname);
    setUsername(data.username);
    setEmail(data.email);
    setPassword(data.password);
    setStatus(data.status);
    setRole(data.role);
    setCreatedAt(data.created_at);

    setLoading(false);
  }

  async function saveProfile() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { error } = await supabase
      .from("users")
      .update({
        fullname,
        username,
        email,
        password,
      })
      .eq("id", currentUser.id);

    if (error) {
      alert(error.message);
      return;
    }

    currentUser.fullname = fullname;
    currentUser.username = username;
    currentUser.email = email;
    currentUser.password = password;

    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    alert("Profile updated successfully.");
  }

  if (loading) {
    return (
      <div className="flex justify-center py-24">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          My Profile
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account information.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-10">

        {/* Avatar */}

        <div className="flex flex-col items-center">

          <div className="w-28 h-28 rounded-full bg-[#DEE33E] flex items-center justify-center text-5xl font-bold">
            {fullname.charAt(0).toUpperCase()}
          </div>

          <h2 className="mt-5 text-3xl font-bold">
            {fullname}
          </h2>

          <p className="text-gray-500 capitalize">
            {role}
          </p>

        </div>

        {/* Form */}

        <div className="grid md:grid-cols-2 gap-8 mt-12">

          <div>
            <label className="font-semibold">
              Full Name
            </label>

            <input
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Username
            </label>

            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Email
            </label>

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Status
            </label>

            <input
              disabled
              value={status}
              className="mt-2 w-full bg-gray-100 rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Joined
            </label>

            <input
              disabled
              value={new Date(createdAt).toLocaleDateString()}
              className="mt-2 w-full bg-gray-100 rounded-xl px-4 py-3"
            />
          </div>

        </div>

        <button
          onClick={saveProfile}
          className="mt-10 w-full bg-[#DEE33E] hover:bg-[#cfd52d] rounded-xl py-4 font-bold transition"
        >
          Save Changes
        </button>

      </div>

    </div>
  );
}
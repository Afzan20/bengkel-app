import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabase";

export default function Settings() {
  const navigate = useNavigate();

  const [emailNotif, setEmailNotif] = useState(true);
  const [bookingNotif, setBookingNotif] = useState(true);
  const [serviceReminder, setServiceReminder] = useState(true);

  const [password, setPassword] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("member_settings"));

    if (saved) {
      setEmailNotif(saved.emailNotif);
      setBookingNotif(saved.bookingNotif);
      setServiceReminder(saved.serviceReminder);
    }
  }, []);

  function saveSettings() {
    localStorage.setItem(
      "member_settings",
      JSON.stringify({
        emailNotif,
        bookingNotif,
        serviceReminder,
      })
    );

    alert("Settings saved successfully.");
  }

  async function changePassword() {
    if (!password) {
      alert("Enter new password.");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const { error } = await supabase
      .from("users")
      .update({
        password,
      })
      .eq("id", currentUser.id);

    if (error) {
      alert(error.message);
      return;
    }

    currentUser.password = password;
    localStorage.setItem(
      "currentUser",
      JSON.stringify(currentUser)
    );

    setPassword("");

    alert("Password updated successfully.");
  }

  function logout() {
    if (!window.confirm("Logout now?")) return;

    localStorage.removeItem("currentUser");

    navigate("/login");
  }

  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your account preferences.
        </p>
      </div>

      {/* Notification */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-8">
          Notification Settings
        </h2>

        <div className="space-y-6">

          <label className="flex justify-between items-center">

            <span>Email Notification</span>

            <input
              type="checkbox"
              checked={emailNotif}
              onChange={() =>
                setEmailNotif(!emailNotif)
              }
              className="w-5 h-5"
            />

          </label>

          <label className="flex justify-between items-center">

            <span>Booking Notification</span>

            <input
              type="checkbox"
              checked={bookingNotif}
              onChange={() =>
                setBookingNotif(!bookingNotif)
              }
              className="w-5 h-5"
            />

          </label>

          <label className="flex justify-between items-center">

            <span>Service Reminder</span>

            <input
              type="checkbox"
              checked={serviceReminder}
              onChange={() =>
                setServiceReminder(!serviceReminder)
              }
              className="w-5 h-5"
            />

          </label>

        </div>

        <button
          onClick={saveSettings}
          className="mt-8 px-8 py-3 rounded-xl bg-[#DEE33E] font-bold hover:bg-[#cad12d]"
        >
          Save Settings
        </button>

      </div>

      {/* Password */}

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold">
          Change Password
        </h2>

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full border rounded-xl px-4 py-3 mt-6"
        />

        <button
          onClick={changePassword}
          className="mt-6 bg-[#DEE33E] px-8 py-3 rounded-xl font-bold hover:bg-[#cad12d]"
        >
          Update Password
        </button>

      </div>

      {/* Logout */}

      <div className="bg-red-50 rounded-3xl border border-red-200 p-8">

        <h2 className="text-2xl font-bold text-red-600">
          Danger Zone
        </h2>

        <p className="text-gray-600 mt-3">
          Logout from your GaragePro account.
        </p>

        <button
          onClick={logout}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-xl font-bold"
        >
          Logout
        </button>

      </div>

    </div>
  );
}
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Crown, Check } from "lucide-react";

export default function Membership() {
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  const packages = [
    {
      level: "Bronze",
      color: "from-amber-500 to-yellow-400",
      price: 50000,
      points: 100,
      duration: "1 Month",
      benefits: ["5% Service Discount", "100 Reward Points", "Member Badge"],
    },
    {
      level: "Silver",
      color: "from-gray-400 to-gray-200",
      price: 100000,
      points: 350,
      duration: "3 Months",
      benefits: [
        "10% Service Discount",
        "Priority Booking",
        "350 Reward Points",
      ],
    },
    {
      level: "Gold",
      color: "from-yellow-500 to-yellow-300",
      price: 200000,
      points: 800,
      duration: "6 Months",
      benefits: [
        "15% Service Discount",
        "Priority Queue",
        "Free Inspection",
        "800 Reward Points",
      ],
    },
  ];

  useEffect(() => {
    loadMembership();
  }, []);

  async function loadMembership() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("members")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (error) {
      console.log(error);
    }

    setMember(data);
    setLoading(false);
  }

  async function subscribe(pkg) {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const confirmSubscribe = window.confirm(
      `Subscribe ${pkg.level} Membership?`,
    );

    if (!confirmSubscribe) return;

    const expired = new Date();
    expired.setMonth(expired.getMonth() + parseInt(pkg.duration));

    if (!member) {
      // INSERT membership baru

      const { error } = await supabase.from("members").insert([
        {
          user_id: currentUser.id,
          membership_level: pkg.level,
          points: pkg.points,
          join_date: new Date().toISOString().split("T")[0],
          expired_date: expired.toISOString().split("T")[0],
          status: "Active",
        },
      ]);

      if (error) {
        alert(error.message);
        return;
      }
    } else {
      // UPDATE membership lama

      const { error } = await supabase
        .from("members")
        .update({
          membership_level: pkg.level,
          points: pkg.points,
          expired_date: expired.toISOString().split("T")[0],
          status: "Active",
        })
        .eq("user_id", currentUser.id);

      if (error) {
        alert(error.message);
        return;
      }
    }

    alert("Membership Activated!");

    loadMembership();
  }

  function rupiah(value) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  }

  if (loading) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold">Membership</h1>

        <p className="text-gray-500 mt-2">
          Upgrade your membership and enjoy exclusive benefits.
        </p>
      </div>

      {/* Current Membership */}

      <div className="bg-gradient-to-r from-[#DEE33E] to-[#9FA324] rounded-3xl p-8 shadow-xl text-black">
        <div className="flex justify-between items-center">
          <div>
            <p className="uppercase tracking-widest text-sm">
              Current Membership
            </p>

            <h2 className="text-5xl font-black mt-2">
              {member ? member.membership_level : "No Membership"}
            </h2>

            <p className="mt-3">
              {member
                ? `${member.points} Reward Points`
                : "Choose a package below"}
            </p>
          </div>

          <Crown size={70} />
        </div>
      </div>

      {/* Packages */}

      <div className="grid lg:grid-cols-3 gap-8">
        {packages.map((pkg) => {
          const current = member?.membership_level === pkg.level;

          return (
            <div
              key={pkg.level}
              className="bg-white rounded-3xl shadow-xl overflow-hidden"
            >
              <div className={`bg-gradient-to-r ${pkg.color} p-8 text-center`}>
                <h2 className="text-3xl font-bold">{pkg.level}</h2>

                <p className="mt-3 text-4xl font-black">{rupiah(pkg.price)}</p>

                <p className="mt-2">{pkg.duration}</p>
              </div>

              <div className="p-8">
                <div className="space-y-4">
                  {pkg.benefits.map((item) => (
                    <div key={item} className="flex gap-3 items-center">
                      <Check size={18} className="text-green-500" />

                      {item}
                    </div>
                  ))}
                </div>

                {current ? (
                  <button
                    disabled
                    className="mt-8 w-full py-3 rounded-xl bg-gray-200 font-bold cursor-default"
                  >
                    Current Plan
                  </button>
                ) : (
                  <button
                    onClick={() => subscribe(pkg)}
                    className="mt-8 w-full py-3 rounded-xl bg-[#DEE33E] hover:bg-[#cad12d] font-bold transition"
                  >
                    Subscribe
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

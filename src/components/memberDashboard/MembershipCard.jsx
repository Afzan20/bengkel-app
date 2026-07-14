import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function MembershipCard() {
  const [member, setMember] = useState(null);

  useEffect(() => {
    getMembership();
  }, []);

  async function getMembership() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (!currentUser) return;

    const { data, error } = await supabase
      .from("members")
      .select(`
        membership_level,
        points,
        created_at,
        users(fullname)
      `)
      .eq("user_id", currentUser.id)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setMember(data);
  }

  function levelColor(level) {
    switch (level) {
      case "Gold":
        return "from-yellow-400 to-yellow-600";
      case "Silver":
        return "from-gray-300 to-gray-500";
      default:
        return "from-[#DEE33E] to-[#9FA324]";
    }
  }

  return (
    <div
      className={`bg-gradient-to-br ${
        levelColor(member?.membership_level)
      } rounded-3xl p-8 shadow-xl text-black`}
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="uppercase tracking-widest text-sm opacity-80">
            GaragePro Member
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {member?.membership_level || "Bronze"} Member
          </h2>
        </div>

        <div className="text-5xl">💳</div>
      </div>

      <div className="mt-12">
        <p className="text-sm opacity-70">
          Card Holder
        </p>

        <h2 className="text-2xl font-bold mt-1">
          {member?.users?.fullname || "-"}
        </h2>
      </div>

      <div className="flex justify-between mt-10">
        <div>
          <p className="text-sm opacity-70">
            Points
          </p>

          <h2 className="text-2xl font-bold">
            {member?.points ?? 0}
          </h2>
        </div>

        <div className="text-right">
          <p className="text-sm opacity-70">
            Member Since
          </p>

          <h2 className="font-semibold">
            {member?.created_at
              ? new Date(member.created_at).toLocaleDateString("id-ID")
              : "-"}
          </h2>
        </div>
      </div>
    </div>
  );
}
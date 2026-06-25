import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

import Table from "../components/common/Table";
import Badge from "../components/common/Badge";

export default function Members() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    const { data, error } = await supabase
      .from("members")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    setMembers(data);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-[32px] font-bold text-black">
          Member Management
        </h1>

        <p className="text-gray-500">
          Manage all GaragePro members.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm">
        <Table
          headers={[
            "ID",
            "Customer Name",
            "Membership",
            "Points",
            "Join Date",
            "Status",
          ]}
        >
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b border-gray-100 hover:bg-gray-50"
            >
              <td className="py-4">{member.id}</td>

              <td>{member.customer_name}</td>

              <td>{member.membership}</td>

              <td>{member.point}</td>

              <td>{member.join_date}</td>

              <td>
                <Badge
                  type={
                    member.status === "Active"
                      ? "success"
                      : "danger"
                  }
                  text={member.status}
                />
              </td>
            </tr>
          ))}
        </Table>
      </div>
    </div>
  );
}
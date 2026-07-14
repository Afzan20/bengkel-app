import { Link } from "react-router-dom";
import {
  CarFront,
  CalendarPlus,
  History,
  UserPen,
} from "lucide-react";

export default function QuickActions() {
  const actions = [
    {
      title: "My Vehicles",
      description: "Manage your registered vehicles",
      icon: CarFront,
      color: "bg-blue-100 text-blue-600",
      link: "/member/my-vehicles",
    },
    {
      title: "Book Service",
      description: "Create a new booking",
      icon: CalendarPlus,
      color: "bg-yellow-100 text-yellow-700",
      link: "/member/booking",
    },
    {
      title: "Booking History",
      description: "View booking records",
      icon: History,
      color: "bg-green-100 text-green-700",
      link: "/member/history",
    },
    {
      title: "Edit Profile",
      description: "Update your profile",
      icon: UserPen,
      color: "bg-purple-100 text-purple-700",
      link: "/member/profile",
    },
  ];

  return (
    <div className="bg-white rounded-3xl shadow-lg p-8">
      <h2 className="text-2xl font-bold mb-8">
        Quick Actions
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {actions.map((item, index) => {
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.link}
              className="
                group
                rounded-2xl
                border
                border-gray-200
                p-5
                transition-all
                duration-300
                hover:border-[#DEE33E]
                hover:shadow-xl
                hover:-translate-y-1
              "
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color}`}
              >
                <Icon size={28} />
              </div>

              <h3 className="mt-5 text-lg font-bold group-hover:text-[#9FA324]">
                {item.title}
              </h3>

              <p className="mt-2 text-sm text-gray-500">
                {item.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
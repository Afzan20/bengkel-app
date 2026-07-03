import ProfileCard from "../../components/profile/ProfileCard";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ProfileStats from "../../components/profile/ProfileStats";

export default function Profile() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Profile
        </h1>

        <p className="text-gray-500">
          Manage your profile information.
        </p>

      </div>

      <div className="grid grid-cols-3 gap-6">

        <ProfileCard />

        <div className="col-span-2">
          <ProfileInfo />
        </div>

      </div>

      <ProfileStats />

      <div className="flex justify-end">

        <button className="bg-[#DEE33E] px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition">
          Edit Profile
        </button>

      </div>

    </div>
  );
}
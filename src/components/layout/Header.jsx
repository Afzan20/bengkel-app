import SearchInput from "../common/SearchInput";
import NotificationButton from "./NotificationButton";
import ProfileMenu from "./ProfileMenu";

export default function Header() {
  return (
    <header className="bg-[#F7F7F7] px-6 py-5 flex items-center justify-between">
      <div>
        <h1 className="text-[20px] font-bold leading-[125%] text-black">
          Hi, Admin Garage
        </h1>

        <p className="text-[13px] leading-[160%] text-gray-400">
          Let&apos;s check your Garage today
        </p>
      </div>

      <SearchInput />

      <div className="flex items-center gap-4">
        <NotificationButton />
        <ProfileMenu />
      </div>
    </header>
  );
}
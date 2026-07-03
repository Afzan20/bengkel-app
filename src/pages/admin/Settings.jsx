import {
  User,
  Lock,
  Mail,
  Moon,
  Bell,
  Languages,
  Shield,
  Database,
  LogOut,
  Trash2,
} from "lucide-react";

import SettingCard from "../../components/settings/SettingCard";
import SettingItem from "../../components/settings/SettingItem";

export default function Settings() {
  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold">
          Settings
        </h1>

        <p className="text-gray-500">
          Manage your account and application settings.
        </p>

      </div>

      <SettingCard title="Account">

        <SettingItem
          icon={<User size={20} />}
          title="Edit Profile"
          description="Update your personal information."
        />

        <SettingItem
          icon={<Lock size={20} />}
          title="Change Password"
          description="Change your login password."
        />

        <SettingItem
          icon={<Mail size={20} />}
          title="Email Preferences"
          description="Manage email notifications."
        />

      </SettingCard>

      <SettingCard title="System">

        <SettingItem
          icon={<Moon size={20} />}
          title="Dark Mode"
          description="Customize application appearance."
        />

        <SettingItem
          icon={<Bell size={20} />}
          title="Notifications"
          description="Manage push notifications."
        />

        <SettingItem
          icon={<Languages size={20} />}
          title="Language"
          description="Change application language."
        />

      </SettingCard>

      <SettingCard title="Security">

        <SettingItem
          icon={<Shield size={20} />}
          title="Two Factor Authentication"
          description="Increase account security."
        />

        <SettingItem
          icon={<Database size={20} />}
          title="Backup Database"
          description="Download application backup."
        />

      </SettingCard>

      <SettingCard title="Danger Zone">

        <SettingItem
          icon={<LogOut size={20} />}
          title="Logout"
          description="Sign out from this account."
        />

        <SettingItem
          icon={<Trash2 size={20} />}
          title="Delete Account"
          description="Permanently delete your account."
        />

      </SettingCard>

    </div>
  );
}
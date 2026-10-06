/** Settings route backed by the async profile service. */
import { DashboardLayout } from "@/src/components/layout/DashboardLayout";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ProfileForm } from "@/src/features/settings/ProfileForm";
import { getProfile } from "@/src/services/settings-service";

/** Loads and renders the current demo profile. */
export default async function SettingsPage() {
  const profile = await getProfile();
  return <DashboardLayout><PageContainer><div className="mb-8"><p className="font-semibold uppercase tracking-wider text-primary">Account</p><h1 className="mt-2 text-3xl font-bold">Settings</h1><p className="mt-2 text-on-surface-variant">Placeholder authenticated route for profile preferences.</p></div><ProfileForm profile={profile} /></PageContainer></DashboardLayout>;
}

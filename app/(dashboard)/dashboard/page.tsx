/** Owner dashboard route with a placeholder authentication boundary. */
import { DashboardLayout } from "@/src/components/layout/DashboardLayout";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { DashboardOverview } from "@/src/features/dashboard/DashboardOverview";
import { getDashboardStats, getInquiries } from "@/src/services/dashboard-service";

/** Loads host dashboard data and renders the overview. */
export default async function DashboardPage() {
  const [stats, inquiries] = await Promise.all([getDashboardStats(), getInquiries()]);
  return <DashboardLayout><PageContainer><div className="mb-8"><p className="font-semibold uppercase tracking-wider text-primary">Verified host area</p><h1 className="mt-2 text-3xl font-bold">Owner dashboard</h1><p className="mt-2 text-on-surface-variant">Placeholder protected route. Connect this boundary to real auth before production.</p></div><DashboardOverview stats={stats} inquiries={inquiries} /></PageContainer></DashboardLayout>;
}

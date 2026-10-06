/** New listing route with a frontend-only owner/agent guard placeholder. */
import { DashboardLayout } from "@/src/components/layout/DashboardLayout";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ListingForm } from "@/src/features/listings/ListingForm";

/** Renders the listing submission form. */
export default function NewListingPage() {
  return <DashboardLayout><PageContainer><div className="mb-8"><p className="font-semibold uppercase tracking-wider text-primary">For hosts</p><h1 className="mt-2 text-3xl font-bold">List your rental property</h1><p className="mt-2 text-on-surface-variant">Reach verified tenants directly. Authentication and review are placeholders in this frontend scaffold.</p></div><ListingForm /></PageContainer></DashboardLayout>;
}

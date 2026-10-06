/** Host dashboard overview using service-provided mock data. */
import type { DashboardStats, Inquiry } from "@/src/types/dashboard";
import { Card } from "@/src/components/ui/Card";

/** Renders dashboard metrics and recent inquiries. */
export function DashboardOverview({ stats, inquiries }: { stats: DashboardStats; inquiries: Inquiry[] }) {
  return <div className="space-y-8">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{[
      ["Active listings", stats.activeListings],
      ["Total inquiries", stats.totalInquiries],
      ["Unread inquiries", stats.unreadInquiries],
      ["Occupancy rate", `${stats.occupancyRate}%`],
    ].map(([label, value]) => <Card key={label} className="p-5"><p className="text-sm text-on-surface-variant">{label}</p><p className="mt-2 text-3xl font-bold text-primary">{value}</p></Card>)}</div>
    <Card className="p-6"><h2 className="mb-4 text-xl font-bold">Recent inquiries</h2><div className="divide-y divide-outline-variant/30">{inquiries.map((inquiry) => <div key={inquiry.id} className="flex items-start justify-between gap-4 py-4"><div><p className="font-semibold">{inquiry.sender}</p><p className="text-sm text-on-surface-variant">{inquiry.listingTitle} · {inquiry.preview}</p></div>{inquiry.unread && <span className="rounded-full bg-primary px-2 py-1 text-xs text-on-primary">New</span>}</div>)}</div></Card>
  </div>;
}

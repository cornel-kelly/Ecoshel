/** Reusable listing summary card for marketplace results. */
import Link from "next/link";
import type { Listing } from "@/src/types/listing";
import { Badge } from "@/src/components/ui/Badge";
import { Card } from "@/src/components/ui/Card";

/** Renders a listing preview and links to its canonical detail route. */
export function ListingCard({ listing }: { listing: Listing }) {
  return <Link href={`/properties/${listing.id}`} className="group block">
    <Card className="overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <img src={listing.imgUrl} alt="" className="h-52 w-full object-cover transition group-hover:scale-105" />
      <div className="space-y-3 p-5">
        <div className="flex items-start justify-between gap-3"><h2 className="font-semibold text-on-surface">{listing.title}</h2><Badge>{listing.hostBadge}</Badge></div>
        <p className="text-sm text-on-surface-variant">{listing.neighborhood} · {listing.subLocation}</p>
        <p className="text-sm text-on-surface-variant">{listing.beds} bed · {listing.baths} bath</p>
        <p className="text-lg font-bold text-primary">GH₵ {listing.price.toLocaleString()} <span className="text-xs font-normal text-on-surface-variant">/ month</span></p>
      </div>
    </Card>
  </Link>;
}

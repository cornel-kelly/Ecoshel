/** Canonical property detail route loaded by listing identifier. */
import { notFound } from "next/navigation";
import { getListingById } from "@/src/services/listing-service";
import { PublicLayout } from "@/src/components/layout/PublicLayout";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { Badge } from "@/src/components/ui/Badge";
import { Button } from "@/src/components/ui/Button";

/** Loads one listing and renders its detail view. */
export default async function PropertyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = await getListingById(id);
  if (!listing) notFound();
  return <PublicLayout><PageContainer><div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]"><div><img src={listing.imgUrl} alt="" className="h-[28rem] w-full rounded-2xl object-cover" /></div><div className="space-y-5"><Badge>{listing.hostBadge}</Badge><h1 className="text-3xl font-bold">{listing.title}</h1><p className="text-on-surface-variant">{listing.neighborhood} · {listing.subLocation}</p><p className="text-2xl font-bold text-primary">GH₵ {listing.price.toLocaleString()} <span className="text-sm font-normal text-on-surface-variant">/ month</span></p><p className="leading-7 text-on-surface-variant">{listing.description}</p><div className="flex flex-wrap gap-2">{listing.amenities.map((amenity) => <Badge key={amenity}>{amenity}</Badge>)}</div><Button type="button">Contact verified host</Button></div></div></PageContainer></PublicLayout>;
}

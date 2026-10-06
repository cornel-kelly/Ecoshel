/** Listing grid with empty-state handling. */
import type { Listing } from "@/src/types/listing";
import { ListingCard } from "@/src/features/listings/ListingCard";

/** Renders listing cards in a responsive grid. */
export function ListingGrid({ listings }: { listings: Listing[] }) {
  if (!listings.length) return <p className="rounded-xl bg-surface-container-low p-8 text-center text-on-surface-variant">No rentals match your search.</p>;
  return <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>;
}

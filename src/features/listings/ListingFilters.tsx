"use client";

/** Client-side marketplace filter controls. */
import { useMemo, useState } from "react";
import type { Listing } from "@/src/types/listing";
import { ListingGrid } from "@/src/features/listings/ListingGrid";

/** Filters listings by free-text location/title and bedroom count. */
export function ListingFilters({ listings }: { listings: Listing[] }) {
  const [query, setQuery] = useState("");
  const [beds, setBeds] = useState("all");
  const filtered = useMemo(() => listings.filter((listing) => {
    const haystack = `${listing.title} ${listing.neighborhood} ${listing.subLocation}`.toLowerCase();
    return haystack.includes(query.toLowerCase()) && (beds === "all" || listing.beds >= Number(beds));
  }), [beds, listings, query]);
  return <section className="space-y-6">
    <div className="grid gap-3 rounded-2xl bg-surface-container-low p-4 md:grid-cols-[1fr_180px]">
      <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search Accra neighbourhoods" className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3 outline-none focus:border-primary" aria-label="Search listings" />
      <select value={beds} onChange={(event) => setBeds(event.target.value)} className="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-4 py-3" aria-label="Minimum bedrooms">
        <option value="all">Any bedrooms</option><option value="1">1+ bedroom</option><option value="2">2+ bedrooms</option><option value="3">3+ bedrooms</option>
      </select>
    </div>
    <p className="text-sm text-on-surface-variant">{filtered.length} verified rentals available</p>
    <ListingGrid listings={filtered} />
  </section>;
}

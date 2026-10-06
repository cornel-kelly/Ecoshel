/** Async listing service. Replace mock reads with API requests here. */
import { mockListings } from "@/src/mocks/listings";
import type { Listing } from "@/src/types/listing";

/** Returns the available rental listings. */
export async function getListings(): Promise<Listing[]> {
  // TODO: replace with real API call
  return Promise.resolve(mockListings);
}

/** Returns one listing by its stable identifier, or null when absent. */
export async function getListingById(id: string): Promise<Listing | null> {
  // TODO: replace with real API call
  return Promise.resolve(mockListings.find((listing) => listing.id === id) ?? null);
}

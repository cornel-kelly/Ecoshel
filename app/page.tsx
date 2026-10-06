/** Marketplace landing route backed by the async listing service. */
import { getListings } from "@/src/services/listing-service";
import { PublicLayout } from "@/src/components/layout/PublicLayout";
import { PageContainer } from "@/src/components/layout/PageContainer";
import { ListingFilters } from "@/src/features/listings/ListingFilters";

/** Loads mock listings and renders the public marketplace. */
export default async function HomePage() {
  const listings = await getListings();
  return <PublicLayout><PageContainer>
    <section className="mb-10 max-w-3xl"><p className="mb-3 font-semibold uppercase tracking-wider text-primary">Direct. Verified. Accra.</p><h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Find a home you can trust.</h1><p className="mt-4 text-lg text-on-surface-variant">Explore inspected long-term and monthly rentals from verified hosts across Greater Accra.</p></section>
    <ListingFilters listings={listings} />
  </PageContainer></PublicLayout>;
}

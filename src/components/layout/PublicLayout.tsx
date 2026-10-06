/** Public marketplace layout shared by browse and detail pages. */
import { Header } from "@/src/components/layout/Header";
import { Footer } from "@/src/components/layout/Footer";

/** Renders public navigation around page content. */
export function PublicLayout({ children }: { children: React.ReactNode }) {
  return <><Header />{children}<Footer /></>;
}

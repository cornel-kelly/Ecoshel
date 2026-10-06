/** Dashboard shell; authorization remains a frontend placeholder by design. */
import { Header } from "@/src/components/layout/Header";

/** Renders dashboard navigation around protected-page content. */
export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <><Header />{children}</>;
}

/** Async dashboard service for host metrics and inquiries. */
import { mockDashboardStats, mockInquiries } from "@/src/mocks/dashboard";
import type { DashboardStats, Inquiry } from "@/src/types/dashboard";

/** Returns dashboard summary statistics. */
export async function getDashboardStats(): Promise<DashboardStats> {
  // TODO: replace with real API call
  return Promise.resolve(mockDashboardStats);
}

/** Returns inquiries for the current host. */
export async function getInquiries(): Promise<Inquiry[]> {
  // TODO: replace with real API call
  return Promise.resolve(mockInquiries);
}

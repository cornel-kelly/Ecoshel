/** Mock host dashboard metrics and inquiry data. */
import type { DashboardStats, Inquiry } from "@/src/types/dashboard";

export const mockDashboardStats: DashboardStats = {
  activeListings: 3,
  totalInquiries: 28,
  unreadInquiries: 1,
  occupancyRate: 100,
};

export const mockInquiries: Inquiry[] = [
  {
    id: "inq1",
    sender: "Kwame Boateng",
    listingTitle: "Modern 2-Bedroom Apartment",
    preview: "Is the standby generator automatic, and can I view this Saturday?",
    unread: true,
  },
  {
    id: "inq2",
    sender: "Ama Owusu",
    listingTitle: "Executive Townhouse",
    preview: "I would like to confirm the available move-in date.",
    unread: false,
  },
];

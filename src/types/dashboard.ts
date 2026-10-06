/** Dashboard data contracts for host metrics and tenant conversations. */
export interface DashboardStats {
  activeListings: number;
  totalInquiries: number;
  unreadInquiries: number;
  occupancyRate: number;
}

export interface Inquiry {
  id: string;
  sender: string;
  listingTitle: string;
  preview: string;
  unread: boolean;
}

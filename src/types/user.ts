/** User and role types shared by auth, settings, and dashboard features. */
export type UserRole = "tenant" | "owner" | "agent";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  neighborhood: string;
}

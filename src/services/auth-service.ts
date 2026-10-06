/** Async auth service placeholder for future session integration. */
import { mockUsers } from "@/src/mocks/users";
import type { User, UserRole } from "@/src/types/user";

/** Returns the demo user list. */
export async function getUsers(): Promise<User[]> {
  // TODO: replace with real API call
  return Promise.resolve(mockUsers);
}

/** Returns a demo user for the selected role. */
export async function getDemoUser(role: UserRole = "tenant"): Promise<User> {
  // TODO: replace with real API call
  return Promise.resolve(mockUsers.find((user) => user.role === role) ?? mockUsers[0]);
}

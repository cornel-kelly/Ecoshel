/** Async profile service used by the settings page. */
import { mockUsers } from "@/src/mocks/users";
import type { User } from "@/src/types/user";

/** Returns the demo profile. */
export async function getProfile(): Promise<User> {
  // TODO: replace with real API call
  return Promise.resolve(mockUsers[0]);
}

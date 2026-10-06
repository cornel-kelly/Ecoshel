/** Mock users used by the placeholder auth and settings services. */
import type { User } from "@/src/types/user";

export const mockUsers: User[] = [
  {
    id: "u1",
    name: "Abena Mensah",
    email: "abena@example.com",
    role: "owner",
    neighborhood: "East Legon",
  },
  {
    id: "u2",
    name: "Kwame Boateng",
    email: "kwame@example.com",
    role: "tenant",
    neighborhood: "Airport Residential",
  },
];

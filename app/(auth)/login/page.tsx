/** Authentication route using a frontend-only form placeholder. */
import { AuthLayout } from "@/src/components/layout/AuthLayout";
import { AuthForm } from "@/src/features/auth/AuthForm";

/** Renders login and role selection. */
export default function LoginPage() {
  return <AuthLayout><AuthForm /></AuthLayout>;
}

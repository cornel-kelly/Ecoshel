"use client";

/** Login and signup placeholder form. */
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import type { UserRole } from "@/src/types/user";

/** Handles mock sign-in without creating a real session. */
export function AuthForm() {
  const [role, setRole] = useState<UserRole>("tenant");
  const [submitted, setSubmitted] = useState(false);
  return <Card className="w-full max-w-md p-7">
    <div className="mb-6"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Welcome to Ecoshel</p><h1 className="mt-2 text-2xl font-bold">Sign in to continue</h1></div>
    <form className="grid gap-4" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <label className="grid gap-2 text-sm font-semibold">Email<input required type="email" className="rounded-lg border border-outline-variant/50 p-3 font-normal" defaultValue="demo@example.com" /></label>
      <label className="grid gap-2 text-sm font-semibold">Password<input required type="password" className="rounded-lg border border-outline-variant/50 p-3 font-normal" defaultValue="password" /></label>
      <label className="grid gap-2 text-sm font-semibold">Role<select value={role} onChange={(event) => setRole(event.target.value as UserRole)} className="rounded-lg border border-outline-variant/50 p-3 font-normal"><option value="tenant">Tenant</option><option value="owner">Landlord / Host</option><option value="agent">Agent</option></select></label>
      <Button type="submit">Sign in as {role}</Button>
      {submitted && <p className="text-center text-sm text-primary">Demo sign-in complete. Real authentication is intentionally not enabled.</p>}
    </form>
  </Card>;
}

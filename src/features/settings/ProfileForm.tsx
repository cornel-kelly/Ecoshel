"use client";

/** Profile settings form backed by placeholder profile data. */
import { useState } from "react";
import type { User } from "@/src/types/user";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";

/** Allows a demo user to edit profile fields locally. */
export function ProfileForm({ profile }: { profile: User }) {
  const [saved, setSaved] = useState(false);
  return <Card className="max-w-2xl p-6"><form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSaved(true); }}>
    <label className="grid gap-2 text-sm font-semibold">Full name<input className="rounded-lg border border-outline-variant/50 p-3 font-normal" defaultValue={profile.name} /></label>
    <label className="grid gap-2 text-sm font-semibold">Email<input type="email" className="rounded-lg border border-outline-variant/50 p-3 font-normal" defaultValue={profile.email} /></label>
    <label className="grid gap-2 text-sm font-semibold">Neighbourhood<input className="rounded-lg border border-outline-variant/50 p-3 font-normal" defaultValue={profile.neighborhood} /></label>
    <Button type="submit">{saved ? "Saved" : "Save changes"}</Button>
  </form></Card>;
}

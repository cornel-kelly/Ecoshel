"use client";

/** Listing creation form; submission is intentionally a frontend placeholder. */
import { useState } from "react";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";

/** Collects the fields required to create a mock listing. */
export function ListingForm() {
  const [submitted, setSubmitted] = useState(false);
  return <Card className="mx-auto max-w-3xl p-6 sm:p-8">
    <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
      <label className="grid gap-2 text-sm font-semibold">Property title<input required className="rounded-lg border border-outline-variant/50 p-3 font-normal" placeholder="e.g. Bright 2-bedroom apartment" /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-semibold">Neighbourhood<input required className="rounded-lg border border-outline-variant/50 p-3 font-normal" placeholder="East Legon" /></label>
        <label className="grid gap-2 text-sm font-semibold">Monthly rent (GH₵)<input required type="number" className="rounded-lg border border-outline-variant/50 p-3 font-normal" placeholder="6500" /></label>
      </div>
      <label className="grid gap-2 text-sm font-semibold">Description<textarea rows={5} className="rounded-lg border border-outline-variant/50 p-3 font-normal" placeholder="Describe the property and its amenities" /></label>
      <Button type="submit">{submitted ? "Saved as draft" : "Submit listing for review"}</Button>
      {submitted && <p className="text-center text-sm text-primary">Demo listing submitted. Backend review workflow will be connected later.</p>}
    </form>
  </Card>;
}

/** Global fallback page for unknown routes and missing listings. */
import Link from "next/link";
import { Button } from "@/src/components/ui/Button";

/** Renders a recoverable 404 state. */
export default function NotFound() {
  return <main className="flex min-h-screen flex-col items-center justify-center gap-4 px-4 text-center"><p className="font-semibold uppercase tracking-wider text-primary">404</p><h1 className="text-3xl font-bold">We could not find that page.</h1><p className="text-on-surface-variant">The rental may have been removed or the address may be incorrect.</p><Link href="/"><Button>Return to rentals</Button></Link></main>;
}

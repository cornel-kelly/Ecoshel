"use client";

/** Global navigation header and placeholder route links. */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/src/components/ui/Button";

/** Renders the primary navigation. */
export function Header() {
  const pathname = usePathname();
  const links = [
    { href: "/", label: "Find a Rental" },
    { href: "/listings/new", label: "List a Property" },
    { href: "/dashboard", label: "Dashboard" },
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-outline-variant/30 bg-surface/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-on-surface">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-on-primary">E</span>
          <span>Ecoshel <small className="block text-[10px] uppercase tracking-wider text-primary">Accra rentals</small></span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={`rounded-lg px-3 py-2 text-sm font-semibold ${pathname === link.href ? "bg-primary/10 text-primary" : "text-on-surface-variant hover:text-primary"}`}>
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link href="/settings" className="hidden text-sm font-semibold text-on-surface-variant sm:block">Settings</Link>
          <Link href="/login"><Button>Sign in</Button></Link>
        </div>
      </div>
    </header>
  );
}

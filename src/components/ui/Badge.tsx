/** Small status label used on listing and dashboard cards. */
export function Badge({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex rounded-full bg-secondary-container px-3 py-1 text-xs font-semibold text-on-secondary-container">{children}</span>;
}

/** Shared page width and vertical spacing wrapper. */
export function PageContainer({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <main className={`mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 ${className}`}>{children}</main>;
}

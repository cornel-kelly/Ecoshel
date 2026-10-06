/** Focused layout for authentication screens. */
export function AuthLayout({ children }: { children: React.ReactNode }) {
  return <main className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-surface-container-low px-4 py-10">{children}</main>;
}

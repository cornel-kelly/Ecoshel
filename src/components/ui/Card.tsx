/** Shared elevated surface primitive for feature sections. */
import type { HTMLAttributes } from "react";

/** Renders content in a consistent card surface. */
export function Card({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={`rounded-2xl bg-surface-container-lowest shadow-sm ${className}`} {...props} />;
}

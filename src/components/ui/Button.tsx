/** Shared button primitive with consistent Ecoshel action styling. */
import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

/** Renders a styled button. */
export function Button({ variant = "primary", className = "", ...props }: ButtonProps) {
  const styles = {
    primary: "bg-primary text-on-primary hover:opacity-90",
    secondary: "bg-surface-container text-on-surface hover:bg-surface-container-high",
    ghost: "text-primary hover:bg-primary/10",
  };
  return <button className={`rounded-lg px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`} {...props} />;
}

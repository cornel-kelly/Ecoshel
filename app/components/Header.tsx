"use client";

import React, { useState, useRef, useEffect } from "react";

export interface HeaderProps {
  activePath?: string;
  isAuthenticated?: boolean;
  userRole?: UserRole;
  showCompactSearch?: boolean;
  locationSearch?: string;
  onLocationSearchChange?: (value: string) => void;
  onOpenFilters?: () => void;
  onSignOut?: () => void;
  onNavigate?: (path: string) => void;
}

export type UserRole = "tenant" | "owner" | "agent";

export default function Header({
  activePath = "find-a-rental",
  isAuthenticated = false,
  onSignOut,
  onNavigate,
  showCompactSearch = false,
  locationSearch = "",
  onLocationSearchChange,
  onOpenFilters,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Sync real theme after hydration
  useEffect(() => {
    const stored = window.localStorage.getItem("ecoshel-theme");
    setIsDarkMode(stored === "dark");
    setMounted(true);
  }, []);

  // Apply + persist only after we've read the stored value
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.dataset.theme = isDarkMode ? "dark" : "light";
    window.localStorage.setItem("ecoshel-theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode, mounted]);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click or Escape key
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target)) {
        setMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(path);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 glass-panel bg-surface-container-lowest/40 backdrop-blur-xl shadow-[0_10px_35px_rgba(8,15,32,0.18)] border-b border-white/10 transition-all">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand & Desktop Navigation */}
        <div className="flex items-center gap-6 lg:gap-8">
          {/* Logo */}
          <a
            className="flex items-center gap-2.5 focus:outline-none group select-none cursor-pointer"
            data-path="find-a-rental"
            href="#"
            onClick={(e) => handleLinkClick(e, "find-a-rental")}
            aria-label="Ecoshel - Return to Home"
          >
            <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center text-white shadow-sm shadow-primary/25 transition-transform group-hover:scale-105 shrink-0">
              {/* Eco shelter brand SVG mark */}
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path
                  d="M3 10.5L12 3l9 7.5V20a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 20v-9.5z"
                  fill="currentColor"
                  fillOpacity="0.2"
                />
                <path d="M9 21.5v-8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v8" />
                <path
                  d="M12 7.5a2 2 0 0 1 2 2v1h-4v-1a2 2 0 0 1 2-2z"
                  fill="#89f5e7"
                  stroke="#89f5e7"
                  strokeWidth="1"
                />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md font-bold text-on-surface tracking-tight leading-none group-hover:text-primary transition-colors">
                Ecoshel
              </span>
              <span className="text-[10px] tracking-wider uppercase font-semibold text-primary/80 leading-tight">
                Accra Rentals
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav
            className="hidden md:flex shrink-0 items-center gap-1 lg:gap-2 whitespace-nowrap"
            aria-label="Main Navigation"
          >
            <a
              className={`relative px-3 py-2 rounded-lg font-label-md text-label-md transition-all ${
                activePath === "find-a-rental"
                  ? "text-primary font-bold bg-primary/8"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
              data-path="find-a-rental"
              href="#"
              onClick={(e) => handleLinkClick(e, "find-a-rental")}
            >
              Find a Rental
              {activePath === "find-a-rental" && (
                <span className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full" />
              )}
            </a>
            <a
              className={`relative px-3 py-2 rounded-lg font-label-md text-label-md transition-all ${
                activePath === "accra-neighborhoods"
                  ? "text-primary font-bold bg-primary/8"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
              data-path="accra-neighborhoods"
              href="#"
              onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
            >
              Accra Neighborhoods
              {activePath === "accra-neighborhoods" && (
                <span className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full" />
              )}
            </a>
            <a
              className={`relative px-3 py-2 rounded-lg font-label-md text-label-md transition-all ${
                activePath === "how-it-works"
                  ? "text-primary font-bold bg-primary/8"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
              }`}
              data-path="how-it-works"
              href="#"
              onClick={(e) => handleLinkClick(e, "how-it-works")}
            >
              How it Works
              {activePath === "how-it-works" && (
                <span className="absolute bottom-0 inset-x-3 h-0.5 bg-primary rounded-full" />
              )}
            </a>
          </nav>

          {showCompactSearch && (
            <div className="hidden md:flex shrink-0 items-center gap-1 rounded-lg bg-surface-container-low/70 border border-white/10 pl-3 pr-1 h-10 w-40 lg:w-48">
              <span className="material-symbols-outlined text-[1.125rem] text-primary">
                search
              </span>
              <input
                aria-label="Search by location"
                className="min-w-0 flex-1 bg-transparent text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none"
                placeholder="Search by location"
                type="text"
                value={locationSearch}
                onChange={(e) => onLocationSearchChange?.(e.target.value)}
              />
              <button
                type="button"
                aria-label="Open rental filters"
                title="Open rental filters"
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center text-on-surface-variant transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
                onClick={onOpenFilters}
              >
                <span className="material-symbols-outlined text-[1.125rem]">
                  tune
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Right CTA Actions */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            aria-label={
              !mounted
                ? "Toggle theme"
                : isDarkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            title={
              !mounted
                ? "Toggle theme"
                : isDarkMode
                  ? "Switch to light mode"
                  : "Switch to dark mode"
            }
            className="inline-flex h-9 w-9 items-center justify-center text-on-surface-variant transition-colors hover:text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/25"
            onClick={() => setIsDarkMode((current) => !current)}
          >
            <span className="material-symbols-outlined text-[1.25rem]">
              {!mounted ? "contrast" : isDarkMode ? "light_mode" : "dark_mode"}
            </span>
          </button>

          {!isAuthenticated && (
            <div className="h-6 w-px bg-surface-container-high/60 hidden sm:block" />
          )}

          {/* Log in link */}
          {!isAuthenticated && (
            <a
              className="hidden sm:inline-flex whitespace-nowrap font-label-md text-label-md text-on-surface-variant hover:text-primary hover:bg-surface-container-low transition-colors px-2.5 py-1.5 rounded-lg cursor-pointer font-medium"
              data-path="login"
              href="#"
              onClick={(e) => handleLinkClick(e, "login")}
            >
              Log in
            </a>
          )}

          {/* Profile Button */}
          {isAuthenticated && (
            <button
              type="button"
              onClick={(e) => handleLinkClick(e, "settings")}
              className="flex items-center gap-1.5 p-1 rounded-full bg-surface-container-low hover:bg-surface-container-high cursor-pointer transition-colors border border-surface-container-high/50 focus:outline-none focus:ring-2 focus:ring-primary/25"
              aria-label="Open account settings"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Profile Avatar"
                className="w-8 h-8 rounded-full object-cover shrink-0"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCJJ3mBMLJRqlP3cazhUzMFDjj4kPiFI09DGoqT9HQ4FEs9_E0KgswRu91kBF9MWbxvDFNkxoSpZrPLFDu4dCCx8PfOku4Er0hiTJQokITIcVR1sonOTyNTECC2Fmanxtg4v-mpxyanCCOvjeU-qZ3X9Tyu1Atjeb06AgcQc5xsbLwbXBq8HUJ9vEKDPVp7uKdI7YoVSuLowYEchP8YqeN_nUBVImPWPCgilKUDX5-dpQztprm1mcpRng"
              />
            </button>
          )}

          {/* Mobile Hamburger Toggle */}
          <div className="relative md:hidden" ref={mobileMenuRef}>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/25"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
            >
              <svg
                className="w-6 h-6 shrink-0"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface-container-lowest border-b border-surface-container-high/60 shadow-xl px-4 py-3 space-y-1 animate-in slide-in-from-top-2 duration-150">
          <a
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${
              activePath === "find-a-rental"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
            href="#"
            onClick={(e) => handleLinkClick(e, "find-a-rental")}
          >
            <span>Find a Rental</span>
            {activePath === "find-a-rental" && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </a>
          <a
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${
              activePath === "accra-neighborhoods"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
            href="#"
            onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
          >
            <span>Accra Neighborhoods</span>
            {activePath === "accra-neighborhoods" && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </a>
          <a
            className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg font-label-md text-label-md transition-colors ${
              activePath === "how-it-works"
                ? "bg-primary/10 text-primary font-bold"
                : "text-on-surface hover:bg-surface-container-low"
            }`}
            href="#"
            onClick={(e) => handleLinkClick(e, "how-it-works")}
          >
            <span>How it Works</span>
            {activePath === "how-it-works" && (
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            )}
          </a>

          <div className="pt-2 mt-2 border-t border-surface-container-high/50 flex flex-col gap-2">
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                className="flex items-center justify-center px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md text-center"
                href="#"
                onClick={(e) => handleLinkClick(e, "login")}
              >
                Log in
              </a>
              <a
                className="flex items-center justify-center px-3 py-2 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-primary font-label-md text-label-md text-center font-semibold"
                href="#"
                onClick={(e) => handleLinkClick(e, "owner-dashboard")}
              >
                Dashboard
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

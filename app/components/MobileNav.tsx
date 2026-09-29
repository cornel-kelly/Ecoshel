"use client";

import React from "react";

export interface MobileNavProps {
  activePath?: string;
  onNavigate?: (path: string) => void;
}

export default function MobileNav({
  activePath = "find-a-rental",
  onNavigate,
}: MobileNavProps) {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  const navItems = [
    { id: "find-a-rental", label: "Rentals", icon: "search" },
    { id: "accra-neighborhoods", label: "Areas", icon: "location_city" },
    { id: "list-your-property", label: "List", icon: "add_circle" },
    { id: "how-it-works", label: "Guide", icon: "help_outline" },
    { id: "settings", label: "Account", icon: "account_circle" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50  bg-surface-container-lowest shadow-[0_-2px_12px_rgba(0,0,0,0.06)] px-margin py-space-xs border-t border-surface-container-high/40">
      <nav className="flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activePath === item.id;
          return (
            <a
              key={item.id}
              className={`flex flex-col items-center gap-0.5 py-space-xs transition-colors ${
                isActive
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-primary"
              }`}
              data-path={item.id}
              href="#"
              onClick={(e) => handleLinkClick(e, item.id)}
            >
              <span className="material-symbols-outlined text-[1.375rem]">
                {item.icon}
              </span>
              <span className="font-caption text-caption">{item.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}

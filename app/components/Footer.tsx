"use client";

import React from "react";

export interface FooterProps {
  onNavigate?: (path: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_-1px_6px_rgba(0,0,0,0.03)] mt-space-2xl">
      <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-2xl">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter-desktop pb-space-xl">
          <div className="md:col-span-4 flex flex-col gap-space-sm">
            <div className="flex items-center gap-space-xs">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                alt="Ecoshel Properties Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Wy1ZsGnmdI9K7K0rbR7qdKjkLB7gy48OC5R6uswPuaNT-l874S6Jxtj7OWbWJCyMD2BwwXhgJqCDTNjutUnmUd3jQGSoyj6Tt7QaoCBci0WgMR3DqpUzzKu6lS8O4emdlgKH7kIjQQ7AlC-CQJb__8T_SPMDj8EOJEiQ0ziDdFjWIFKdQ7kWMiXatcScP3INke5sVGeriikoGiQrN6p-kHgU8xXjdlx8qJcBF3sEvK44LwEhnqtl5Fbo8"
              />
              <span className="font-headline-sm text-headline-sm text-on-surface">
                Ecoshel Properties
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant max-w-sm">
              Frictionless, verified long-term &amp; monthly home rentals across Greater Accra. Direct verified hosts with verified transparent pricing in GH₵.
            </p>
            <div className="flex items-center gap-space-sm mt-space-xs">
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[1rem]">verified_user</span>
                <span>Tenant Verified</span>
              </div>
              <div className="flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[1rem]">gite</span>
                <span>Inspected Properties</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-5 flex flex-col gap-space-xs">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Accra Neighborhoods
            </span>
            <div className="grid grid-cols-2 gap-space-xs pt-space-xs">
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                East Legon Rentals
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                Airport Residential
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                Cantonments Luxury
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                Osu &amp; Ringway
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                Labone Townhouses
              </a>
              <a
                className="font-body-sm text-body-sm text-on-surface-variant hover:text-primary transition-colors py-space-xs"
                data-path="accra-neighborhoods"
                href="#"
                onClick={(e) => handleLinkClick(e, "accra-neighborhoods")}
              >
                Dzorwulu Flats
              </a>
            </div>
          </div>

          <div className="md:col-span-3 flex flex-col gap-space-sm">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Rent-Only Guarantee
            </span>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Zero agent lockups, zero speculative sales listings. 100% focused on authentic Accra living spaces with standardized rental terms.
            </p>
            <div className="flex items-center gap-space-sm">
              <span className="material-symbols-outlined text-primary text-[1.25rem]">security</span>
              <span className="font-caption text-caption text-on-surface-variant">
                Escrow protection available for verified lease contracts.
              </span>
            </div>
          </div>
        </div>

        <div className="pt-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-sm text-on-surface-variant border-t border-surface-container-high/40">
          <span className="font-caption text-caption">
            © 2025 Ecoshel Properties Ghana Ltd. All rights reserved. Accra, Ghana.
          </span>
          <div className="flex items-center gap-space-md">
            <a
              className="font-caption text-caption hover:text-on-surface transition-colors"
              data-path="terms-and-privacy"
              href="#"
              onClick={(e) => handleLinkClick(e, "terms-and-privacy")}
            >
              Privacy Policy
            </a>
            <a
              className="font-caption text-caption hover:text-on-surface transition-colors"
              data-path="terms-and-privacy"
              href="#"
              onClick={(e) => handleLinkClick(e, "terms-and-privacy")}
            >
              Terms of Tenancy
            </a>
            <a
              className="font-caption text-caption hover:text-on-surface transition-colors"
              data-path="how-it-works"
              href="#"
              onClick={(e) => handleLinkClick(e, "how-it-works")}
            >
              Support Concierge
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

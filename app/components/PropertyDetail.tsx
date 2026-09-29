"use client";

import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export interface PropertyDetailProps {
  onNavigate?: (path: string) => void;
  monthlyRent?: number;
}

export default function PropertyDetail({
  onNavigate,
  monthlyRent = 6500,
}: PropertyDetailProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [minDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [moveInDate, setMoveInDate] = useState(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split("T")[0];
  });
  const [tenantName, setTenantName] = useState("");
  const [tenantContact, setTenantContact] = useState("");
  const [inquiryMessage, setInquiryMessage] = useState(
    "Hello Abena, I am interested in this 2-bedroom in East Legon. Is it still available for viewing this weekend?",
  );
  const [sendingInquiry, setSendingInquiry] = useState(false);
  const [inquirySent, setInquirySent] = useState(false);

  const handleShare = async () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({
          title: "Modern 2-Bedroom Apartment in East Legon - Ecoshel",
          text: "Check out this verified 2-bedroom rental with standby generator in East Legon, Accra on Ecoshel.",
          url: window.location.href,
        });
      } catch {
        // Share dismissed
      }
    } else if (typeof navigator !== "undefined" && navigator.clipboard) {
      await navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSendingInquiry(true);
    setTimeout(() => {
      setSendingInquiry(false);
      setInquirySent(true);
    }, 700);
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header activePath="find-a-rental" onNavigate={onNavigate} />

      <main className="flex-1 w-full pt-16 bg-surface">
        <div className="flex flex-col w-full">
          {/* Breadcrumbs & Quick Actions Bar */}
          <div className="w-full bg-surface-container-lowest shadow-sm">
            <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-sm flex flex-wrap items-center justify-between gap-space-sm">
              <nav
                aria-label="Breadcrumb"
                className="flex items-center flex-wrap gap-space-xs text-on-surface-variant font-body-sm text-body-sm"
              >
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("find-a-rental");
                  }}
                >
                  Home
                </a>
                <span className="material-symbols-outlined text-[0.875rem] text-outline">
                  chevron_right
                </span>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("accra-neighborhoods");
                  }}
                >
                  Greater Accra
                </a>
                <span className="material-symbols-outlined text-[0.875rem] text-outline">
                  chevron_right
                </span>
                <a
                  className="hover:text-primary transition-colors"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("accra-neighborhoods");
                  }}
                >
                  East Legon
                </a>
                <span className="material-symbols-outlined text-[0.875rem] text-outline">
                  chevron_right
                </span>
                <span className="text-on-surface font-semibold truncate max-w-[200px] sm:max-w-xs">
                  Modern 2-Bedroom Apartment
                </span>
              </nav>

              <div className="flex items-center gap-space-xs">
                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-sm text-label-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[1rem]">
                    {shareCopied ? "done" : "share"}
                  </span>
                  <span className="hidden sm:inline">
                    {shareCopied ? "Link Copied!" : "Share"}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsSaved(!isSaved)}
                  className={`flex items-center gap-space-xs px-space-sm py-space-xs rounded-lg bg-surface-container-low hover:bg-surface-container font-label-sm text-label-sm transition-colors ${
                    isSaved ? "text-error" : "text-on-surface"
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[1rem]"
                    style={{
                      fontVariationSettings: isSaved ? "'FILL' 1" : "'FILL' 0",
                    }}
                  >
                    favorite
                  </span>
                  <span className="hidden sm:inline">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-md lg:py-space-lg flex flex-col gap-space-xl">
            {/* Gallery: Asymmetric 5-Photo Mosaic */}
            <section className="w-full relative rounded-xl overflow-hidden bg-surface-container shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-space-xs h-[380px] sm:h-[460px] lg:h-[540px]">
                {/* Hero Main Photo */}
                <div className="relative md:col-span-2 md:row-span-2 overflow-hidden group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Living Space"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBT9CtHo-VnupLquRrNUoQkk16maN73EUCnyJ6wL5Be_pocfwVrqZ7iqVwKeIJT8OakhyuThEm5nGC8dXf3msWuuqRsvdV3EgUcRv_uDRllwzCYf6vij30C0mbeTSWCjkyNW3d3Nfryptr2Q-41-idpf3jnkSm-SwEUS7B1ANzxIrCbzLSXFqWMQqGj8eiH6y3XJA4T49gfBCnaDCKhIj6_bEWohWzoOWF9HYK9dkCQXEOmfm7i4326ZA"
                  />
                  <div className="absolute top-space-sm left-space-sm flex items-center gap-space-xs bg-surface-container-lowest/90 backdrop-blur-md px-space-sm py-space-xs rounded-full shadow-sm">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-primary">
                      Verified Inspection 2025
                    </span>
                  </div>
                  <div className="absolute bottom-space-sm left-space-sm bg-inverse-surface/80 backdrop-blur-sm text-inverse-on-surface px-space-sm py-space-xs rounded-lg font-caption text-caption flex items-center gap-space-xs">
                    <span className="material-symbols-outlined text-[1rem]">
                      photo_camera
                    </span>
                    <span>Living Space &amp; Balcony Access</span>
                  </div>
                </div>

                {/* Master Bedroom */}
                <div className="hidden md:block relative overflow-hidden group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Master Bedroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBMZDKk-UOmy3pkeljMLOnnAf_wq4L6XQv-0pnj2XVdyq1Fsph90ex79BQzxvIHevK3A8v1VEg8pQPZEsKJ0gHKIBqrE-GYAvlQJAFAYcb8WSphqVE2m8q41yAbHLJ5Wi-xWaZq6UL8FP6UF5Hij303vY7jX1KYQ7tvmSRLEKV8HSH3bvOjrfD2SbSGUrbPSJyntBtevhSWq6KUMMA3O3br0nSRoKO5ibx-pI5ZaluOB1Fp7XecXQb6jw"
                  />
                  <div className="absolute bottom-space-xs left-space-xs bg-inverse-surface/75 text-inverse-on-surface px-space-xs py-0.5 rounded font-caption text-caption">
                    Master Suite
                  </div>
                </div>

                {/* Kitchen */}
                <div className="hidden md:block relative overflow-hidden group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Fitted Kitchen"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQXxG8otfBakrUaQEMjko__AYDhcO782HwurDYXF62qrLsXITb8fe5SCk6EmOTOYtUDM18u2WEWg2A5K2TZLLauAFmh-k5q3xuSFIn7JLR0NuavLjCEuHWdXRvaQ4MN_dB9mtq75LVIV3IhhaPdYuVTrLaCW2TA5zGqUcCubQtQRLI_abbT1pv-gkePNkST0AwksyaOPxE0Dv8FsBslTFzGYsES0j8CyAfdwJwWi80eC9vJncS-IS_KA"
                  />
                  <div className="absolute bottom-space-xs left-space-xs bg-inverse-surface/75 text-inverse-on-surface px-space-xs py-0.5 rounded font-caption text-caption">
                    Fitted Kitchen
                  </div>
                </div>

                {/* Modern Bathroom */}
                <div className="hidden md:block relative overflow-hidden group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Modern Bathroom"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCc3R9VYQcd6mSaFi0PemqMRKxw1tCT4mnjEXEGaN5Bup8M61XitQoGrJAmEByXhtck4kY25tIiqO3axcqIkzYb1rcoxoUrFTKLrgWcPcCJPI0jOczN3WCB0Tt79SwS3FsBYPXWOv5tw3CAAI7EuPWyZ9C-86Ylbue52o1kXL9K4joFCh6xR-p93PgeSr6EqUiaU5HKp1v_IrJviL8X8m16iG66TygseOEukhEWIcpcyhuCb19bB13WZQ"
                  />
                  <div className="absolute bottom-space-xs left-space-xs bg-inverse-surface/75 text-inverse-on-surface px-space-xs py-0.5 rounded font-caption text-caption">
                    Ensuite Bath
                  </div>
                </div>

                {/* Private Balcony */}
                <div className="hidden md:block relative overflow-hidden group cursor-pointer">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    alt="Private Balcony"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQoU2ez4BXdem8yIsyvyV9IKcgmG042m9-h8CWEM5HnyM15R8uXjRYf-uEKAvx6V6HC_qv1PM_B6re1f2_wAklFdVOma_XwDT6huucG6fjcWZ9eSsPEQoKynOxVzefrMM-ieXmycUbW0lB3JsMvZYVlDdlviRw3yX4UQ3sNXC0waI4MaZyFOze_C2g8hGrbmLITCEySLWNcynOyQAjuy6JQummtn49POBC14fuBue1REIoDQl0itSBcA"
                  />
                  <div className="absolute bottom-space-xs left-space-xs bg-inverse-surface/75 text-inverse-on-surface px-space-xs py-0.5 rounded font-caption text-caption">
                    Private Balcony
                  </div>
                </div>
              </div>

              {/* Floating "View All Photos" Action */}
              <button
                type="button"
                className="absolute bottom-space-md right-space-md bg-surface-container-lowest hover:bg-surface-container-low text-on-surface font-label-md text-label-md px-space-md py-space-sm rounded-full shadow-lg flex items-center gap-space-xs transition-transform active:scale-95"
              >
                <span className="material-symbols-outlined text-[1.125rem]">
                  grid_view
                </span>
                <span>View all 16 photos</span>
              </button>
            </section>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              {/* LEFT COLUMN: Comprehensive Rental Details */}
              <div className="lg:col-span-8 flex flex-col gap-space-xl">
                {/* Title & Location Header */}
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wide">
                      Standard Long-Term Lease
                    </span>
                    <span className="flex items-center gap-1 font-label-sm text-label-sm text-primary font-bold">
                      <span className="material-symbols-outlined text-[1rem]">
                        verified
                      </span>
                      Direct Owner Listing
                    </span>
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-space-xs">
                    Modern 2-Bedroom Serviced Apartment in East Legon
                  </h1>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-body-md text-body-md">
                    <span className="material-symbols-outlined text-primary text-[1.25rem]">
                      location_on
                    </span>
                    <span>
                      East Legon, near American House, Accra • 5 mins to A&amp;C
                      Mall
                    </span>
                  </div>

                  {/* Feature Chips Pill Row */}
                  <div className="flex flex-wrap items-center gap-space-xs pt-space-sm">
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        apartment
                      </span>
                      Entire Apartment
                    </span>
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        bed
                      </span>
                      2 Bedrooms
                    </span>
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        bathtub
                      </span>
                      2 Full Baths
                    </span>
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        chair
                      </span>
                      Furnished Available
                    </span>
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        balcony
                      </span>
                      Ground Floor + Balcony
                    </span>
                    <span className="flex items-center gap-1.5 px-space-sm py-space-xs rounded-full bg-surface-container-lowest text-on-surface font-label-sm text-label-sm shadow-sm">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        square_foot
                      </span>
                      120 m²
                    </span>
                  </div>
                </div>

                {/* Verified Landlord Card */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md">
                  <div className="flex items-center gap-space-md">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-16 h-16 rounded-full object-cover shadow-sm"
                        alt="Abena Mensah"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAW8d9mjegBNqaa0p5S-2CwJL1TVdduqZXgx2dxR_7tulCy7GRd_0zlD4e0yeyYDNYtlH2vldwWhAvt5EJXVZGN9_8x3CY0lFgzIjVVZRV7jkf9RORrEHbKrbJMSQnnKTCSxMPYpP1LukEpYyOxLDUaBGU1QP4gVd-y8A5oOQV-XS0Ewrj53ggSC2GB9CaOcikch0tlAo6UQs8w0gmwl2psGQYfCoiHnaXGh9L6DqR3cqD-VxqITSulIg"
                      />
                      <span className="absolute bottom-0 right-0 bg-primary text-on-primary rounded-full p-0.5 flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">
                          check
                        </span>
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="flex items-center gap-space-xs">
                        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          Abena Mensah
                        </span>
                        <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-caption text-caption uppercase font-bold">
                          Verified Owner
                        </span>
                      </div>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        4 properties on Ecoshel • Member since Oct 2023
                      </p>
                      <div className="flex items-center gap-space-sm mt-1 text-on-surface-variant font-caption text-caption">
                        <span className="flex items-center gap-1 text-primary">
                          <span className="material-symbols-outlined text-[0.875rem]">
                            schedule
                          </span>
                          Response time &lt; 30 mins
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-on-surface">
                          <span className="material-symbols-outlined text-[0.875rem] text-primary">
                            star
                          </span>
                          4.9 Tenant Rating
                        </span>
                      </div>
                    </div>
                  </div>
                  <a
                    className="w-full sm:w-auto text-center px-space-md py-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-primary font-label-md text-label-md transition-colors"
                    href="#inquirySection"
                  >
                    Ask a Question
                  </a>
                </div>

                {/* Ghana Essential Utilities & Infrastructure Checklist */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex flex-col gap-0.5">
                    <span className="font-caption text-caption uppercase text-primary tracking-wider font-bold">
                      Accra Living Standard
                    </span>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      Essential Ghana Utilities &amp; Infrastructure
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Guaranteed operational utilities for uninterrupted comfort
                      in Greater Accra.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          bolt
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Standby Generator (Full Load)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Automatic changeover system running ACs,
                          refrigeration, and pump during ECG power cuts.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-secondary text-on-secondary flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          water_drop
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Polytank + Automated Booster Pump
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Dual 2,000L treated storage reserves guaranteeing
                          continuous water pressure 24/7.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          shield
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Gated Compound with Security Guard
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          24/7 manned gatehouse, intercom access, perimeter
                          electric fence, and CCTV monitoring.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-surface-variant text-on-surface flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          speed
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Independent Pre-paid ECG Meter
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Individual smart meter inside flat; load credit
                          directly via ECG PowerApp or mobile money.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          ac_unit
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Air Conditioning in All Rooms
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Energy-saving inverter split-units installed in the
                          living lounge and both master bedrooms.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low">
                      <div className="w-10 h-10 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          wifi
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Fiber Internet Ready (MTN / Telecel)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Pre-routed fiber optic terminal ready for immediate
                          plug-and-play high-speed connectivity.
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low sm:col-span-2">
                      <div className="w-10 h-10 rounded-lg bg-surface-dim text-on-surface flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-[1.25rem]">
                          directions_car
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Dedicated Reserved Parking (2 Vehicles)
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Paved concrete interlocking driveway with 2 assigned
                          shaded parking bays and visitor spots.
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Property Overview & Description */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    About This Rental Property
                  </h2>
                  <div className="font-body-lg text-body-lg text-on-surface-variant space-y-space-md leading-relaxed">
                    <p>
                      Tucked into a quiet, paved cul-de-sac off Boundary Road in
                      East Legon, this newly finished two-bedroom apartment
                      offers effortless urban comfort with immediate proximity
                      to American House, A&amp;C Square, and the Tetteh Quarshie
                      Interchange. Designed specifically for working executives,
                      returnees, and discerning small families who prioritize
                      reliability and peace of mind.
                    </p>
                    <p>
                      The residence features high ceilings, oversized
                      double-glazed acoustic windows, and ceramic tile flooring
                      throughout. The open-concept living and dining area flows
                      onto a shaded private balcony overlooking neat landscaped
                      gardens. The chef’s kitchen comes equipped with custom
                      cabinetry, polished granite countertops, a built-in
                      electric hob, and pre-plumbing for a front-loading washing
                      machine.
                    </p>
                    <p>
                      Both bedrooms are fully ensuite with contemporary shower
                      enclosures, concealed water heaters, and built-in
                      floor-to-ceiling wardrobes. Most importantly, utility
                      anxiety is completely eliminated: the property features an
                      industrial-grade automated standby generator that carries
                      all air conditioners during national grid outages, coupled
                      with dual high-capacity polytanks that safeguard
                      continuous running water.
                    </p>
                  </div>
                  {/* Feature Highlights Snippet */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-xs pt-space-xs">
                    <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Floor Level
                      </span>
                      <span className="block font-label-md text-label-md text-on-surface mt-0.5 font-semibold">
                        Ground Floor
                      </span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Furnishing
                      </span>
                      <span className="block font-label-md text-label-md text-on-surface mt-0.5 font-semibold">
                        Semi / Full Opt
                      </span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Water Source
                      </span>
                      <span className="block font-label-md text-label-md text-on-surface mt-0.5 font-semibold">
                        GWCL + Polytanks
                      </span>
                    </div>
                    <div className="p-space-sm rounded-lg bg-surface-container-low text-center">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Security Deposit
                      </span>
                      <span className="block font-label-md text-label-md text-on-surface mt-0.5 font-semibold">
                        1 Month (Refundable)
                      </span>
                    </div>
                  </div>
                </div>

                {/* Transparent Rental Terms Breakdown */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between flex-wrap gap-space-xs">
                    <div>
                      <span className="font-caption text-caption uppercase text-primary tracking-wider font-bold">
                        Clear Pricing in Cedis
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Standard Rental Terms &amp; Advance Schedule
                      </h2>
                    </div>
                    <span className="px-space-sm py-1 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold">
                      Regulated Lease Agreement
                    </span>
                  </div>
                  <div className="divide-y divide-surface-container">
                    <div className="py-space-sm flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Monthly Rental Cost
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Direct rate agreed with landlord Abena Mensah
                        </span>
                      </div>
                      <span className="font-price-display text-price-display text-primary">
                        GH₵ {monthlyRent.toLocaleString()}
                      </span>
                    </div>
                    <div className="py-space-sm flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Advance Period Structure
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Flexible options negotiable directly with owner
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface text-right">
                        6 Months or 1 Year
                      </span>
                    </div>
                    <div className="py-space-sm flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Refundable Security Deposit
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Held safely in Ecoshel Tenancy Escrow
                        </span>
                      </div>
                      <span className="font-label-md text-label-md text-on-surface">
                        GH₵ {monthlyRent.toLocaleString()}{" "}
                        <span className="text-on-surface-variant font-normal">
                          (1 Mo)
                        </span>
                      </span>
                    </div>
                    <div className="py-space-sm flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="font-label-md text-label-md text-on-surface font-semibold">
                          Ecoshel Tenant Surcharge / Agent Viewing Fee
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Zero agent lockups. Never pay viewing bribes.
                        </span>
                      </div>
                      <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                        GH₵ 0 FREE
                      </span>
                    </div>
                  </div>
                  <div className="p-space-sm rounded-lg bg-surface-container flex items-center gap-space-sm">
                    <span className="material-symbols-outlined text-primary text-[1.5rem] flex-shrink-0">
                      gavel
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface">
                      All leases processed through Ecoshel are backed by
                      standard Ghana Rent Act (Act 220) compliant documentation
                      with physical key handover protocols.
                    </p>
                  </div>
                </div>

                {/* Neighborhood Map Preview */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm flex flex-col gap-space-md">
                  <div className="flex items-center justify-between flex-wrap gap-space-xs">
                    <div>
                      <span className="font-caption text-caption uppercase text-primary tracking-wider font-bold">
                        Location &amp; Commute
                      </span>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        East Legon Neighborhood
                      </h2>
                    </div>
                    <span className="text-on-surface-variant font-body-sm text-body-sm">
                      Boundary Rd, near American House
                    </span>
                  </div>
                  <div
                    className="w-full h-72 rounded-xl bg-cover bg-center relative overflow-hidden shadow-inner flex items-center justify-center"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7fga-Auyrkn-RWL_qrSo7aeNJOfX7boRQra6Lvjc_xDQ6ZtgHUJCQpE1txhsteUMpPKpLTkzyDcNzGHJvZ2lUw8woPJwNOOGvFixmgC2J1dJHN8sP5fUyslhh4HQ8GTqgVtpbVNAWGjyTekfm59MhjqOdyR6lLHKkUhpaj-OP-SuTzwJDhX9hpI3EezQWGi3_-_-16bgoaHy6pm9iHtFRoEDMYEvOl2V7T-lkfThEceWOEllv7LBgqQ')",
                    }}
                  >
                    <div className="absolute inset-0 bg-inverse-surface/20"></div>
                    <div className="relative z-10 flex flex-col items-center animate-bounce">
                      <div className="bg-primary text-on-primary px-space-sm py-1 rounded-full shadow-lg font-label-sm text-label-sm flex items-center gap-1">
                        <span className="material-symbols-outlined text-[1rem]">
                          apartment
                        </span>
                        <span>East Legon 2-Bed</span>
                      </div>
                      <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5 shadow-md"></div>
                    </div>
                    <div className="absolute bottom-space-sm left-space-sm bg-surface-container-lowest/95 backdrop-blur-sm p-space-sm rounded-lg shadow-md max-w-xs">
                      <span className="font-label-sm text-label-sm text-on-surface block font-bold">
                        Commute Times
                      </span>
                      <ul className="font-caption text-caption text-on-surface-variant mt-1 space-y-0.5">
                        <li>• 4 mins to American House Bus Stop</li>
                        <li>• 7 mins drive to A&amp;C Mall</li>
                        <li>
                          • 18 mins to Kotoka International Airport (Off-peak)
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: Sticky Inquiry / Contact Box */}
              <aside
                className="lg:col-span-4 lg:sticky lg:top-20 flex flex-col gap-space-md"
                id="inquirySection"
              >
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-md flex flex-col gap-space-md">
                  {/* Price Header */}
                  <div className="flex items-baseline justify-between pb-space-xs border-b border-surface-container">
                    <div>
                      <span className="font-price-display text-price-display text-on-surface">
                        GH₵ {monthlyRent.toLocaleString()}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        / month
                      </span>
                    </div>
                    <span className="px-space-xs py-0.5 rounded bg-surface-container-low text-primary font-caption text-caption font-semibold">
                      Direct Landlord
                    </span>
                  </div>
                  <div className="p-space-xs rounded bg-surface-container text-center">
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      Standard 6-mo or 1-year tenancy
                    </span>
                    <span className="block font-caption text-caption text-on-surface-variant">
                      Advance is paid directly to verified owner
                    </span>
                  </div>

                  {/* Contact Form */}
                  <form
                    className="flex flex-col gap-space-sm"
                    onSubmit={handleInquirySubmit}
                  >
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-label-sm text-on-surface font-semibold"
                        htmlFor="tenantName"
                      >
                        Your Full Name
                      </label>
                      <input
                        className="w-full px-space-sm py-2 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md text-on-surface placeholder:text-outline transition-colors"
                        id="tenantName"
                        placeholder="e.g. Kwame Asante"
                        required
                        type="text"
                        value={tenantName}
                        onChange={(e) => setTenantName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-label-sm text-on-surface font-semibold"
                        htmlFor="tenantContact"
                      >
                        WhatsApp / Phone Number
                      </label>
                      <div className="flex">
                        <span className="inline-flex items-center px-space-sm rounded-l-lg bg-surface-container-low border border-r-0 border-outline-variant font-body-sm text-body-sm text-on-surface font-semibold">
                          +233
                        </span>
                        <input
                          className="w-full px-space-sm py-2 rounded-r-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md text-on-surface placeholder:text-outline transition-colors"
                          id="tenantContact"
                          placeholder="024 123 4567"
                          required
                          type="tel"
                          value={tenantContact}
                          onChange={(e) => setTenantContact(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-label-sm text-on-surface font-semibold"
                        htmlFor="moveInDate"
                      >
                        Target Move-In Date
                      </label>
                      <input
                        className="w-full px-space-sm py-2 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md text-on-surface transition-colors"
                        id="moveInDate"
                        min={minDate}
                        required
                        type="date"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label
                        className="font-label-sm text-label-sm text-on-surface font-semibold"
                        htmlFor="messageText"
                      >
                        Message to Abena Mensah
                      </label>
                      <textarea
                        className="w-full px-space-sm py-2 rounded-lg bg-surface-container-lowest border border-outline-variant focus:border-primary focus:outline-none font-body-md text-body-md text-on-surface transition-colors resize-none"
                        id="messageText"
                        rows={3}
                        value={inquiryMessage}
                        onChange={(e) => setInquiryMessage(e.target.value)}
                      ></textarea>
                    </div>
                    {/* Submit Button */}
                    <button
                      className={`w-full mt-space-xs py-3 px-space-md rounded-lg font-label-md text-label-md shadow-sm transition-all flex items-center justify-center gap-space-xs active:scale-[0.99] text-on-primary ${
                        inquirySent
                          ? "bg-primary-container"
                          : "bg-primary hover:bg-primary-container"
                      }`}
                      disabled={sendingInquiry}
                      type="submit"
                    >
                      {sendingInquiry ? (
                        <>
                          <span className="material-symbols-outlined text-[1.25rem] animate-spin">
                            refresh
                          </span>
                          <span>Sending...</span>
                        </>
                      ) : inquirySent ? (
                        <>
                          <span className="material-symbols-outlined text-[1.25rem]">
                            check
                          </span>
                          <span>Message Sent</span>
                        </>
                      ) : (
                        <>
                          <span className="material-symbols-outlined text-[1.25rem]">
                            send
                          </span>
                          <span>Send Message to Landlord</span>
                        </>
                      )}
                    </button>
                    {/* Direct WhatsApp Button */}
                    <a
                      className="w-full py-2.5 px-space-md rounded-lg bg-[#25D366] hover:bg-[#1EBE5D] text-white font-label-md text-label-md shadow-sm transition-all flex items-center justify-center gap-space-xs active:scale-[0.99]"
                      href="https://wa.me/233240000000?text=Hello%20Abena,%20I%20saw%20your%20East%20Legon%202-Bedroom%20apartment%20on%20Ecoshel%20and%20would%20like%20to%20schedule%20a%20viewing."
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.599 2.679-.702c.972.532 1.942.816 2.781.816 3.18 0 5.767-2.587 5.767-5.766.001-3.182-2.585-5.8-5.767-6m0-2.172c4.418 0 8 3.582 8 8 0 4.419-3.582 8-8 8a7.963 7.963 0 0 1-4.062-1.107l-4.969 1.303 1.326-4.843A7.954 7.954 0 0 1 4.031 12c0-4.418 3.582-8 8-8z"></path>
                      </svg>
                      <span>Chat on WhatsApp</span>
                    </a>
                  </form>

                  {inquirySent && (
                    <div className="p-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-body-sm text-body-sm flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[1.25rem]">
                        check_circle
                      </span>
                      <span>
                        Inquiry transmitted! Abena usually responds in under 30
                        minutes.
                      </span>
                    </div>
                  )}

                  {/* Security Notice */}
                  <div className="p-space-sm rounded-lg bg-surface-container-low flex items-start gap-space-xs">
                    <span className="material-symbols-outlined text-primary text-[1.25rem] flex-shrink-0 mt-0.5">
                      verified_user
                    </span>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        Ecoshel Anti-Fraud Policy
                      </span>
                      <p className="font-caption text-caption text-on-surface-variant leading-normal mt-0.5">
                        Never send mobile money or cash advance before an
                        in-person physical inspection inside the property with
                        verified keys.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Quick Neighborhood Stat Card */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-xs">
                  <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                    East Legon Rent Index (2-Bed Flats)
                  </span>
                  <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption pt-1">
                    <span>Area Average</span>
                    <span className="font-semibold text-on-surface">
                      GH₵ 7,200/mo
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-on-surface-variant font-caption text-caption">
                    <span>This Listing</span>
                    <span className="font-bold text-primary">
                      GH₵ {monthlyRent.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="w-full bg-surface-container h-2 rounded-full overflow-hidden mt-1">
                    <div
                      className="bg-primary h-full rounded-full"
                      style={{ width: "72%" }}
                    ></div>
                  </div>
                </div>
              </aside>
            </div>

            {/* Related Listings Nearby in East Legon */}
            <section className="w-full pt-space-xl flex flex-col gap-space-md">
              <div className="flex items-center justify-between">
                <div>
                  <span className="font-caption text-caption uppercase text-primary tracking-wider font-bold">
                    Similar Available Homes
                  </span>
                  <h3 className="font-headline-md text-headline-md text-on-surface">
                    More verified rentals near American House
                  </h3>
                </div>
                <a
                  className="font-label-md text-label-md text-primary hover:underline flex items-center gap-1"
                  data-path="accra-neighborhoods"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("accra-neighborhoods");
                  }}
                >
                  Explore East Legon{" "}
                  <span className="material-symbols-outlined text-[1rem]">
                    arrow_forward
                  </span>
                </a>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
                {/* Related 1 */}
                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt="Studio in Shiashie"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBF7W6hHRPJ3Mb3vflt0W8AUsDhHNaSLdfr1ji63xFjl3zgatKWnhnymD0Y3uV3v62UuuEEqOHJXquImHZVAm7_kmVBWonA_olg6M1AriADrTomOapNkPoeqEKS-V2KOLulxfVF8_f3pn48FXYe8x6-TxnRMoWs0HJa5mCOEvv_fapspypB_JxAuOQJ2Lnfr_u1EAp2tPyPvPg6TF5PlSbKS45RRnnGP2-Qe9cOWZNYkvoZRpyZhnf4qA"
                    />
                    <div className="absolute top-space-xs left-space-xs bg-surface-container-lowest/90 px-space-xs py-0.5 rounded text-primary font-label-sm text-label-sm">
                      Shiashie, East Legon
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary">
                        Studio Apartment
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate">
                        Executive Studio with Pool &amp; Gym
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        1 Bed • 1 Bath • Standby Plant
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                      <span className="font-price-display text-price-display text-on-surface">
                        GH₵ 4,200
                        <span className="text-body-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </span>
                      <span className="font-caption text-caption text-primary font-bold">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Related 2 */}
                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt="Townhouse Adjiringanor"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCtJ43NEvuPtpY8WjbSATxgI6vvFR7M6pwIgYUrlgPzAOP71FHMwkE3MkOrv8301IZ42ZUQE1Hk4lvXWJvUGcjuIWIbtyxhuEiGf9Y00w4NIF3DB_K0l_IzUR7C0U2pf_OuBB6NWrIUuKHXx1HnUjFtEO6tfYOuCpxVQCkBfE5fDySgdL5v5vfZpTFWmlZScbFJKmOF8xsTnWzFKelshVOiqbYQV6uDIeT6V0JMUiRmY1Ypjy5MNVE0yA"
                    />
                    <div className="absolute top-space-xs left-space-xs bg-surface-container-lowest/90 px-space-xs py-0.5 rounded text-primary font-label-sm text-label-sm">
                      Adjiringanor, East Legon
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary">
                        Townhouse
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate">
                        3-Bed Gated Townhouse + Boys Quarters
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        3 Beds • 3.5 Baths • 24/7 Security
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                      <span className="font-price-display text-price-display text-on-surface">
                        GH₵ 9,800
                        <span className="text-body-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </span>
                      <span className="font-caption text-caption text-primary font-bold">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>

                {/* Related 3 */}
                <div
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                  className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col group cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      alt="Furnished flat Boundary Rd"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBAd1GIH9G_kC3M79BdRW94DBpGM1LjMtZk14Rw56IKpdwP8bV4ky-RI00A0j00n83hcAnU_cZQ2YxV2Qa88jig8VlaLql13mCjyT2YQS799cWk_lazzcL_DLQi9IUJ9VNUgEVctvLLbaC8UUPtX_ZSe4909bXnfT9gelzQ3ReqzU9ua8dG26YgNYyoyt0OyhBZomZlG4KF1ah7iMRQIzfBHWbJY0KnqWv0yNUpX7Lg6DqjpZ4AmrD8Vg"
                    />
                    <div className="absolute top-space-xs left-space-xs bg-surface-container-lowest/90 px-space-xs py-0.5 rounded text-primary font-label-sm text-label-sm">
                      Boundary Rd, East Legon
                    </div>
                  </div>
                  <div className="p-space-md flex flex-col gap-space-xs flex-1 justify-between">
                    <div>
                      <span className="font-label-sm text-label-sm text-primary">
                        Furnished Flat
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface truncate">
                        Fully Furnished 2-Bed with Balcony
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                        2 Beds • 2 Baths • Polytank + Gen
                      </p>
                    </div>
                    <div className="pt-space-sm border-t border-surface-container flex items-center justify-between">
                      <span className="font-price-display text-price-display text-on-surface">
                        GH₵ 7,500
                        <span className="text-body-sm font-normal text-on-surface-variant">
                          /mo
                        </span>
                      </span>
                      <span className="font-caption text-caption text-primary font-bold">
                        Verified
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
      <MobileNav activePath="find-a-rental" onNavigate={onNavigate} />
    </div>
  );
}

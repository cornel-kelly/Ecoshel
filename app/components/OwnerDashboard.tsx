"use client";

import React, { useState } from "react";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export interface OwnerDashboardProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
  onNavigate?: (path: string) => void;
}

export default function OwnerDashboard({
  isAuthenticated = false,
  userRole = "tenant",
  onNavigate,
}: OwnerDashboardProps) {
  const [activeTab, setActiveTab] = useState<"listings" | "inbox">("listings");
  const [selectedThread, setSelectedThread] = useState<string>("kb");
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "Kwame Boateng",
      senderInitial: "KB",
      isOwner: false,
      time: "10:14 AM",
      text: "Hello Abena, I work near Airport and looking to relocate to East Legon. Is the standby generator automatic switch? Also wanted to ask if 1-year advance is required or 6 months is fine?",
    },
    {
      id: "2",
      sender: "You (Abena - Owner)",
      senderInitial: "A",
      isOwner: true,
      time: "10:28 AM",
      text: "Good morning Kwame. Yes, the generator has an automatic transfer switch. We can accept 6 months advance if employment verification is provided. Would you like to view it this Saturday?",
    },
  ]);
  const [viewingConfirmed, setViewingConfirmed] = useState(false);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        sender: "You (Abena - Owner)",
        senderInitial: "A",
        isOwner: true,
        time: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        text: messageInput.trim(),
      },
    ]);
    setMessageInput("");
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header
        activePath="owner-dashboard"
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onNavigate={onNavigate}
      />

      <main className="flex-1 w-full pt-16 bg-surface">
        <div className="flex flex-col w-full">
          <div className="w-full max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            {/* Top Welcome & Owner Action Strip */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-lg mb-space-xl">
              <div className="space-y-space-xs">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-surface-container-high text-primary font-label-sm text-label-sm">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  Verified Host • Greater Accra
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Owner Portal
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Welcome back, Abena •{" "}
                  <span className="font-semibold text-on-surface">
                    3 active rental listings
                  </span>{" "}
                  in Accra
                </p>
              </div>
              <div className="flex items-center gap-space-sm flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center gap-space-xs px-space-md py-2.5 rounded-lg bg-surface-container-lowest text-on-surface font-label-md text-label-md shadow-sm hover:bg-surface-container-low transition-all"
                >
                  <span className="material-symbols-outlined text-[1.125rem] text-primary">
                    download
                  </span>
                  <span>Lease Statements</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.("list-your-property")}
                  className="inline-flex items-center gap-space-xs px-space-lg py-2.5 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md transition-all group"
                >
                  <span className="material-symbols-outlined text-[1.25rem] group-hover:rotate-90 transition-transform">
                    add
                  </span>
                  <span>New Listing</span>
                </button>
              </div>
            </div>

            {/* Metrics Bar: 4 Clean Elevated Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter-desktop mb-space-2xl">
              {/* Metric 1 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Active Listings
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-secondary-container/40 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.25rem]">
                      real_estate_agent
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface">
                      3
                    </span>
                    <span className="font-label-sm text-label-sm text-primary font-bold">
                      live in Accra
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    100% verified tenancy rate
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-caption text-caption text-on-surface-variant border-t border-surface-container-high/40">
                  <span>East Legon, Airport, Osu</span>
                  <span className="text-primary font-semibold">Healthy</span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Total Inquiries
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-[1.25rem]">
                      chat_bubble
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface">
                      28
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      messages
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-primary font-semibold mt-1">
                    1 unread tenant inquiry
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center gap-space-xs font-caption text-caption text-on-surface-variant border-t border-surface-container-high/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                  <span>Avg response time: 24 mins</span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Scheduled Viewings
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-surface-container-high flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.25rem]">
                      calendar_today
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-headline-lg text-headline-lg text-on-surface">
                      5
                    </span>
                    <span className="font-label-sm text-label-sm text-on-surface-variant">
                      this week
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Next: Saturday 10:00 AM
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center justify-between font-caption text-caption text-on-surface-variant border-t border-surface-container-high/40">
                  <span className="text-primary font-semibold">
                    Kwame Boateng
                  </span>
                  <span>East Legon 2-Bed</span>
                </div>
              </div>

              {/* Metric 4 */}
              <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                <div className="flex items-center justify-between mb-space-md">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                    Monthly Value
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.25rem]">
                      payments
                    </span>
                  </div>
                </div>
                <div>
                  <div className="flex items-baseline gap-space-xs">
                    <span className="font-price-display text-price-display text-on-surface">
                      GH₵ 24,500
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      /mo
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                    Across 3 portfolio properties
                  </p>
                </div>
                <div className="mt-space-md pt-space-xs flex items-center gap-space-xs font-caption text-caption text-primary border-t border-surface-container-high/40">
                  <span className="material-symbols-outlined text-[0.875rem]">
                    trending_up
                  </span>
                  <span>100% on-time disbursement</span>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-space-sm mb-space-lg bg-surface-container-low p-1.5 rounded-xl max-w-fit shadow-inner">
              <button
                type="button"
                className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all ${
                  activeTab === "listings"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => setActiveTab("listings")}
              >
                <span className="material-symbols-outlined text-[1.25rem]">
                  domain
                </span>
                <span>My Listings (3)</span>
              </button>
              <button
                type="button"
                className={`flex items-center gap-space-xs px-space-md py-2 rounded-lg font-label-md text-label-md transition-all relative ${
                  activeTab === "inbox"
                    ? "bg-surface-container-lowest text-primary font-bold shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => setActiveTab("inbox")}
              >
                <span className="material-symbols-outlined text-[1.25rem]">
                  forum
                </span>
                <span>Tenant Inquiries &amp; Messages</span>
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
              </button>
            </div>

            {/* TAB 1: My Listings View */}
            {activeTab === "listings" && (
              <div className="flex flex-col gap-space-lg">
                {/* Property Listing Card 1 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md w-full lg:w-auto">
                    <div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden shrink-0 bg-surface-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover"
                        alt="East Legon apartment"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxtFnuS4DuejomOyoYl5pHQ9fAP0HEZPJQhVww1p2z093Wfg7FJv28Cn456tgl_BfX01w1xhq-nyd2q3BKJdHun621ZApKfavlE3xDFq_EN4CvsOTH2QHJagNe3aix-OCDMnFO5JBFR5WhXlqN1fOdRVjC0gzzRAaxsSzUW944inl7cp9mPi2HmvJTa1n93OzFvlPFBRwfN3u6CSp4aNsZHgEF_iwQGiq-iIQEsTnD3Zgp4v7AFwoCqQ"
                      />
                      <span className="absolute top-2 left-2 px-space-xs py-0.5 rounded font-caption text-caption bg-surface-container-lowest/90 text-on-surface font-semibold backdrop-blur-sm">
                        East Legon
                      </span>
                    </div>
                    <div className="space-y-space-xs min-w-0">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary/10 text-primary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Active / Listed
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Ref: EC-EL-409
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface truncate max-w-lg">
                        Modern 2-Bedroom Serviced Apartment in East Legon
                      </h2>
                      <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                        <span>2 Beds</span>
                        <span>•</span>
                        <span>2.5 Baths</span>
                        <span>•</span>
                        <span>Standby Generator</span>
                        <span>•</span>
                        <span>Water Reservoir</span>
                      </div>
                      <div className="flex items-center gap-space-md pt-1 font-body-sm text-body-sm">
                        <span className="font-price-display text-price-display text-on-surface">
                          GH₵ 6,500{" "}
                          <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                            / mo
                          </span>
                        </span>
                        <div className="h-4 w-px bg-surface-container-high"></div>
                        <span className="text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[1rem]">
                            visibility
                          </span>{" "}
                          342 views
                        </span>
                        <span className="flex items-center gap-1 font-semibold text-on-surface-variant hover:text-primary transition-colors"></span><span className="text-on-surface-variant flex items-center gap-1 font-semibold text-primary">
                          <span className="material-symbols-outlined text-[1rem]">
                            chat
                          </span>{" "}
                          12 inquiries
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs sm:gap-space-sm w-full lg:w-auto justify-end pt-space-xs lg:pt-0">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("list-your-property")}
                      className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        edit
                      </span>
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        pause_circle
                      </span>
                      <span className="hidden sm:inline">Pause</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate?.("property-detail")}
                      className="px-space-md py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        open_in_new
                      </span>
                      <span className="hidden sm:inline">View Public</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg text-error hover:bg-error-container/20 transition-colors"
                      title="Delete listing"
                    >
                      <span className="material-symbols-outlined text-[1.25rem]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>

                {/* Property Listing Card 2 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md w-full lg:w-auto">
                    <div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover"
                        alt="Airport Residential townhouse"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEzC7dkqJNmrfR2VX9qcjC-DGmx2DgYQc-8FFRPjQTApNqaBNiVc-SHrpnI1y8qGajbFeiDVDXaY4s7uDTH9TBzCqXlUaaBOvWGPHIzQtVb_XnqMvXk8KYn40MCd11AmnmZklG2l2BqJE1tqmOGW7zBC6tomPMI3atPNBY7ysG0EQO34roeGcFcINqFQ7Wjrv0zM17oLUqerMCzEBISPrt7Qxd3I2Unbq_g-zZz9mhhqEf0h3xpAJFRg"
                      />
                      <span className="absolute top-2 left-2 px-space-xs py-0.5 rounded font-caption text-caption bg-surface-container-lowest/90 text-on-surface font-semibold backdrop-blur-sm">
                        Airport Res.
                      </span>
                    </div>
                    <div className="space-y-space-xs min-w-0">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-primary/10 text-primary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                          Active / Listed
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          Ref: EC-AR-182
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface truncate max-w-lg">
                        Executive 3-Bedroom Townhouse in Airport Residential
                      </h2>
                      <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                        <span>3 Beds</span>
                        <span>•</span>
                        <span>3.5 Baths</span>
                        <span>•</span>
                        <span>Swimming Pool</span>
                        <span>•</span>
                        <span>24/7 Manned Security</span>
                      </div>
                      <div className="flex items-center gap-space-md pt-1 font-body-sm text-body-sm">
                        <span className="font-price-display text-price-display text-on-surface">
                          GH₵ 14,000{" "}
                          <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                            / mo
                          </span>
                        </span>
                        <div className="h-4 w-px bg-surface-container-high"></div>
                        <span className="text-on-surface-variant flex items-center gap-1">
                          <span className="material-symbols-outlined text-[1rem]">
                            visibility
                          </span>{" "}
                          512 views
                        </span>
                        <span className="text-on-surface-variant flex items-center gap-1 font-semibold text-primary">
                          <span className="material-symbols-outlined text-[1rem]">
                            chat
                          </span>{" "}
                          9 inquiries
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs sm:gap-space-sm w-full lg:w-auto justify-end pt-space-xs lg:pt-0">
                    <button
                      type="button"
                      onClick={() => onNavigate?.("list-your-property")}
                      className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        edit
                      </span>
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        pause_circle
                      </span>
                      <span className="hidden sm:inline">Pause</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate?.("property-detail")}
                      className="px-space-md py-2 rounded-lg bg-surface-container text-primary hover:bg-surface-container-high text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        open_in_new
                      </span>
                      <span className="hidden sm:inline">View</span>
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg text-error hover:bg-error-container/20 transition-colors"
                      title="Delete listing"
                    >
                      <span className="material-symbols-outlined text-[1.25rem]">
                        delete
                      </span>
                    </button>
                  </div>
                </div>

                {/* Property Listing Card 3 */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md sm:p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col lg:flex-row items-start lg:items-center justify-between gap-space-lg opacity-90">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-md w-full lg:w-auto">
                    <div className="relative w-full sm:w-44 h-32 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        className="w-full h-full object-cover grayscale-[30%]"
                        alt="Osu studio apartment"
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDDKYxZUhUncyMIue1-_JGWcF4MQ_aGjfrTMcNKAxq-3AnB4X2i1CKNUzjGwzmWFPmZ1gFOZ0OkvreqIDhAl_ytXdTvynEdsOYqQGyGsMk78YMF3Wuj_GnUmJS8TeQe9ih-3H5SO2jplT3LKWE9pFzTI-q6lHw1vF1fnx2NewZLK0DbI8K_D03kf0MhfDNF7kOL-_VsWFNrf0x1T0gwfn_Xqnt9mlgnXva-FjncusLvegPenOa59fFkpg"
                      />
                      <span className="absolute top-2 left-2 px-space-xs py-0.5 rounded font-caption text-caption bg-inverse-surface/80 text-inverse-on-surface font-semibold backdrop-blur-sm">
                        Osu
                      </span>
                    </div>
                    <div className="space-y-space-xs min-w-0">
                      <div className="flex items-center gap-space-sm flex-wrap">
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-sm text-label-sm bg-surface-container-high text-tertiary font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-tertiary"></span>
                          Rented / Inactive
                        </span>
                        <span className="font-body-sm text-body-sm text-primary font-medium">
                          Tenant signed until Dec 2025
                        </span>
                      </div>
                      <h2 className="font-headline-sm text-headline-sm text-on-surface truncate max-w-lg">
                        Cozy Studio Flat in Osu (Ringway)
                      </h2>
                      <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                        <span>Studio</span>
                        <span>•</span>
                        <span>1 Bath</span>
                        <span>•</span>
                        <span>Fully Furnished</span>
                        <span>•</span>
                        <span>Fiber Internet</span>
                      </div>
                      <div className="flex items-center gap-space-md pt-1 font-body-sm text-body-sm">
                        <span className="font-price-display text-price-display text-on-surface">
                          GH₵ 4,000{" "}
                          <span className="font-body-sm text-body-sm text-on-surface-variant font-normal">
                            / mo
                          </span>
                        </span>
                        <div className="h-4 w-px bg-surface-container-high"></div>
                        <span className="text-on-surface-variant">
                          Lease: Fixed 12 Months
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-space-xs sm:gap-space-sm w-full lg:w-auto justify-end pt-space-xs lg:pt-0">
                    <button
                      type="button"
                      className="px-space-md py-2 rounded-lg bg-primary hover:bg-primary-container text-on-primary text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        replay
                      </span>
                      <span>Relist Early</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate?.("list-your-property")}
                      className="px-space-md py-2 rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container text-label-md font-label-md transition-colors flex items-center gap-1"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        edit_note
                      </span>
                      <span>Edit Details</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: Embedded Clean Tenant Inquiries & Inbox View */}
            {activeTab === "inbox" && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop bg-surface-container-lowest rounded-xl shadow-md overflow-hidden min-h-[640px]">
                {/* Left Panel: Inquiry Threads */}
                <div className="lg:col-span-4 bg-surface-container-lowest flex flex-col border-r border-surface-container-high/40">
                  {/* Inbox Search & Filter Header */}
                  <div className="p-space-md bg-surface-container-low/50">
                    <div className="flex items-center justify-between mb-space-sm">
                      <span className="font-headline-sm text-headline-sm text-on-surface">
                        Inquiries
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-bold">
                        3 Active
                      </span>
                    </div>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-[1.125rem]">
                        search
                      </span>
                      <input
                        className="w-full bg-surface-container-lowest text-on-surface font-body-sm text-body-sm pl-9 pr-3 py-2 rounded-lg focus:outline-none focus:bg-surface-container-lowest shadow-sm placeholder:text-on-surface-variant/60"
                        placeholder="Search applicant, property..."
                        type="text"
                      />
                    </div>
                  </div>

                  {/* Thread List */}
                  <div className="flex-1 overflow-y-auto divide-y-0">
                    {/* Thread 1: Selected (Kwame Boateng) */}
                    <div
                      onClick={() => setSelectedThread("kb")}
                      className={`p-space-md cursor-pointer transition-all flex gap-space-sm items-start relative ${
                        selectedThread === "kb"
                          ? "bg-surface-container"
                          : "hover:bg-surface-container-low"
                      }`}
                    >
                      {selectedThread === "kb" && (
                        <div className="w-2 absolute left-0 inset-y-0 bg-primary"></div>
                      )}
                      <div className="w-10 h-10 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed font-bold flex items-center justify-center flex-shrink-0">
                        KB
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-label-md text-label-md text-on-surface truncate font-bold">
                            Kwame Boateng
                          </span>
                          <span className="font-caption text-caption text-primary font-bold">
                            15m ago
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-primary font-semibold truncate mb-1">
                          Interested in East Legon 2-Bed
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant line-clamp-1">
                          Hello Abena, I work near Airport and looking to
                          relocate to East Legon...
                        </p>
                        <div className="mt-2 flex items-center gap-space-xs">
                          <span className="px-2 py-0.5 rounded bg-surface-container-highest font-caption text-caption text-on-surface font-medium">
                            Viewing Sat 10 AM
                          </span>
                          <span className="w-2 h-2 rounded-full bg-primary"></span>
                        </div>
                      </div>
                    </div>

                    {/* Thread 2: Sandra Mensah */}
                    <div
                      onClick={() => setSelectedThread("sm")}
                      className={`p-space-md cursor-pointer transition-all flex gap-space-sm items-start ${
                        selectedThread === "sm"
                          ? "bg-surface-container"
                          : "hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container font-bold flex items-center justify-center flex-shrink-0">
                        SM
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                            Sandra Mensah
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            2h ago
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface truncate mb-1">
                          Executive 3-Bed Airport Res.
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant line-clamp-1">
                          Can we schedule a viewing on Saturday? We are a family
                          of four relocating from Takoradi.
                        </p>
                      </div>
                    </div>

                    {/* Thread 3: Dr. Eric Quaye */}
                    <div
                      onClick={() => setSelectedThread("eq")}
                      className={`p-space-md cursor-pointer transition-all flex gap-space-sm items-start ${
                        selectedThread === "eq"
                          ? "bg-surface-container"
                          : "hover:bg-surface-container-low"
                      }`}
                    >
                      <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-bold flex items-center justify-center flex-shrink-0">
                        EQ
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                            Dr. Eric Quaye
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Yesterday
                          </span>
                        </div>
                        <div className="font-body-sm text-body-sm text-on-surface truncate mb-1">
                          East Legon 2-Bedroom Flat
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant line-clamp-1">
                          Is generator fuel cost included in the monthly service
                          charge?
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Panel: Active Conversation */}
                <div className="lg:col-span-8 flex flex-col bg-surface-container-lowest">
                  {/* Conversation Top Bar */}
                  <div className="p-space-md bg-surface-container-low/30 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-surface-container-high/40">
                    <div className="flex items-center gap-space-sm">
                      <div className="w-11 h-11 rounded-full bg-primary-fixed-dim/40 text-on-primary-fixed font-bold flex items-center justify-center">
                        KB
                      </div>
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            Kwame Boateng
                          </span>
                          <span
                            className="material-symbols-outlined text-[1rem] text-primary"
                            title="Verified Tenant Identity"
                          >
                            verified
                          </span>
                        </div>
                        <div className="flex items-center gap-space-sm font-body-sm text-body-sm text-on-surface-variant">
                          <span>+233 24 492 8810</span>
                          <span>•</span>
                          <span className="text-on-surface font-medium">
                            East Legon 2-Bed (GH₵ 6,500/mo)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-space-xs self-end sm:self-center">
                      <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm font-semibold">
                        <span className="material-symbols-outlined text-[1rem]">
                          event_available
                        </span>
                        <span>Requested: Sat 10:00 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Chat Stream Area */}
                  <div className="flex-1 p-space-lg space-y-space-md overflow-y-auto bg-surface/50">
                    <div className="text-center">
                      <span className="px-space-sm py-1 rounded-full font-caption text-caption bg-surface-container text-on-surface-variant">
                        Inquiry submitted today • Verified Ghanaian Tenant
                      </span>
                    </div>

                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-start gap-space-sm max-w-xl ${
                          msg.isOwner ? "justify-end ml-auto" : ""
                        }`}
                      >
                        {!msg.isOwner && (
                          <div className="w-8 h-8 rounded-full bg-surface-container-high text-on-surface font-bold flex items-center justify-center text-[0.75rem] flex-shrink-0">
                            {msg.senderInitial}
                          </div>
                        )}
                        <div
                          className={`p-space-md rounded-2xl shadow-sm space-y-1 ${
                            msg.isOwner
                              ? "bg-primary text-on-primary rounded-tr-sm text-right"
                              : "bg-surface-container-lowest text-on-surface rounded-tl-sm"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-space-md mb-1">
                            <span
                              className={`font-label-sm text-label-sm font-bold ${
                                msg.isOwner
                                  ? "text-on-primary"
                                  : "text-on-surface"
                              }`}
                            >
                              {msg.sender}
                            </span>
                            <span
                              className={`font-caption text-caption ${
                                msg.isOwner
                                  ? "text-on-primary/80"
                                  : "text-on-surface-variant"
                              }`}
                            >
                              {msg.time}
                            </span>
                          </div>
                          <p
                            className={`font-body-md text-body-md leading-relaxed ${
                              msg.isOwner
                                ? "text-on-primary text-left"
                                : "text-on-surface"
                            }`}
                          >
                            {msg.text}
                          </p>
                        </div>
                        {msg.isOwner && (
                          <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary font-bold flex items-center justify-center text-[0.75rem] flex-shrink-0">
                            {msg.senderInitial}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Quick Action & Viewing Confirmation Bar */}
                  <div className="px-space-md py-space-sm bg-surface-container-low/70 flex flex-wrap items-center justify-between gap-space-sm border-t border-surface-container-high/40">
                    <div className="flex items-center gap-space-xs">
                      <button
                        type="button"
                        onClick={() => setViewingConfirmed(!viewingConfirmed)}
                        className={`px-space-sm py-1.5 rounded-lg font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-all ${
                          viewingConfirmed
                            ? "bg-primary-container text-on-primary"
                            : "bg-primary hover:bg-primary-container text-on-primary"
                        }`}
                      >
                        <span className="material-symbols-outlined text-[1rem]">
                          {viewingConfirmed ? "check" : "check_circle"}
                        </span>
                        <span>
                          {viewingConfirmed
                            ? "Viewing Confirmed (Sat 10:00 AM)"
                            : "Confirm Viewing (Sat 10:00 AM)"}
                        </span>
                      </button>
                      <button
                        type="button"
                        className="px-space-sm py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container font-label-sm text-label-sm font-semibold flex items-center gap-1 shadow-sm transition-all"
                      >
                        <span className="material-symbols-outlined text-[1rem] text-primary">
                          chat
                        </span>
                        <span>Send WhatsApp Invite</span>
                      </button>
                    </div>
                    <span className="font-caption text-caption text-on-surface-variant flex items-center gap-1">
                      <span className="material-symbols-outlined text-[0.875rem] text-primary">
                        shield
                      </span>
                      Ecoshel Escrow &amp; Tenancy Protected
                    </span>
                  </div>

                  {/* Chat Input Field */}
                  <div className="p-space-md bg-surface-container-lowest flex items-end gap-space-sm border-t border-surface-container-high/40">
                    <div className="flex-1 bg-surface-container-low rounded-xl p-space-xs flex flex-col focus-within:bg-surface-container">
                      <textarea
                        className="w-full bg-transparent text-on-surface font-body-md text-body-md p-space-xs resize-none focus:outline-none placeholder:text-on-surface-variant/60"
                        placeholder="Type your response to Kwame... (Rental terms, tenancy schedule)"
                        rows={2}
                        value={messageInput}
                        onChange={(e) => setMessageInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      ></textarea>
                      <div className="flex items-center justify-between px-space-xs pt-1 text-on-surface-variant">
                        <div className="flex items-center gap-space-xs">
                          <button
                            type="button"
                            className="p-1 hover:text-on-surface rounded transition-colors"
                            title="Attach Tenancy Draft"
                          >
                            <span className="material-symbols-outlined text-[1.125rem]">
                              attach_file
                            </span>
                          </button>
                          <button
                            type="button"
                            className="p-1 hover:text-on-surface rounded transition-colors"
                            title="Insert Standard Rules"
                          >
                            <span className="material-symbols-outlined text-[1.125rem]">
                              quickreply
                            </span>
                          </button>
                        </div>
                        <span className="font-caption text-caption">
                          Shift + Enter for new line
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleSendMessage}
                      className="h-12 px-space-md rounded-xl bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md font-bold flex items-center gap-1 shadow-md transition-all self-end"
                    >
                      <span>Send Message</span>
                      <span className="material-symbols-outlined text-[1.125rem]">
                        send
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Owner Helper Banner */}
            <div className="mt-space-2xl bg-surface-container-low rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
              <div className="flex items-center gap-space-md">
                <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-[1.5rem]">
                    verified_user
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Standard Ghana Tenancy Contracts
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    All tenant matches come with optional Ecoshel automated rent
                    disbursement and free legal rental templates compliant with
                    Ghana Rent Control laws.
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="px-space-md py-2 rounded-lg bg-surface-container-lowest text-primary font-label-md text-label-md font-semibold hover:bg-surface-container transition-all flex-shrink-0 shadow-sm"
              >
                Learn about Escrow Protection
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
      <MobileNav activePath="settings" onNavigate={onNavigate} />
    </div>
  );
}

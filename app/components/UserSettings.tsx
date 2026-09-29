"use client";

import React, { useEffect, useRef, useState } from "react";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export interface UserSettingsProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
  onSignOut?: () => void;
  onNavigate?: (path: string) => void;
}

export default function UserSettings({
  isAuthenticated = false,
  userRole = "tenant",
  onSignOut,
  onNavigate,
}: UserSettingsProps) {
  const [activeNav, setActiveNav] = useState<
    | "profile"
    | "verification"
    | "payouts"
    | "communication"
    | "privacy"
    | "appearance"
  >("profile");

  // Profile form state
  const [accountRole, setAccountRole] = useState<"landlord" | "tenant">(
    "landlord",
  );
  const [fullName, setFullName] = useState("Abena Mensah");
  const [email, setEmail] = useState("abena.mensah@gmail.com");
  const [phone, setPhone] = useState("+233 24 123 4567");
  const [neighborhood, setNeighborhood] = useState("East Legon, Accra");

  // Notifications toggles
  const [whatsappAlerts, setWhatsappAlerts] = useState(true);
  const [emailReceipts, setEmailReceipts] = useState(true);
  const [marketInsights, setMarketInsights] = useState(false);

  // Privacy toggles
  const [allowWhatsappDirect, setAllowWhatsappDirect] = useState(true);
  const [hidePhoneUntilConfirmed, setHidePhoneUntilConfirmed] = useState(false);
  const [displayVerifiedBadge, setDisplayVerifiedBadge] = useState(true);

  // Payout method
  const [selectedPayout, setSelectedPayout] = useState("mtn");

  const [themePreference, setThemePreference] = useState<
    "light" | "dark" | "system"
  >("light");
  const [highContrast, setHighContrast] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoError, setPhotoError] = useState("");
  const photoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    return () => {
      if (profilePhoto) URL.revokeObjectURL(profilePhoto);
    };
  }, [profilePhoto]);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/") || file.size > 4 * 1024 * 1024) {
      setPhotoError("Choose a JPG, PNG, or WEBP image under 4MB.");
      return;
    }

    setPhotoError("");
    setProfilePhoto(URL.createObjectURL(file));
  };

  const removePhoto = () => {
    setPhotoError("");
    setProfilePhoto(null);
    if (photoInputRef.current) photoInputRef.current.value = "";
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header
        activePath="settings"
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onSignOut={onSignOut}
        onNavigate={onNavigate}
      />

      <main className="flex-1 w-full pt-16 bg-surface">
        <div className="flex flex-col w-full">
          {/* Top Banner / Heading */}
          <div className="w-full bg-surface-container-low py-space-xl border-b border-surface-container-high/40">
            <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
              <div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Account &amp; Host Settings
                </h1>
                <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                  Manage your verified Accra landlord identity, payout channels,
                  and tenant inquiry visibility.
                </p>
              </div>
              <div className="flex items-center gap-space-xs bg-surface-container-lowest px-space-md py-2 rounded-xl shadow-sm self-start sm:self-auto">
                <span
                  className="material-symbols-outlined text-primary text-[1.25rem]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="font-label-md text-label-md text-on-surface font-semibold">
                  Ghana Card Verified
                </span>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto w-full px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter-desktop items-start">
              {/* Settings Navigation Sidebar */}
              <aside className="lg:col-span-3 flex flex-col gap-space-md">
                <div className="bg-surface-container-lowest rounded-xl p-space-xs shadow-sm flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setActiveNav("profile")}
                    className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                      activeNav === "profile"
                        ? "bg-surface-container-low text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        person
                      </span>
                      <span>Personal Profile</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNav("verification")}
                    className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                      activeNav === "verification"
                        ? "bg-surface-container-low text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        verified_user
                      </span>
                      <span>Ghana Card &amp; Trust</span>
                    </span>
                    <span className="px-space-xs py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-caption text-caption font-semibold">
                      Verified
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNav("payouts")}
                    className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                      activeNav === "payouts"
                        ? "bg-surface-container-low text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        account_balance_wallet
                      </span>
                      <span>Payout Accounts</span>
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNav("communication")}
                    className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                      activeNav === "communication"
                        ? "bg-surface-container-low text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        chat
                      </span>
                      <span>Communication</span>
                    </span>
                    <span className="px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-caption text-caption">
                      Active
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setActiveNav("privacy")}
                    className={`w-full flex items-center justify-between px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors text-left ${
                      activeNav === "privacy"
                        ? "bg-surface-container-low text-primary font-bold"
                        : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="flex items-center gap-space-sm">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        lock
                      </span>
                      <span>Privacy &amp; Contact</span>
                    </span>
                  </button>
                </div>

                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col gap-space-sm">
                  <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm font-semibold">
                    <span className="material-symbols-outlined text-[1.125rem]">
                      help
                    </span>
                    <span>Accra Host Hotline</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Need direct help updating legal property titles, GH₵ bank
                    payouts, or rent deposits?
                  </p>
                  <a
                    className="inline-flex items-center gap-space-xs font-label-sm text-label-sm text-primary hover:text-primary-container transition-colors"
                    href="https://wa.me/233240000000"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Message Support on WhatsApp</span>
                    <span className="material-symbols-outlined text-[1rem]">
                      arrow_forward
                    </span>
                  </a>
                </div>
              </aside>

              {/* Main Settings Sections Column */}
              <div className="lg:col-span-9 flex flex-col gap-space-xl">
                {/* Section A: Personal Profile */}
                {activeNav === "profile" && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          Personal Profile
                        </h2>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Your public details seen by prospective tenants and
                          verified landlords.
                        </p>
                      </div>
                      <div className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded bg-surface-container-low text-primary font-label-sm text-label-sm self-start">
                        <span className="material-symbols-outlined text-[1rem]">
                          schedule
                        </span>
                        <span>Avg. Response: 18 mins</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-space-lg bg-surface-container-low p-space-md rounded-xl">
                      <div className="relative">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          alt="Abena Mensah"
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover shadow-sm"
                          src={
                            profilePhoto ??
                            "https://lh3.googleusercontent.com/aida/AEtjO1VnS1NKCpDkTGtZbrScJZgLN6ld2DTIu1X8djpwXf_xHqLcPEDmm91pA7fjn0UEVKSVAea2XvthpY4uiIE4ijSeQNRa89ZELRvDpLenfWJ-lemlsbS7d8fAj9V33W3_jZAIYScm5QH_9xJ-4Yr-k7cTQwzF4zhBq_ABFAI07kSbXjYz_mnSVb3n6yx0v394NnR3saplfni1aLXb_qR-a55Ovyt9Xqk9PWm-8z5Pq5fyiCRjh5sPJLNgJkJV"
                          }
                        />
                        <button
                          type="button"
                          aria-label="Change profile photo"
                          className="absolute bottom-0 right-0 p-1 bg-primary text-on-primary rounded-full shadow-sm hover:bg-primary-container transition-colors"
                          onClick={() => photoInputRef.current?.click()}
                        >
                          <span className="material-symbols-outlined text-[0.875rem] block">
                            photo_camera
                          </span>
                        </button>
                      </div>
                      <div className="flex flex-col gap-space-xs flex-1">
                        <div className="flex flex-wrap items-center gap-space-sm">
                          <h3 className="font-headline-sm text-headline-sm text-on-surface">
                            {fullName}
                          </h3>
                          <span className="px-space-xs py-0.5 rounded bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm">
                            Primary Host
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          JPG, PNG or WEBP. Maximum file size 4MB.
                        </p>
                        <div className="flex items-center gap-space-sm mt-space-xs">
                          <button
                            type="button"
                            className="px-space-md py-space-xs rounded-lg bg-surface-container-lowest hover:bg-surface-container-high text-on-surface font-label-sm text-label-sm transition-colors shadow-sm"
                            onClick={() => photoInputRef.current?.click()}
                          >
                            Change Photo
                          </button>
                          <button
                            type="button"
                            className="px-space-md py-space-xs rounded-lg text-error hover:bg-error-container/30 font-label-sm text-label-sm transition-colors"
                            onClick={removePhoto}
                          >
                            Remove
                          </button>
                        </div>
                        <input
                          ref={photoInputRef}
                          accept="image/jpeg,image/png,image/webp"
                          className="sr-only"
                          onChange={handlePhotoChange}
                          type="file"
                        />
                        {photoError && (
                          <p className="font-caption text-caption text-error mt-space-xs">
                            {photoError}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        Account Persona
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm bg-surface-container-low p-1.5 rounded-xl">
                        <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-lowest shadow-sm cursor-pointer transition-all">
                          <input
                            checked={accountRole === "landlord"}
                            onChange={() => setAccountRole("landlord")}
                            className="accent-primary h-4 w-4"
                            name="account_role"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Landlord / Property Owner
                            </span>
                            <span className="font-caption text-caption text-on-surface-variant">
                              Listing apartments &amp; houses in Greater Accra
                            </span>
                          </div>
                        </label>
                        <label className="flex items-center gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-lowest/60 cursor-pointer transition-all">
                          <input
                            checked={accountRole === "tenant"}
                            onChange={() => setAccountRole("tenant")}
                            className="accent-primary h-4 w-4"
                            name="account_role"
                            type="radio"
                          />
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Tenant / Renter
                            </span>
                            <span className="font-caption text-caption text-on-surface-variant">
                              Looking for verified long-term or short stays
                            </span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-gutter-desktop">
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Full Legal Name
                        </label>
                        <div className="relative flex items-center">
                          <input
                            className="w-full px-space-md py-space-sm bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-low shadow-sm border border-outline-variant/30"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                          <span className="absolute right-3 material-symbols-outlined text-on-surface-variant text-[1.25rem]">
                            badge
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Must match name printed on your Ghana Card
                        </span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Email Address
                        </label>
                        <div className="relative flex items-center">
                          <input
                            className="w-full pl-space-md pr-24 py-space-sm bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-low shadow-sm border border-outline-variant/30"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span className="absolute right-3 inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-surface-container-low text-primary font-label-sm text-label-sm">
                            <span
                              className="material-symbols-outlined text-[0.875rem]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <span>Verified</span>
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Primary contact for tenancy receipts &amp; legal
                          escrow
                        </span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Ghanaian Mobile Number
                        </label>
                        <div className="relative flex items-center">
                          <span className="absolute left-3 font-label-md text-label-md text-on-surface-variant">
                            🇬🇭
                          </span>
                          <input
                            className="w-full pl-10 pr-28 py-space-sm bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-low shadow-sm border border-outline-variant/30"
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                          />
                          <span className="absolute right-3 inline-flex items-center gap-1 px-space-xs py-0.5 rounded bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                            <span className="material-symbols-outlined text-[0.875rem]">
                              chat
                            </span>
                            <span>WhatsApp</span>
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Direct fast response connection for Accra tenants
                        </span>
                      </div>
                      <div className="flex flex-col gap-space-xs">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Primary Residential Neighborhood
                        </label>
                        <div className="relative flex items-center">
                          <select
                            className="w-full px-space-md py-space-sm bg-surface-container-lowest rounded-lg font-body-md text-body-md text-on-surface focus:outline-none focus:bg-surface-container-low shadow-sm appearance-none cursor-pointer border border-outline-variant/30"
                            value={neighborhood}
                            onChange={(e) => setNeighborhood(e.target.value)}
                          >
                            <option>East Legon, Accra</option>
                            <option>Airport Residential Area</option>
                            <option>Cantonments</option>
                            <option>Osu / Ringway Estate</option>
                            <option>Labone</option>
                            <option>Dzorwulu</option>
                            <option>Spintex Road</option>
                            <option>Roman Ridge</option>
                          </select>
                          <span className="absolute right-3 material-symbols-outlined text-on-surface-variant text-[1.25rem] pointer-events-none">
                            expand_more
                          </span>
                        </div>
                        <span className="font-caption text-caption text-on-surface-variant">
                          Calculates regional viewing schedules
                        </span>
                      </div>
                    </div>
                  </section>
                )}

                {/* Appearance & Theme is controlled from the navbar. */}
                {false && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-sm">
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <h2 className="font-headline-md text-headline-md text-on-surface">
                            Appearance &amp; Theme
                          </h2>
                          <span className="material-symbols-outlined text-primary text-[1.25rem]">
                            palette
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                          Customize your interface display preference across web
                          and mobile devices.
                        </p>
                      </div>
                      <span className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface-variant font-label-sm text-label-sm self-start sm:self-auto">
                        Current: Coastal Slate Light
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                      <label
                        className={`flex flex-col gap-space-sm p-space-md rounded-xl cursor-pointer transition-all relative ${
                          themePreference === "light"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border border-outline-variant/30 hover:bg-surface-container-low/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[1.125rem] text-primary">
                              light_mode
                            </span>
                            Light Mode
                          </span>
                          {themePreference === "light" ? (
                            <span
                              className="material-symbols-outlined text-primary text-[1.25rem]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-outline-variant"></span>
                          )}
                        </div>
                        <div className="w-full h-20 rounded-lg bg-surface-container-lowest border border-outline-variant/40 p-2 flex flex-col justify-between shadow-sm overflow-hidden">
                          <div className="flex items-center justify-between pb-1 border-b border-surface-container">
                            <div className="h-2 w-12 bg-primary rounded-full"></div>
                            <div className="h-2 w-4 bg-surface-container-highest rounded-full"></div>
                          </div>
                          <div className="space-y-1 py-1">
                            <div className="h-2 w-3/4 bg-surface-container-high rounded-full"></div>
                            <div className="h-2 w-1/2 bg-surface-container rounded-full"></div>
                          </div>
                          <div className="flex gap-1">
                            <div className="h-3 w-8 bg-primary rounded"></div>
                            <div className="h-3 w-6 bg-surface-container rounded"></div>
                          </div>
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Clean daytime contrast, default Ecoshel calm teal and
                          crisp white surface.
                        </p>
                        <input
                          className="sr-only"
                          name="theme_preference"
                          type="radio"
                          checked={themePreference === "light"}
                          onChange={() => setThemePreference("light")}
                        />
                      </label>

                      <label
                        className={`flex flex-col gap-space-sm p-space-md rounded-xl cursor-pointer transition-all relative ${
                          themePreference === "dark"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border border-outline-variant/30 hover:bg-surface-container-low/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[1.125rem] text-on-surface-variant">
                              dark_mode
                            </span>
                            Dark Mode
                          </span>
                          {themePreference === "dark" ? (
                            <span
                              className="material-symbols-outlined text-primary text-[1.25rem]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-outline-variant"></span>
                          )}
                        </div>
                        <div className="w-full h-20 rounded-lg bg-[#0b1c30] border border-outline-variant/20 p-2 flex flex-col justify-between shadow-sm overflow-hidden">
                          <div className="flex items-center justify-between pb-1 border-b border-inverse-surface">
                            <div className="h-2 w-12 bg-primary-fixed rounded-full"></div>
                            <div className="h-2 w-4 bg-inverse-surface rounded-full"></div>
                          </div>
                          <div className="space-y-1 py-1">
                            <div className="h-2 w-3/4 bg-inverse-surface rounded-full"></div>
                            <div className="h-2 w-1/2 bg-on-tertiary-fixed rounded-full"></div>
                          </div>
                          <div className="flex gap-1">
                            <div className="h-3 w-8 bg-primary rounded"></div>
                            <div className="h-3 w-6 bg-inverse-surface rounded"></div>
                          </div>
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant">
                          High contrast deep slate tones for night browsing and
                          OLED battery efficiency.
                        </p>
                        <input
                          className="sr-only"
                          name="theme_preference"
                          type="radio"
                          checked={themePreference === "dark"}
                          onChange={() => setThemePreference("dark")}
                        />
                      </label>

                      <label
                        className={`flex flex-col gap-space-sm p-space-md rounded-xl cursor-pointer transition-all relative ${
                          themePreference === "system"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border border-outline-variant/30 hover:bg-surface-container-low/60"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-semibold flex items-center gap-space-xs">
                            <span className="material-symbols-outlined text-[1.125rem] text-on-surface-variant">
                              settings_brightness
                            </span>
                            System Default
                          </span>
                          {themePreference === "system" ? (
                            <span
                              className="material-symbols-outlined text-primary text-[1.25rem]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                          ) : (
                            <span className="w-4 h-4 rounded-full border border-outline-variant"></span>
                          )}
                        </div>
                        <div className="w-full h-20 rounded-lg border border-outline-variant/30 flex overflow-hidden shadow-sm">
                          <div className="w-1/2 h-full bg-surface-container-lowest p-2 flex flex-col justify-between border-r border-outline-variant/20">
                            <div className="h-2 w-8 bg-primary rounded-full"></div>
                            <div className="h-2 w-full bg-surface-container rounded-full"></div>
                            <div className="h-3 w-6 bg-primary rounded"></div>
                          </div>
                          <div className="w-1/2 h-full bg-[#0b1c30] p-2 flex flex-col justify-between">
                            <div className="h-2 w-8 bg-primary-fixed rounded-full"></div>
                            <div className="h-2 w-full bg-inverse-surface rounded-full"></div>
                            <div className="h-3 w-6 bg-primary rounded"></div>
                          </div>
                        </div>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Automatically synchronizes with your device&apos;s
                          operating system dark/light schedule.
                        </p>
                        <input
                          className="sr-only"
                          name="theme_preference"
                          type="radio"
                          checked={themePreference === "system"}
                          onChange={() => setThemePreference("system")}
                        />
                      </label>
                    </div>

                    <div className="flex items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low">
                      <div className="flex items-start gap-space-md">
                        <div className="p-space-xs rounded-lg bg-surface-container text-on-surface mt-0.5">
                          <span className="material-symbols-outlined text-[1.25rem]">
                            contrast
                          </span>
                        </div>
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            High Contrast &amp; Reduced Transparency
                          </span>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            Optimizes readability for bright sunlight viewing
                            and improves device rendering speed.
                          </p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer shrink-0">
                        <input
                          checked={highContrast}
                          onChange={(e) => setHighContrast(e.target.checked)}
                          className="sr-only peer"
                          type="checkbox"
                        />
                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-on-primary after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                      </label>
                    </div>
                  </section>
                )}

                {/* Section B: Ghana Card & Trust Verification */}
                {activeNav === "verification" && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
                      <div>
                        <div className="flex items-center gap-space-xs">
                          <h2 className="font-headline-md text-headline-md text-on-surface">
                            Ghana Card &amp; Identity Verification
                          </h2>
                          <span
                            className="material-symbols-outlined text-primary text-[1.375rem]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          Essential National Identification Authority check
                          protecting tenants against unauthorized agent fraud.
                        </p>
                      </div>
                      <span className="px-space-sm py-space-xs rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm self-start sm:self-auto">
                        NIA API Connected
                      </span>
                    </div>

                    <div className="bg-linear-to-br from-surface-container-low via-surface-container to-surface-container-low p-space-lg rounded-xl relative overflow-hidden">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md relative z-10">
                        <div className="flex items-start gap-space-md">
                          <div className="p-space-sm rounded-xl bg-primary text-on-primary shadow-sm">
                            <span className="material-symbols-outlined text-[2rem]">
                              verified_user
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <div className="flex items-center gap-space-xs">
                              <span className="font-headline-sm text-headline-sm text-on-surface">
                                Verified Ghana Card ID
                              </span>
                              <span
                                className="material-symbols-outlined text-primary text-[1.125rem]"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >
                                check_circle
                              </span>
                            </div>
                            <div className="flex items-center gap-space-sm mt-0.5">
                              <span className="font-label-md text-label-md font-mono text-on-surface font-semibold tracking-wider">
                                GHA-724910284-3
                              </span>
                              <span className="font-caption text-caption text-on-surface-variant bg-surface-container-lowest px-space-xs py-0.5 rounded shadow-sm">
                                Encrypted Record
                              </span>
                            </div>
                            <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-xs">
                              Verified on 12 Jan 2024 via National
                              Identification Authority (Accra Head Office
                              database).
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:items-end gap-space-xs bg-surface-container-lowest p-space-md rounded-xl shadow-sm">
                          <span className="font-caption text-caption uppercase text-on-surface-variant font-bold tracking-wider">
                            Host Safety Rating
                          </span>
                          <div className="flex items-center gap-space-xs">
                            <span className="font-headline-md text-headline-md text-primary font-bold">
                              Level 2
                            </span>
                            <span className="font-label-sm text-label-sm text-on-surface">
                              Verified Host
                            </span>
                          </div>
                          <span className="font-caption text-caption text-primary font-medium flex items-center gap-1">
                            <span className="material-symbols-outlined text-[0.875rem]">
                              lock
                            </span>
                            Zero Agent Scam Safeguard
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mt-space-lg pt-space-md bg-surface-container-lowest/80 p-space-md rounded-lg backdrop-blur-sm border border-surface-container-high/30">
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-primary text-[1.125rem]">
                            fact_check
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            Biometric Matched
                          </span>
                        </div>
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-primary text-[1.125rem]">
                            real_estate_agent
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            Lands Commission Cleared
                          </span>
                        </div>
                        <div className="flex items-center gap-space-xs">
                          <span className="material-symbols-outlined text-primary text-[1.125rem]">
                            payments
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface font-medium">
                            GH₵ Escrow Eligible
                          </span>
                        </div>
                      </div>
                    </div>
                  </section>
                )}

                {/* Section C: Payout & Bank Account Setup */}
                {activeNav === "payouts" && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Rent Disbursement &amp; Payout Channels
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Direct disbursement account for tenant rent payments and
                        lease advances in Cedis.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                      <label
                        className={`p-space-md rounded-xl cursor-pointer flex flex-col justify-between gap-space-sm transition-all border ${
                          selectedPayout === "mtn"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border-outline-variant/30 hover:bg-surface-container-low/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            MTN Mobile Money
                          </span>
                          <span className="font-caption text-caption text-primary font-bold">
                            Default
                          </span>
                        </div>
                        <div>
                          <span className="font-body-sm text-body-sm text-on-surface block font-mono">
                            024 123 4567
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Abena Mensah (Verified)
                          </span>
                        </div>
                        <input
                          className="sr-only"
                          name="payout_channel"
                          type="radio"
                          checked={selectedPayout === "mtn"}
                          onChange={() => setSelectedPayout("mtn")}
                        />
                      </label>

                      <label
                        className={`p-space-md rounded-xl cursor-pointer flex flex-col justify-between gap-space-sm transition-all border ${
                          selectedPayout === "telecel"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border-outline-variant/30 hover:bg-surface-container-low/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            Telecel Cash
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Secondary
                          </span>
                        </div>
                        <div>
                          <span className="font-body-sm text-body-sm text-on-surface block font-mono">
                            020 987 6543
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Abena Mensah
                          </span>
                        </div>
                        <input
                          className="sr-only"
                          name="payout_channel"
                          type="radio"
                          checked={selectedPayout === "telecel"}
                          onChange={() => setSelectedPayout("telecel")}
                        />
                      </label>

                      <label
                        className={`p-space-md rounded-xl cursor-pointer flex flex-col justify-between gap-space-sm transition-all border ${
                          selectedPayout === "bank"
                            ? "border-2 border-primary bg-surface-container-low"
                            : "border-outline-variant/30 hover:bg-surface-container-low/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-label-md text-label-md text-on-surface font-bold">
                            Ecobank Ghana
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Direct ACH
                          </span>
                        </div>
                        <div>
                          <span className="font-body-sm text-body-sm text-on-surface block font-mono">
                            •••• 4892
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            Airport Branch
                          </span>
                        </div>
                        <input
                          className="sr-only"
                          name="payout_channel"
                          type="radio"
                          checked={selectedPayout === "bank"}
                          onChange={() => setSelectedPayout("bank")}
                        />
                      </label>
                    </div>
                  </section>
                )}

                {/* Section D: Notifications & Communication */}
                {activeNav === "communication" && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Notifications &amp; Communication Channels
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Choose how you receive rental inquiries, viewing alerts,
                        and market rent shifts.
                      </p>
                    </div>

                    <div className="flex flex-col gap-space-sm">
                      {/* Item 1 */}
                      <div className="flex items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-start gap-space-md">
                          <div className="p-space-xs rounded-lg bg-surface-container text-on-surface mt-0.5">
                            <span className="material-symbols-outlined text-[1.25rem]">
                              sms
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Instant WhatsApp notifications for new tenant
                              inquiries
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Receive ping directly on your verified Ghanaian
                              mobile number (+233 24 123 4567).
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            checked={whatsappAlerts}
                            onChange={(e) =>
                              setWhatsappAlerts(e.target.checked)
                            }
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-on-primary after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>

                      {/* Item 2 */}
                      <div className="flex items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-start gap-space-md">
                          <div className="p-space-xs rounded-lg bg-surface-container text-on-surface mt-0.5">
                            <span className="material-symbols-outlined text-[1.25rem]">
                              receipt_long
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Email receipts for tenancy escrow deposits
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Instant PDF receipts for all Ghana Cedi (GH₵) rent
                              payments, deposits, and service fees.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            checked={emailReceipts}
                            onChange={(e) => setEmailReceipts(e.target.checked)}
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-on-primary after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>

                      {/* Item 3 */}
                      <div className="flex items-center justify-between gap-space-md p-space-md rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors">
                        <div className="flex items-start gap-space-md">
                          <div className="p-space-xs rounded-lg bg-surface-container text-on-surface mt-0.5">
                            <span className="material-symbols-outlined text-[1.25rem]">
                              trending_up
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <span className="font-label-md text-label-md text-on-surface font-semibold">
                              Weekly Greater Accra rental market insights
                            </span>
                            <p className="font-body-sm text-body-sm text-on-surface-variant">
                              Neighborhood trends (East Legon, Airport,
                              Cantonments), square-meter yield, and tenant price
                              shifts.
                            </p>
                          </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer shrink-0">
                          <input
                            checked={marketInsights}
                            onChange={(e) =>
                              setMarketInsights(e.target.checked)
                            }
                            className="sr-only peer"
                            type="checkbox"
                          />
                          <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-surface peer-checked:bg-primary after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-on-primary after:border-surface after:border after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                        </label>
                      </div>
                    </div>
                  </section>
                )}

                {/* Section E: Privacy & Direct Contact Visibility */}
                {activeNav === "privacy" && (
                  <section className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-xl shadow-sm flex flex-col gap-space-lg">
                    <div>
                      <h2 className="font-headline-md text-headline-md text-on-surface">
                        Privacy &amp; Direct Contact Visibility
                      </h2>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">
                        Control who can reach out to you directly and how your
                        phone details appear to renters.
                      </p>
                    </div>
                    <div className="flex flex-col gap-space-sm bg-surface-container-low p-space-md rounded-xl">
                      <label className="flex items-start gap-space-sm cursor-pointer p-space-xs">
                        <input
                          checked={allowWhatsappDirect}
                          onChange={(e) =>
                            setAllowWhatsappDirect(e.target.checked)
                          }
                          className="mt-1 accent-primary h-4 w-4 rounded"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Allow direct WhatsApp contact from verified tenants
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Only tenants with a verified Ghana Card can start a
                            conversation via WhatsApp link.
                          </span>
                        </div>
                      </label>
                      <label className="flex items-start gap-space-sm cursor-pointer p-space-xs">
                        <input
                          checked={hidePhoneUntilConfirmed}
                          onChange={(e) =>
                            setHidePhoneUntilConfirmed(e.target.checked)
                          }
                          className="mt-1 accent-primary h-4 w-4 rounded"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Hide phone number until viewing request is confirmed
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Prevents unverified agency cold calls; requires you
                            to accept a preliminary viewing date first.
                          </span>
                        </div>
                      </label>
                      <label className="flex items-start gap-space-sm cursor-pointer p-space-xs">
                        <input
                          checked={displayVerifiedBadge}
                          onChange={(e) =>
                            setDisplayVerifiedBadge(e.target.checked)
                          }
                          className="mt-1 accent-primary h-4 w-4 rounded"
                          type="checkbox"
                        />
                        <div className="flex flex-col">
                          <span className="font-label-md text-label-md text-on-surface font-semibold">
                            Publicly display Landlord Verification Badge
                          </span>
                          <span className="font-body-sm text-body-sm text-on-surface-variant">
                            Boosts tenant booking inquiries by up to 3.4x
                            according to Accra rental safety reports.
                          </span>
                        </div>
                      </label>
                    </div>
                  </section>
                )}

                {/* Action Bar */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container-high/40">
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
                    <span
                      className="material-symbols-outlined text-[1.125rem] text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      cloud_done
                    </span>
                    <span>
                      All updates sync with your Ghana Card registry profile
                    </span>
                  </div>
                  <div className="flex items-center gap-space-sm w-full sm:w-auto justify-end">
                    <button
                      type="button"
                      className="px-space-lg py-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors w-1/2 sm:w-auto text-center"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-space-lg py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-all shadow-sm flex items-center justify-center gap-space-xs w-1/2 sm:w-auto"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        check
                      </span>
                      <span>
                        {savedSuccess ? "Saved Successfully!" : "Save Changes"}
                      </span>
                    </button>
                  </div>
                </div>

                {/* Danger Zone */}
                <div className="bg-surface-container-lowest rounded-xl p-space-md md:p-space-lg shadow-sm flex flex-col gap-space-md border border-error/20">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-md text-label-md text-error font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[1.125rem]">
                          warning
                        </span>
                        <span>Deactivate or Delete Ecoshel Account</span>
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                        Permanently delist your active Accra rental homes and
                        archive verified escrow transaction logs.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="px-space-md py-space-xs rounded-lg text-error hover:bg-error-container/30 font-label-sm text-label-sm transition-colors whitespace-nowrap self-start sm:self-center"
                    >
                      Manage Account Status
                    </button>
                  </div>

                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => onSignOut?.()}
                      className="flex items-center gap-2 px-space-md py-space-xs rounded-lg border border-error/20 bg-error-container/10 text-error hover:bg-error-container/20 font-label-sm text-label-sm transition-colors"
                    >
                      <span className="material-symbols-outlined text-[1.125rem]">
                        logout
                      </span>
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
      <MobileNav activePath="settings" onNavigate={onNavigate} />
    </div>
  );
}

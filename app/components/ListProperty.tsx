"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import type { MapPoint } from "./MapLocationPicker";

const MapLocationPicker = dynamic(() => import("./MapLocationPicker"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full min-h-112 items-center justify-center bg-surface-container-low text-on-surface-variant">
      Loading Ghana map...
    </div>
  ),
});

export interface ListPropertyProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
  onNavigate?: (path: string) => void;
  onSubmitSuccess?: (location: MapPoint & { gpsAddress: string }) => void;
}

export default function ListProperty({
  isAuthenticated = false,
  userRole = "tenant",
  onNavigate,
  onSubmitSuccess,
}: ListPropertyProps) {
  const [title, setTitle] = useState(
    "Executive 2-Bedroom Serviced Apartment in Airport Residential",
  );
  const [rentalType, setRentalType] = useState<
    "entire" | "room" | "shared" | "house"
  >("entire");
  const [bedrooms, setBedrooms] = useState<string>("2");
  const [bathrooms, setBathrooms] = useState<string>("2");
  const [neighborhood, setNeighborhood] = useState("airport-residential");
  const [gpsAddress, setGpsAddress] = useState("GA-183-4920");
  const [mapLocation, setMapLocation] = useState<MapPoint>({
    latitude: 5.6037,
    longitude: -0.187,
  });
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [landmark, setLandmark] = useState(
    "Off Senchi Street, 2 minutes walk from Association International School",
  );
  const [monthlyRent, setMonthlyRent] = useState(9500);
  const [securityDeposit, setSecurityDeposit] = useState(5000);
  const [availableDate, setAvailableDate] = useState("2025-04-01");
  const [advanceTerms, setAdvanceTerms] = useState<Set<string>>(
    new Set(["6m", "1y"]),
  );
  const [amenities, setAmenities] = useState<Set<string>>(
    new Set(["gen", "polytank", "meter", "ac", "gated", "security", "parking"]),
  );
  const [description, setDescription] = useState(
    "Newly renovated and tastefully fitted 2-bedroom self-contained apartment in a quiet residential cul-de-sac in Airport Residential Area. High ceilings, pristine cross-ventilation, and dedicated standby diesel generator ensuring uninterrupted lifestyle. Ideal for working professionals or small expatriate families seeking proximity to the airport and Kotoka business district.",
  );

  const [photos, setPhotos] = useState([
    {
      id: "1",
      title: "Living Room Area",
      size: "2.4 MB",
      isCover: true,
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCLCfEvLv0iKhOPqdjmm20oS_AElk-4sxb9njt2m_cm_3ffjXJifOMpx5jf5LWOdKgaF45DnbPTrUMj8mj6YXxhEejlNZZwViCeudAoG2-Ew_jbymKG7jpftLzdVc5kMhtzkmB4DlvobyY_9y3OLwMY4sE02-vm--uswaR5njIv0le_e21OpKKZbM-UNhWvS5-9FRPOw6jvOrsomomLf0J9YKxasL4fehNrCy_HGxKKFGYhmGU9hb3zig",
    },
    {
      id: "2",
      title: "Compound & Gate",
      size: "3.1 MB",
      isCover: false,
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBFz9f59_U1-a4K9XskfJcoGuFTn7X23cbFOTQoh95E0loxUV1QiOyTnh14AVkO5AMk3Mk0ka938JlvJQ7lQwl72hZYCgobyds0J2e9EGNYFzPBMDGiY2qdOb1OydgIOi8aysNZ0xdGG5RjfLrY5DAL2r_r9PH2MMnYDj5TjfZy-a7u2ZTT0wVymPO8oi8wjlHbRFDZDlKJebwbRs5pR0tRe_gQemVdxU27GKRVbjUbxw8Z6fm2y4NoDA",
    },
    {
      id: "3",
      title: "Master Bedroom",
      size: "1.9 MB",
      isCover: false,
      imgUrl:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBwQMPVFWP_u-56lOODQYfi_u7X2y2t3OmL6x8URv10F6BIGhv_QQPgm9t5_n5gjtOd0cWMw20DaDmZ4VmvLq71TnoN-mkwhAy3UzpcNR3xYSv-Fe0S2-_N4hOy6V-1iUR8S0rQD4uRbN8xbM73NNJcsB_5rYAaduWtkZHcQLJjXX0MZXQbB-ApVJFFiuxBQf2WPo1IIK8m042GxLQYe0TAc6SDDEo-uQCPpA0FjsaYXCkTAU5lKwxLNw",
    },
  ]);

  const toggleAdvanceTerm = (term: string) => {
    setAdvanceTerms((prev) => {
      const next = new Set(prev);
      if (next.has(term)) next.delete(term);
      else next.add(term);
      return next;
    });
  };

  const toggleAmenity = (key: string) => {
    setAmenities((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const removePhoto = (id: string) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmitSuccess) onSubmitSuccess({ ...mapLocation, gpsAddress });
    else if (onNavigate) onNavigate("owner-dashboard");
  };

  return (
    <div className="min-h-full bg-surface xt-on-surface font-body-md text-body-md flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header
        activePath="list-your-property"
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        onNavigate={onNavigate}
      />

      <main className="flex-1 w-full pt-16 bg-surface">
        <div className="flex flex-col w-full">
          <section className="relative w-full overflow-hidden bg-surface-container-low py-space-xl">
            <div className="max-w-5xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                <div className="space-y-space-xs">
                  <div className="inline-flex items-center gap-space-xs px-space-sm py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[1rem]">
                      verified
                    </span>
                    Direct Host Verification
                  </div>
                  <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                    List Your Rental Property in Accra
                  </h1>
                  <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                    Reach verified, ready tenants directly. Free to list, zero
                    listing fees, zero agent lockups.
                  </p>
                </div>
                <div className="flex items-center gap-space-sm bg-surface-container-lowest p-space-sm rounded-xl shadow-sm">
                  <div className="h-10 w-10 rounded-lg bg-secondary-container flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.5rem]">
                      shield_person
                    </span>
                  </div>
                  <div>
                    <p className="font-label-md text-label-md text-on-surface">
                      Privacy First Guarantee
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Phone shared only with verified leads
                    </p>
                  </div>
                </div>
              </div>

              {/* Progress Indicator */}
              <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm space-y-space-sm">
                <div className="flex items-center justify-between text-label-sm font-label-sm text-on-surface-variant">
                  <span className="text-primary font-bold">
                    Step 1 of 3: Identity &amp; Location
                  </span>
                  <span className="text-on-surface-variant">
                    Next: Amenities, Rent &amp; Media
                  </span>
                  <span className="text-on-surface">35% Complete</span>
                </div>
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-500 w-[35%]"></div>
                </div>
                <div className="grid grid-cols-3 text-center pt-space-xs">
                  <div className="text-left font-label-sm text-label-sm text-primary flex items-center gap-space-xs">
                    <span className="h-5 w-5 rounded-full bg-primary text-on-primary flex items-center justify-center text-[0.7rem] font-bold">
                      1
                    </span>
                    <span>Basics &amp; Location</span>
                  </div>
                  <div className="text-center font-label-sm text-label-sm text-on-surface-variant flex items-center justify-center gap-space-xs">
                    <span className="h-5 w-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[0.7rem] font-bold">
                      2
                    </span>
                    <span>Rent &amp; Perks</span>
                  </div>
                  <div className="text-right font-label-sm text-label-sm text-on-surface-variant flex items-center justify-end gap-space-xs">
                    <span className="h-5 w-5 rounded-full bg-surface-container text-on-surface-variant flex items-center justify-center text-[0.7rem] font-bold">
                      3
                    </span>
                    <span>Media &amp; Publish</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-5xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl w-full">
            <form className="space-y-space-xl" onSubmit={handleSubmit}>
              {/* 1. Property Identity & Type */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div className="flex items-start justify-between border-b-0 pb-space-xs">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      1. Property Identity &amp; Type
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Accurate categorisation ensures your listing appears in
                      targeted search feeds.
                    </p>
                  </div>
                  <span className="px-space-sm py-1 rounded bg-surface-container-high text-primary font-label-sm text-label-sm">
                    Required
                  </span>
                </div>
                <div className="space-y-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="listing-title"
                  >
                    Listing Title
                  </label>
                  <input
                    className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all placeholder:text-outline focus:ring-2 focus:ring-primary/20"
                    id="listing-title"
                    placeholder="e.g. Spacious 3-Bedroom House with Big Compound in Osu"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                  />
                  <p className="font-caption text-caption text-on-surface-variant">
                    Include key features like compound size, self-contained
                    status, or standout amenities.
                  </p>
                </div>
                <div className="space-y-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">
                    Rental Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
                    {[
                      {
                        id: "entire",
                        label: "Entire Apartment",
                        desc: "Self-contained unit",
                        icon: "apartment",
                      },
                      {
                        id: "room",
                        label: "Single Room",
                        desc: "Chamber & Hall / Studio",
                        icon: "bedroom_parent",
                      },
                      {
                        id: "shared",
                        label: "Shared Flat",
                        desc: "Private room, shared bath",
                        icon: "group",
                      },
                      {
                        id: "house",
                        label: "Detached House",
                        desc: "Gated townhouse/villa",
                        icon: "home_work",
                      },
                    ].map((type) => (
                      <label key={type.id} className="cursor-pointer">
                        <input
                          className="peer sr-only"
                          name="rental_type"
                          type="radio"
                          checked={rentalType === type.id}
                          onChange={() =>
                            setRentalType(type.id as typeof rentalType)
                          }
                        />
                        <div className="p-space-md rounded-lg bg-surface-container-low peer-checked:bg-secondary-container peer-checked:text-on-secondary-container hover:bg-surface-container transition-all flex flex-col items-center text-center gap-space-xs">
                          <span className="material-symbols-outlined text-[1.75rem]">
                            {type.icon}
                          </span>
                          <span className="font-label-md text-label-md">
                            {type.label}
                          </span>
                          <span className="font-caption text-caption opacity-80">
                            {type.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg pt-space-xs">
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md text-on-surface">
                      Bedrooms
                    </label>
                    <div className="flex flex-wrap gap-space-xs">
                      {["Studio", "1", "2", "3", "4", "5+"].map((b) => (
                        <button
                          key={b}
                          type="button"
                          onClick={() => setBedrooms(b)}
                          className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                            bedrooms === b
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-space-xs">
                    <label className="font-label-md text-label-md text-on-surface">
                      Bathrooms
                    </label>
                    <div className="flex flex-wrap gap-space-xs">
                      {["1", "1.5", "2", "3+"].map((ba) => (
                        <button
                          key={ba}
                          type="button"
                          onClick={() => setBathrooms(ba)}
                          className={`px-space-md py-space-sm rounded-lg font-label-md text-label-md transition-colors ${
                            bathrooms === ba
                              ? "bg-primary text-on-primary"
                              : "bg-surface-container-low hover:bg-surface-container text-on-surface"
                          }`}
                        >
                          {ba}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* 2. Accra Location Details */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    2. Accra Location Details
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Accra renters rely heavily on landmarks and digital
                    addresses for effortless navigation.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md">
                  <div className="space-y-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="neighborhood-select"
                    >
                      Neighborhood
                    </label>
                    <div className="relative">
                      <select
                        className="w-full appearance-none px-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none pr-10"
                        id="neighborhood-select"
                        value={neighborhood}
                        onChange={(e) => setNeighborhood(e.target.value)}
                      >
                        <option value="airport-residential">
                          Airport Residential Area
                        </option>
                        <option value="east-legon">East Legon</option>
                        <option value="cantonments">Cantonments</option>
                        <option value="osu">Osu / Ringway</option>
                        <option value="labone">Labone</option>
                        <option value="dzorwulu">Dzorwulu</option>
                        <option value="spintex">Spintex Road</option>
                        <option value="achimota">Achimota</option>
                        <option value="tema">Tema (Comm 1-25)</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none">
                        expand_more
                      </span>
                    </div>
                  </div>
                  <div className="space-y-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="gps-address"
                    >
                      GhanaPost Digital Address (GPS)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-3 text-primary text-[1.25rem]">
                        pin_drop
                      </span>
                      <input
                        className="w-full pl-10 pr-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none uppercase placeholder:normal-case placeholder:text-outline"
                        id="gps-address"
                        placeholder="e.g. GA-492-3841"
                        type="text"
                        value={gpsAddress}
                        onChange={(e) => setGpsAddress(e.target.value)}
                      />
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Helps verified prospective tenants view the exact precinct
                      map.
                    </p>
                  </div>
                </div>
                <div className="space-y-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="landmark"
                  >
                    Street / Landmark Description
                  </label>
                  <input
                    className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none"
                    id="landmark"
                    placeholder="e.g. 3 minutes from Shell Station or Behind Del Hospital"
                    type="text"
                    value={landmark}
                    onChange={(e) => setLandmark(e.target.value)}
                  />
                </div>
                <div className="rounded-xl overflow-hidden shadow-sm">
                  <button
                    aria-label="Open the Ghana map to choose the property location"
                    className="relative flex h-44 w-full items-end bg-cover bg-center p-space-sm text-left transition-all hover:brightness-105"
                    onClick={() => setIsMapOpen(true)}
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBQpQRQR9JONqoA7HtMNSCD65uVKnIG-dQGQRzAg5L9oTanJF9d4wqN6lnL9AAgtuOLa81xLJLG02c8sDyAPpj60t1DoDOgaV_E98kwsbdRMS77kAjIcbgx8TIuSQq1r5iN9C3vmCeBZZygR6Qqc3nXOn_Bx7Br-viHaVN9M726N_xglUSod2cq1k9_bBTO4d3qihxA4M6e3O0DaOqxIKu_lnx7Ys5XIosmoPKQvrzLx4nlqUucjDYuZA')",
                    }}
                    type="button"
                  >
                    <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-error drop-shadow-lg">
                      <span className="material-symbols-outlined text-[2.5rem]">
                        location_on
                      </span>
                    </span>
                    <span className="relative z-10 flex items-center gap-space-xs rounded-lg bg-surface-container-lowest/90 px-space-sm py-space-xs text-body-sm font-label-sm text-on-surface shadow-sm backdrop-blur-sm">
                      <span className="material-symbols-outlined text-primary text-[1rem]">
                        map
                      </span>
                      Click to search Ghana and choose the exact property
                      location
                    </span>
                  </button>
                </div>
              </div>

              {isMapOpen && (
                <div
                  aria-label="Choose property location"
                  aria-modal="true"
                  className="fixed inset-0 z-9999 flex items-center justify-center bg-inverse-surface/60 p-4 backdrop-blur-sm"
                  role="dialog"
                >
                  <div className="flex h-[min(86vh,700px)] w-full max-w-5xl flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-2xl">
                    <div className="flex items-center justify-between gap-space-sm border-b border-surface-container-high px-space-md py-space-sm">
                      <div>
                        <h2 className="font-headline-md text-headline-md text-on-surface">
                          Choose property location in Ghana
                        </h2>
                        <p className="font-caption text-caption text-on-surface-variant">
                          Search for a neighborhood or click and drag the pin on
                          the map.
                        </p>
                      </div>
                      <button
                        aria-label="Close map"
                        className="flex h-9 w-9 items-center justify-center rounded-full text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                        onClick={() => setIsMapOpen(false)}
                        type="button"
                      >
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </div>
                    <div className="min-h-0 flex-1">
                      <MapLocationPicker
                        value={mapLocation}
                        onChange={setMapLocation}
                      />
                    </div>
                    <div className="flex items-center justify-between gap-space-sm border-t border-surface-container-high px-space-md py-space-sm">
                      <span className="font-caption text-caption text-on-surface-variant">
                        Selected: {mapLocation.latitude.toFixed(5)},{" "}
                        {mapLocation.longitude.toFixed(5)}
                      </span>
                      <button
                        className="rounded-lg bg-primary px-space-md py-space-sm font-label-md text-on-primary transition-colors hover:bg-primary-container"
                        onClick={() => setIsMapOpen(false)}
                        type="button"
                      >
                        Use this location
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. Rent & Ghanaian Tenancy Terms */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    3. Rent &amp; Ghanaian Tenancy Terms
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Clear pricing in Cedis reduces lengthy back-and-forth
                    negotiation.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
                  <div className="space-y-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="monthly-rent"
                    >
                      Monthly Rent (GH₵)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 font-label-md text-label-md font-bold text-primary">
                        GH₵
                      </span>
                      <input
                        className="w-full pl-14 pr-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-price-display text-price-display outline-none"
                        id="monthly-rent"
                        placeholder="8,500"
                        type="number"
                        value={monthlyRent}
                        onChange={(e) =>
                          setMonthlyRent(parseInt(e.target.value, 10) || 0)
                        }
                        required
                      />
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Transparent monthly equivalency rate.
                    </p>
                  </div>
                  <div className="space-y-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="security-deposit"
                    >
                      Security Deposit (Optional)
                    </label>
                    <div className="relative flex items-center">
                      <span className="absolute left-3 font-label-md text-label-md font-bold text-on-surface-variant">
                        GH₵
                      </span>
                      <input
                        className="w-full pl-14 pr-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none"
                        id="security-deposit"
                        placeholder="5,000"
                        type="number"
                        value={securityDeposit}
                        onChange={(e) =>
                          setSecurityDeposit(parseInt(e.target.value, 10) || 0)
                        }
                      />
                    </div>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Refundable damage deposit.
                    </p>
                  </div>
                  <div className="space-y-space-xs">
                    <label
                      className="font-label-md text-label-md text-on-surface"
                      htmlFor="available-date"
                    >
                      Date Available From
                    </label>
                    <input
                      className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none"
                      id="available-date"
                      type="date"
                      value={availableDate}
                      onChange={(e) => setAvailableDate(e.target.value)}
                      required
                    />
                    <p className="font-caption text-caption text-on-surface-variant">
                      When tenant can move in.
                    </p>
                  </div>
                </div>
                <div className="space-y-space-xs pt-space-xs">
                  <label className="font-label-md text-label-md text-on-surface">
                    Accepted Advance Terms (Select all options you consider)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm">
                    {[
                      {
                        id: "6m",
                        label: "6 Months Advance",
                        desc: "High tenant demand",
                      },
                      {
                        id: "1y",
                        label: "1 Year Advance",
                        desc: "Accra benchmark standard",
                      },
                      {
                        id: "2y",
                        label: "2 Years Advance",
                        desc: "Long-term lease option",
                      },
                    ].map((term) => (
                      <label
                        key={term.id}
                        className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors"
                      >
                        <input
                          checked={advanceTerms.has(term.id)}
                          onChange={() => toggleAdvanceTerm(term.id)}
                          className="h-4 w-4 rounded accent-primary text-primary"
                          type="checkbox"
                        />
                        <div>
                          <span className="font-label-md text-label-md text-on-surface block">
                            {term.label}
                          </span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            {term.desc}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* 4. Utilities & Resilient Amenities */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    4. Utilities &amp; Resilient Amenities
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Highlight infrastructure essentials that matter most to
                    Accra residents.
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                  {[
                    {
                      id: "gen",
                      label: "Standby Generator",
                      desc: "Automatic backup power",
                      icon: "power",
                    },
                    {
                      id: "polytank",
                      label: "Polytank Reservoir",
                      desc: "Continuous water pump",
                      icon: "water_drop",
                    },
                    {
                      id: "meter",
                      label: "Prepaid ECG Meter",
                      desc: "Independent tariff metering",
                      icon: "speed",
                    },
                    {
                      id: "ac",
                      label: "Air Conditioning",
                      desc: "All bedrooms & living area",
                      icon: "ac_unit",
                    },
                    {
                      id: "gated",
                      label: "Gated Compound",
                      desc: "Electric perimeter fence",
                      icon: "fence",
                    },
                    {
                      id: "security",
                      label: "24/7 Security",
                      desc: "Uniformed gate personnel",
                      icon: "security",
                    },
                    {
                      id: "parking",
                      label: "Dedicated Parking",
                      desc: "2 covered car bays",
                      icon: "local_parking",
                    },
                    {
                      id: "pets",
                      label: "Pets Allowed",
                      desc: "Subject to landlord notice",
                      icon: "pets",
                    },
                  ].map((amenity) => (
                    <label
                      key={amenity.id}
                      className="flex flex-col p-space-md rounded-lg bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors space-y-space-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="material-symbols-outlined text-primary text-[1.5rem]">
                          {amenity.icon}
                        </span>
                        <input
                          checked={amenities.has(amenity.id)}
                          onChange={() => toggleAmenity(amenity.id)}
                          className="h-4 w-4 rounded accent-primary"
                          type="checkbox"
                        />
                      </div>
                      <span className="font-label-md text-label-md text-on-surface">
                        {amenity.label}
                      </span>
                      <span className="font-caption text-caption text-on-surface-variant">
                        {amenity.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 5. Property Photos */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs">
                  <div>
                    <h2 className="font-headline-md text-headline-md text-on-surface">
                      5. Property Photos
                    </h2>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Rentals with 5+ bright photos receive 4.8x more verified
                      inquiries.
                    </p>
                  </div>
                  <button
                    className="inline-flex items-center gap-space-xs px-space-md py-space-sm rounded-lg bg-secondary-container text-on-secondary-container font-label-md text-label-md hover:bg-secondary-fixed transition-colors"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[1.25rem]">
                      photo_camera
                    </span>
                    <span>Take Photos with Phone</span>
                  </button>
                </div>
                <div className="rounded-xl p-space-xl bg-surface-container-low text-center flex flex-col items-center justify-center space-y-space-xs hover:bg-surface-container transition-colors cursor-pointer border border-dashed border-outline-variant">
                  <div className="h-12 w-12 rounded-full bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm">
                    <span className="material-symbols-outlined text-[2rem]">
                      cloud_upload
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <p className="font-label-md text-label-md text-on-surface">
                      Drag &amp; drop high resolution property photos here
                    </p>
                    <p className="font-caption text-caption text-on-surface-variant">
                      Supports JPG, PNG or WEBP up to 15MB each
                    </p>
                  </div>
                  <button
                    className="mt-space-xs px-space-md py-space-xs rounded-lg bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm hover:bg-primary hover:text-on-primary transition-all"
                    type="button"
                  >
                    Browse Device Files
                  </button>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-on-surface mb-space-xs">
                    Uploaded Previews ({photos.length} photos uploaded)
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
                    {photos.map((photo) => (
                      <div
                        key={photo.id}
                        className="relative rounded-xl overflow-hidden bg-surface-container-low shadow-sm group"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-44 object-cover"
                          alt={photo.title}
                          src={photo.imgUrl}
                        />
                        {photo.isCover && (
                          <div className="absolute top-2 left-2 px-space-sm py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                            <span className="material-symbols-outlined text-[0.875rem]">
                              star
                            </span>
                            Cover Photo
                          </div>
                        )}
                        <button
                          type="button"
                          onClick={() => removePhoto(photo.id)}
                          className="absolute top-2 right-2 h-8 w-8 rounded-full bg-surface-container-lowest/90 text-error hover:bg-error hover:text-on-error flex items-center justify-center transition-colors shadow-sm"
                        >
                          <span className="material-symbols-outlined text-[1.125rem]">
                            delete
                          </span>
                        </button>
                        <div className="p-space-xs bg-surface-container-lowest text-on-surface font-caption text-caption flex justify-between items-center">
                          <span className="font-semibold">{photo.title}</span>
                          <span className="text-on-surface-variant">
                            {photo.size}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 6. Description & House Rules */}
              <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm space-y-space-md">
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    6. Description &amp; House Rules
                  </h2>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Give potential tenants the real feel of living in your
                    property.
                  </p>
                </div>
                <div className="space-y-space-xs">
                  <label
                    className="font-label-md text-label-md text-on-surface"
                    htmlFor="description"
                  >
                    Property Description
                  </label>
                  <textarea
                    className="w-full px-space-md py-space-sm rounded-lg bg-surface-container-low focus:bg-surface-container-lowest text-on-surface font-body-md text-body-md outline-none transition-all placeholder:text-outline focus:ring-2 focus:ring-primary/20"
                    id="description"
                    rows={5}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md pt-space-xs">
                  <div className="p-space-md rounded-lg bg-surface-container-low space-y-space-xs">
                    <span className="font-label-md text-label-md text-on-surface flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-primary text-[1.25rem]">
                        gavel
                      </span>
                      Tenancy Guidelines
                    </span>
                    <ul className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
                      <li>
                        • Standard Ghana Rent Act compliant lease agreement
                        provided
                      </li>
                      <li>
                        • Tenant pays own metered electricity via ECG smart card
                      </li>
                      <li>
                        • Compound cleaning and security guard levy included in
                        rent
                      </li>
                    </ul>
                  </div>
                  <div className="p-space-md rounded-lg bg-secondary-container/30 space-y-space-xs">
                    <span className="font-label-md text-label-md text-primary flex items-center gap-space-xs">
                      <span className="material-symbols-outlined text-[1.25rem]">
                        security
                      </span>
                      Owner Privacy &amp; Verification Note
                    </span>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Your personal contact details remain completely concealed
                      until you accept an inquiry from an identity-verified
                      tenant on the platform.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sticky bottom bar */}
              <div className="sticky bottom-4 z-40 bg-surface-container-lowest p-space-md rounded-xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-space-md border border-surface-container-high/40">
                <div className="flex items-center gap-space-sm text-on-surface">
                  <div className="h-3 w-3 rounded-full bg-primary animate-pulse"></div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant">
                    Draft saved automatically 2 minutes ago
                  </span>
                </div>
                <div className="flex items-center gap-space-sm w-full sm:w-auto">
                  <button
                    className="w-1/2 sm:w-auto px-space-lg py-space-sm rounded-lg bg-surface-container-low hover:bg-surface-container text-on-surface font-label-md text-label-md transition-all"
                    type="button"
                  >
                    Save Draft
                  </button>
                  <button
                    className="w-1/2 sm:w-auto px-space-xl py-space-sm rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md shadow-md transition-all flex items-center justify-center gap-space-xs"
                    type="submit"
                  >
                    <span>Publish Rental Listing</span>
                    <span className="material-symbols-outlined text-[1.25rem]">
                      arrow_forward
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
      <MobileNav activePath="list-your-property" onNavigate={onNavigate} />
    </div>
  );
}

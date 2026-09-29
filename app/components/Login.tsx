"use client";

import React, { useEffect, useRef, useState } from "react";
import type { UserRole } from "./Header";

export interface LoginProps {
  isDialog?: boolean;
  onSuccess?: (role: UserRole) => void;
  onNavigate?: (path: string) => void;
}

export default function Login({
  isDialog = false,
  onSuccess,
  onNavigate,
}: LoginProps) {
  const [authTab, setAuthTab] = useState<"login" | "signup">("login");
  const [currentRole, setCurrentRole] = useState<"tenant" | "owner" | "agent">(
    "tenant",
  );
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [termsAgreed, setTermsAgreed] = useState(true);

  // Form fields
  const [loginEmail, setLoginEmail] = useState("kwame.mensah@gmail.com");
  const [loginPassword, setLoginPassword] = useState("PropertyDirect2024");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDialog && dialogRef.current) {
      dialogRef.current.scrollTop = 0;
    }
  }, [isDialog]);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) onSuccess(currentRole);
    else if (onNavigate) onNavigate("find-a-rental");
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSuccess) onSuccess(currentRole);
    else if (onNavigate) onNavigate("find-a-rental");
  };

  return (
    <div
      aria-labelledby={isDialog ? "login-dialog-title" : undefined}
      aria-modal={isDialog ? true : undefined}
      className={`${
        isDialog
          ? "w-full max-w-lg max-h-[calc(100vh-2rem)] overflow-y-auto rounded-2xl shadow-2xl py-4"
          : "min-h-full w-full py-10"
      } bg-surface text-on-surface font-body-md text-body-md flex flex-col ${
        isDialog ? "justify-start" : "justify-center"
      } items-center p-margin antialiased selection:bg-secondary-container selection:text-on-secondary-container`}
      ref={isDialog ? dialogRef : undefined}
      onClick={isDialog ? (event) => event.stopPropagation() : undefined}
      role={isDialog ? "dialog" : undefined}
    >
      <main className="w-full max-w-md mx-auto">
        <div className="flex flex-col w-full">
          <div className="relative w-full overflow-hidden flex flex-col items-center justify-center py-space-md">
            {/* Subtle Ambient Backdrop Elements */}
            <div className="absolute -top-24 -left-20 w-80 h-80 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -bottom-24 -right-20 w-80 h-80 bg-secondary-fixed/35 rounded-full blur-3xl pointer-events-none"></div>

            {/* Main Authentication Container */}
            <div className="relative w-full max-w-md flex flex-col items-center">
              {/* Brand Identity Header */}
              <div className="flex flex-col items-center text-center mb-space-lg">
                <div
                  className="flex items-center gap-space-xs mb-1 cursor-pointer"
                  onClick={() => onNavigate?.("find-a-rental")}
                >
                  <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shadow-md">
                    <span className="material-symbols-outlined text-[24px]">
                      real_estate_agent
                    </span>
                  </div>
                  <span
                    className="font-headline-lg text-headline-lg text-on-surface tracking-tight"
                    id={isDialog ? "login-dialog-title" : undefined}
                  >
                    Ecoshel
                  </span>
                </div>
                <p className="font-label-md text-label-md text-primary font-medium tracking-wide">
                  Accra&apos;s cleanest direct rental platform
                </p>
              </div>

              {/* Surface Card */}
              <div className="w-full bg-surface-container-lowest rounded-xl shadow-xl p-space-lg relative z-10 transition-all duration-300">
                {isDialog && (
                  <button
                    aria-label="Close login dialog"
                    className="absolute right-4 top-4 z-10 rounded-full p-1 text-on-surface-variant transition-colors hover:bg-surface-container-low hover:text-on-surface"
                    onClick={() => onNavigate?.("find-a-rental")}
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      close
                    </span>
                  </button>
                )}
                {/* Role Indicator Pill Bar */}
                <div className="mb-space-lg">
                  <label className="block font-label-sm text-label-sm text-on-surface-variant mb-2">
                    Select Your Role
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg font-label-sm text-label-sm transition-all ${
                        currentRole === "tenant"
                          ? "bg-surface-container-low text-primary font-semibold"
                          : "bg-surface-bright text-on-surface-variant hover:text-on-surface"
                      }`}
                      onClick={() => setCurrentRole("tenant")}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        key
                      </span>
                      <span>Tenant</span>
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg font-label-sm text-label-sm transition-all ${
                        currentRole === "owner"
                          ? "bg-surface-container-low text-primary font-semibold"
                          : "bg-surface-bright text-on-surface-variant hover:text-on-surface"
                      }`}
                      onClick={() => setCurrentRole("owner")}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        home_work
                      </span>
                      <span>Landlord / Host</span>
                    </button>
                    <button
                      type="button"
                      className={`flex items-center justify-center gap-1.5 p-2 rounded-lg font-label-sm text-label-sm transition-all ${
                        currentRole === "agent"
                          ? "bg-surface-container-low text-primary font-semibold"
                          : "bg-surface-bright text-on-surface-variant hover:text-on-surface"
                      }`}
                      onClick={() => setCurrentRole("agent")}
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        real_estate_agent
                      </span>
                      <span>Agent</span>
                    </button>
                  </div>
                </div>

                {/* LOG IN FORM SECTION */}
                {authTab === "login" && (
                  <div className="flex flex-col">
                    <form
                      className="flex flex-col gap-space-md"
                      onSubmit={handleLoginSubmit}
                    >
                      {/* Email Input */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold flex items-center justify-between">
                          <span>Email Address</span>
                          <span className="font-caption text-caption text-on-surface-variant">
                            e.g. kwame@accra.gh
                          </span>
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                            mail
                          </span>
                          <input
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                            placeholder="your.email@ecoshel.gh"
                            type="email"
                            value={loginEmail}
                            onChange={(e) => setLoginEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Password Input */}
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between items-center">
                          <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                            Password
                          </label>
                          <button
                            className="font-label-sm text-label-sm text-primary hover:underline"
                            type="button"
                          >
                            Forgot password?
                          </button>
                        </div>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                            lock
                          </span>
                          <input
                            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                            placeholder="••••••••••••"
                            type={showLoginPassword ? "text" : "password"}
                            value={loginPassword}
                            onChange={(e) => setLoginPassword(e.target.value)}
                            required
                          />
                          <button
                            className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors"
                            onClick={() =>
                              setShowLoginPassword(!showLoginPassword)
                            }
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showLoginPassword
                                ? "visibility_off"
                                : "visibility"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Remember Me Switch */}
                      <div className="flex items-center justify-between pt-1">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            checked={keepSignedIn}
                            onChange={(e) => setKeepSignedIn(e.target.checked)}
                            className="w-4 h-4 accent-primary rounded cursor-pointer"
                            type="checkbox"
                          />
                          <span className="font-body-md text-body-md text-on-surface">
                            Keep me signed in
                          </span>
                        </label>
                        <span className="font-caption text-caption text-primary flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            shield
                          </span>{" "}
                          Instant Token
                        </span>
                      </div>

                      {/* Primary Login Button */}
                      <button
                        className="w-full mt-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                        type="submit"
                      >
                        <span>Log In to Ecoshel</span>
                        <span className="material-symbols-outlined text-[20px]">
                          arrow_forward
                        </span>
                      </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-space-lg flex items-center justify-center">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full bg-surface-variant h-px"></div>
                      </div>
                      <span className="relative px-3 bg-surface-container-lowest font-caption text-caption uppercase text-on-surface-variant tracking-wider">
                        or continue with
                      </span>
                    </div>

                    {/* Social Login: Google */}
                    <button
                      className="w-full py-2.5 px-4 rounded-lg bg-surface-container-low hover:bg-surface-container-high text-on-surface font-label-md text-label-md flex items-center justify-center gap-3 transition-colors active:scale-[0.99]"
                      type="button"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
                          fill="#4285F4"
                        ></path>
                        <path
                          d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                          fill="#34A853"
                        ></path>
                        <path
                          d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                          fill="#FBBC05"
                        ></path>
                        <path
                          d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                          fill="#EA4335"
                        ></path>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <p className="text-center font-body-md text-body-md text-on-surface-variant mt-space-lg">
                      Don&apos;t have an account yet?{" "}
                      <button
                        className="text-primary font-semibold hover:underline"
                        onClick={() => setAuthTab("signup")}
                        type="button"
                      >
                        Create one in 30 seconds
                      </button>
                    </p>
                  </div>
                )}

                {/* SIGN UP FORM SECTION */}
                {authTab === "signup" && (
                  <div className="flex flex-col">
                    <form
                      className="flex flex-col gap-space-md"
                      onSubmit={handleSignupSubmit}
                    >
                      {/* Full Name */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Full Legal Name
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                            badge
                          </span>
                          <input
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                            placeholder="e.g. Abena Serwaa Osei"
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Phone Number with Ghana Prefix */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Mobile Number
                        </label>
                        <div className="flex gap-2">
                          <div className="flex items-center px-3 rounded-lg bg-surface-container text-on-surface font-label-md text-label-md gap-1 select-none">
                            <span className="text-base">🇬🇭</span>
                            <span>+233</span>
                          </div>
                          <div className="relative flex-1 flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                              phone
                            </span>
                            <input
                              className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                              placeholder="24 123 4567"
                              type="tel"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Email Address
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                            mail
                          </span>
                          <input
                            className="w-full pl-10 pr-3 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                            placeholder="abena.osei@gmail.com"
                            type="email"
                            value={signupEmail}
                            onChange={(e) => setSignupEmail(e.target.value)}
                            required
                          />
                        </div>
                      </div>

                      {/* Create Password */}
                      <div className="flex flex-col gap-1">
                        <label className="font-label-sm text-label-sm text-on-surface font-semibold">
                          Create Password
                        </label>
                        <div className="relative flex items-center">
                          <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                            lock_clock
                          </span>
                          <input
                            className="w-full pl-10 pr-10 py-2.5 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 transition-all"
                            placeholder="Min. 8 characters"
                            type={showSignupPassword ? "text" : "password"}
                            value={signupPassword}
                            onChange={(e) => setSignupPassword(e.target.value)}
                            required
                          />
                          <button
                            className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 rounded transition-colors"
                            onClick={() =>
                              setShowSignupPassword(!showSignupPassword)
                            }
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">
                              {showSignupPassword
                                ? "visibility_off"
                                : "visibility"}
                            </span>
                          </button>
                        </div>
                      </div>

                      {/* Fair Tenancy Policy Checkbox */}
                      <div className="p-3 bg-surface-container-low rounded-lg flex items-start gap-2.5">
                        <input
                          checked={termsAgreed}
                          onChange={(e) => setTermsAgreed(e.target.checked)}
                          className="mt-1 w-4 h-4 accent-primary rounded cursor-pointer shrink-0"
                          id="terms-check"
                          type="checkbox"
                          required
                        />
                        <label
                          className="font-body-sm text-body-sm text-on-surface-variant leading-tight select-none"
                          htmlFor="terms-check"
                        >
                          I agree to Ecoshel&apos;s{" "}
                          <span className="text-primary font-semibold">
                            Terms of Service
                          </span>{" "}
                          &amp; Rent-only{" "}
                          <span className="text-primary font-semibold">
                            Fair Tenancy Guidelines
                          </span>{" "}
                          prohibiting unauthorized upfront middleman agent
                          charges.
                        </label>
                      </div>

                      {/* Primary Signup Button */}
                      <button
                        className="w-full mt-2 py-3 px-4 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md flex items-center justify-center gap-2 shadow-md transition-all active:scale-[0.99]"
                        type="submit"
                      >
                        <span>
                          {currentRole === "owner"
                            ? "Sign Up as Property Owner"
                            : currentRole === "agent"
                              ? "Sign Up as Agent"
                              : "Sign Up as Tenant"}
                        </span>
                        <span className="material-symbols-outlined text-[20px]">
                          how_to_reg
                        </span>
                      </button>
                    </form>

                    {/* Toggle Link to Log In */}
                    <p className="text-center font-body-md text-body-md text-on-surface-variant mt-space-lg">
                      Already registered on Ecoshel?{" "}
                      <button
                        className="text-primary font-semibold hover:underline"
                        onClick={() => setAuthTab("login")}
                        type="button"
                      >
                        Log in to your account
                      </button>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

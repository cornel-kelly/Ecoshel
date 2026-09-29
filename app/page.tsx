"use client";

import React, { useState } from "react";
import Home from "./components/Home";
import PropertyDetail from "./components/PropertyDetail";
import ListProperty from "./components/ListProperty";
import OwnerDashboard from "./components/OwnerDashboard";
import UserSettings from "./components/UserSettings";
import Login from "./components/Login";
import type { UserRole } from "./components/Header";

type View =
  | "find-a-rental"
  | "property-detail"
  | "list-your-property"
  | "owner-dashboard"
  | "settings"
  | "login";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("find-a-rental");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>("tenant");
  const [selectedPropertyPrice, setSelectedPropertyPrice] = useState(6500);

  const handleNavigate = (path: string, propertyPrice?: number) => {
    if (
      path === "find-a-rental" ||
      path === "accra-neighborhoods" ||
      path === "how-it-works"
    ) {
      setCurrentView("find-a-rental");
    } else if (path === "property-detail") {
      if (propertyPrice !== undefined) {
        setSelectedPropertyPrice(propertyPrice);
      }
      setCurrentView("property-detail");
    } else if (path === "list-your-property") {
      if (isAuthenticated && (userRole === "owner" || userRole === "agent")) {
        setCurrentView("list-your-property");
      } else {
        setCurrentView("login");
      }
    } else if (path === "owner-dashboard") {
      if (isAuthenticated && (userRole === "owner" || userRole === "agent")) {
        setCurrentView("owner-dashboard");
      } else {
        setCurrentView("login");
      }
    } else if (path === "settings" || path === "profile") {
      if (isAuthenticated) {
        setCurrentView("settings");
      } else {
        setCurrentView("login");
      }
    } else if (path === "login") {
      setCurrentView("login");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSignOut = () => {
    setIsAuthenticated(false);
    setUserRole("tenant");
    setCurrentView("find-a-rental");
  };

  return (
    <div className="relative min-h-screen">
      {/* Floating Component Switcher for Easy Testing - moved to bottom to prevent navbar obstruction */}
      <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-9999 hidden sm:flex items-center gap-1 bg-inverse-surface/95 text-inverse-on-surface backdrop-blur-md px-3 py-1.5 rounded-full text-xs shadow-2xl border border-surface-container-high/20 opacity-90 hover:opacity-100 transition-opacity">
        <span className="font-semibold text-primary-fixed pl-1">Preview:</span>
        <button
          type="button"
          onClick={() => handleNavigate("find-a-rental")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "find-a-rental"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          Home
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("property-detail")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "property-detail"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          Detail
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("list-your-property")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "list-your-property"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("owner-dashboard")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "owner-dashboard"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          Dashboard
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("settings")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "settings"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          Settings
        </button>
        <button
          type="button"
          onClick={() => handleNavigate("login")}
          className={`px-2 py-0.5 rounded-full transition-colors ${
            currentView === "login"
              ? "bg-primary text-on-primary font-bold"
              : "hover:bg-inverse-surface"
          }`}
        >
          Login
        </button>
      </div>

      {/* Render Current Active Component */}
      {(currentView === "find-a-rental" || currentView === "login") && (
        <Home
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "property-detail" && (
        <PropertyDetail
          monthlyRent={selectedPropertyPrice}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "list-your-property" && (
        <ListProperty
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "owner-dashboard" && (
        <OwnerDashboard
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "settings" && (
        <UserSettings
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          onSignOut={handleSignOut}
          onNavigate={handleNavigate}
        />
      )}
      {currentView === "login" && (
        <div
          className="fixed inset-0 z-100 overflow-hidden bg-on-surface/30 p-4 backdrop-blur-sm sm:p-6"
          onClick={() => handleNavigate("find-a-rental")}
          role="presentation"
        >
          <div className="min-h-full flex items-center justify-center">
            <Login
              isDialog
              onNavigate={handleNavigate}
              onSuccess={(role) => {
                setIsAuthenticated(true);
                setUserRole(role);
                handleNavigate("find-a-rental");
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

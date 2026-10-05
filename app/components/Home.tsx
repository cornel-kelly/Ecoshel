"use client";

import React, { useState, useMemo, useEffect } from "react";
import Header, { UserRole } from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";

export interface HomeProps {
  isAuthenticated?: boolean;
  userRole?: UserRole;
  onNavigate?: (path: string, propertyPrice?: number) => void;
}

interface Listing {
  id: string;
  title: string;
  neighborhood: string;
  subLocation: string;
  propertyType: PropertyType;
  beds: number;
  baths: number | string;
  price: number;
  amenities: string[];
  hostBadge: string;
  imgUrl: string;
  featured?: boolean;
}

type PropertyType =
  | "apartment"
  | "studio"
  | "townhouse"
  | "house"
  | "room"
  | "hotel"
  | "motel"
  | "bed-breakfast"
  | "hostel"
  | "resort"
  | "guesthouse"
  | "inn-lodge"
  | "serviced-apartment"
  | "extended-stay"
  | "cottage-cabin"
  | "chalet"
  | "villa"
  | "farmhouse-finca"
  | "houseboat"
  | "rv-caravan-campground"
  | "glamping";

const SEED_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Modern 2-Bedroom Apartment with Balcony",
    neighborhood: "East Legon",
    subLocation: "Lagos Avenue corridor",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 6500,
    amenities: ["Standby Gen", "Gated"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAAuAH6IzFE3vj0GaR8v2LEnt99dJLK5NgIpF_wjkxyIo6H5D8b8QyLRbbx5mIJHSVmzMQbfPm_ysElhgOhUSscTodverNvjljxkdKCiLfXkzpzJ4FATjzA7fwZp_QNp9G7LTRx7lS_fvHMAXryGfZvj0RusGeNHyOo2W2yV36ycd1PHxsbSZX5neLHwupLSrbfsKr8oZ9_vF1ZM1gkSGQ0TvnCoNF1NbyrAAl8IhBypQczxkV5F0GaYQ",
  },
  {
    id: "2",
    title: "Furnished Studio in Quiet Enclave",
    neighborhood: "Cantonments",
    subLocation: "Near Embassy Row",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 4200,
    amenities: ["Polytank", "24/7 Security"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAPvZkuCaWaf0JGn_VYwx40C8YhjhcvhobvFgwd7d4897N5XEN7jZtvU-kNCLvH7_Vg1ErmDMlVKqC3I5yhrsYImDKOKpmgDMa9Hzv8lYS7CamxOzD7AEKpYes6j_iQotDvzpJ9arHm_aPuj5FWACGdTS1wLm9cEovUQ8jwvWqI-KHZM7Jkdj2n6stQqkGR4AQboGec5ihe90qX2rtqIftGSjvlOl9zIsVTZd-2bgz2V51Kuk2uBMj4lQ",
  },
  {
    id: "3",
    title: "Executive 3-Bedroom Townhouse with Garden",
    neighborhood: "Airport Residential",
    subLocation: "Private Compound",
    propertyType: "townhouse",
    beds: 3,
    baths: 3.5,
    price: 14000,
    amenities: ["Solar Backup", "Carport"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCfkVyi7X8qZWvfKQQ5u-rdJ_YEffRDJ0NJQF3TeglA3T5frjtesTpOtYXJ-rbpGBDKKh2TFy6k6EBN_AH0hY5eutyjFRxiuP5-LRmk4PjtoeH5639lFzPj-PyH3DCRumTcMurXx3wB084ReAHSZUv_oARILDk6bykkB58FQeIt8shL1u9-JdL6O-_JRT0WmtQ13CmRZ6Mi9l8iC-t4EB-5K3PYmLNLpIt5RS7vt_CDY4Z7MF6ty0Oy8Q",
  },
  {
    id: "4",
    title: "Cozy Self-Contained 1-Bed Flat",
    neighborhood: "Osu",
    subLocation: "Ringway Estate",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 2800,
    amenities: ["Walk to Cafes", "Fitted Kit."],
    hostBadge: "Inspected",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuADCIqrWlBg6nSUJNC2RoGIMx8RfrcC_6t37Df9nhqsd1V4Smlw_DW5KcdWzBdLfgPd8mDa-oJu1nOlKjh43fjfBlzlbzHVl5krJNyUQGa02yi604YjL2wSioKC2RyHPwEktOXwVZsovOIce7JvQacMXq2IYun1dK9-MbpbrNZui4jbn3DD2pbovoHgPoEE8jArVCcrikVFcOzU4DdtzD98ZHHtVR-9RTVvdavRQ50gufcxJ77MTxWDWg",
  },
  {
    id: "5",
    title: "Spacious 2-Bed Terrace with Rooftop",
    neighborhood: "Dzorwulu",
    subLocation: "Near Bloomberg Office",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 5500,
    amenities: ["Air-Conditioned", "Paved Lot"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDURacPNpcdzpEprsVpJmgHZ6wmrMqkTBFpnPqIpn1QYeIe-Bipfbm8OeF55uUAOvre5Fg1H4Vx_dhsQk5Rns_UnJ_qKNzwyaDggYGhtzswaVPfRu5753xEdhkRUVRIeEpiz9tyh946kHo1_Nzat-t_l_i2FRKJ9VEXV61ZZjkJOu4wK_Y2JcF7gFeOrykYaPYc9hyEdzrzn64Mifn8PyDKRZVdoe3fzpoHgkwpzCGggvn4rQnbJ8yAfw",
  },
  {
    id: "6",
    title: "Budget Master Bedroom in Shared Villa",
    neighborhood: "Spintex",
    subLocation: "Near Junction Mall",
    propertyType: "room",
    beds: 1,
    baths: "En-suite",
    price: 1800,
    amenities: ["Shared Kit.", "Poly Tank"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBvso2xgfaSQMZ0GCxYhlky5FKStqXdW0klgANZj3PC-i_nExnxo07WRMYu9Hg_u9knr_263VrsiYtSZbfUYmVbiEqrA1U1HFuqm_fSS99of5_DRDP6uriHLcrtGdQulKIs4KqhunqPTeiLPfMEm9my7J145zA55Uz1HfHfOL1CDrmXzNg3Me45BLrWPttqD2OaXvtVjVJ_R5LoyqQKTdbBKJ-AH-FiZi4pyOanWX6m0RhdX8oOvAC2-g",
  },
  {
    id: "7",
    title: "Sunlit 2-Bed Flat with Balcony View",
    neighborhood: "Labone",
    subLocation: "Near East Ridge",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 6100,
    amenities: ["Solar Backup", "Laundry Room"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "8",
    title: "Minimalist 1-Bed Apartment in Prime Zone",
    neighborhood: "Abelemkpe",
    subLocation: "Close to Achimota Road",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 2600,
    amenities: ["Fitted Kitchen", "Water Tank"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "9",
    title: "Modern 3-Bed Family House with Yard",
    neighborhood: "East Legon",
    subLocation: "Bawaleshie Extension",
    propertyType: "villa",
    beds: 3,
    baths: 3,
    price: 9800,
    amenities: ["Compound", "Backup Power"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "10",
    title: "Chic Studio with Smart Home Features",
    neighborhood: "Airport Residential",
    subLocation: "Near 37 Military Hospital",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 3600,
    amenities: ["Smart Lock", "Generator"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "11",
    title: "Loft-Style 2-Bed Apartment with Terrace",
    neighborhood: "Cantonments",
    subLocation: "Off Dr. Isert Road",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 7200,
    amenities: ["Terrace", "24/7 Security"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "12",
    title: "Private Room in Secure Compound",
    neighborhood: "Dzorwulu",
    subLocation: "Near Roman Ridge",
    propertyType: "room",
    beds: 1,
    baths: "Shared",
    price: 2100,
    amenities: ["High-Speed Wi-Fi", "Shared Lounge"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "13",
    title: "Bright 2-Bed Apartment near the Park",
    neighborhood: "Ridge",
    subLocation: "Behind Ridge Hospital",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 5200,
    amenities: ["Gated Compound", "Water Tank"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "14",
    title: "Compact Studio for City Professionals",
    neighborhood: "North Ridge",
    subLocation: "Near Independence Avenue",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 3300,
    amenities: ["Furnished", "Security"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "15",
    title: "Family Townhouse with Private Garden",
    neighborhood: "Trasacco",
    subLocation: "North Legon Hills",
    propertyType: "townhouse",
    beds: 3,
    baths: 3,
    price: 12500,
    amenities: ["Private Garden", "Carport"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "16",
    title: "Affordable 1-Bed Flat near Transit",
    neighborhood: "Madina",
    subLocation: "Close to the Main Station",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 1900,
    amenities: ["Paved Access", "Water Tank"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "17",
    title: "Elegant 4-Bed Home with Pool",
    neighborhood: "East Legon",
    subLocation: "Lagos Avenue Extension",
    propertyType: "villa",
    beds: 4,
    baths: 4,
    price: 18000,
    amenities: ["Swimming Pool", "Backup Power"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "18",
    title: "Furnished 2-Bed Executive Suite",
    neighborhood: "Labone",
    subLocation: "Near Labone Coffee Shop",
    propertyType: "serviced-apartment",
    beds: 2,
    baths: 2,
    price: 8500,
    amenities: ["Housekeeping", "Generator"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "19",
    title: "Quiet Single Room with Private Entrance",
    neighborhood: "Teshie",
    subLocation: "Near the Community Centre",
    propertyType: "room",
    beds: 1,
    baths: "Shared",
    price: 1400,
    amenities: ["Private Entrance", "Wi-Fi"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "20",
    title: "Modern 3-Bed Duplex with Study",
    neighborhood: "Oyarifa",
    subLocation: "Off the Adenta-Dodowa Road",
    propertyType: "townhouse",
    beds: 3,
    baths: 3.5,
    price: 6800,
    amenities: ["Study Room", "Borehole"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "21",
    title: "Rooftop Studio with City Views",
    neighborhood: "Osu",
    subLocation: "Oxford Street Area",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 3900,
    amenities: ["Rooftop Access", "Furnished"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "22",
    title: "Spacious 2-Bed Home near Schools",
    neighborhood: "Adenta",
    subLocation: "Near Frafraha Junction",
    propertyType: "house",
    beds: 2,
    baths: 2,
    price: 3600,
    amenities: ["Compound", "Polytank"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "23",
    title: "Luxury 3-Bed Apartment with Sea Breeze",
    neighborhood: "Cantonments",
    subLocation: "Near the American Embassy",
    propertyType: "apartment",
    beds: 3,
    baths: 3,
    price: 11000,
    amenities: ["Gym Access", "Swimming Pool"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "24",
    title: "Cozy Room in a Shared Creative Home",
    neighborhood: "Kokomlemle",
    subLocation: "Close to the Arts Centre",
    propertyType: "room",
    beds: 1,
    baths: "Shared",
    price: 1600,
    amenities: ["Shared Kitchen", "High-Speed Wi-Fi"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "25",
    title: "Classic 2-Bed Flat with Fitted Kitchen",
    neighborhood: "Dansoman",
    subLocation: "Near the Roundabout",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 3000,
    amenities: ["Fitted Kitchen", "Paved Lot"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "26",
    title: "Contemporary 4-Bed House with Staff Quarters",
    neighborhood: "Spintex",
    subLocation: "Flowerpot Junction",
    propertyType: "house",
    beds: 4,
    baths: 4,
    price: 9000,
    amenities: ["Staff Quarters", "CCTV"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "27",
    title: "Serviced 1-Bed Apartment with Concierge",
    neighborhood: "Airport Residential",
    subLocation: "Near Marina Mall",
    propertyType: "serviced-apartment",
    beds: 1,
    baths: 1,
    price: 7600,
    amenities: ["Concierge", "Gym Access"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "28",
    title: "Peaceful 2-Bed Garden Apartment",
    neighborhood: "Roman Ridge",
    subLocation: "Off Dr. Hilla Limann Highway",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 5700,
    amenities: ["Garden", "Gated"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "29",
    title: "Budget Studio near University Campus",
    neighborhood: "Legon",
    subLocation: "Near the University Entrance",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 1700,
    amenities: ["Study Desk", "Water Tank"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "30",
    title: "Secure 3-Bed Home with Large Compound",
    neighborhood: "Ashaley Botwe",
    subLocation: "Near Lakeside Estate",
    propertyType: "house",
    beds: 3,
    baths: 3,
    price: 6200,
    amenities: ["Large Compound", "Borehole"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "31",
    title: "Open-Plan 1-Bed Loft in a Walkable Area",
    neighborhood: "Osu",
    subLocation: "Behind Danquah Circle",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 4100,
    amenities: ["Open Plan", "Walk to Cafes"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "32",
    title: "Premium 2-Bed Flat with Backup Solar",
    neighborhood: "Labone",
    subLocation: "Near Labadi Road",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 6800,
    amenities: ["Solar Backup", "Balcony"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "33",
    title: "Simple Furnished Room for Young Professionals",
    neighborhood: "East Legon Hills",
    subLocation: "Near the Community Park",
    propertyType: "room",
    beds: 1,
    baths: "En-suite",
    price: 2200,
    amenities: ["Furnished", "Shared Lounge"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "34",
    title: "Newly Built 3-Bed Townhouse with Balcony",
    neighborhood: "North Legon",
    subLocation: "Near Atomic Junction",
    propertyType: "townhouse",
    beds: 3,
    baths: 3,
    price: 7800,
    amenities: ["New Build", "Balcony"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "35",
    title: "Airy 2-Bed Apartment near Shopping Centre",
    neighborhood: "Dzorwulu",
    subLocation: "Near the Fiesta Royal Road",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 4900,
    amenities: ["Air-Conditioned", "Parking"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "36",
    title: "Executive 5-Bed Villa with Guest Annex",
    neighborhood: "Cantonments",
    subLocation: "Quiet Diplomatic Enclave",
    propertyType: "villa",
    beds: 5,
    baths: 5,
    price: 22000,
    amenities: ["Guest Annex", "Swimming Pool"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "37",
    title: "Modern 1-Bed Flat with Co-Working Lounge",
    neighborhood: "Ridge",
    subLocation: "Near the Financial Centre",
    propertyType: "serviced-apartment",
    beds: 1,
    baths: 1,
    price: 5800,
    amenities: ["Co-Working Lounge", "24/7 Security"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "38",
    title: "Sunny 2-Bed Home with Covered Parking",
    neighborhood: "Teshie",
    subLocation: "Near the Main Highway",
    propertyType: "house",
    beds: 2,
    baths: 2,
    price: 3200,
    amenities: ["Covered Parking", "Gated"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "39",
    title: "Furnished 3-Bed Apartment with Gym",
    neighborhood: "Airport Residential",
    subLocation: "Near the Airport Bypass",
    propertyType: "apartment",
    beds: 3,
    baths: 3,
    price: 13500,
    amenities: ["Furnished", "Gym Access"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "40",
    title: "Private Studio with Courtyard Access",
    neighborhood: "Kanda",
    subLocation: "Off the Ring Road",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 2500,
    amenities: ["Courtyard", "Fitted Kitchen"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "41",
    title: "Spacious 4-Bed Family Residence",
    neighborhood: "East Legon",
    subLocation: "Near American House",
    propertyType: "house",
    beds: 4,
    baths: 4,
    price: 15000,
    amenities: ["Garden", "Staff Quarters"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "42",
    title: "Affordable 1-Bed Apartment with Generator",
    neighborhood: "Abelemkpe",
    subLocation: "Near the Police Station",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 2400,
    amenities: ["Generator", "Water Tank"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "43",
    title: "Quiet 2-Bed Flat with Work-From-Home Nook",
    neighborhood: "Roman Ridge",
    subLocation: "Close to the Ridge Roundabout",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 6000,
    amenities: ["Home Office", "Standby Gen"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "44",
    title: "Private En-Suite Room near the Beach",
    neighborhood: "Labadi",
    subLocation: "Near Labadi Beach Hotel",
    propertyType: "room",
    beds: 1,
    baths: "En-suite",
    price: 2300,
    amenities: ["Private Bath", "Wi-Fi"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "45",
    title: "Stylish 2-Bed Terrace in Gated Estate",
    neighborhood: "Ashaley Botwe",
    subLocation: "Near the Lakeside Mall",
    propertyType: "townhouse",
    beds: 2,
    baths: 2.5,
    price: 4700,
    amenities: ["Gated Estate", "Paved Lot"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "46",
    title: "High-Floor 3-Bed City Apartment",
    neighborhood: "Osu",
    subLocation: "Near Ako Adjei Park",
    propertyType: "apartment",
    beds: 3,
    baths: 3,
    price: 8200,
    amenities: ["Elevator", "Balcony"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "47",
    title: "One-Bed Serviced Suite for Short Stays",
    neighborhood: "Labone",
    subLocation: "Near the Oxford Street Link",
    propertyType: "extended-stay",
    beds: 1,
    baths: 1,
    price: 6900,
    amenities: ["Housekeeping", "Wi-Fi"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "48",
    title: "Family-Friendly 3-Bed House with Veranda",
    neighborhood: "Spintex",
    subLocation: "Near the Coca-Cola Roundabout",
    propertyType: "house",
    beds: 3,
    baths: 3,
    price: 5800,
    amenities: ["Veranda", "Compound"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "49",
    title: "Renovated 1-Bed Flat near Market Street",
    neighborhood: "Kaneshie",
    subLocation: "Near the Main Market",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 2000,
    amenities: ["Renovated", "Secure Entry"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "50",
    title: "Luxury 3-Bed Residence with Rooftop Lounge",
    neighborhood: "Cantonments",
    subLocation: "Near the El-Wak Stadium",
    propertyType: "serviced-apartment",
    beds: 3,
    baths: 3,
    price: 14500,
    amenities: ["Rooftop Lounge", "Pool Access"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "51",
    title: "Simple Furnished Studio for Students",
    neighborhood: "Legon",
    subLocation: "Near the Night Market",
    propertyType: "studio",
    beds: 1,
    baths: 1,
    price: 1500,
    amenities: ["Furnished", "Study Desk"],
    hostBadge: "Direct Landlord",
    imgUrl:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "52",
    title: "Modern 2-Bed Home with Solar Water Heating",
    neighborhood: "Adenta",
    subLocation: "Near the Housing Down Junction",
    propertyType: "house",
    beds: 2,
    baths: 2,
    price: 3400,
    amenities: ["Solar Water Heater", "Gated"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "53",
    title: "Executive 4-Bed Townhouse with Pool",
    neighborhood: "Trasacco",
    subLocation: "Near the Country Club",
    propertyType: "townhouse",
    beds: 4,
    baths: 4,
    price: 16500,
    amenities: ["Swimming Pool", "24/7 Security"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "54",
    title: "Comfortable Room with Kitchenette",
    neighborhood: "Madina",
    subLocation: "Near the Zongo Junction",
    propertyType: "room",
    beds: 1,
    baths: "En-suite",
    price: 1750,
    amenities: ["Kitchenette", "Polytank"],
    hostBadge: "Verified Room",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "55",
    title: "Bright 2-Bed Apartment with City Skyline",
    neighborhood: "North Ridge",
    subLocation: "Near the Jubilee House",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 6400,
    amenities: ["City View", "Generator"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "56",
    title: "Peaceful 1-Bed Garden Flat",
    neighborhood: "Abelemkpe",
    subLocation: "Near the Papafio Hills",
    propertyType: "apartment",
    beds: 1,
    baths: 1,
    price: 2900,
    amenities: ["Garden", "Parking"],
    hostBadge: "Inspected",
    imgUrl:
      "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "57",
    title: "Premium 3-Bed Duplex with Garage",
    neighborhood: "East Legon",
    subLocation: "Near the Lagos Avenue Park",
    propertyType: "townhouse",
    beds: 3,
    baths: 3.5,
    price: 12000,
    amenities: ["Private Garage", "Solar Backup"],
    hostBadge: "Verified Property",
    imgUrl:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "58",
    title: "Relaxed 2-Bed Coastal Apartment",
    neighborhood: "Labadi",
    subLocation: "Near the Beach Road",
    propertyType: "apartment",
    beds: 2,
    baths: 2,
    price: 5300,
    amenities: ["Balcony", "Water Tank"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "59",
    title: "Furnished 1-Bed Business Suite",
    neighborhood: "Airport Residential",
    subLocation: "Close to the Kotoka Airport Link",
    propertyType: "serviced-apartment",
    beds: 1,
    baths: 1,
    price: 6300,
    amenities: ["Airport Transfer", "Housekeeping"],
    hostBadge: "Direct Host",
    imgUrl:
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "60",
    title: "Spacious 3-Bed Home with Family Yard",
    neighborhood: "Dzorwulu",
    subLocation: "Near the Dzorwulu School",
    propertyType: "house",
    beds: 3,
    baths: 3,
    price: 7000,
    amenities: ["Family Yard", "Backup Power"],
    hostBadge: "Verified Host",
    imgUrl:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  },
];

const GENERATED_LISTING_COUNT = 540;
const LISTINGS_PER_PAGE = 12;
const GENERATED_NEIGHBORHOODS = [
  "East Legon",
  "Cantonments",
  "Airport Residential",
  "Osu",
  "Dzorwulu",
  "Spintex",
  "Abelemkpe",
  "Labone",
  "Adabraka",
  "Dansoman",
  "Roman Ridge",
  "Tesano",
];
const GENERATED_TYPES: PropertyType[] = [
  "apartment",
  "studio",
  "townhouse",
  "house",
  "room",
  "villa",
  "serviced-apartment",
  "guesthouse",
];
const GENERATED_AMENITIES = [
  ["Standby Gen", "Gated"],
  ["Polytank", "24/7 Security"],
  ["Solar Backup", "Parking"],
  ["Furnished", "Air-Conditioned"],
  ["Water Storage", "Paved Lot"],
  ["Fiber Internet", "CCTV"],
];
const GENERATED_IMAGES = [
  "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80",
];

const GENERATED_LISTINGS: Listing[] = Array.from(
  { length: GENERATED_LISTING_COUNT },
  (_, index) => {
    const neighborhood =
      GENERATED_NEIGHBORHOODS[index % GENERATED_NEIGHBORHOODS.length];
    const propertyType = GENERATED_TYPES[index % GENERATED_TYPES.length];
    const beds =
      propertyType === "studio" || propertyType === "room"
        ? 1
        : (index % 4) + 1;
    const price = 1800 + ((index * 725) % 15700);
    const adjective = [
      "Bright",
      "Quiet",
      "Modern",
      "Spacious",
      "Newly Renovated",
      "Secure",
    ][index % 6];
    const typeLabel = propertyType
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter) => letter.toUpperCase());

    return {
      id: `mock-${index + 61}`,
      title: `${adjective} ${beds}-Bedroom ${typeLabel} in ${neighborhood}`,
      neighborhood,
      subLocation: [
        "Near Main Road",
        "Quiet Residential Lane",
        "Close to Shops and Cafes",
        "Gated Community",
      ][index % 4],
      propertyType,
      beds,
      baths: beds === 1 ? 1 : beds,
      price,
      amenities: GENERATED_AMENITIES[index % GENERATED_AMENITIES.length],
      hostBadge: [
        "Verified Host",
        "Direct Landlord",
        "Inspected",
        "Verified Property",
      ][index % 4],
      imgUrl: GENERATED_IMAGES[index % GENERATED_IMAGES.length],
      featured: index % 10 === 0,
    };
  },
);

const INITIAL_LISTINGS = [...SEED_LISTINGS, ...GENERATED_LISTINGS];

export default function Home({
  isAuthenticated = false,
  userRole = "tenant",
  onNavigate,
}: HomeProps) {
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [locationSearch, setLocationSearch] = useState("");
  const [selectedType, setSelectedType] = useState("any");
  const [maxPrice, setMaxPrice] = useState(14000);
  const [selectedBeds, setSelectedBeds] = useState<string>("any");
  const [activeTags, setActiveTags] = useState<Set<string>>(new Set());
  const [sortBy, setSortBy] = useState<"verified" | "price-asc" | "newest">(
    "verified",
  );
  const [likedListings, setLikedListings] = useState<Set<string>>(new Set());
  const [visibleListingCount, setVisibleListingCount] =
    useState(LISTINGS_PER_PAGE);
  const [showCompactSearch, setShowCompactSearch] = useState(false);

  useEffect(() => {
    const updateCompactSearchVisibility = () => {
      const locationInput = document.getElementById("location-search");
      if (!locationInput) return;

      const nextVisibility = locationInput.getBoundingClientRect().bottom <= 64;
      setShowCompactSearch((currentVisibility) =>
        currentVisibility === nextVisibility
          ? currentVisibility
          : nextVisibility,
      );
    };

    updateCompactSearchVisibility();
    window.addEventListener("scroll", updateCompactSearchVisibility, {
      passive: true,
    });
    window.addEventListener("resize", updateCompactSearchVisibility);

    return () => {
      window.removeEventListener("scroll", updateCompactSearchVisibility);
      window.removeEventListener("resize", updateCompactSearchVisibility);
    };
  }, []);

  const toggleTag = (tag: string) => {
    setActiveTags((prev) => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setLikedListings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredListings = useMemo(() => {
    return INITIAL_LISTINGS.filter((item) => {
      const normalizedLocationSearch = locationSearch.trim().toLowerCase();
      const matchSelectLocation =
        selectedLocation === "all" ||
        item.neighborhood
          .toLowerCase()
          .includes(selectedLocation.toLowerCase());
      const matchLocationSearch =
        !normalizedLocationSearch ||
        `${item.neighborhood} ${item.subLocation}`
          .toLowerCase()
          .includes(normalizedLocationSearch);
      const matchLoc = matchSelectLocation && matchLocationSearch;
      const matchType =
        selectedType === "any" || item.propertyType === selectedType;
      const matchPrice = item.price <= maxPrice;
      const matchBeds =
        selectedBeds === "any" ||
        (selectedBeds === "1" && item.beds === 1) ||
        (selectedBeds === "2" && item.beds === 2) ||
        (selectedBeds === "3" && item.beds >= 3);

      let matchTags = true;
      if (activeTags.has("price-low") && item.price > 3000) matchTags = false;
      if (activeTags.has("eastlegon") && item.neighborhood !== "East Legon")
        matchTags = false;

      return matchLoc && matchType && matchPrice && matchBeds && matchTags;
    }).sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      return 0;
    });
  }, [
    selectedLocation,
    locationSearch,
    selectedType,
    maxPrice,
    selectedBeds,
    activeTags,
    sortBy,
  ]);

  const visibleListings = filteredListings.slice(0, visibleListingCount);

  return (
    <div className="min-h-full bg-surface text-on-surface font-body-md text-body-md flex flex-col antialiased selection:bg-secondary-container selection:text-on-secondary-container">
      <Header
        activePath="find-a-rental"
        isAuthenticated={isAuthenticated}
        userRole={userRole}
        showCompactSearch={showCompactSearch}
        locationSearch={locationSearch}
        onLocationSearchChange={setLocationSearch}
        onOpenFilters={() => {
          document.getElementById("rental-filters")?.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }}
        onNavigate={onNavigate}
      />

      <main className="flex-1 w-full bg-surface">
        <div className="flex flex-col w-full">
          {/* Dynamic Hero & Contextual Search Unit */}
          <section className="relative w-full bg-surface-container-low overflow-hidden pb-space-2xl">
            {/* Architectural decorative background mesh */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
              <svg
                className="w-full h-full text-secondary-fixed/30"
                height="100%"
                width="100%"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern
                    height="48"
                    id="accra-grid"
                    patternUnits="userSpaceOnUse"
                    width="48"
                  >
                    <path
                      d="M 48 0 L 0 0 0 48"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.75"
                    ></path>
                  </pattern>
                </defs>
                <rect fill="url(#accra-grid)" height="100%" width="100%"></rect>
              </svg>
            </div>

            {/* Radiant soft tint aura */}
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed-dim/20 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-container/30 blur-2xl pointer-events-none"></div>

            {/* Real architectural photo used as a masked contextual backdrop */}
            <div className="absolute inset-0 w-full pointer-events-none select-none">
              <img
                aria-hidden="true"
                alt=""
                className="h-full w-full object-cover object-center opacity-60 md:opacity-75"
                src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=85"
                style={{
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 28%, black 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 28%, black 100%)",
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-surface-container-low/75 via-surface-container-low/25 to-transparent" />
            </div>

            <div className="relative max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop pt-24">
              {/* Editorial Header Content */}
              <div className="max-w-3xl flex flex-col gap-space-sm mb-space-xl">
                <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm">
                  <span className="material-symbols-outlined text-[1rem]">
                    verified
                  </span>
                  <span>
                    100% Verified Rentals Only • Zero Agent Viewing Fees
                  </span>
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  Find verified rental homes across Ghana.{" "}
                  <span className="text-primary">No sales, no runarounds.</span>
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl">
                  Direct connection with verified landlords in East Legon,
                  Cantonments, Osu, and beyond. Verified backup power and
                  continuous water security listed on every home.
                </p>
              </div>

              {/* Multi-Layer Search Filter Deck */}
              <div
                id="rental-filters"
                className="bg-surface-container-lowest/55 backdrop-blur-xl border border-white/10 rounded-xl shadow-xl p-space-md md:p-space-lg flex flex-col gap-space-md"
              >
                <div className="flex flex-col gap-space-xs">
                  <label
                    className="font-label-sm text-label-sm text-on-surface flex items-center gap-1"
                    htmlFor="location-search"
                  >
                    <span className="material-symbols-outlined text-[1rem] text-primary">
                      search
                    </span>
                    Search by location
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[1.25rem] pointer-events-none">
                      location_on
                    </span>
                    <input
                      aria-label="Search by location"
                      className="w-full h-11 pl-10 pr-10 bg-surface-container-low/55 backdrop-blur-md border border-white/10 rounded-lg text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-high/60 transition-colors"
                      id="location-search"
                      placeholder="Search East Legon, Osu, Airport Residential..."
                      type="text"
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                    />
                    {locationSearch && (
                      <button
                        aria-label="Clear location search"
                        className="absolute right-3 text-on-surface-variant hover:text-on-surface"
                        onClick={() => setLocationSearch("")}
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[1.125rem]">
                          close
                        </span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Input Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-space-sm md:gap-space-md items-end">
                  {/* Neighborhood selector */}
                  <div className="lg:col-span-4 flex flex-col gap-space-xs">
                    <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        location_on
                      </span>
                      Neighborhood in Accra
                    </label>
                    <div className="relative bg-surface-container-low/55 backdrop-blur-md border border-white/10 rounded-lg">
                      <select
                        className="w-full h-11 bg-transparent px-space-sm font-body-md text-on-surface focus:outline-none focus:bg-surface-container-high rounded-lg cursor-pointer appearance-none"
                        value={selectedLocation}
                        onChange={(e) => setSelectedLocation(e.target.value)}
                      >
                        <option value="all">All Accra Locations</option>
                        <option value="East Legon">East Legon</option>
                        <option value="Cantonments">Cantonments</option>
                        <option value="Airport Residential">
                          Airport Residential
                        </option>
                        <option value="Osu">Osu &amp; Ringway</option>
                        <option value="Dzorwulu">Dzorwulu</option>
                        <option value="Spintex">Spintex &amp; Baatsona</option>
                        <option value="Abelemkpe">Abelemkpe</option>
                        <option value="Labone">Labone</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[1.25rem]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Property Type Selector */}
                  <div className="lg:col-span-3 flex flex-col gap-space-xs">
                    <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                      <span className="material-symbols-outlined text-[1rem] text-primary">
                        apartment
                      </span>
                      Rental Type
                    </label>
                    <div className="relative bg-surface-container-low/55 backdrop-blur-md border border-white/10 rounded-lg">
                      <select
                        className="w-full h-11 bg-transparent px-space-sm font-body-md text-on-surface focus:outline-none focus:bg-surface-container-high rounded-lg cursor-pointer appearance-none"
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                      >
                        <option value="any">Any Property Type</option>
                        <optgroup label="Hotels &amp; Lodging">
                          <option value="hotel">Hotel</option>
                          <option value="motel">Motel</option>
                          <option value="bed-breakfast">
                            B&amp;B (Bed &amp; Breakfast)
                          </option>
                          <option value="hostel">Hostel</option>
                          <option value="resort">Resort</option>
                          <option value="guesthouse">Guesthouse</option>
                          <option value="inn-lodge">Inn / Lodge</option>
                          <option value="serviced-apartment">
                            Serviced Apartment / Aparthotel
                          </option>
                          <option value="extended-stay">Extended Stay</option>
                        </optgroup>
                        <optgroup label="Self-Catered / Vacation Rentals">
                          <option value="apartment">Apartment / Condo</option>
                          <option value="studio">Private Studio</option>
                          <option value="cottage-cabin">Cottage / Cabin</option>
                          <option value="chalet">Chalet</option>
                          <option value="villa">Villa</option>
                          <option value="farmhouse-finca">
                            Farmhouse / Finca
                          </option>
                          <option value="townhouse">Townhouse</option>
                          <option value="room">Private Room in Villa</option>
                          <option value="houseboat">Houseboat / Boat</option>
                          <option value="rv-caravan-campground">
                            RV / Caravan / Campground
                          </option>
                          <option value="glamping">Glamping</option>
                        </optgroup>
                      </select>
                      <span className="material-symbols-outlined absolute right-3 top-3 text-on-surface-variant pointer-events-none text-[1.25rem]">
                        expand_more
                      </span>
                    </div>
                  </div>

                  {/* Monthly Budget Selector */}
                  <div className="lg:col-span-3 flex flex-col gap-space-xs">
                    <div className="flex items-center justify-between">
                      <label className="font-label-sm text-label-sm text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[1rem] text-primary">
                          payments
                        </span>
                        Monthly Budget
                      </label>
                      <span className="font-label-sm text-label-sm text-primary font-bold">
                        Max GH₵ {maxPrice.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-11 bg-surface-container-low/55 backdrop-blur-md border border-white/10 px-space-sm rounded-lg flex items-center">
                      <input
                        className="w-full accent-primary cursor-pointer"
                        max={18000}
                        min={1500}
                        step={500}
                        type="range"
                        value={maxPrice}
                        onChange={(e) =>
                          setMaxPrice(parseInt(e.target.value, 10))
                        }
                      />
                    </div>
                  </div>

                  {/* Primary Action */}
                  <div className="lg:col-span-2">
                    <button
                      type="button"
                      className="w-full h-11 bg-primary hover:bg-primary-container text-on-primary rounded-lg font-label-md text-label-md flex items-center justify-center gap-space-xs transition-all shadow-md active:scale-[0.98]"
                    >
                      <span className="material-symbols-outlined text-[1.25rem]">
                        search
                      </span>
                      <span>Find Rentals</span>
                    </button>
                  </div>
                </div>

                {/* Bedroom Filters Row */}
                <div className="flex flex-wrap items-center justify-between gap-space-sm pt-space-xs">
                  <div className="flex items-center gap-space-xs flex-wrap">
                    <span className="font-caption text-caption text-on-surface-variant uppercase tracking-wider mr-1">
                      Bedrooms:
                    </span>
                    {(["any", "1", "2", "3"] as const).map((bed) => (
                      <button
                        key={bed}
                        type="button"
                        className={`px-space-sm py-1 rounded-full font-label-sm text-label-sm transition-colors ${
                          selectedBeds === bed
                            ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                        }`}
                        onClick={() => setSelectedBeds(bed)}
                      >
                        {bed === "any"
                          ? "Any"
                          : bed === "1"
                            ? "1 Bed / Studio"
                            : bed === "2"
                              ? "2 Beds"
                              : "3+ Beds"}
                      </button>
                    ))}
                  </div>
                  <div className="flex items-center gap-space-xs text-on-surface-variant font-caption text-caption">
                    <span className="material-symbols-outlined text-primary text-[1rem]">
                      shield_locked
                    </span>
                    <span>Accra Landlords Vetted with GhanaCard</span>
                  </div>
                </div>
              </div>

              {/* Quick Filter Tags Bar */}
              <div className="mt-space-md flex items-center gap-space-xs overflow-x-auto pb-1 scrollbar-none">
                <span className="font-caption text-caption text-on-surface-variant whitespace-nowrap mr-1">
                  Popular Filters:
                </span>
                <button
                  type="button"
                  onClick={() => {
                    toggleTag("price-low");
                    if (!activeTags.has("price-low")) setMaxPrice(3000);
                  }}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("price-low")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    sell
                  </span>
                  Under GH₵ 3,000/mo
                </button>
                <button
                  type="button"
                  onClick={() => toggleTag("furnished")}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("furnished")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    chair
                  </span>
                  Furnished
                </button>
                <button
                  type="button"
                  onClick={() => toggleTag("gen")}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("gen")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    bolt
                  </span>
                  Standby Generator
                </button>
                <button
                  type="button"
                  onClick={() => toggleTag("polytank")}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("polytank")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    water_drop
                  </span>
                  Water Reservoir (Polytank)
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toggleTag("eastlegon");
                    setSelectedLocation(
                      activeTags.has("eastlegon") ? "all" : "East Legon",
                    );
                  }}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("eastlegon")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    near_me
                  </span>
                  East Legon
                </button>
                <button
                  type="button"
                  onClick={() => toggleTag("selfcontained")}
                  className={`tag-chip flex-shrink-0 px-space-sm py-1 rounded-full font-label-sm text-label-sm shadow-sm transition-colors flex items-center gap-1 ${
                    activeTags.has("selfcontained")
                      ? "bg-secondary-container text-on-secondary-container font-bold"
                      : "bg-surface-container-lowest text-on-surface hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[0.875rem] text-primary">
                    door_front
                  </span>
                  Self-Contained
                </button>
              </div>
            </div>
          </section>

          {/* Main Catalog View Area */}
          <section className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop py-space-xl w-full">
            {/* Results Header with Count & Sort Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-lg">
              <div className="flex flex-col">
                <h2 className="font-headline-lg text-headline-lg text-on-surface">
                  Featured verified rentals in Accra
                </h2>
                <div className="flex items-center gap-space-xs mt-0.5">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    {filteredListings.length} verified homes match your Accra
                    criteria
                  </p>
                </div>
              </div>

              {/* Sorting Pill Strip */}
              <div className="flex items-center gap-space-xs self-start sm:self-auto bg-surface-container-low p-1 rounded-lg">
                <span className="font-caption text-caption text-on-surface-variant px-space-xs hidden md:inline">
                  Sort:
                </span>
                <button
                  type="button"
                  className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all ${
                    sortBy === "verified"
                      ? "text-on-surface bg-surface-container-lowest shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setSortBy("verified")}
                >
                  Verified First
                </button>
                <button
                  type="button"
                  className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all ${
                    sortBy === "price-asc"
                      ? "text-on-surface bg-surface-container-lowest shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setSortBy("price-asc")}
                >
                  Price: Low to High
                </button>
                <button
                  type="button"
                  className={`px-space-sm py-1 rounded font-label-sm text-label-sm transition-all ${
                    sortBy === "newest"
                      ? "text-on-surface bg-surface-container-lowest shadow-sm font-semibold"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                  onClick={() => setSortBy("newest")}
                >
                  Newest
                </button>
              </div>
            </div>

            {/* Rental Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter-desktop">
              {visibleListings.map((card) => {
                const isLiked = likedListings.has(card.id);
                return (
                  <div
                    key={card.id}
                    onClick={() => onNavigate?.("property-detail", card.price)}
                    className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      {/* Visual & Badges */}
                      <div className="relative w-full aspect-[16/10] overflow-hidden bg-surface-container">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          alt={card.title}
                          src={card.imgUrl}
                        />
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm">
                          <span className="material-symbols-outlined text-primary text-[1rem]">
                            verified
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface">
                            {card.hostBadge}
                          </span>
                        </div>
                        <button
                          type="button"
                          aria-label="Save rental"
                          onClick={(e) => toggleLike(card.id, e)}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-sm flex items-center justify-center transition-colors ${
                            isLiked
                              ? "text-error"
                              : "text-on-surface-variant hover:text-error"
                          }`}
                        >
                          <span
                            className="material-symbols-outlined text-[1.25rem]"
                            style={{
                              fontVariationSettings: isLiked
                                ? "'FILL' 1"
                                : "'FILL' 0",
                            }}
                          >
                            favorite
                          </span>
                        </button>
                        <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-surface-container-lowest text-primary font-label-sm text-label-sm shadow-sm">
                          {card.neighborhood}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="p-space-md flex flex-col gap-space-xs">
                        <div className="flex items-center gap-space-xs text-primary font-label-sm text-label-sm">
                          <span className="capitalize">
                            {card.propertyType}
                          </span>
                          <span>•</span>
                          <span className="text-on-surface-variant">
                            {card.subLocation}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-primary transition-colors line-clamp-1">
                          {card.title}
                        </h3>
                        {/* Specs */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 font-body-sm text-body-sm text-on-surface-variant">
                          <span className="inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[1rem] text-primary">
                              bed
                            </span>{" "}
                            {card.beds} Beds
                          </span>
                          <span>•</span>
                          <span className="inline-flex items-center gap-1">
                            <span className="material-symbols-outlined text-[1rem] text-primary">
                              shower
                            </span>{" "}
                            {card.baths} Baths
                          </span>
                          {card.amenities.map((amenity, idx) => (
                            <React.Fragment key={idx}>
                              <span>•</span>
                              <span className="inline-flex items-center gap-1 text-secondary">
                                {amenity}
                              </span>
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Price Block */}
                    <div className="px-space-md pb-space-md pt-space-xs flex items-center justify-between bg-surface-container-lowest">
                      <div className="flex items-baseline gap-1">
                        <span className="font-price-display text-price-display text-on-surface">
                          GH₵ {card.price.toLocaleString()}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          / month
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onNavigate?.("property-detail", card.price);
                        }}
                        className="px-space-sm py-1.5 rounded-lg bg-surface-container hover:bg-primary hover:text-on-primary text-on-surface font-label-sm text-label-sm transition-colors"
                      >
                        Inquire Direct
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Load More Button */}
            <div className="mt-space-2xl flex flex-col items-center justify-center gap-space-sm">
              <button
                type="button"
                disabled={visibleListingCount >= filteredListings.length}
                onClick={() =>
                  setVisibleListingCount((count) =>
                    Math.min(
                      count + LISTINGS_PER_PAGE,
                      filteredListings.length,
                    ),
                  )
                }
                className="px-space-xl py-space-sm rounded-lg bg-surface-container-high hover:bg-surface-container-highest text-on-surface font-label-md text-label-md transition-all flex items-center gap-space-xs shadow-sm"
              >
                <span>
                  {visibleListingCount >= filteredListings.length
                    ? "All matching rentals loaded"
                    : "Load more Accra rentals"}
                </span>
                <span className="material-symbols-outlined text-[1.125rem]">
                  expand_more
                </span>
              </button>
              <span className="font-caption text-caption text-on-surface-variant">
                Showing {Math.min(visibleListingCount, filteredListings.length)}{" "}
                of {filteredListings.length} properties verified in Greater
                Accra
              </span>
            </div>
          </section>

          {/* Neighborhood Explorer Teaser Bar */}
          <section className="w-full bg-surface-container-low py-space-2xl">
            <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md mb-space-lg">
                <div>
                  <span className="font-label-sm text-label-sm text-primary uppercase tracking-widest">
                    Neighborhood Focus
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
                    Accra rental hubs at a glance
                  </h2>
                </div>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
                  Average rents verified through signed lease settlements in
                  Ghana Cedis.
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-space-sm">
                {[
                  { name: "East Legon", avg: "7,200", count: 48 },
                  { name: "Cantonments", avg: "12,500", count: 29 },
                  { name: "Osu & Ringway", avg: "4,000", count: 34 },
                  { name: "Dzorwulu", avg: "5,800", count: 18 },
                  { name: "Airport Res.", avg: "13,800", count: 21 },
                  { name: "Spintex Road", avg: "2,400", count: 52 },
                ].map((hub) => (
                  <div
                    key={hub.name}
                    onClick={() => {
                      setSelectedLocation(hub.name.split(" ")[0]);
                      window.scrollTo({ top: 300, behavior: "smooth" });
                    }}
                    className="bg-surface-container-lowest p-space-sm rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer flex flex-col"
                  >
                    <span className="font-label-md text-label-md text-on-surface font-bold">
                      {hub.name}
                    </span>
                    <span className="font-caption text-caption text-primary">
                      Avg. GH₵ {hub.avg}/mo
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                      {hub.count} rentals active
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Value Proposition Section */}
          <section className="w-full bg-surface py-space-2xl">
            <div className="max-w-7xl mx-auto px-margin md:px-margin-tablet lg:px-margin-desktop">
              <div className="text-center max-w-2xl mx-auto mb-space-2xl">
                <div className="inline-flex items-center gap-space-xs px-space-sm py-1 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm mb-space-xs">
                  <span className="material-symbols-outlined text-[1rem]">
                    verified_user
                  </span>
                  <span>The Accra Rental Standard</span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface">
                  Why rent through Ecoshel?
                </h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
                  We eliminated the traditional stress of Accra housing hunts.
                  Transparent terms, authentic owners, and genuine
                  infrastructure verification.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter-desktop">
                {/* Pillar 1 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm hover:translate-y-[-2px] transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.75rem]">
                      chat
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Direct Landlord Chat
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Connect straight to GhanaCard-verified property owners and
                    registered managers. Zero ghost intermediaries or middleman
                    commission inflation.
                  </p>
                  <div className="pt-space-xs flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[1.125rem]">
                      check_circle
                    </span>
                    <span>Real-time tenant-landlord messaging</span>
                  </div>
                </div>
                {/* Pillar 2 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm hover:translate-y-[-2px] transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.75rem]">
                      money_off
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Zero Agent Viewing Fees
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Never pay non-refundable &quot;registration or inspection
                    fees&quot; just to inspect a flat. Browse, request an
                    in-person walk-through, and rent freely.
                  </p>
                  <div className="pt-space-xs flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[1.125rem]">
                      check_circle
                    </span>
                    <span>100% free home viewing protocol</span>
                  </div>
                </div>
                {/* Pillar 3 */}
                <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-sm flex flex-col gap-space-sm hover:translate-y-[-2px] transition-transform">
                  <div className="w-12 h-12 rounded-lg bg-surface-container-low flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-[1.75rem]">
                      bolt
                    </span>
                  </div>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface">
                    Power &amp; Water Certainty
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">
                    Every listing transparently discloses standby automatic
                    generators, solar inverters, and dedicated polytank water
                    storage volume.
                  </p>
                  <div className="pt-space-xs flex items-center gap-2 text-primary font-label-sm text-label-sm">
                    <span className="material-symbols-outlined text-[1.125rem]">
                      check_circle
                    </span>
                    <span>Physical site verification reports</span>
                  </div>
                </div>
              </div>

              {/* Trust Assurance Box */}
              <div className="mt-space-xl bg-surface-container-low rounded-xl p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md shadow-sm">
                <div className="flex items-center gap-space-md">
                  <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0">
                    <span className="material-symbols-outlined text-[2rem]">
                      gavel
                    </span>
                  </div>
                  <div>
                    <h4 className="font-headline-sm text-headline-sm text-on-surface">
                      Standardized Ghana Rent Act Compliant Leases
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      Ecoshel digital tenancy agreements protect both parties
                      with formal dispute resolution escrow safeguards.
                    </p>
                  </div>
                </div>
                <a
                  className="px-space-md py-space-sm rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high transition-colors font-label-md text-label-md whitespace-nowrap shadow-sm"
                  data-path="how-it-works"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate?.("how-it-works");
                  }}
                >
                  Learn Tenancy Guidelines
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
      <MobileNav activePath="find-a-rental" onNavigate={onNavigate} />
    </div>
  );
}

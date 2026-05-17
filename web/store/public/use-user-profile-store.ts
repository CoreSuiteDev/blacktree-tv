import { create } from "zustand";

export interface Device {
  id: number;
  name: string;
  location: string;
  icon: string;
  current: boolean;
}

export interface PlaylistItem {
  id: string; // The ID is a string here ('m1', 'm2')
  title: string;
  image: string;
  year: number;
  rating: string;
}

export interface UserProfileData {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  membershipTier: string;
  expirationDate: string; // ISO string format
  autoplay: boolean;
  matureContent: boolean;
  devices: Device[];
  watchlist: PlaylistItem[];
}

interface UserProfileState {
  profile: UserProfileData;
  setProfile: (updates: Partial<UserProfileData>) => void;
  revokeDevice: (id: number) => void;
  removeFromWatchlist: (id: string) => void; // --- FIXED: Changed from number to string ---
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: {
    name: "Asif Hosen",
    email: "asif@blacktv.com",
    phone: "+880 1711-223344",
    avatar: "", // Empty string represents fallback icon placeholder
    membershipTier: "Premium Ultra HD",
    expirationDate: new Date(
      Date.now() + 18 * 24 * 60 * 60 * 1000,
    ).toISOString(), // Exactly 18 days left from current generation
    autoplay: true,
    matureContent: false,
    devices: [
      {
        id: 1,
        name: "Sony BRAVIA 4K TV",
        location: "Dhaka, BD",
        icon: "Tv",
        current: true,
      },
      {
        id: 2,
        name: "iPhone 15 Pro Max",
        location: "Mymensingh, BD",
        icon: "Smartphone",
        current: false,
      },
      {
        id: 3,
        name: "MacBook Pro M3",
        location: "Dhaka, BD",
        icon: "Laptop",
        current: false,
      },
    ],
    watchlist: [
      {
        id: "m1",
        title: "Black Panther: Wakanda Forever",
        image: "/movies/panther.jpg",
        year: 2022,
        rating: "8.4",
      },
      {
        id: "m2",
        title: "Doctor Strange in the Multiverse of Madness",
        image: "/movies/strange.jpg",
        year: 2022,
        rating: "7.9",
      },
    ],
  },
  setProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),
  revokeDevice: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        devices: state.profile.devices.filter((device) => device.id !== id),
      },
    })),
  removeFromWatchlist: (
    id, // --- FIXED: id is now correctly filtered as a string ---
  ) =>
    set((state) => ({
      profile: {
        ...state.profile,
        watchlist: state.profile.watchlist.filter((item) => item.id !== id),
      },
    })),
}));

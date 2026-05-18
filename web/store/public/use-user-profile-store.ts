import { create } from "zustand";

export interface Device {
  id: number;
  name: string;
  location: string;
  icon: string;
  current: boolean;
}

export interface PlaylistItem {
  id: string;
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
  // Form input states managed in store
  editName: string;
  editEmail: string;
  editPhone: string;
  timezone: string;
  countdownText: string;

  // Actions
  setProfile: (updates: Partial<UserProfileData>) => void;
  setEditFields: (
    fields: Partial<{
      editName: string;
      editEmail: string;
      editPhone: string;
      timezone: string;
    }>,
  ) => void;
  setCountdownText: (text: string) => void;
  savePersonalDetails: () => void;
  revokeDevice: (id: number) => void;
  removeFromWatchlist: (id: string) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  profile: {
    name: "Asif Hosen",
    email: "asif@blacktv.com",
    phone: "+880 1711-223344",
    avatar: "",
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

  // Initializing edit form fields with default store profile records
  editName: "Asif Hosen",
  editEmail: "asif@blacktv.com",
  editPhone: "+880 1711-223344",
  timezone: "Bangladesh Time (BST)",
  countdownText: "Calculating...",

  setProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),

  setEditFields: (fields) =>
    set((state) => ({
      ...state,
      ...fields,
    })),

  setCountdownText: (text) => set({ countdownText: text }),

  savePersonalDetails: () =>
    set((state) => {
      alert("Personal modifications saved successfully!");
      return {
        profile: {
          ...state.profile,
          name: state.editName,
          email: state.editEmail,
          phone: state.editPhone,
        },
      };
    }),

  revokeDevice: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        devices: state.profile.devices.filter((device) => device.id !== id),
      },
    })),

  removeFromWatchlist: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        watchlist: state.profile.watchlist.filter((item) => item.id !== id),
      },
    })),
}));

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
  username: string; 
  email: string;
  phone: string;
  avatar: string;
  membershipTier: string;
  expirationDate: string;
  autoplay: boolean;
  matureContent: boolean;
  devices: Device[];
  watchlist: PlaylistItem[];
}

interface UserProfileState {
  profile: UserProfileData;
  editName: string;
  editUsername: string;
  editEmail: string;
  editPhone: string;
  timezone: string;
  countdownText: string;

  // Actions
  setProfile: (updates: Partial<UserProfileData>) => void;
  setEditFields: (
    fields: Partial<{
      editName: string;
      editUsername: string;
      editEmail: string;
      editPhone: string;
      timezone: string;
    }>,
  ) => void;
  initializeForm: () => void; // Syncs profile -> form fields
  setCountdownText: (text: string) => void;
  savePersonalDetails: () => void;
  revokeDevice: (id: number) => void;
  removeFromWatchlist: (id: string) => void;
}

export const useUserProfileStore = create<UserProfileState>((set) => ({
  // Mocking initial values for demonstration
  profile: {
    name: "Asif Hosen",
    username: "asifhosen",
    email: "asif@example.com",
    phone: "+8801700000000",
    avatar: "",
    membershipTier: "Premium Tier",
    expirationDate: new Date(
      Date.now() + 10 * 24 * 60 * 60 * 1000,
    ).toISOString(), // 10 days from now
    autoplay: true,
    matureContent: false,
    devices: [],
    watchlist: [],
  },
  editName: "",
  editUsername: "",
  editEmail: "",
  editPhone: "",
  timezone: "Asia/Dhaka",
  countdownText: "",

  setProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),

  setEditFields: (fields) =>
    set((state) => ({
      ...state,
      ...fields,
    })),

  initializeForm: () =>
    set((state) => ({
      editName: state.profile.name,
      editUsername: state.profile.username,
      editEmail: state.profile.email,
      editPhone: state.profile.phone,
    })),

  setCountdownText: (text) => set({ countdownText: text }),

  savePersonalDetails: () =>
    set((state) => ({
      profile: {
        ...state.profile,
        name: state.editName,
        username: state.editUsername,
        email: state.editEmail,
        phone: state.editPhone,
      },
    })),

  revokeDevice: (id) =>
    set((state) => ({
      profile: {
        ...state.profile,
        devices: state.profile.devices.filter((d) => d.id !== id),
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

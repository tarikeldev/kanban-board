import { create } from "zustand";
interface AuthStore {
  accessToken: string | null;
  isLoggedIn: boolean;
  user: any | null;
  logout: () => void;
  login: () => void;
  setUser: (user: any | null) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  accessToken: localStorage.getItem("access_token"),
  user: null,
  isLoggedIn: !!localStorage.getItem("access_token"),
  login: () => {
    const token = localStorage.getItem("access_token");
    set({
      accessToken: token,
      isLoggedIn: !!token,
    });
  },
  logout: () => {
    localStorage.removeItem("access_token");
    set({ accessToken: null, isLoggedIn: false, user: null });
  },
  setUser: (user) => set({ user }),
}));

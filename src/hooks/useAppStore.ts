import { create } from "zustand";
import { users } from "@/data/users";
import { alerts } from "@/data/alerts";
import { Role } from "@/lib/types";

interface AppState {
  role: Role;
  theme: "light" | "dark";
  currentUserId: string;
  unreadNotificationIds: string[];
  isMobileNavOpen: boolean;
  setRole: (role: Role) => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleMobileNav: (open?: boolean) => void;
  markNotificationRead: (id: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  role: "admin",
  theme: "light",
  currentUserId: users[0].id,
  unreadNotificationIds: alerts
    .filter((alert) => !alert.isRead)
    .map((alert) => alert.id),
  isMobileNavOpen: false,
  setRole: (role) => {
    const user = users.find((item) => item.role === role) ?? users[0];
    set({ role, currentUserId: user.id });
  },
  setTheme: (theme) => set({ theme }),
  toggleMobileNav: (open) =>
    set((state) => ({ isMobileNavOpen: open ?? !state.isMobileNavOpen })),
  markNotificationRead: (id) =>
    set((state) => ({
      unreadNotificationIds: state.unreadNotificationIds.filter(
        (item) => item !== id,
      ),
    })),
}));

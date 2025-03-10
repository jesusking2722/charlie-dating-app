import type { NavItemType } from "@/components/layouts/Navbar/NavItemGroup";

export const logoTexts = [
  "Charlie AI counting matches",
  "Charlie AI fetching images",
  "AI doing last corrections",
];

export const MAIN_QUESTIONS = [
  { label: "I just want to have fun 😀", active: false },
  {
    label: "I want to meet someone interesting and have a chat.",
    active: false,
  },
  {
    label: "I'm looking for a soulmate to spend the rest of my life with!",
    active: false,
  },
];

export const INITIAL_NAVS: NavItemType[] = [
  { path: "/", label: "My Profile", icon: "user", active: false },
  { path: "/", label: "Notification", icon: "bell", active: false },
  { path: "/", label: "My Favourite", icon: "heart", active: false },
  { path: "/", label: "Settings", icon: "gear", active: false },
  { path: "/", label: "Help & Support", icon: "snapchat", active: false },
];

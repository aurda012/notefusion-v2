import { JournalConfig } from "@/types";

export const journalConfig: JournalConfig = {
  mainNav: [
    {
      title: "Entries",
      href: "/dashboard",
    },
    {
      title: "Billing",
      href: "/dashboard",
    },
    {
      title: "Settings",
      href: "/dashboard",
    },
  ],
  sidebarNav: [
    {
      title: "Entries",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard",
      icon: "billing",
    },
    {
      title: "Settings",
      href: "/dashboard",
      icon: "settings",
    },
  ],
};

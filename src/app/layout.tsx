export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { DM_Sans } from "next/font/google";
import { twMerge } from "tailwind-merge";
import AppStateProvider from "@/providers/state-provider";
import { SupabaseUserProvider } from "@/providers/supabase-user-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = DM_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NoteFusion",
  description: "An all-in-one Collaboration and Productivity Platform",
  keywords: [
    "Next.js",
    "React",
    "Tailwind CSS",
    "Server Components",
    "Radix UI",
    "Journal App",
    "Shadcn",
    "Editor",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={twMerge("bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <SupabaseUserProvider>
            <AppStateProvider>
              {children}
              <Toaster />
            </AppStateProvider>
          </SupabaseUserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

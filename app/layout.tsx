import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PreferencesProvider } from "@/context/preferences-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "MockPrep — Free mock tests, job guides and prep roadmaps",
    template: "%s · MockPrep",
  },
  description: "Bilingual timed mock tests, step-by-step job application guides and exam roadmaps. Free for every aspirant.",
};

// viewport-fit=cover lets env(safe-area-inset-*) pad around phone notches.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <PreferencesProvider>{children}</PreferencesProvider>
      </body>
    </html>
  );
}

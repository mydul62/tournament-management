import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { LiveTicker } from "@/components/layout/live-ticker";
import { Footer } from "@/components/layout/footer";
import { getLiveMatches } from "@/data/matches/get-live-matches";

export const metadata: Metadata = {
  title: "SPORTIFY — Next-Gen Tournament Platform",
  description: "Manage, track, and stream university and amateur sports tournaments with live standings, fixtures, and realtime updates.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const liveMatches = await getLiveMatches();

  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 min-h-screen flex flex-col antialiased">
        <Navbar />
        <LiveTicker matches={liveMatches} />
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

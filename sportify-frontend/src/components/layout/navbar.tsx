"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Trophy, Shield, Activity, Award, PlusCircle, LayoutDashboard, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { name: "Tournaments", href: "/tournaments", icon: Trophy },
  { name: "Live Matches", href: "/matches", icon: Activity },
  { name: "Teams", href: "/teams", icon: Shield },
  { name: "Leaderboard", href: "/stats", icon: Award },
  { name: "Admin Console", href: "/admin", icon: LayoutDashboard },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full glass-card border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
              <Trophy className="w-6 h-6 text-slate-950 stroke-[2.5]" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">
              SPORT<span className="gradient-text">IFY</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    isActive
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "text-slate-300 hover:text-white hover:bg-slate-800/50"
                  )}
                >
                  <Icon className={cn("w-4 h-4", isActive ? "text-emerald-400" : "text-slate-400")} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="flex items-center space-x-3">
            <Link
              href="/login"
              className="flex items-center space-x-2 px-3.5 py-2 rounded-lg text-xs font-bold text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors"
            >
              <LogIn className="w-3.5 h-3.5 text-emerald-400" />
              <span>Admin Login</span>
            </Link>

            <Link
              href="/admin/tournaments/create"
              className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Create Tournament</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

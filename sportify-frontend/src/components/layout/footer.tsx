import Link from "next/link";
import { Trophy, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 mt-20 text-slate-400 py-12 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-slate-950" />
              </div>
              <span className="text-lg font-bold text-white">SPORTIFY</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The next-generation tournament management ecosystem powered by Next.js Server-First Architecture.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Tournaments</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/tournaments" className="hover:text-emerald-400 transition-colors">Browse All</Link></li>
              <li><Link href="/tournaments?status=ONGOING" className="hover:text-emerald-400 transition-colors">Live Leagues</Link></li>
              <li><Link href="/tournaments?format=KNOCKOUT" className="hover:text-emerald-400 transition-colors">Knockout Cups</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">Matches & Stats</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/matches" className="hover:text-emerald-400 transition-colors">Match Center</Link></li>
              <li><Link href="/stats" className="hover:text-emerald-400 transition-colors">Golden Boot Leaderboard</Link></li>
              <li><Link href="/teams" className="hover:text-emerald-400 transition-colors">Registered Squads</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-3">System</h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/admin" className="hover:text-emerald-400 transition-colors">Organizer Admin Console</Link></li>
              <li className="text-emerald-400 font-mono text-[11px]">Server-First Fetch Engine v2.0</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-900 mt-8 pt-8 flex items-center justify-between text-xs text-slate-500">
          <p>© 2026 SPORTIFY Platform. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="flex items-center space-x-1 text-emerald-400"><Globe className="w-3.5 h-3.5" /> <span>Native fetch() Engine</span></span>
          </div>
        </div>
      </div>
    </footer>
  );
}

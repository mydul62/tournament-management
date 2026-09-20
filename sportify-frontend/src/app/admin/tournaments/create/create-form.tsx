"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Trophy, CheckCircle2 } from "lucide-react";
import { createTournament } from "@/actions/tournaments/create-tournament";

export function CreateTournamentForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const res = await createTournament(formData);
      if (res.success) {
        setStatusMessage(res.message || "Tournament created successfully!");
        setTimeout(() => {
          router.push("/admin");
        }, 1200);
      } else {
        setStatusMessage(res.error || "Failed to create tournament.");
      }
    });
  };

  return (
    <div className="glass-card p-8 rounded-3xl border border-slate-800 bg-slate-900/80 shadow-2xl">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <Trophy className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-2xl font-black text-white">Host a New Tournament</h1>
          <p className="text-xs text-slate-400">Configure league format, schedule, and details</p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 mb-6 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>{statusMessage}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div>
          <label className="block text-slate-300 font-semibold mb-1.5">Tournament Name *</label>
          <input
            type="text"
            name="name"
            required
            placeholder="e.g. Autumn University Cup 2026"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-semibold mb-1.5">Description</label>
          <textarea
            name="description"
            rows={3}
            placeholder="Brief details about tournament rules, prizes, and participating teams..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Format *</label>
            <select
              name="format"
              defaultValue="LEAGUE"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            >
              <option value="LEAGUE">Round Robin League</option>
              <option value="KNOCKOUT">Single Elimination Knockout</option>
              <option value="GROUP_AND_KNOCKOUT">Group Stage + Knockout</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Location</label>
            <input
              type="text"
              name="location"
              placeholder="Main Campus Stadium"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">Start Date *</label>
            <input
              type="date"
              name="startDate"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-semibold mb-1.5">End Date *</label>
            <input
              type="date"
              name="endDate"
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isPending}
            className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20"
          >
            {isPending ? "Creating Tournament..." : "Publish Tournament"}
          </button>
        </div>
      </form>
    </div>
  );
}

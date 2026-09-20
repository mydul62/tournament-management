"use client";

import { Suspense, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ShieldCheck, Mail, KeyRound, AlertTriangle, Sparkles, LogIn } from "lucide-react";
import { loginAction } from "@/actions/auth/login-action";

function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");
  const redirectParam = searchParams.get("redirect") || "/admin";

  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(
    errorParam === "unauthorized"
      ? "Please log in with an Admin account to access the Admin Console."
      : null
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleQuickAdminFill = () => {
    setEmail("admin@sportify.com");
    setPassword("admin123");
    setErrorMessage(null);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage(null);

    const formData = new FormData(e.currentTarget);
    formData.append("requireAdmin", "true");

    startTransition(async () => {
      const res = await loginAction(formData);
      if (res.success) {
        router.push(redirectParam);
        router.refresh();
      } else {
        setErrorMessage(res.error || "Login failed.");
      }
    });
  };

  return (
    <div className="glass-card rounded-3xl p-8 border border-slate-800 bg-slate-900/80 shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/20">
          <ShieldCheck className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-black text-white">Admin Console Login</h1>
        <p className="text-xs text-slate-400 leading-relaxed">
          Restricted access. Only verified Administrators and Tournament Organizers can log in.
        </p>
      </div>

      {/* Error Alert */}
      {errorMessage && (
        <div className="p-4 mb-6 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold flex items-start space-x-2">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5 text-xs">
        <div>
          <label className="block text-slate-300 font-bold mb-1.5 flex items-center space-x-1.5">
            <Mail className="w-3.5 h-3.5 text-emerald-400" />
            <span>Admin Email Address</span>
          </label>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@sportify.com"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
          />
        </div>

        <div>
          <label className="block text-slate-300 font-bold mb-1.5 flex items-center space-x-1.5">
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" />
            <span>Password</span>
          </label>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500 text-sm font-medium"
          />
        </div>

        {/* Quick Fill Button */}
        <button
          type="button"
          onClick={handleQuickAdminFill}
          className="w-full py-2.5 px-3 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-emerald-400 border border-emerald-500/20 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fill Demo Admin Credentials (admin@sportify.com)</span>
        </button>

        <button
          type="submit"
          disabled={isPending}
          className="w-full py-3.5 px-6 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-black text-sm transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center space-x-2"
        >
          <LogIn className="w-4 h-4" />
          <span>{isPending ? "Authenticating..." : "Log In as Administrator"}</span>
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="max-w-md mx-auto py-12 px-4">
      <Suspense fallback={<div className="text-center text-slate-400 text-sm py-12">Loading Admin Login Portal...</div>}>
        <LoginFormContent />
      </Suspense>
    </div>
  );
}

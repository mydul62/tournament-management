import { redirect } from "next/navigation";
import { requireAdminUser } from "@/data/auth/get-current-user";
import { CreateTournamentForm } from "./create-form";

export const metadata = {
  title: "Create Tournament — SPORTIFY Admin",
  description: "Host a new tournament, set rules, and configure dates.",
};

export default async function CreateTournamentPage() {
  const user = await requireAdminUser();

  // Guard: Admin only
  if (!user) {
    redirect("/login?error=unauthorized");
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <CreateTournamentForm />
    </div>
  );
}

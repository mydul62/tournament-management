export interface ITournament {
  id?: string;
  name: string;
  slug?: string;
  description?: string;
  bannerUrl?: string;
  location?: string;
  startDate: string;
  endDate: string;
  format: "LEAGUE" | "KNOCKOUT" | "GROUP_AND_KNOCKOUT";
  status?: "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";
  organizerId?: string;
}

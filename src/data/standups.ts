import { Standup } from "@/lib/types";
export const standups: Standup[] = [
  {
    id: "s1",
    userId: "u2",
    date: "2026-04-21",
    yesterday: "Reviewed client renewals",
    today: "Sync on overdue accounts",
    blockers: "None",
    submitted: true,
  },
  {
    id: "s2",
    userId: "u3",
    date: "2026-04-21",
    yesterday: "Qualified 4 new leads",
    today: "Close follow-ups",
    blockers: "Waiting on pricing deck",
    submitted: true,
  },
  {
    id: "s3",
    userId: "u4",
    date: "2026-04-21",
    yesterday: "Wrote ad copy set",
    today: "Finalize landing edits",
    blockers: "Late creative assets",
    submitted: false,
  },
  {
    id: "s4",
    userId: "u5",
    date: "2026-04-21",
    yesterday: "Pulled finance snapshots",
    today: "Prep team report",
    blockers: "None",
    submitted: false,
  },
];

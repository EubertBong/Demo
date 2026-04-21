import { AppShell } from "@/components/layout/AppShell";
import { leads } from "@/data/leads";
import { Button, Card } from "@/components/shared/ui";
import { ExportButton, StatsCard } from "@/components/shared/widgets";

export default function SalesPage() {
  const stages = ["new", "contacted", "follow-up", "qualified", "won"] as const;

  return (
    <AppShell title="Sales Tracker">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="New Leads" value="15" />
          <StatsCard label="Follow-ups Due" value="8" />
          <StatsCard label="Deals Won" value="3" />
          <StatsCard label="Outreach Sent Today" value="61" />
        </div>

        <Card className="p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-sm font-medium text-slate-800 dark:text-slate-100">
              Kanban Board
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Drag-and-drop demo view
            </p>
          </div>
          <div className="grid gap-3 lg:grid-cols-5">
            {stages.map((stage) => {
              const stageLeads = leads
                .filter((lead) => lead.stage === stage)
                .slice(0, 3);
              return (
                <div
                  key={stage}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-2 dark:border-slate-700 dark:bg-slate-800/70"
                >
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-300">
                      {stage}
                    </p>
                    <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] text-slate-700 dark:bg-slate-700 dark:text-slate-200">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="space-y-2">
                    {stageLeads.map((lead) => (
                      <div
                        key={lead.id}
                        className="rounded-lg border border-slate-200 bg-white p-2 text-xs shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-900/90"
                      >
                        <p className="font-medium text-slate-800 dark:text-slate-100">
                          {lead.company}
                        </p>
                        <p className="text-slate-500 dark:text-slate-400">
                          ${lead.value.toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <div className="flex flex-wrap gap-2">
          <Button>Add Lead</Button>
          <Button>Log Outreach</Button>
          <ExportButton label="Export CSV" />
        </div>
      </div>
    </AppShell>
  );
}

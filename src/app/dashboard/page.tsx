import { AppShell } from "@/components/layout/AppShell";
import {
  RevenueChart,
  SalesActivityChart,
} from "@/components/dashboard/charts";
import { alerts } from "@/data/alerts";
import { clients } from "@/data/clients";
import { Button, Card, FadeIn } from "@/components/shared/ui";
import {
  ClientTable,
  ExportButton,
  StatsCard,
} from "@/components/shared/widgets";

export default function DashboardPage() {
  const overduePayments = clients.filter(
    (item) => item.paymentStatus === "overdue",
  ).length;
  const stats = [
    ["Active Clients", `${clients.length}`],
    ["Monthly Revenue", "$82.7K"],
    ["Revenue Projection", "$96.4K"],
    ["Overdue Payments", `${overduePayments}`],
    ["Sales This Week", "24"],
    ["Missed Standups", "2"],
  ];
  return (
    <AppShell title="CEO Dashboard">
      <FadeIn>
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {stats.map(([label, value]) => (
              <StatsCard
                key={label}
                label={label}
                value={value}
                delta="Up from last week"
              />
            ))}
          </div>
          <div className="grid gap-4 xl:grid-cols-3">
            <div className="space-y-4 xl:col-span-2">
              <RevenueChart />
              <SalesActivityChart />
            </div>
            <Card className="p-4">
              <p className="text-sm font-semibold text-slate-800">Alerts</p>
              <div className="mt-3 space-y-2">
                {alerts.slice(0, 6).map((alert) => (
                  <div
                    key={alert.id}
                    className="rounded-xl border border-slate-100 p-3"
                  >
                    <p className="text-sm font-medium text-slate-700">
                      {alert.title}
                    </p>
                    <p className="text-xs text-slate-500">
                      {alert.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button>Add Client</Button>
            <Button>Log Payment</Button>
            <Button>Add Lead</Button>
            <Button>View Team Report</Button>
            <ExportButton label="Export CSV" />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-slate-700">
              Client health overview
            </p>
            <ClientTable />
          </div>
        </div>
      </FadeIn>
    </AppShell>
  );
}

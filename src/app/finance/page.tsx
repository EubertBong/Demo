"use client";

import { AppShell } from "@/components/layout/AppShell";
import { expenses } from "@/data/expenses";
import { payments } from "@/data/payments";
import { clients } from "@/data/clients";
import { Button, Card } from "@/components/shared/ui";
import { ExportButton, StatsCard } from "@/components/shared/widgets";
import { useAppStore } from "@/hooks/useAppStore";

export default function FinancePage() {
  const role = useAppStore((state) => state.role);
  if (role === "staff") {
    return (
      <AppShell title="Finance & Payments">
        <Card className="p-6 text-sm text-slate-600">
          Staff view has limited finance visibility. Switch to manager or admin
          from the header role switcher to preview full finance controls.
        </Card>
      </AppShell>
    );
  }
  return (
    <AppShell title="Finance & Payments">
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard label="Collected This Month" value="$45.4K" />
          <StatsCard label="Outstanding Payments" value="$20.7K" />
          <StatsCard label="Contractor Payouts" value="$4.7K" />
          <StatsCard label="Expense Total" value="$12.4K" />
        </div>
        <Card className="p-4">
          <p className="mb-2 text-sm font-medium">Payment tracker</p>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="px-4 py-3.5 font-medium">Client</th>
                <th className="px-4 py-3.5 font-medium">Amount</th>
                <th className="px-4 py-3.5 font-medium">Due Date</th>
                <th className="px-4 py-3.5 font-medium">Status</th>
                <th className="px-4 py-3.5 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((item, index) => {
                const client = clients.find(
                  (entry) => entry.id === item.clientId,
                );
                return (
                  <tr
                    key={item.id}
                    className={
                      index % 2 === 0
                        ? "border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                        : "border-t border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40"
                    }
                  >
                    <td className="px-4 py-3.5">{client?.name}</td>
                    <td className="px-4 py-3.5">
                      ${item.amount.toLocaleString()}
                    </td>
                    <td className="px-4 py-3.5">{item.dueDate}</td>
                    <td className="px-4 py-3.5 capitalize">{item.status}</td>
                    <td className="px-4 py-3.5">{item.method}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-sm font-medium">Expense log</p>
          {expenses.map((item, index) => (
            <div
              key={item.id}
              className={
                index % 2 === 0
                  ? "flex justify-between border-t border-slate-100 bg-white px-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-900"
                  : "flex justify-between border-t border-slate-100 bg-slate-50/70 px-3 py-3 text-sm dark:border-slate-800 dark:bg-slate-800/40"
              }
            >
              <span>
                {item.category} - {item.description}
              </span>
              <span>${item.amount}</span>
            </div>
          ))}
        </Card>
        <div className="flex gap-2">
          <Button>Log Payment</Button>
          <Button>Add Expense</Button>
          <ExportButton label="Export PDF" />
        </div>
      </div>
    </AppShell>
  );
}

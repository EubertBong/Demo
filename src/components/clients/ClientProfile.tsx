"use client";

import { useState } from "react";
import { clients } from "@/data/clients";
import { users } from "@/data/users";
import { payments } from "@/data/payments";
import { weeklyUpdates } from "@/data/weeklyUpdates";
import { communicationLogs } from "@/data/communicationLogs";
import { tasks } from "@/data/tasks";
import { auditTrail } from "@/data/auditTrail";
import { Button, Card } from "@/components/shared/ui";
import { HealthBadge } from "@/components/shared/widgets";

const tabs = [
  "Overview",
  "Payments",
  "Performance",
  "Weekly Updates",
  "Communication Log",
  "Tasks",
] as const;

export function ClientProfile({ clientId }: { clientId: string }) {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const client = clients.find((item) => item.id === clientId);
  if (!client) return <Card className="p-6">Client not found.</Card>;
  const owner = users.find((item) => item.id === client.ownerId);
  const clientPayments = payments.filter((item) => item.clientId === client.id);
  const clientUpdates = weeklyUpdates.filter(
    (item) => item.clientId === client.id,
  );
  const clientLogs = communicationLogs.filter(
    (item) => item.clientId === client.id,
  );
  const clientTasks = tasks.filter((item) => item.clientId === client.id);
  const clientAudit = auditTrail.filter(
    (item) =>
      item.entityId === client.id ||
      clientTasks.some((task) => task.id === item.entityId),
  );

  return (
    <div className="space-y-4">
      <Card className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs text-slate-500">Client profile</p>
            <h2 className="text-2xl font-semibold text-slate-900">
              {client.name}
            </h2>
            <p className="text-sm text-slate-500">
              {client.industry} · Owner {owner?.name}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <HealthBadge status={client.healthStatus} />
            <Button>Export PDF</Button>
          </div>
        </div>
      </Card>
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-xl px-3 py-2 text-sm whitespace-nowrap ${tab === item ? "bg-slate-900 text-white" : "bg-white text-slate-600 border border-slate-200"}`}
          >
            {item}
          </button>
        ))}
      </div>
      {tab === "Overview" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-2">
            <p className="text-sm font-medium text-slate-700">
              Account summary
            </p>
            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <p>
                Monthly Revenue:{" "}
                <span className="font-semibold">
                  ${client.monthlyRevenue.toLocaleString()}
                </span>
              </p>
              <p>
                Payment Status:{" "}
                <span className="capitalize">{client.paymentStatus}</span>
              </p>
              <p>Assigned Team: Growth + Creative</p>
              <p>Alerts: {client.alertCount}</p>
            </div>
            <p className="mt-3 text-sm text-slate-600">{client.notes}</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-medium">Alerts summary</p>
            <p className="mt-2 text-sm text-slate-600">
              {client.alertCount} active account alerts.
            </p>
          </Card>
        </div>
      )}
      {tab === "Payments" && (
        <Card className="p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate-500">
                <th className="px-4 py-3.5 font-medium">Invoice</th>
                <th className="px-4 py-3.5 font-medium">Amount</th>
                <th className="px-4 py-3.5 font-medium">Due Date</th>
                <th className="px-4 py-3.5 font-medium">Status</th>
                <th className="px-4 py-3.5 font-medium">Method</th>
              </tr>
            </thead>
            <tbody>
              {clientPayments.map((item, index) => (
                <tr
                  key={item.id}
                  className={
                    index % 2 === 0
                      ? "border-t border-slate-100 bg-white dark:border-slate-800 dark:bg-slate-900"
                      : "border-t border-slate-100 bg-slate-50/70 dark:border-slate-800 dark:bg-slate-800/40"
                  }
                >
                  <td className="px-4 py-3.5">{item.id.toUpperCase()}</td>
                  <td className="px-4 py-3.5">
                    ${item.amount.toLocaleString()}
                  </td>
                  <td className="px-4 py-3.5">{item.dueDate}</td>
                  <td className="px-4 py-3.5 capitalize">{item.status}</td>
                  <td className="px-4 py-3.5">{item.method}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
      {tab === "Performance" && (
        <Card className="p-4">
          <p className="text-sm font-medium">Performance</p>
          <p className="mt-2 text-sm text-slate-600">
            Weekly trend: {client.weeklyPerformance}
          </p>
          <p className="mt-1 text-sm text-slate-600">
            Summary: account remains stable with room to improve conversion by
            testing creative and offer bundles.
          </p>
        </Card>
      )}
      {tab === "Weekly Updates" && (
        <div className="space-y-3">
          {clientUpdates.map((item) => (
            <Card key={item.id} className="p-4">
              <p className="text-sm font-medium">{item.weekLabel}</p>
              <p className="mt-1 text-sm text-slate-600">{item.summary}</p>
              <p className="mt-2 text-sm text-slate-500">
                Next: {item.nextActions}
              </p>
            </Card>
          ))}
        </div>
      )}
      {tab === "Communication Log" && (
        <div className="space-y-3">
          {clientLogs.map((item) => (
            <Card key={item.id} className="p-4">
              <p className="text-xs uppercase text-slate-500">{item.type}</p>
              <p className="mt-1 text-sm text-slate-700">{item.note}</p>
              <p className="text-xs text-slate-400">{item.createdAt}</p>
            </Card>
          ))}
        </div>
      )}
      {tab === "Tasks" && (
        <div className="grid gap-4 lg:grid-cols-3">
          <Card className="p-4 lg:col-span-2">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-slate-500">
                  <th className="px-4 py-3.5 font-medium">Task</th>
                  <th className="px-4 py-3.5 font-medium">Assignee</th>
                  <th className="px-4 py-3.5 font-medium">Status</th>
                  <th className="px-4 py-3.5 font-medium">Due</th>
                  <th className="px-4 py-3.5 font-medium">Priority</th>
                </tr>
              </thead>
              <tbody>
                {clientTasks.map((item, index) => {
                  const assignee = users.find(
                    (user) => user.id === item.assigneeId,
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
                      <td className="px-4 py-3.5">{item.title}</td>
                      <td className="px-4 py-3.5">{assignee?.name}</td>
                      <td className="px-4 py-3.5 capitalize">{item.status}</td>
                      <td className="px-4 py-3.5">{item.dueDate}</td>
                      <td className="px-4 py-3.5 capitalize">
                        {item.priority}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>
          <Card className="p-4">
            <p className="text-sm font-medium">Audit trail</p>
            <div className="mt-2 space-y-2">
              {clientAudit.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-100 p-2 text-xs"
                >
                  <p className="text-slate-700">
                    {item.action} {item.fieldChanged}
                  </p>
                  <p className="text-slate-400">{item.changedAt}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { clients } from "@/data/clients";
import { users } from "@/data/users";
import { cn } from "@/lib/utils";
import { Badge, Button, Card } from "./ui";

export function HealthBadge({
  status,
}: {
  status: "healthy" | "warning" | "critical";
}) {
  const color = {
    healthy: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    critical: "bg-rose-100 text-rose-700",
  };
  return <Badge className={cn("capitalize", color[status])}>{status}</Badge>;
}

export function StatsCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <Card className="p-4">
      <p className="text-xs text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-slate-100">
        {value}
      </p>
      {delta && <p className="mt-1 text-xs text-emerald-600">{delta}</p>}
    </Card>
  );
}

export function ExportButton({ label }: { label: string }) {
  return (
    <Button>
      <Download className="h-4 w-4" />
      {label}
    </Button>
  );
}

export function ClientTable() {
  return (
    <Card className="overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-slate-500 dark:bg-slate-800 dark:text-slate-300">
          <tr>
            {[
              "Client Name",
              "Industry",
              "Monthly Revenue",
              "Payment",
              "Health",
              "Last Update",
              "Owner",
            ].map((header) => (
              <th key={header} className="px-5 py-3.5 font-medium">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {clients.map((client, index) => {
            const owner = users.find((user) => user.id === client.ownerId);
            return (
              <tr
                key={client.id}
                className={cn(
                  "border-t border-slate-100 dark:border-slate-800 hover:bg-slate-100/80 dark:hover:bg-slate-700/40",
                  index % 2 === 0
                    ? "bg-white dark:bg-slate-900"
                    : "bg-slate-50/70 dark:bg-slate-800/40",
                )}
              >
                <td className="px-5 py-4">
                  <Link
                    href={`/clients/${client.id}`}
                    className="inline-flex items-center gap-1 font-medium text-slate-800 hover:text-slate-950 dark:text-slate-100 dark:hover:text-white"
                  >
                    {client.name}
                    <ArrowUpRight className="h-3 w-3" />
                  </Link>
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {client.industry}
                </td>
                <td className="px-5 py-4 text-slate-700 dark:text-slate-200">
                  ${client.monthlyRevenue.toLocaleString()}
                </td>
                <td className="px-5 py-4 capitalize text-slate-700 dark:text-slate-200">
                  {client.paymentStatus}
                </td>
                <td className="px-5 py-4">
                  <HealthBadge status={client.healthStatus} />
                </td>
                <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                  Today
                </td>
                <td className="px-5 py-4 text-slate-600 dark:text-slate-300">
                  {owner?.name}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
}

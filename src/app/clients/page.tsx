import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/shared/ui";
import { ClientTable, ExportButton } from "@/components/shared/widgets";

export default function ClientsPage() {
  return (
    <AppShell title="Client Hub">
      <div className="space-y-4">
        <Card className="p-4">
          <div className="grid gap-2 md:grid-cols-4">
            <input
              className="rounded-xl border px-3 py-2 text-sm md:col-span-2"
              placeholder="Search clients"
            />
            <select className="rounded-xl border px-3 py-2 text-sm">
              <option>Health Status</option>
              <option>Healthy</option>
              <option>Warning</option>
              <option>Critical</option>
            </select>
            <select className="rounded-xl border px-3 py-2 text-sm">
              <option>Payment Status</option>
              <option>Paid</option>
              <option>Pending</option>
              <option>Overdue</option>
            </select>
          </div>
        </Card>
        <div className="flex justify-end">
          <ExportButton label="Export CSV" />
        </div>
        <ClientTable />
      </div>
    </AppShell>
  );
}

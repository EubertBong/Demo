import { AppShell } from "@/components/layout/AppShell";
import { standups } from "@/data/standups";
import { tasks } from "@/data/tasks";
import { users } from "@/data/users";
import { Button, Card } from "@/components/shared/ui";

export default function TeamPage() {
  return (
    <AppShell title="Team & Tasks">
      <div className="space-y-4">
        <Card className="p-4">
          <p className="mb-2 text-sm font-medium">Daily standup log</p>
          {standups.map((item) => {
            const user = users.find((entry) => entry.id === item.userId);
            return (
              <div
                key={item.id}
                className="border-t border-slate-100 py-2 text-sm"
              >
                <p className="font-medium">
                  {user?.name} {item.submitted ? "- Submitted" : "- Missing"}
                </p>
                <p className="text-slate-500">Today: {item.today}</p>
              </div>
            );
          })}
        </Card>
        <Card className="p-4">
          <p className="mb-2 text-sm font-medium">
            Task board grouped by client
          </p>
          {tasks.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="border-t border-slate-100 py-2 text-sm"
            >
              {item.title} - <span className="capitalize">{item.status}</span>
            </div>
          ))}
        </Card>
        <div className="flex gap-2">
          <Button>Add Task</Button>
          <Button>Submit Standup</Button>
          <Button>View Weekly Report</Button>
        </div>
      </div>
    </AppShell>
  );
}

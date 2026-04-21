import { Card } from "./ui";

export function AlertPanel({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function SearchAndFiltersBar({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="grid gap-2 md:grid-cols-4">{children}</div>;
}
export function ClientProfileHeader({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Card className="p-5">{children}</Card>;
}
export function SalesKanbanBoard({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function PaymentTable({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function ExpenseTable({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function StandupTable({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function TaskBoard({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function AuditTrailPanel({ children }: { children: React.ReactNode }) {
  return <Card className="p-4">{children}</Card>;
}
export function EmptyState({ text }: { text: string }) {
  return <Card className="p-6 text-center text-sm text-slate-500">{text}</Card>;
}

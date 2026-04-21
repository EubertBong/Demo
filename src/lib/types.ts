export type Role = "admin" | "manager" | "staff";

export interface User {
  id: string;
  name: string;
  role: Role;
  email: string;
  avatar: string;
  team: string;
}
export interface Client {
  id: string;
  name: string;
  industry: string;
  ownerId: string;
  monthlyRevenue: number;
  paymentStatus: "paid" | "overdue" | "pending";
  healthStatus: "healthy" | "warning" | "critical";
  weeklyPerformance: string;
  alertCount: number;
  joinedDate: string;
  notes: string;
}
export interface Alert {
  id: string;
  type: "payment" | "standup" | "outreach" | "task";
  title: string;
  description: string;
  severity: "low" | "medium" | "high";
  clientId?: string;
  createdAt: string;
  isRead: boolean;
}
export interface Payment {
  id: string;
  clientId: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: "paid" | "overdue" | "pending";
  method: string;
}
export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}
export interface Lead {
  id: string;
  company: string;
  contactName: string;
  stage: "new" | "contacted" | "follow-up" | "qualified" | "won";
  value: number;
  nextFollowUp: string;
  ownerId: string;
  outreachCount: number;
}
export interface Task {
  id: string;
  title: string;
  clientId: string;
  assigneeId: string;
  status: "todo" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  dueDate: string;
}
export interface Standup {
  id: string;
  userId: string;
  date: string;
  yesterday: string;
  today: string;
  blockers: string;
  submitted: boolean;
}
export interface WeeklyUpdate {
  id: string;
  clientId: string;
  weekLabel: string;
  summary: string;
  performanceNote: string;
  nextActions: string;
}
export interface CommunicationLog {
  id: string;
  clientId: string;
  type: "call" | "whatsapp" | "email" | "meeting";
  note: string;
  createdAt: string;
  createdBy: string;
}
export interface AuditTrail {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  fieldChanged: string;
  oldValue: string;
  newValue: string;
  changedBy: string;
  changedAt: string;
}

"use client";

import {
  ResponsiveContainer,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar,
} from "recharts";
import { Card } from "@/components/shared/ui";

const revenueData = [
  { name: "Jan", value: 72 },
  { name: "Feb", value: 78 },
  { name: "Mar", value: 81 },
  { name: "Apr", value: 88 },
  { name: "May", value: 93 },
  { name: "Jun", value: 97 },
];
const salesData = [
  { name: "Mon", value: 12 },
  { name: "Tue", value: 18 },
  { name: "Wed", value: 16 },
  { name: "Thu", value: 21 },
  { name: "Fri", value: 24 },
];

export function RevenueChart() {
  return (
    <Card className="h-72 p-4">
      <p className="mb-2 text-sm font-medium text-slate-700">Revenue Trend</p>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#0ea5e9"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

export function SalesActivityChart() {
  return (
    <Card className="h-72 p-4">
      <p className="mb-2 text-sm font-medium text-slate-700">Sales Activity</p>
      <ResponsiveContainer width="100%" height="90%">
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#22c55e" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

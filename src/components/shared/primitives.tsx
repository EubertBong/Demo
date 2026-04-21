"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Menu, Moon, Sun, X } from "lucide-react";
import { alerts } from "@/data/alerts";
import { users } from "@/data/users";
import { Role } from "@/lib/types";
import { useAppStore } from "@/hooks/useAppStore";
import { Button, Card } from "./ui";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/clients", label: "Clients" },
  { href: "/sales", label: "Sales" },
  { href: "/finance", label: "Finance" },
  { href: "/team", label: "Team" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const role = useAppStore((state) => state.role);
  const visibleItems = navItems.filter(
    (item) => role !== "staff" || item.href !== "/finance",
  );

  return (
    <aside className="hidden w-64 shrink-0 border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col">
      <div className="border-b border-slate-200 p-5 text-lg font-semibold dark:border-slate-800 dark:text-slate-100">
        Brightlane Ops
      </div>
      <nav className="space-y-1 p-3">
        {visibleItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-xl px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-slate-100",
              pathname.startsWith(item.href) &&
                "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100",
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

export function RoleSwitcher() {
  const role = useAppStore((state) => state.role);
  const setRole = useAppStore((state) => state.setRole);

  return (
    <select
      className="rounded-xl border border-slate-200 px-3 py-2 text-sm capitalize text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
      value={role}
      onChange={(event) => setRole(event.target.value as Role)}
    >
      <option value="admin">Admin</option>
      <option value="manager">Manager</option>
      <option value="staff">Staff</option>
    </select>
  );
}

export function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const setTheme = useAppStore((state) => state.setTheme);

  useEffect(() => {
    const stored = window.localStorage.getItem("app-theme");
    if (stored === "dark" || stored === "light") setTheme(stored);
  }, [setTheme]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("app-theme", theme);
  }, [theme]);

  return (
    <button
      className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

export function NotificationBell() {
  const unreadIds = useAppStore((state) => state.unreadNotificationIds);
  const markRead = useAppStore((state) => state.markNotificationRead);

  return (
    <div className="group relative">
      <button className="relative rounded-xl border border-slate-200 p-2 hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800">
        <Bell className="h-4 w-4 text-slate-600 dark:text-slate-300" />
        {unreadIds.length > 0 && (
          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-rose-500" />
        )}
      </button>
      <Card className="invisible absolute right-0 z-30 mt-2 w-80 p-2 opacity-0 transition group-hover:visible group-hover:opacity-100">
        {alerts.slice(0, 5).map((alert) => (
          <button
            key={alert.id}
            onClick={() => markRead(alert.id)}
            className="w-full rounded-lg px-2 py-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800"
          >
            <p className="text-sm font-medium text-slate-700 dark:text-slate-100">
              {alert.title}
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {alert.description}
            </p>
          </button>
        ))}
      </Card>
    </div>
  );
}

export function MobileNavDrawer() {
  const open = useAppStore((state) => state.isMobileNavOpen);
  const toggle = useAppStore((state) => state.toggleMobileNav);
  const role = useAppStore((state) => state.role);
  const pathname = usePathname();
  const visibleItems = navItems.filter(
    (item) => role !== "staff" || item.href !== "/finance",
  );

  return (
    <>
      <Button
        className="lg:hidden dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
        onClick={() => toggle(true)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      {open && (
        <button
          className="fixed inset-0 z-40 bg-black/25 lg:hidden"
          aria-label="Close drawer"
          onClick={() => toggle(false)}
        />
      )}
      <div
        className={cn(
          "fixed left-0 top-0 z-50 h-full w-72 bg-white p-4 shadow-xl transition dark:bg-slate-900 lg:hidden",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="font-semibold dark:text-slate-100">
            Brightlane Ops
          </span>
          <Button
            className="dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
            onClick={() => toggle(false)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <nav className="space-y-1">
          {visibleItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => toggle(false)}
              className={cn(
                "block rounded-xl px-3 py-2 text-sm",
                pathname.startsWith(item.href)
                  ? "bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100"
                  : "text-slate-600 dark:text-slate-300",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}

export function AppHeader({ title }: { title: string }) {
  const currentUserId = useAppStore((state) => state.currentUserId);
  const user = users.find((item) => item.id === currentUserId);

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <MobileNavDrawer />
        <div>
          <h1 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            {title}
          </h1>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <input
            className="hidden w-72 rounded-xl border border-slate-200 px-3 py-2 text-sm md:block dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="Search clients, tasks, leads..."
          />
          <NotificationBell />
          <ThemeToggle />
          <RoleSwitcher />
          <div className="hidden rounded-xl border border-slate-200 px-3 py-2 text-xs text-slate-600 dark:border-slate-700 dark:text-slate-300 md:block">
            {user?.avatar} {user?.name}
          </div>
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Button, Card } from "@/components/shared/ui";

export default function LoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-4 dark:bg-slate-950">
      <Card className="w-full max-w-md p-6">
        <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
          Welcome back
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Sign in to Brightlane internal workspace.
        </p>
        <div className="mt-5 space-y-3">
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            placeholder="name@company.com"
          />
          <input
            className="w-full rounded-xl border px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
            type="password"
            placeholder="Password"
          />
          <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200">
            Sign in
          </Button>
          <Link
            className="block text-center text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            href="/dashboard"
          >
            Continue with demo access
          </Link>
        </div>
      </Card>
    </main>
  );
}

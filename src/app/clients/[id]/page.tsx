import { AppShell } from "@/components/layout/AppShell";
import { ClientProfile } from "@/components/clients/ClientProfile";

export default async function ClientProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <AppShell title="Client Profile">
      <ClientProfile clientId={id} />
    </AppShell>
  );
}

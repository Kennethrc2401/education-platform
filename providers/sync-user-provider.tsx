"use client";

import { useSyncUser } from "@/hooks/use-sync-user";

export function SyncUserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useSyncUser();
  return <>{children}</>;
}
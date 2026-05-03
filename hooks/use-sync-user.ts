"use client";

import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useEffect } from "react";

export const useSyncUser = () => {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);

  useEffect(() => {
    if (!isLoaded || !user) return;

    void createUser({
      clerkId: user.id,
      name: user.fullName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
    });
  }, [isLoaded, user, createUser]);
};
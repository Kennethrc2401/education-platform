"use client";

import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export default function TopNav() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="text-lg font-semibold">
            Education platform
          </Link>
          <nav className="hidden gap-3 text-sm text-slate-600 sm:flex">
            <Link href="/courses" className="hover:underline">Courses</Link>
            <Link href="/teacher" className="hover:underline">Teacher</Link>
            <Link href="/admin" className="hover:underline">Admin</Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isSignedIn ? (
            <button
              className="inline-flex items-center gap-2 rounded-md bg-amber-500 px-3 py-1 text-sm font-medium text-white hover:opacity-95"
              onClick={() => void signOut()}
            >
              Sign out
              <ArrowRight className="size-4" />
            </button>
          ) : (
            <Link
              href="/sign-in"
              className="rounded-md border px-3 py-1 text-sm font-medium"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

"use client";

import Link from "next/link";

export default function SideNav() {
  return (
    <aside className="hidden w-56 shrink-0 border-r bg-white/50 p-4 sm:block">
      <nav className="flex flex-col gap-2 text-sm text-slate-700">
        <Link href="/" className="rounded px-2 py-1 hover:bg-slate-100">Home</Link>
        <Link href="/courses" className="rounded px-2 py-1 hover:bg-slate-100">Courses</Link>
        <Link href="/teacher" className="rounded px-2 py-1 hover:bg-slate-100">Teacher</Link>
        <Link href="/admin" className="rounded px-2 py-1 hover:bg-slate-100">Admin</Link>
      </nav>
    </aside>
  );
}

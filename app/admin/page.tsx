"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { CheckCircle2, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AdminPage() {
  const { user } = useUser();
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user ? {} : "skip"
  );
  const courses = useQuery(
    api.admin.getPendingCourses,
    currentUser?.role === "admin" ? {} : "skip"
  );
  const approve = useMutation(api.admin.approveCourse);

  if (!currentUser || currentUser.role !== "admin") {
    return (
      <main className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-4xl">
          <Card className="bg-white/85 backdrop-blur">
            <CardHeader>
              <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                <ShieldCheck className="size-3.5 text-emerald-600" />
                Restricted area
              </div>
              <CardTitle className="text-slate-950">Admin access required</CardTitle>
              <CardDescription className="text-slate-600">
                This page is visible only to users whose synced Convex profile has the admin role.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </main>
    );
  }

  if (!courses) {
    return (
      <main className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <Card className="bg-white/85 backdrop-blur">
            <CardContent className="p-8">Loading approvals...</CardContent>
          </Card>
        </div>
      </main>
    );
  }

  return (
    <main className="px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl space-y-8">
        <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-amber-500" />
              Review queue
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Approve new course submissions without the clutter.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Pending courses appear here with a cleaner queue, so reviewers can move quickly.
            </p>
          </div>

          <Card className="bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
              {[
                [courses.length.toString().padStart(2, "0"), "pending approvals"],
                [currentUser.name, "current reviewer"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                  <div className="text-3xl font-semibold tracking-tight text-white">{value}</div>
                  <p className="mt-2 text-sm text-slate-300">{label}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        {courses.length === 0 ? (
          <Card className="bg-white/85 backdrop-blur">
            <CardHeader>
              <CardTitle>Nothing waiting right now</CardTitle>
              <CardDescription>
                New submissions will show up here as teachers send them in.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-5 xl:grid-cols-2">
            {courses.map((course) => (
              <Card key={course._id} className="bg-white/90 backdrop-blur">
                <CardHeader className="border-b border-slate-200/80 pb-5">
                  <CardTitle className="text-slate-950">{course.title}</CardTitle>
                  <CardDescription className="text-slate-600">{course.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div className="space-y-1 text-sm text-slate-600">
                    <div>Category: <span className="font-semibold text-slate-950">{course.category}</span></div>
                    <div>Price: <span className="font-semibold text-slate-950">${course.price.toFixed(2)}</span></div>
                  </div>
                  <Button
                    onClick={() => approve({ courseId: course._id })}
                    size="sm"
                  >
                    Approve
                    <CheckCircle2 className="size-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
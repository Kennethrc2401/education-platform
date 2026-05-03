"use client";

import { useParams } from "next/navigation";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { ArrowRight, BookOpen, Sparkles } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function CoursePage() {
  const { id } = useParams<{ id: string }>();
  const { user } = useUser();

  const courses = useQuery(api.courses.getApprovedCourses);
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user ? {} : "skip"
  );
  const enroll = useMutation(api.enrollments.enrollInCourse);

  if (!courses) {
    return (
      <main className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <Card className="bg-white/85 backdrop-blur">
            <CardContent className="p-8">Loading course...</CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const course = courses.find((c) => c._id === id);

  if (!course) {
    return (
      <main className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <Card className="bg-white/85 backdrop-blur">
            <CardContent className="p-8">Course not found.</CardContent>
          </Card>
        </div>
      </main>
    );
  }

  const handleEnroll = async () => {
    if (!currentUser) return alert("Your profile is still syncing");

    await enroll({
      userId: currentUser._id,
      courseId: id as Id<"courses">,
    });

    alert("Enrolled!");
  };

  return (
    <main className="px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden bg-white/90 backdrop-blur">
          <CardHeader className="border-b border-slate-200/80 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Sparkles className="size-3.5 text-amber-500" />
              Course detail
            </div>
            <CardTitle className="text-4xl text-slate-950">{course.title}</CardTitle>
            <CardDescription className="text-base text-slate-600">
              {course.description}
            </CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
            {[
              ["Category", course.category],
              ["Price", `$${course.price.toFixed(2)}`],
              ["Access", "Approved catalog course"],
              ["Status", "Ready to enroll"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-slate-200/80 bg-slate-50 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  {label}
                </div>
                <div className="mt-2 text-base font-semibold text-slate-950">{value}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          <CardHeader className="border-b border-white/10 pb-6">
            <CardTitle className="text-white">Enrollment panel</CardTitle>
            <CardDescription className="text-slate-300">
              Your synced Convex profile is used for enrollment.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">
                <BookOpen className="size-4" />
                Current user
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                {currentUser ? currentUser.name : "Syncing your profile..."}
              </p>
            </div>

            <Button onClick={handleEnroll} className="w-full" size="lg">
              Enroll now
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
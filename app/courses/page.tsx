"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { ArrowRight, Coins, Layers3, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function CoursesPage() {
  const courses = useQuery(api.courses.getApprovedCourses);

  if (!courses) {
    return (
      <main className="px-6 py-10 lg:px-8 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <Card className="bg-white/85 backdrop-blur">
            <CardContent className="p-8">Loading catalog...</CardContent>
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
              Course catalog
            </div>
            <h1 className="max-w-2xl text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
              Curated courses with a cleaner browsing experience.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Explore approved courses, check what is live, and jump straight into a detail view.
            </p>
          </div>

          <Card className="bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
            <CardContent className="grid gap-4 p-6 sm:grid-cols-3">
              {[
                [courses.length.toString().padStart(2, "0"), "approved courses"],
                ["Live", "student-ready"],
                ["Fast", "one-click detail view"],
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
              <CardTitle>No approved courses yet</CardTitle>
              <CardDescription>
                Once a teacher submits a course and an admin approves it, it will appear here.
              </CardDescription>
            </CardHeader>
          </Card>
        ) : (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <Card
                key={course._id}
                className="group overflow-hidden bg-white/85 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardHeader className="border-b border-slate-200/80 pb-5">
                  <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
                    <Layers3 className="size-3.5" />
                    {course.category}
                  </div>
                  <CardTitle className="text-slate-950">{course.title}</CardTitle>
                  <CardDescription className="line-clamp-3 text-base text-slate-600">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                      <Coins className="size-4 text-amber-600" />
                      ${course.price.toFixed(2)}
                    </div>
                    <p className="text-sm text-slate-500">Approved and visible in the catalog</p>
                  </div>

                  <Button asChild size="sm" variant="outline">
                    <Link href={`/courses/${course._id}`}>
                      Open
                      <ArrowRight className="size-4" />
                    </Link>
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
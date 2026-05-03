import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const highlights = [
  {
    icon: BookOpen,
    title: "Course catalog",
    description: "Browse approved learning paths with a cleaner discovery flow.",
  },
  {
    icon: GraduationCap,
    title: "Teacher workspace",
    description: "Draft, submit, and manage course ideas from one place.",
  },
  {
    icon: ShieldCheck,
    title: "Review queue",
    description: "Keep approvals visible without burying them in a plain admin page.",
  },
];

export default function HomePage() {
  return (
    <main className="relative isolate overflow-hidden px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto max-w-6xl space-y-10">
        <section className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-600 shadow-sm backdrop-blur">
              <Sparkles className="size-4 text-amber-500" />
              Learning operations
            </div>

            <div className="space-y-4">
              <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-slate-950 sm:text-6xl">
                A sharper home for teaching, enrollment, and approvals.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-slate-600">
                The app now opens behind auth, then greets signed-in users with a
                modern workspace for the catalog, teacher tools, and the admin queue.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg">
                <Link href="/courses">
                  Browse catalog
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/teacher">Open teacher tools</Link>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <Link href="/admin">Review queue</Link>
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                ["Signed-in first", "Unauthenticated users now land on the Clerk sign-in page."],
                ["Auth-aware client", "Convex receives Clerk tokens through the provider."],
                ["Cleaner flow", "Teacher and enroll actions now use synced Convex users."],
              ].map(([title, description]) => (
                <Card key={title} className="bg-white/85 backdrop-blur">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm">{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <Card className="overflow-hidden border-slate-200/80 bg-slate-950 text-white shadow-[0_30px_120px_rgba(15,23,42,0.4)]">
            <CardHeader className="border-b border-white/10 pb-6">
              <CardTitle className="text-white">Today’s workspace</CardTitle>
              <CardDescription className="text-slate-300">
                A compact view of the core learning surface.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 pt-6 sm:grid-cols-2">
              {[
                ["Catalog", "Curated browsing and detail pages"],
                ["Teacher", "Course drafts and submissions"],
                ["Admin", "Pending approvals"],
                ["Auth", "Protected routes and synced profiles"],
              ].map(([label, description]) => (
                <div
                  key={label}
                  className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div className="text-sm font-semibold uppercase tracking-[0.24em] text-amber-200">
                    {label}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section className="grid gap-4 lg:grid-cols-3">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="bg-white/85 backdrop-blur transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex size-12 items-center justify-center rounded-2xl bg-slate-950 text-white">
                    <Icon className="size-5" />
                  </div>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </section>
      </div>
    </main>
  );
}
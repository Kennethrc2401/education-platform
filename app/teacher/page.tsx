"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { ArrowRight, Sparkles, Wand2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function TeacherPage() {
  const { user } = useUser();
  const currentUser = useQuery(
    api.users.getCurrentUser,
    user ? {} : "skip"
  );
  const createCourse = useMutation(api.courses.createCourse);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [price, setPrice] = useState("0");

  const handleSubmit = async () => {
    if (!currentUser) return;

    await createCourse({
      title,
      description,
      teacherId: currentUser._id,
      price: Number(price) || 0,
      category,
    });

    alert("Course submitted for approval");
  };

  return (
    <main className="px-6 py-10 lg:px-8 lg:py-14">
      <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Card className="bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.35)]">
          <CardHeader className="border-b border-white/10 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
              <Sparkles className="size-3.5" />
              Teacher workspace
            </div>
            <CardTitle className="text-white">Build a course draft</CardTitle>
            <CardDescription className="text-slate-300">
              Create a course, submit it for approval, and keep the flow focused on the essentials.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            {[
              ["Signed in as", currentUser?.name || "Syncing profile..."],
              ["Queue", "Submissions appear for admin review"],
            ].map(([label, value]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-400">
                  {label}
                </div>
                <div className="mt-2 text-base font-semibold text-white">{value}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-white/90 backdrop-blur">
          <CardHeader className="border-b border-slate-200/80 pb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-600">
              <Wand2 className="size-3.5 text-emerald-600" />
              Submission form
            </div>
            <CardTitle className="text-slate-950">Publish a course draft</CardTitle>
            <CardDescription className="text-slate-600">
              Give the course a title, category, and price before sending it to the review queue.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4 p-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Title</label>
              <Input
                value={title}
                placeholder="Build Better Study Habits"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Description</label>
              <textarea
                value={description}
                placeholder="A practical course that helps students learn how to plan, review, and retain more effectively."
                className="min-h-40 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-950 outline-none transition focus:border-slate-400"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Category</label>
                <Input
                  value={category}
                  placeholder="General"
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-700">Price</label>
                <Input
                  value={price}
                  type="number"
                  min="0"
                  step="1"
                  placeholder="0"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleSubmit} className="w-full" size="lg">
              Submit for approval
              <ArrowRight className="size-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
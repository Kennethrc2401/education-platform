import { ArrowRight, ShieldCheck, Sparkles, Users } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="px-6 py-8 lg:px-8 lg:py-10">
      <div className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-slate-950 p-8 text-white shadow-[0_30px_120px_rgba(15,23,42,0.4)] lg:p-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(251,191,36,0.22),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(45,212,191,0.16),transparent_35%)]" />
          <div className="relative space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-100">
              <Sparkles className="size-4" />
              Education platform
            </div>

            <div className="space-y-4">
              <h1 className="max-w-xl text-5xl font-semibold tracking-tight sm:text-6xl">
                Sign in to a cleaner learning workspace.
              </h1>
              <p className="max-w-lg text-lg leading-8 text-slate-300">
                The app is now gated by Clerk, so the first experience is auth-first instead of a public homepage.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                [ShieldCheck, "Protected routes", "Anonymous users are redirected to sign in."],
                [Users, "Synced profiles", "Clerk users are mirrored into Convex."],
                [ArrowRight, "Clear flow", "Sign in once, then move through the app."],
              ].map(([Icon, title, description]) => (
                <div key={title as string} className="rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur">
                  <Icon className="size-5 text-amber-200" />
                  <div className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-white">{title as string}</div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description as string}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center rounded-[2rem] border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur lg:p-8">
          <div className="w-full max-w-md">{children}</div>
        </section>
      </div>
    </main>
  );
}
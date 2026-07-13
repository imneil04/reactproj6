import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

const highlights = [
  "Supportive and inclusive workplace",
  "Opportunities for professional development",
  "Meaningful work with children and families",
  "Modern tools and collaborative processes",
];

export default function CareersHero() {
  return (
    <section className="relative isolate overflow-hidden bg-slate-950">
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-violet-500/20 blur-3xl" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:44px_44px]" />
      </div>

      <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-cyan-100 backdrop-blur">
            <Sparkles className="h-4 w-4" />
            Build a meaningful career with us
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Help shape brighter futures,{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-violet-300 bg-clip-text text-transparent">
              one child at a time.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
            Join a caring and collaborative team dedicated to creating safe,
            inclusive, and inspiring experiences for children and families.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="#open-positions"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
            >
              View open positions
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              Contact our team
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-200">
              Why join us?
            </p>

            <div className="mt-7 space-y-5">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />

                  <p className="text-sm leading-6 text-slate-200 sm:text-base">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-2xl font-bold text-white">2</p>
                <p className="mt-1 text-sm text-slate-300">
                  City locations
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <p className="text-2xl font-bold text-white">100%</p>
                <p className="mt-1 text-sm text-slate-300">
                  Child-focused care
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
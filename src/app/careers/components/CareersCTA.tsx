import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CareersCTA() {
  return (
    <section className="px-6 pb-20 sm:pb-24 lg:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-cyan-700 via-cyan-800 to-slate-950 px-6 py-12 text-center shadow-2xl sm:px-12 sm:py-16">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Do not see the right position?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl leading-7 text-cyan-50/80">
          We are always interested in meeting caring and talented people. Send
          us your resume and let us know how you would like to contribute.
        </p>

        <Link
          href="/contact"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-slate-950 transition hover:-translate-y-0.5 hover:bg-cyan-50"
        >
          Submit a general application
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
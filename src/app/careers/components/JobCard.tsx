import Link from "next/link";
import {ArrowRight, BriefcaseBusiness, Clock3,MapPin } from "lucide-react";

import type { Position } from "../types/careers";

interface JobCardProps {
  position: Position;
}

export default function JobCard({
  position,
}: JobCardProps) {
  return (
    <article className="group rounded-2xl border border-slate-200 bg-slate-50 p-6 transition duration-300 hover:border-cyan-300 hover:bg-white hover:shadow-lg sm:p-7">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="inline-flex rounded-full bg-cyan-100 px-3 py-1 text-xs font-semibold text-cyan-800">
            {position.department}
          </span>

          <h3 className="mt-4 text-xl font-bold text-slate-950 sm:text-2xl">
            {position.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-500">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {position.location}
            </span>

            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4" />
              {position.employmentType}
            </span>

            <span className="flex items-center gap-2">
              <BriefcaseBusiness className="h-4 w-4" />
              {position.department}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
            {position.description}
          </p>
        </div>

        <Link
          href="/contact"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 font-semibold text-white transition hover:bg-cyan-700"
        >
          View position
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
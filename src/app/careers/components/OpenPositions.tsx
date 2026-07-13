import { positions } from "../data/careersData";
import JobCard from "./JobCard";

export default function OpenPositions() {
  return (
    <section
      id="open-positions"
      className="scroll-mt-24 border-y border-slate-200 bg-white px-6 py-20 sm:py-24 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Opportunities
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              Current open positions
            </h2>

            <p className="mt-4 leading-7 text-slate-600">
              Explore available roles and find an opportunity that matches your
              experience, goals, and passion for childcare.
            </p>
          </div>

          <p className="text-sm font-medium text-slate-500">
            {positions.length} positions available
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {positions.map((position) => (
            <JobCard
              key={position.id}
              position={position}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
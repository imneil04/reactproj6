import { hiringSteps } from "../data/careersData";

export default function HiringProcess() {
  return (
    <section className="px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
              Hiring process
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
              A simple and welcoming application experience
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              Our process is designed to help us learn about you while giving
              you the opportunity to understand our team, values, and work
              environment.
            </p>
          </div>

          <div className="grid gap-5">
            {hiringSteps.map((step) => (
              <article
                key={step.number}
                className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-950 text-sm font-bold text-white">
                  {step.number}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-950">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    {step.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
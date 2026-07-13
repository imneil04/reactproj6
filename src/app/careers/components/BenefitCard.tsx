import type { Benefit } from "../types/careers";

interface BenefitCardProps {
  benefit: Benefit;
}

export default function BenefitCard({
  benefit,
}: BenefitCardProps) {
  const Icon = benefit.icon;

  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-200 hover:shadow-xl">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700 transition group-hover:bg-cyan-600 group-hover:text-white">
        <Icon className="h-6 w-6" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-slate-950">
        {benefit.title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-600">
        {benefit.description}
      </p>
    </article>
  );
}
import { benefits } from "../data/careersData";
import BenefitCard from "./BenefitCard";

export default function BenefitsSection() {
  return (
    <section className="px-6 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-700">
            Life at our centres
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            A workplace where people can grow
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            We support our team with an environment built around purpose,
            learning, collaboration, and respect.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {benefits.map((benefit) => (
            <BenefitCard
              key={benefit.title}
              benefit={benefit}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
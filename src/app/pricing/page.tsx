"use client"; //client-side comp
import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
//import Link from "next/link";
import { pricingData } from "@/data/pricing";

export default function PricingPage () {

    //const [location, setLocation] = useState("Calgary");

    //value coming only from the pricing file nothing else
    const [location, setLocation] =
    useState<keyof typeof pricingData>("Calgary");

    const router = useRouter();

    return (
        <>
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4 text-center">
                    <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                        }}
                    >
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                        Simple, Transparent Rates
                        </h1>

                        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
                        Quality childcare with flexible plans that fit your family's
                        needs.
                        </p>
                    </motion.div>

                    <button
                        className="mt-8 rounded-xl bg-cyan-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-500 hover:shadow-lg cursor-pointer"
                    >
                        Book a Tour
                    </button>
                    </div>
                </section>

                {/* Location Toggle */}
                <section className="py-8">
                    <div className="container mx-auto flex justify-center px-4">
                    <div className="inline-flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
                        {(Object.keys(pricingData) as Array<keyof typeof pricingData>).map((city) => (
                        <button
                            key={city}
                            onClick={() => setLocation(city)}
                            className={`rounded-xl px-5 py-2 text-sm font-medium transition cursor-pointer 
                                ${ location === city 
                                    ? "bg-cyan-600 text-white shadow" 
                                    : "text-slate-600 hover:bg-slate-100"}`}
                        >
                            {city}
                        </button>
                        ))}
                    </div>
                    </div>
                </section>

                {/* pricing cards */}
                <section className="pb-20">
                    <div className="container mx-auto px-4">
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {pricingData[location].map((plan, index) => (
                            <div
                                key={index}
                                className={`relative flex flex-col rounded-3xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg ${
                                plan.highlight
                                    ? "border-cyan-600 ring-2 ring-cyan-100"
                                    : "border-slate-200"
                                }`}
                            >
                                {plan.highlight && (
                                <span className="absolute right-6 top-6 rounded-full bg-cyan-600 px-3 py-1 text-xs font-semibold text-white">
                                    Most Popular
                                </span>
                                )}

                                <h3 className="text-2xl font-bold text-slate-900">
                                {plan.title}
                                </h3>

                                <p className="mt-2 text-slate-500">{plan.age}</p>

                                <div className="mt-6">
                                    <h2 className="text-4xl font-bold text-slate-900">
                                        {plan.price}
                                    </h2>
                                </div>

                                <ul className="mt-8 space-y-3">
                                    {plan.features.map((feature, i) => (
                                        <li
                                        key={i}
                                        className="flex items-start gap-3 text-slate-600"
                                        >
                                        <span className="mt-0.5">✅</span>
                                        <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>

                                <button
                                onClick={() => router.push("/signup")}
                                className="mt-8 rounded-xl border border-blue-600 px-5 py-3 text-sm font-semibold text-blue-500 transition cursor-pointer hover:bg-blue-500 hover:text-white"
                                >
                                Enroll Now
                                </button>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* What's Included */}
                <section className="bg-slate-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-slate-900">
                            What's Included
                            </h2>

                            <p className="mt-4 text-slate-600">
                            Everything your child needs to learn, grow, and thrive.
                            </p>
                        </div>

                        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {[
                            "Certified caregivers",
                            "Daily learning activities",
                            "Healthy meals & snacks",
                            "Secure and safe facilities",
                            "Parent app updates",
                            "Low child-to-staff ratio",
                            ].map((item, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
                            >
                                <p className="font-medium text-slate-700">{item}</p>
                            </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="bg-slate-900 py-20 text-white">
                    <div className="container mx-auto px-4 text-center">
                        <h2 className="text-3xl font-bold">
                            Need answers to more questions?
                        </h2>

                        <p className="mx-auto mt-4 max-w-xl text-slate-300">
                            Feel free to reach out to us anytime. We’re happy to help your
                            family find the right childcare plan.
                        </p>

                        <button
                            onClick={() => router.push("/contact")}
                            className="mt-8 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-cyan-200 cursor-pointer"
                        >
                            Reach Out
                        </button>
                    </div>
                </section>
            </main>
        </>
    );
}
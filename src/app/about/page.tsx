"use client"
//import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { teamMembers } from "@/data/team";

export default function AboutPage () {
   
    return (
        <>
           <div>
                {/* Hero Section */}
                <section className="bg-gray-100 py-16 text-center">
                    <div className="mx-auto max-w-5xl px-4">
                        <h1 className="mb-4 flex items-center justify-center gap-2 text-4xl font-bold text-gray-900">
                        About Us
                        <i className="bi bi-clock-history text-indigo-600"></i>
                        </h1>

                        <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Caring for children. Supporting families. Building memorable futures.
                        (placeholders)
                        </p>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="py-16">
                    <div className="mx-auto grid max-w-6xl gap-6 px-4 md:grid-cols-2">
                        
                        <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md">
                            <h4 className="mb-4 text-2xl font-bold text-gray-900">
                                Our Mission
                            </h4>

                            <p className="leading-relaxed text-gray-600">
                                We provide safe, nurturing, and high-quality childcare that
                                supports every child's growth while giving parents peace of mind.
                                (placeholder)
                            </p>
                            </div>

                            <div className="h-full rounded-2xl bg-white p-8 shadow-sm transition hover:shadow-md">
                            <h4 className="mb-4 text-2xl font-bold text-gray-900">
                                Our Vision
                            </h4>

                            <p className="leading-relaxed text-gray-600">
                                We aim to create a future where every family has access to
                                reliable, enriching childcare that empowers children to thrive.
                                (placeholder)
                            </p>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="bg-gray-100 py-16">
                <div className="mx-auto max-w-6xl px-4 text-center">
                    
                    <h2 className="mb-10 text-3xl font-bold text-gray-900">
                    Our Core Values
                    </h2>

                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            "Safety First",
                            "Learning Through Play",
                            "Inclusivity",
                            "Parent Partnership",
                        ].map((value, index) => (
                            <div
                            key={index}
                            className="rounded-2xl bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-cyan-200 cursor-pointer"
                            >
                            <h5 className="text-lg font-semibold text-gray-800">
                                {value}
                            </h5>
                            </div>
                        ))}
                    </div>
                </div>
                </section>

                {/* Team Section */}
                <section className="py-16">
                    <div className="mx-auto max-w-6xl px-4 text-center">

                        <h2 className="mb-12 text-3xl font-bold text-gray-900">
                        Meet Our Team
                        </h2>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {teamMembers.map((member) => (
                            <div
                                key={member.id}
                                className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-amber-200 cursor-pointer"
                                >
                                <Image
                                    src={member.img}
                                    alt={member.name}
                                    width={400}
                                    height={300}
                                    className="h-64 w-full object-cover"
                                />

                                <div className="p-6">
                                    <h5 className="text-xl font-bold text-gray-900">
                                    {member.name}
                                    </h5>

                                    <p className="mt-1 font-medium text-indigo-600">
                                    {member.role}
                                    </p>

                                    <p className="mt-3 text-sm leading-relaxed text-gray-600">
                                    {member.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="bg-gray-100 py-16">
                    <div className="mx-auto max-w-6xl px-4 text-center">

                        <h2 className="mb-10 text-3xl font-bold text-gray-900">
                        Why Choose Us?
                        </h2>

                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                        {[
                            "Licensed & certified staff",
                            "Safe & secure environment",
                            "Flexible programs",
                            "Trusted by families",
                        ].map((item, index) => (
                            <div
                            key={index}
                            className="rounded-2xl bg-white p-6 shadow-sm transition hover:shadow-md"
                            >
                            <p className="font-medium text-gray-700">
                                {item}
                            </p>
                            </div>
                        ))}
                        </div>

                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-16 text-center">
                    <div className="mx-auto max-w-4xl px-4">

                        <h2 className="mb-4 text-3xl font-bold text-gray-900">
                        Join Us Now
                        </h2>

                        <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Discover a childcare experience built around your family.
                        (placeholder)
                        </p>

                        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        
                            <button className="rounded-xl bg-cyan-600 px-6 py-3 font-medium text-white transition hover:bg-blue-500 cursor-pointer">
                                Book a Tour
                            </button>

                            <Link
                                href="/contact"
                                className="rounded-xl border border-amber-400 px-6 py-3 font-medium text-gray-600 transition hover:bg-amber-300 hover:text-white cursor-pointer"
                            >
                                Contact Us
                            </Link>

                        </div>

                    </div>
                </section>
           </div>
        </>
    );
}
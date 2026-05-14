"use client";
import Image from "next/image";
import { MapPin, Phone, Clock, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { locations } from "@/data/locations";
import { useState } from "react";

export default function LocationPage () {
    const [openCard, setOpenCard] = useState<number | null>(null);

    const toggleCard = (id: number) => {
    setOpenCard(openCard === id ? null : id);

    };

    return (
        <>
            <section className="py-16">
                <div className="container mx-auto px-4">
                    
                    {/* Header */}
                    <div className="mb-12 text-center">
                        <h1 className="mb-3 text-4xl font-bold">
                            Our Locations
                        </h1>

                        <p className="text-lg text-gray-500">
                            Find a childcare center near you.
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid gap-8 md:grid-cols-2">
                    {locations.map((loc) => {
                        const isOpen = openCard === loc.id;

                        return (
                        <div
                            key={loc.id}
                            className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:shadow-lg"
                        >
                            {/* Image */}
                            <div className="relative h-100 w-full">
                                <Image
                                    src={loc.image}
                                    alt={loc.city}
                                    fill
                                    priority
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Main Content */}
                            <div className="space-y-4 p-6">
                                <h2 className="text-2xl font-semibold">
                                    {loc.city}
                                </h2>

                                <div className="space-y-2 text-sm text-gray-600">
                                    <p className="flex items-center gap-2">
                                    <MapPin size={18} />
                                    {loc.address}
                                    </p>

                                    <p className="flex items-center gap-2">
                                    <Phone size={18} />
                                    {loc.phone}
                                    </p>

                                    <p className="flex items-center gap-2">
                                    <Clock size={18} />
                                    {loc.hours}
                                    </p>

                                    <p className="flex items-start gap-2">
                                    <FileText
                                        size={18}
                                        className="mt-0.5"
                                    />
                                    {loc.description}
                                    </p>
                                </div>

                                {/* Button */}
                                <button
                                    onClick={() => toggleCard(loc.id)}
                                    className="flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 cursor-pointer"
                                >
                                    {isOpen ? "Hide Details" : "View Details"}

                                    {isOpen ? (
                                    <ChevronUp size={18} />
                                    ) : (
                                    <ChevronDown size={18} />
                                    )}
                                </button>

                                {/* expand detail section */}
                                <div
                                    className={`grid transition-all duration-500 ease-in-out ${
                                    isOpen
                                        ? "grid-rows-[1fr] opacity-100 mt-4"
                                        : "grid-rows-[0fr] opacity-0"
                                    }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="rounded-xl bg-cyan-50 p-4 text-sm text-gray-700">
                                            <p className="mb-2 font-semibold">
                                            Why families choose this location:
                                            </p>

                                            <ul className="list-disc space-y-1 pl-5">
                                            <li>Certified childcare professionals</li>
                                            <li>Safe and secure learning environment</li>
                                            <li>Interactive early learning programs</li>
                                            <li>Healthy meals and snacks provided</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        );
                    })}
                    </div>
                </div>
            </section>
        </>
    );
}
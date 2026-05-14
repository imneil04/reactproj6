"use client";
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function ContactPage () {
    
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    });

    const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(formData);

    // TODO:
    // connect to API / email service
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br flex items-center justify-center px-4 py-10">
                <motion.div
                    className="w-full max-w-6xl"
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="overflow-hidden rounded-3xl bg-white/70 backdrop-blur-xl shadow-2xl">
                        <div className="grid grid-cols-1 md:grid-cols-2">
                            {/* Left Form */}
                            <div className="p-8 md:p-12">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h2 className="text-3xl font-bold text-gray-800 mb-3">
                                    We'd love to hear from you! 📣
                                    </h2>

                                    <p className="text-gray-600 mb-8">
                                    Have questions, feedback, or inquiries? Send us a message and
                                    we’ll get back to you soon.
                                    </p>
                                </motion.div>

                                <form onSubmit={handleSubmit} className="space-y-5">
                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-500">
                                            Full Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter full name..."
                                            required
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-500">
                                            Email
                                        </label>

                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter email..."
                                            required
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-500">
                                            Phone #
                                        </label>

                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            placeholder="Enter contact #..."
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    <div>
                                        <label className="mb-2 block text-sm font-medium text-slate-500">
                                            Message Us
                                        </label>

                                        <textarea
                                            name="message"
                                            rows={5}
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="Please enter feedback message here..."
                                            required
                                            className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition-all duration-200 ease-in-out hover:bg-blue-500 cursor-pointer"
                                        >
                                        Send Message
                                    </button>
                                </form>
                            </div>

                            {/* Right Image */}
                            <div className="relative hidden min-h-[600px] md:block">
                                <motion.div
                                    className="h-full relative"
                                    initial={{ opacity: 0, x: 40 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <Image
                                        src="/banner/beachpic.jpg"
                                        alt="Contact"
                                        priority
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </>
    );
}
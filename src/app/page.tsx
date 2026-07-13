"use client"
import Link from "next/link";
import HeroCarousel from "./components/herocarousel";
import NoticeBannerHome from "./NoticeBannerHome";

export default function Home() {
  return (
    <>
      <NoticeBannerHome />
      <div className="min-h-screen p-6">
          {/* Hero Section */}
          <section className="bg-gray-50 py-16 rounded-lg">
              <div className="max-w-7xl mx-auto px-6">
                  <div className="grid lg:grid-cols-2 gap-12 items-center">

                      {/* Left Side */}
                      <div className="text-center lg:text-left">
                          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 leading-tight">
                              Childcare Placeholder
                          </h1>

                          <p className="mt-6 text-lg text-slate-600">
                              Verified childcare directors. Safe,
                              reliable, and flexible.
                          </p>

                          <Link
                              href="/contact"
                              className="inline-block mt-8 px-6 py-3 rounded-lg text-white font-semibold transition bg-cyan-600 hover:bg-blue-500"
                          >
                              Get Started
                          </Link>
                      </div>

                      <HeroCarousel />
                  </div>
              </div>
          </section>

          {/* Trust Section */}
          <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6 text-center">

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-12">
                      Why Parents Trust Us
                  </h2>

                  <div className="grid md:grid-cols-3 gap-8">

                      <div className="bg-slate-50 rounded-2xl shadow-md p-8">
                          <h5 className="text-xl font-semibold mb-4">
                              ✅ Background Checked
                          </h5>

                          <p className="text-slate-600">
                              All childcare directors are verified
                              and screened.
                          </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl shadow-md p-8">
                          <h5 className="text-xl font-semibold mb-4">
                              ✅ Secure Registration
                          </h5>

                          <p className="text-slate-600">
                              Safe and reliable enrollment system
                              with real human support.
                          </p>
                      </div>

                      <div className="bg-slate-50 rounded-2xl shadow-md p-8">
                          <h5 className="text-xl font-semibold mb-4">
                              ✅ Real Reviews
                          </h5>

                          <p className="text-slate-600">
                              Honest ratings and feedback from parents.
                          </p>
                      </div>

                  </div>
              </div>
          </section>

          {/* CTA Section */}
          <section className="bg-slate-900 text-white py-20">
              <div className="max-w-4xl mx-auto px-6 text-center">

                  <h2 className="text-4xl font-bold">
                      Ready to Get Started?
                  </h2>

                  <p className="mt-4 text-lg text-slate-300">
                      Join us today.
                  </p>

                  <Link
                      href="/signup"
                      className="inline-block mt-8 px-8 py-4 rounded-xl bg-cyan-600 font-semibold transition hover:bg-blue-500"
                  >
                      Sign Up for Free
                  </Link>
              </div>
          </section>
      </div>
    </>
  );
}

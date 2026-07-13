import { Info } from "lucide-react"

export default function NoticeBanner() {
    return (
        <>
            <section className="px-6 py-8">
                <div className="mx-auto max-w-7xl rounded-2xl border border-cyan-200 bg-cyan-50 p-6">
                    <div className="flex items-start gap-4">
                        <Info className="mt-1 h-6 w-6 text-cyan-700" />

                        <div>
                            <h3 className="font-semibold text-cyan-900">
                            Portfolio Demonstration
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-slate-700">
                            This careers page is part of a fictional childcare SaaS platform
                            developed for portfolio and educational purposes. Job listings,
                            locations, and hiring information are sample content created to
                            demonstrate responsive UI design, reusable components, and modern
                            Next.js development practices.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
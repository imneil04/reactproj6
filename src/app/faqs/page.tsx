"use client"

export default function FAQPage () {
    return (
        <>
            <div className="min-h-screen bg-gray-500 flex items-center justify-center px-6">
                <div className="max-w-xl w-full text-center">
                    
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-400/20 text-yellow-300 text-sm font-medium mb-6">
                        🚧 Currently In Development
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                        Under Construction
                    </h1>

                    {/* Subtitle */}
                    <p className="text-slate-300 text-lg leading-relaxed mb-8">
                        We’re working hard to bring this feature to life.
                        Please check back again soon.
                    </p>

                    {/* Animated Loader */}
                    <div className="flex justify-center items-center gap-2 mb-10">
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></span>
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                        <span className="w-3 h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition text-white font-medium shadow-lg"
                        >
                            Go Back
                        </button>

                        <button
                            className="px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-400 hover:bg-slate-800 transition text-slate-200 font-medium"
                        >
                            Contact Support
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
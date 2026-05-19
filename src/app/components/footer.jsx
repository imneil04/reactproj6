"use client"
import Link from "next/link";

export default function Footer () {
    return (
        <>
            <footer className="bg-white border-t px-6 py-6">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-6">
                    
                    {/* BRAND */}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Childcare App
                      </h3>
                      <p className="text-sm text-gray-500 mt-2">
                        Safe and reliable childcare services for families.
                      </p>
                    </div>
            
                    {/* LINKS */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                      <div>
                        <h4 className="font-semibold mb-2">Quick Links</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li><Link href="/" className="hover:text-blue-600">Home</Link></li>
                          <li><Link href="/about" className="hover:text-blue-600">About</Link></li>
                          <li><Link href="/location" className="hover:text-blue-600">Locations</Link></li>
                          <li><Link href="/pricing" className="hover:text-blue-600">Pricing</Link></li>
                        </ul>
                      </div>
            
                      <div>
                        <h4 className="font-semibold mb-2">Company</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li><Link href="/careers" className="hover:text-blue-600">Careers</Link></li>
                          <li><Link href="/faqs" className="hover:text-blue-600">FAQs</Link></li>
                        </ul>
                      </div>
            
                      <div>
                        <h4 className="font-semibold mb-2">Others</h4>
                        <ul className="space-y-1 text-gray-600">
                          <li><Link href="/privacy" className="hover:text-blue-600">Privacy</Link></li>
                          <li><Link href="/terms" className="hover:text-blue-600">Terms</Link></li>
                        </ul>
                      </div>
                    </div>
                </div>
            
                    {/* BOTTOM */}
                    <div className="text-center text-sm text-gray-400 mt-6 flex justify-center flex-col">
                        <div>
                        {new Date().getFullYear()} Childcare App
                        </div>
                        <div>
                        <p>Personal project of Mark del Rosario</p>
                        </div>
                    </div>
            </footer>
        </>
    );
}
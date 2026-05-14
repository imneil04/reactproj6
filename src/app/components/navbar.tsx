"use client"
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";


export default function Navbar () {
    //const [open, setOpen] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    //state mgt user, route, profile dashboard
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const [profile, setProfile] = useState<any>(null);

    const supabase = createClient(); //auth through ssr

    useEffect(() => {
    const getSession = async () => {
        const {
        data: { session },
        } = await supabase.auth.getSession();

        setUser(session?.user ?? null);
    };

    getSession(); //check session


    const {
        data: { subscription },
    } = supabase.auth.onAuthStateChange(
        (_event, session) => {
        setUser(session?.user ?? null);
        }
    );

    return () => subscription.unsubscribe();
    }, []);


    //for logout
    const handleLogout = async () => {
    await supabase.auth.signOut();

    router.push('/login');
    };

    //to route to proper dashboard
    useEffect(() => {
        const fetchProfile = async () => {
            if (!user) return;

            const { data, error } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle(); //replaced single() 

            if (error) {
            console.error(error);
            return;
            }

            setProfile(data);
        };

        fetchProfile();
        }, [user]);

    return (
        <>
            <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
                    {/* logo */}
                    <Link
                    href="/"
                    className="text-2xl font-bold tracking-tight text-gray-900"
                    >
                    Childcare app
                    </Link>

                    {/* desktop Nav */}
                    <div className="hidden items-center gap-8 md:flex">
                        <Link href="/" className="text-gray-600 hover:text-black">
                            Home
                        </Link>

                        <Link href="/about" className="text-gray-600 hover:text-black">
                            About
                        </Link>

                        <Link href="/location" className="text-gray-600 hover:text-black">
                            Location
                        </Link>

                        <Link href="/pricing" className="text-gray-600 hover:text-black">
                            Pricing
                        </Link>
                    </div>

                    {/* desktop dropdown */}
                    <div
                        className="relative hidden md:block"
                        onMouseEnter={() => setDropdownOpen(true)}
                        onMouseLeave={() => setDropdownOpen(false)}
                        >
                        <button className="flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800">
                            {user ? 'My Account' : 'Get Started'}
                        </button>

                        <div
                            className={`absolute right-0 mt-3 w-48 overflow-hidden rounded-2xl border 
                            border-gray-200 bg-white text-gray-700
                            shadow-xl 
                            transition-all duration-200 ${
                                dropdownOpen
                                ? 'visible opacity-100 translate-y-0'
                                : 'invisible opacity-0 -translate-y-2'
                            }`}
                        >
                            {user ? (
                            <>
                                <Link
                                href={profile?.role === 'staff'
                                    ? '/staff/dashboard'
                                    : '/parent/dashboard'
                                }
                                className="block px-5 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Dashboard
                                </Link>

                                <button
                                onClick={handleLogout}
                                className="block w-full text-left px-5 py-3 text-sm hover:bg-gray-100 cursor-pointer"
                                >
                                    Logout
                                </button>
                            </>
                            ) : (
                            <>
                                <Link
                                href="/login"
                                className="block px-5 py-3 text-sm hover:bg-gray-100"
                                >
                                    Login
                                </Link>

                                <Link
                                href="/signup"
                                className="block px-5 py-3 text-sm hover:bg-gray-100"
                                >
                                    Sign Up
                                </Link>

                                <Link
                                href="/contact"
                                className="block px-5 py-3 text-sm hover:bg-gray-100"
                                >
                                    Contact
                                </Link>
                            </>
                            )}
                        </div>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        className="md:hidden"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                        {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <div
                    className={`overflow-hidden transition-all duration-300 md:hidden ${
                    mobileMenuOpen ? "max-h-96" : "max-h-0"
                    }`}
                >
                    <div className="space-y-2 border-t border-gray-200 bg-white px-6 py-4">
                        <Link
                            href="/"
                            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Home
                        </Link>

                        <Link
                            href="/about"
                            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            About
                        </Link>

                        <Link
                            href="/location"
                            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Location
                        </Link>

                        <Link
                            href="/pricing"
                            className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                        >
                            Pricing
                        </Link>

                        {/**login, signup mobile screen */}
                        <div className="border-t border-gray-200 pt-3">

                            {user ? (
                                <>
                                     <Link
                                    href={profile?.role === 'staff'
                                    ? '/staff/dashboard'
                                    : '/parent/dashboard'
                                    }
                                    className="block px-5 py-3 text-sm hover:bg-gray-100"
                                    >
                                        Dashboard
                                    </Link>

                                    <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-5 py-3 text-sm hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href="/login"
                                        className="block rounded-lg px-3 py-2"
                                        >
                                        Login
                                    </Link>

                                    <Link
                                        href="/signup"
                                        className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                                        >
                                        Sign Up
                                    </Link>

                                    <Link
                                        href="/contact"
                                        className="block rounded-lg px-3 py-2 hover:bg-gray-100"
                                        >
                                        Contact
                                    </Link>
                                </>
                            )}
                            
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
"use client"
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, UserPlus } from "lucide-react";
import type { FormEvent } from "react";
import { motion } from "motion/react";

//import { supabase } from "@/lib/supabase";
import { createClient } from "@/utils/supabase/client";

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage () {

    const supabase = createClient(); //via ssr

    //state mgt for password and loading control
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //state mgt for form data
    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
    });

    //state mgt for errors
    const [errors, setErrors] = useState<FormErrors>({});

    //input fields custom check
    const validateForm = () => {
    const newErrors: FormErrors = {};

        // Full Name Regex
        const nameRegex = /^[A-Za-z\s]{2,50}$/;

        // Email Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        //Phone Regex 
        const phoneRegex = /^(?:\+1\s?)?(?:\(\d{3}\)|\d{3})[-.\s]?\d{3}[-.\s]?\d{4}$/;

        // Password Regex
        // Minimum 8 chars
        // 1 uppercase
        // 1 lowercase
        // 1 number
        // 1 special character
        const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required';
        } 
        else if (!nameRegex.test(formData.fullName)) {
        newErrors.fullName =
            'Name should only contain letters and spaces';
        }

        if (!formData.email.trim()) {
        newErrors.email = 'Email is required';
        } 
        else if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
        }

        //phone field check
         if (!formData.phone.trim()) {
        newErrors.phone = 'Phone # is required';
        } 
        else if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = 'Please enter a valid phone #';
        }

        if (!formData.password) {
        newErrors.password = 'Password is required';
        } 
        else if (!passwordRegex.test(formData.password)) {
        newErrors.password =
            'Password must contain uppercase, lowercase, number, special character, and be 8+ characters';
        }

        if (!formData.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
        } 
        else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

        //change handler
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));

        // Clear error dynamically while typing
        setErrors((prev) => ({
        ...prev,
        [name]: '',
        }));
    };

    //form submission handler
    const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
    ) => {
            e.preventDefault();

            const isValid = validateForm();

            if (!isValid) return;

            try {
                setIsLoading(true);

                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        data: {
                        full_name: formData.fullName,
                        phone: formData.phone
                        },
                    },
                });

                if (error) throw error;

                // Optional: Insert into profiles table
                // Recommended for production apps

                //remove later 
                if (data.user) {
                const { error: profileError } = await supabase
                    .from('profiles')
                    .insert({
                    id: data.user.id,
                    full_name: formData.fullName,
                    email: formData.email,
                    phone: formData.phone,
                    role: 'parent',
                    });

                    if (profileError) throw profileError;
                } 

                alert('Signup successful!');

                console.log(data);

                setFormData({
                fullName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                });

            } catch (error: any) {
                console.error(error);

                alert(error.message || 'Something went wrong');

            } finally {
                setIsLoading(false);
            }
        };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="min-h-screen flex items-center justify-center px-6 py-10">
                    <div className="w-full max-w-md">
                        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">
                            {/* Header */}
                            <div className="flex flex-col items-center text-center mb-8">
                                <div className="bg-cyan-500/20 p-4 rounded-2xl mb-4">
                                    <UserPlus className="w-8 h-8 text-cyan-400" />
                                </div>

                                <h1 className="text-3xl font-bold">
                                    Create Account
                                </h1>

                                <p className="text-slate-500 mt-2 text-sm">
                                    Join the platform and get started today.
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* Full Name */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">
                                        Full Name
                                    </label>

                                    <input
                                        type="text"
                                        name="fullName"
                                        placeholder="John Doe"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 
                                        focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />

                                    {errors.fullName && (
                                        <p className="text-red-400 text-sm mt-2">
                                        {errors.fullName}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">
                                        Email
                                    </label>

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example@email.com"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none 
                                        focus:ring-2 focus:ring-cyan-500"
                                    />

                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-2">{errors.email}</p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">
                                        Phone #
                                    </label>

                                    <input
                                        type="text"
                                        name="phone"
                                        placeholder="(xxx)-xxx-xxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 focus:outline-none 
                                        focus:ring-2 focus:ring-cyan-500"
                                    />

                                    {errors.phone && (
                                        <p className="text-red-400 text-sm mt-2">{errors.phone}</p>
                                    )}
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">
                                        Password
                                    </label>

                                    <div className="relative">
                                        <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-600 bg-slate-900/70 px-4 py-3 pr-12 text-white placeholder:text-slate-400 
                                        focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />

                                        <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                        >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                        </button>
                                    </div>

                                    {errors.password && (
                                        <p className="text-red-400 text-sm mt-2">
                                        {errors.password}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-500 mb-2">
                                        Confirm Password
                                    </label>

                                    <div className="relative">
                                        <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        name="confirmPassword"
                                        placeholder="Confirm your password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-600 
                                        bg-slate-900/70 px-4 py-3 pr-12 text-white placeholder:text-slate-400 
                                        focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                        />

                                        <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(!showConfirmPassword)
                                        }
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                        >
                                        {showConfirmPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                        </button>
                                    </div>

                                    {errors.confirmPassword && (
                                        <p className="text-red-400 text-sm mt-2">
                                        {errors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-cyan-600 
                                    hover:bg-cyan-500 
                                    transition-colors duration-300 text-white font-semibold py-3 rounded-xl 
                                    disabled:opacity-50 cursor-pointer"
                                    >
                                    {isLoading ? 'Creating Account...' : 'Create Account'}
                                </button>
                            </form>

                            {/* Footer */}
                            <div className="mt-6 text-center text-sm text-slate-300">

                                    Already have an account?{' '}
                                <Link
                                    href="/login"
                                    className="text-cyan-400 hover:text-cyan-300 font-medium"
                                >
                                    Sign In
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    );
}
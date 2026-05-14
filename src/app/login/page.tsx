"use client"
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, LogIn, UserCheck } from "lucide-react";
import { useRouter } from "next/navigation";

//import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";
import { createClient } from "@/utils/supabase/client";

interface LoginData {
  //role: 'parent' | 'staff';
  email: string;
  password: string;
}

interface LoginErrors {
  email?: string;
  password?: string;
}

export default function LoginPage () {

  //state mgt navigate dashboards
  const router = useRouter();

  //custom
  const supabase = createClient();
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState<LoginData>({
    //role: 'parent',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginErrors>({});

  const validateForm = () => {
    const newErrors: LoginErrors = {};

    // Email Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors dynamically
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();

    if (!isValid) return;

    try {
      setIsLoading(true);

      // =====================================
      // supabase login
      // =====================================

      // Example:
      const { data, error } = await supabase.auth.signInWithPassword({

            email: formData.email,
            password: formData.password,
       });

       if (error) throw error;

       //check if user exist
       if (!data.user) {
        alert("User not found.");
       }

        console.log('Login submitted:', formData);


        // Fetch actual role from database
        const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

        if (profileError) 
            throw profileError;

        alert('Login successful!');

        await new Promise((resolve) => setTimeout(resolve, 200));

        router.refresh();

        // Secure role-based redirect
        if (profile.role === 'staff') {
            router.push('/staff/dashboard');
        } else {
            router.push('/parent/dashboard');
        }

      /* Example future logic:
       if (formData.role === 'staff') {
        router.push('/staff/dashboard');
       } else {
        router.push('/parent/dashboard');
       } */

      //alert('Login successful!');

      // Future:
      // router.push('/dashboard');
    } catch (error) {

      console.error(error);
      alert('Invalid email or password');
    } finally {

      setIsLoading(false);
    }
  };

  {/**state mgt for pw reset */}
    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const [resetEmail, setResetEmail] = useState('');

    const [resetLoading, setResetLoading] = useState(false);

    const [resetSuccess, setResetSuccess] = useState(false);

    const handleResetPassword = async () => {
        try {
            setResetLoading(true);

            const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailRegex.test(resetEmail)) {
            alert('Please enter a valid email');
            return;
            }

            const { error } =
            await supabase.auth.resetPasswordForEmail(
                resetEmail,
                {
                redirectTo:
                    'http://localhost:3000/reset-password',
                }
            );

            if (error) throw error;

            setResetSuccess(true);
        } catch (error: any) {

            console.error(error);

            alert(
            error.message || 'Something went wrong'
            );
        } finally {
            setResetLoading(false);
        }
    };

  return (
    <>
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}

        >
            <div className="min-h-screen flex items-center justify-center px-6 p-10">

                <div className="w-full max-w-md">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl p-8">

                        {/* Header */}
                        <div className="flex flex-col items-center text-center mb-8">
                            <div className="bg-cyan-500/20 p-4 rounded-2xl mb-4">
                                <UserCheck className="w-8 h-8 text-cyan-400" />
                            </div>

                            <h1 className="text-3xl font-bold">
                                Welcome Back
                            </h1>

                            <p className="text-slate-500 mt-2 text-sm">
                                Sign in to continue to your account.
                            </p>
                        </div>
                        
                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-5">
                            
                            <div>
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
                                    className="w-full rounded-xl border 
                                    border-slate-600 bg-slate-900/70 px-4 py-3 text-white placeholder:text-slate-400 
                                    focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                />

                                    {errors.email && (
                                        <p className="text-red-400 text-sm mt-2">
                                        {errors.email}
                                        </p>
                                    )}
                            </div>

                            {/**Password */}
                            <div>

                                <div className="flex items-center justify-between mb-2">
                                    
                                    <label className="text-sm font-medium text-slate-500">
                                        Password
                                    </label>

                                    <button
                                        type="button"
                                        onClick={() => setForgotPasswordOpen(true)}
                                        className="text-sm text-cyan-400 hover:text-cyan-300 cursor-pointer"
                                        >
                                        Forgot Password?
                                    </button>
                                </div>

                                <div className="relative">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Enter your password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full rounded-xl 
                                        border 
                                        border-slate-600 bg-slate-900/70 px-4 py-3 pr-12 
                                        text-white placeholder:text-slate-400 
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

                            {/* Remember Me */}
                            <div className="flex items-center justify-between">

                                <label className="flex items-center gap-2 text-sm text-slate-500 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-cyan-500 focus:ring-cyan-500"
                                        />
                                        Remember me
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-amber-600 
                                hover:bg-amber-500 hover:text-white
                                transition-colors duration-300
                                font-semibold py-3 rounded-xl 
                                disabled:opacity-50 cursor-pointer"
                                >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="relative my-6">
                            
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-transparent px-2 text-slate-400">
                                    OR
                                </span>
                            </div>
                        </div>

                        {/* Social Login Placeholder */}
                        <button
                            type="button"
                            className="w-full border border-slate-600 hover:border-slate-500 transition-colors duration-300 text-white font-medium py-3 rounded-xl bg-slate-900/50"
                        >
                            Continue with Google
                        </button>

                        {/* Footer */}
                        <div className="mt-6 text-center text-sm text-slate-300">

                            Dont have an account?{' '}
                            <Link
                                href="/signup"
                                className="text-cyan-400 hover:text-cyan-300 font-medium"
                                >
                                Create One
                            </Link>
                        </div>
                    </div>
                </div>


                {/* forgot password side-drawer */}
                <div
                className={`fixed inset-0 z-50 transition-all duration-300 ${
                    forgotPasswordOpen
                    ? 'visible bg-black/50 backdrop-blur-sm'
                    : 'invisible bg-black/0'
                }`}
                >
                    <div
                        className={`absolute right-0 top-0 h-full w-full max-w-md bg-gray-700 border-l border-gray-800 shadow-2xl transition-transform duration-300 ${
                        forgotPasswordOpen
                            ? 'translate-x-0'
                            : 'translate-x-full'
                        }`}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-800 p-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white">
                                Reset Password
                                </h2>

                                <p className="mt-1 text-sm text-slate-400">
                                We’ll send you a password reset link.
                                </p>
                            </div>

                            <button
                                onClick={() => {
                                setForgotPasswordOpen(false);
                                setResetSuccess(false);
                                }}
                                className="text-slate-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>

                        {/* reset body */}
                        <div className="p-6">
                            {resetSuccess ? (
                                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                                    <h3 className="mb-2 text-lg font-semibold text-cyan-400">
                                        Email Sent
                                    </h3>

                                    <p className="text-sm leading-relaxed text-slate-300">
                                        Check your inbox for the password reset
                                        link.
                                    </p>
                                </div>
                            ) : (
                            <div className="space-y-5">
                                <div>
                                    <label className="mb-2 block text-sm font-medium text-slate-200">
                                    Email Address
                                    </label>

                                    <input
                                    type="email"
                                    placeholder="example@email.com"
                                    value={resetEmail}
                                    onChange={(e) =>
                                        setResetEmail(e.target.value)
                                    }
                                    className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    />
                                </div>

                                <button
                                    onClick={handleResetPassword}
                                    disabled={resetLoading}
                                    className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition-colors duration-300 hover:bg-blue-500 disabled:opacity-50 cursor-pointer"
                                >
                                    {resetLoading
                                    ? 'Sending Reset Link...'
                                    : 'Send Reset Link'}
                                </button>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    </>
  );
}
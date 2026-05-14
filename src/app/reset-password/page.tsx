"use client";
import { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

export default function ResetPasswordPage() {

    //state mgt pw reset
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [success, setSuccess] = useState(false);

  const supabase = createClient(); //client

  const handleUpdatePassword = async () => {
    try {
      setLoading(true);

      // =========================
      // VALIDATION
      // =========================

      if (password.length < 8) {
        alert(
          'Password must be at least 8 characters'
        );

        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match');

        return;
      }

      // =========================
      // UPDATE PASSWORD
      // =========================

      const { error } =

        await supabase.auth.updateUser({
          password,
        });

      if (error) throw error;

      setSuccess(true);

    } catch (error: any) {

      console.error(error);

      alert(
        error.message || 'Something went wrong'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 rounded-2xl bg-cyan-500/20 p-4">
            <Lock className="h-8 w-8 text-cyan-400" />
          </div>

          <h1 className="text-3xl font-bold text-white">
            Reset Password
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Create a new secure password for your account.
          </p>
        </div>

        {success ? (
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-500/10 p-5 text-center">
            <h2 className="mb-2 text-xl font-semibold text-cyan-500">
              Password Updated
            </h2>

            <p className="text-sm text-slate-500">
              Your password has been successfully updated.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {/* Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">
                New Password
              </label>

              <div className="relative">
                <input
                  type={
                    showPassword ? 'text' : 'password'
                  }
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-500">
                Confirm Password
              </label>

              <div className="relative">
                <input
                  type={
                    showConfirmPassword
                      ? 'text'
                      : 'password'
                  }
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 pr-12 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      !showConfirmPassword
                    )
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
            </div>

            {/* Submit */}
            <button
              onClick={handleUpdatePassword}
              disabled={loading}
              className="w-full rounded-xl bg-cyan-600 py-3 font-semibold text-white transition-colors duration-300 hover:bg-cyan-500 disabled:opacity-50 cursor-pointer"
            >
              {loading
                ? 'Updating Password...'
                : 'Update Password'}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
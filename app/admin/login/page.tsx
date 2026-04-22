'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Loader2, ChevronRight, Chrome } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { auth } from '@/lib/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleEmailLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.success) {
                router.push('/admin');
            } else {
                setError(result.error);
                setIsLoading(false);
            }
        } catch (err) {
            setError("Connection failed. Please try again.");
            setIsLoading(false);
        }
    }

    async function handleGoogleLogin() {
        setIsGoogleLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();

        try {
            const userCredential = await signInWithPopup(auth, provider);
            const idToken = await userCredential.user.getIdToken();

            const res = await fetch('/api/auth/google', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idToken }),
            });
            const result = await res.json();

            if (result.success) {
                router.push('/admin');
            } else {
                setError(result.error);
                setIsGoogleLoading(false);
            }
        } catch (err: any) {
            setError(err.message || "Google sign-in failed.");
            setIsGoogleLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Subtle decorative background elements since it's now white */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-48" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-8">
                    <h1 className="text-4xl font-black text-[#2B4C9B] font-oswald uppercase tracking-wider text-center">
                        Secure <span className="text-[#3B82F6]">Access</span>
                    </h1>
                    <div className="w-12 h-1.5 bg-[#FFB800] rounded-full mt-2" />
                </div>

                <div className="bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden p-10">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold font-outfit border border-red-100 mb-6 flex items-center gap-2">
                             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                             {error}
                        </div>
                    )}

                    {/* Google Login Button */}
                    <button 
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                        className="w-full py-4 rounded-xl bg-white border-2 border-gray-100 flex items-center justify-center gap-3 transition-all hover:border-[#3B82F6] hover:shadow-md group disabled:opacity-70"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#3B82F6]" />
                        ) : (
                            <>
                                <motion.svg 
                                    width="20" 
                                    height="20" 
                                    viewBox="0 0 24 24"
                                    whileHover={{ rotate: 10, scale: 1.1 }}
                                >
                                    <path
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z"
                                        fill="#EA4335"
                                    />
                                </motion.svg>
                                <span className="font-black font-outfit uppercase tracking-widest text-[11px] text-[#2B4C9B]">
                                    Sign in with Google
                                </span>
                            </>
                        )}
                    </button>

                    <div className="flex items-center gap-4 my-8">
                        <div className="flex-1 h-px bg-gray-100" />
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Or using email</span>
                        <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    <form onSubmit={handleEmailLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#2B4C9B]/80 uppercase tracking-widest pl-2">Administrative Email</label>
                            <input name="email" type="email" required placeholder="admin@kenyakeys.org" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-50 transition-all outline-none font-outfit text-[#2B4C9B] placeholder:text-gray-300" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-[#2B4C9B]/80 uppercase tracking-widest pl-2">Password</label>
                            <input name="password" type="password" required placeholder="••••••••" className="w-full px-5 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#3B82F6] focus:ring-4 focus:ring-blue-50 transition-all outline-none font-outfit text-[#2B4C9B] placeholder:text-gray-300" />
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 rounded-xl bg-[#2B4C9B] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#3B82F6] hover:shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log in to System'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-50 pt-6">
                        <p className="text-gray-500 font-outfit text-sm">
                            Don't have an account? <Link href="/admin/signup" className="text-[#3B82F6] font-bold hover:text-[#2B4C9B] transition-all">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

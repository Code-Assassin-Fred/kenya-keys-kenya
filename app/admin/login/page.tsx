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
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 bg-[url('/image17.png')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-[#1D366D]/95 backdrop-blur-md" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative w-full max-w-md"
            >
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#FFB800] rounded-2xl flex items-center justify-center shadow-2xl mb-4">
                        <Shield className="text-[#1D366D] w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-white font-oswald uppercase tracking-wider text-center">
                        Secure <span className="text-[#FFB800]">Access</span>
                    </h1>
                </div>

                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden p-10">
                    {error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold font-outfit border border-red-100 mb-6 flex items-center gap-2">
                             <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                             {error}
                        </div>
                    )}

                    {/* Google Login Button */}
                    <button 
                        onClick={handleGoogleLogin}
                        disabled={isGoogleLoading}
                        className="w-full py-4 rounded-2xl bg-white border-2 border-gray-100 flex items-center justify-center gap-3 transition-all hover:border-[#00529B] hover:bg-gray-50 group disabled:opacity-70"
                    >
                        {isGoogleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-[#00529B]" />
                        ) : (
                            <>
                                <Chrome className="w-5 h-5 text-[#00529B]" />
                                <span className="font-black font-outfit uppercase tracking-widest text-xs text-[#1D366D]">
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
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Administrative Email</label>
                            <input name="email" type="email" required placeholder="admin@kenyakeys.org" className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Password</label>
                            <input name="password" type="password" required placeholder="••••••••" className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" />
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 rounded-[24px] bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Log in to System'}
                        </button>
                    </form>

                    <div className="mt-8 text-center border-t border-gray-50 pt-6">
                        <p className="text-gray-400 font-outfit text-sm">
                            Don't have an admin account? <Link href="/admin/signup" className="text-[#00529B] font-bold border-b-2 border-[#00529B]/20 hover:border-[#00529B] transition-all">Sign Up</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

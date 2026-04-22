'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, User, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminSignupPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());

        try {
            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            const result = await res.json();

            if (result.success) {
                router.push('/admin');
            } else {
                setError(result.error);
            }
        } catch (err) {
            setError("Signup failed. Please try again.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#1D366D] flex items-center justify-center p-6 bg-[url('/image17.png')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-[#1D366D]/95 backdrop-blur-md" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="relative w-full max-w-xl"
            >
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden p-12">
                    <div className="mb-10">
                        <Link href="/admin/login" className="flex items-center gap-2 text-[#00529B] font-black font-outfit uppercase tracking-widest text-[10px] mb-6 hover:translate-x-[-4px] transition-all">
                            <ArrowLeft size={14} /> Back to Login
                        </Link>
                        <h1 className="text-4xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Admin Registration</h1>
                        <p className="text-gray-400 font-outfit mt-2">Join the Kenya Keys administrative team.</p>
                    </div>

                    <form onSubmit={handleSignup} className="space-y-6">
                        {error && <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-xs font-bold font-outfit border border-red-100">{error}</div>}
                        
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Your Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input name="displayName" required className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" placeholder="John Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Work Email</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input name="email" type="email" required className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" placeholder="admin@kenyakeys.org" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Create Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input name="password" type="password" required className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" placeholder="••••••••" />
                            </div>
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 rounded-2xl bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl shadow-blue-900/10 flex items-center justify-center gap-3"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Complete Registration'}
                        </button>
                    </form>
                </div>
            </motion.div>
        </div>
    );
}

'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Mail, Lock, Loader2, ChevronRight } from 'lucide-react';
import { loginAdminAction } from '@/lib/actions/admin-actions';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const result = await loginAdminAction(formData);

        if (result.success) {
            router.push('/admin');
        } else {
            setError(result.error);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 bg-[url('/image17.png')] bg-cover bg-center relative">
            {/* Dark Overlay with Sophisticated Blur */}
            <div className="absolute inset-0 bg-[#1D366D]/90 backdrop-blur-sm" />

            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative w-full max-w-md"
            >
                {/* Brand Identity */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#FFB800] rounded-2xl flex items-center justify-center shadow-2xl mb-4 rotate-3">
                        <Shield className="text-[#1D366D] w-8 h-8" />
                    </div>
                    <h1 className="text-4xl font-black text-white font-oswald uppercase tracking-wider">
                        Kenya Keys <span className="text-[#FFB800]">Admin</span>
                    </h1>
                    <p className="text-blue-200/60 font-outfit mt-2 text-sm uppercase tracking-widest font-bold">
                        Secure Gateway
                    </p>
                </div>

                {/* Login Form Card */}
                <div className="bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 border border-white/10">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-bold font-outfit flex items-center gap-3 border border-red-100"
                            >
                                <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                                {error}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">
                                Administrative Email
                            </label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#00529B] transition-colors" />
                                <input 
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="admin@kenyakeys.org"
                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit text-[#1D366D] placeholder:text-gray-300 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">
                                Security Password
                            </label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-[#00529B] transition-colors" />
                                <input 
                                    name="password"
                                    type="password" 
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit text-[#1D366D] placeholder:text-gray-300 transition-all outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 rounded-[24px] bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl shadow-blue-900/20 flex items-center justify-center gap-3 group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Enter Dashboard
                                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>
                </div>

                {/* Footer Link */}
                <div className="mt-8 text-center">
                    <p className="text-blue-200/40 text-xs font-outfit">
                        Authorized Personnel Only • &copy; {new Date().getFullYear()} Kenya Keys
                    </p>
                </div>
            </motion.div>
        </div>
    );
}

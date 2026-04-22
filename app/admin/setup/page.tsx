'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Rocket, UserPlus, ArrowRight } from 'lucide-react';
import { initializeAdminSystemAction } from '@/lib/actions/admin-actions';
import { useRouter } from 'next/navigation';

export default function AdminSetup() {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    async function handleSetup(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        // We'll use the same action but we might want to ensure 'admin' role
        // For the bootstrap, I'll force the first one to be 'admin'
        const result = await initializeAdminSystemAction(formData);

        if (result.success) {
            alert('Admin account created! Redirecting to login...');
            router.push('/admin/login');
        } else {
            alert('Setup failed: ' + result.error);
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden">
            {/* Subtle decorative background elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50 -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50 rounded-full blur-3xl opacity-50 -ml-48 -mb-48" />

            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-2xl p-12 max-w-lg w-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-gray-100 relative z-10"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-[#FFB800] rounded-2xl text-[#2B4C9B]">
                        <Rocket size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#2B4C9B] font-oswald uppercase">Initial Setup</h1>
                        <p className="text-gray-500 font-outfit text-sm font-medium">Create your master administrator account.</p>
                    </div>
                </div>

                <form onSubmit={handleSetup} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#2B4C9B]/80 uppercase tracking-widest pl-2">Full Name</label>
                        <input name="displayName" required placeholder="Main Administrator" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#3B82F6] outline-none font-outfit text-[#2B4C9B] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#2B4C9B]/80 uppercase tracking-widest pl-2">Email</label>
                        <input name="email" type="email" required placeholder="admin@kenyakeys.org" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#3B82F6] outline-none font-outfit text-[#2B4C9B] transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-[#2B4C9B]/80 uppercase tracking-widest pl-2">Password</label>
                        <input name="password" type="password" required placeholder="••••••••" className="w-full px-6 py-4 rounded-xl bg-gray-50 border border-gray-100 focus:bg-white focus:border-[#3B82F6] outline-none font-outfit text-[#2B4C9B] transition-all" />
                    </div>

                    <button 
                        disabled={isLoading}
                        className="w-full py-5 bg-[#2B4C9B] text-white rounded-xl font-black font-outfit uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#3B82F6] hover:shadow-xl transition-all shadow-blue-900/10 disabled:opacity-70"
                    >
                        {isLoading ? (
                            <div className="flex items-center gap-2">
                                <span className="animate-pulse">Initializing...</span>
                            </div>
                        ) : (
                            <>
                                Initialize System
                                <ArrowRight size={18} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}

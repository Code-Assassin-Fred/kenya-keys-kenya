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
        <div className="min-h-screen bg-[#1D366D] flex items-center justify-center p-6">
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[40px] p-12 max-w-lg w-full shadow-2xl"
            >
                <div className="flex items-center gap-4 mb-8">
                    <div className="p-4 bg-[#FFB800] rounded-2xl text-[#1D366D]">
                        <Rocket size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-black text-[#1D366D] font-oswald uppercase">Initial Setup</h1>
                        <p className="text-gray-400 font-outfit text-sm">Create your master administrator account.</p>
                    </div>
                </div>

                <form onSubmit={handleSetup} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Full Name</label>
                        <input name="displayName" required placeholder="Main Administrator" className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Email</label>
                        <input name="email" type="email" required placeholder="admin@kenyakeys.org" className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Password</label>
                        <input name="password" type="password" required placeholder="••••••••" className="w-full px-6 py-4 rounded-3xl bg-gray-50 border-none outline-none font-outfit" />
                    </div>

                    <button 
                        disabled={isLoading}
                        className="w-full py-5 bg-[#1D366D] text-white rounded-2xl font-black font-outfit uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-[#00529B] transition-all"
                    >
                        {isLoading ? 'Creating...' : (
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

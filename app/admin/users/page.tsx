'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    UserPlus, 
    Mail, 
    Lock, 
    Shield, 
    Check, 
    AlertCircle,
    Loader2,
    Search
} from 'lucide-react';
import { registerSubAdminAction } from '@/lib/actions/admin-actions';

export default function UserManagement() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await registerSubAdminAction(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Sub-admin successfully registered!' });
            (e.target as HTMLFormElement).reset();
        } else {
            setMessage({ type: 'error', text: result.error || 'Registration failed' });
        }
        setIsLoading(false);
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Admin Management</h1>
                <p className="text-gray-500 font-outfit mt-1">Register new sub-admins and manage access roles.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm"
                >
                    <div className="flex items-center gap-4 mb-8">
                        <div className="p-3 bg-blue-50 rounded-2xl text-[#00529B]">
                            <UserPlus size={24} />
                        </div>
                        <h2 className="text-xl font-black text-[#1D366D] font-oswald uppercase tracking-wide">Register Sub-Admin</h2>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-4 rounded-2xl text-xs font-bold font-outfit flex items-center gap-3 border ${
                                    message.type === 'success' 
                                        ? 'bg-green-50 text-green-600 border-green-100' 
                                        : 'bg-red-50 text-red-600 border-red-100'
                                }`}
                            >
                                {message.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
                                {message.text}
                            </motion.div>
                        )}

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Full Name</label>
                            <div className="relative">
                                <Shield className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input 
                                    name="displayName"
                                    type="text" 
                                    required
                                    placeholder="John Doe"
                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input 
                                    name="email"
                                    type="email" 
                                    required
                                    placeholder="subadmin@kenyakeys.org"
                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit outline-none"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest pl-4">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300" />
                                <input 
                                    name="password"
                                    type="password" 
                                    required
                                    placeholder="••••••••"
                                    className="w-full pl-12 pr-6 py-4 rounded-3xl bg-gray-50 border-none focus:ring-2 focus:ring-[#00529B]/20 font-outfit outline-none"
                                />
                            </div>
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-5 rounded-2xl bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#00529B] transition-all shadow-xl flex items-center justify-center gap-3 disabled:opacity-70"
                        >
                            {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Register Admin Access'}
                        </button>
                    </form>
                </motion.div>

                {/* Info / List Panel */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-[#1D366D] p-10 rounded-[40px] text-white relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-black font-oswald uppercase tracking-wide mb-4">Security Notice</h2>
                            <p className="text-blue-200/80 font-outfit leading-relaxed text-sm mb-6">
                                Sub-admins will have access to the student catalog and donation oversight but cannot register other users. Ensure passwords meet organizational security standards.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    'Encrypted authentication via Admin SDK',
                                    'Role-based access control enabled',
                                    'Audit logs for all record changes'
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-xs font-bold font-outfit">
                                        <div className="w-5 h-5 rounded-full bg-[#FFB800] text-[#1D366D] flex items-center justify-center flex-shrink-0">
                                            <Check size={12} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#00529B] rounded-full blur-3xl opacity-30" />
                    </div>

                    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-black text-[#1D366D] font-oswald uppercase tracking-wide">Active Admins</h3>
                            <button className="text-[10px] font-black text-[#00529B] uppercase tracking-widest border-b-2 border-[#00529B]">View All</button>
                        </div>
                        <div className="space-y-4">
                            {[
                                { name: 'Main Admin', email: 'admin@kenyakeys.org', role: 'Super Admin' },
                                { name: 'Kenya Staff', email: 'kenya@kenyakeys.org', role: 'Sub Admin' },
                            ].map((user, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-gray-50 border border-gray-100 italic">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-[#00529B]/10 text-[#00529B] flex items-center justify-center font-black text-xs">
                                            {user.name[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-[#1D366D] font-outfit text-sm">{user.name}</p>
                                            <p className="text-[10px] text-gray-400 font-medium">{user.role}</p>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-black text-green-600 bg-green-50 px-2 py-1 rounded-full uppercase tracking-widest">
                                        Active
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

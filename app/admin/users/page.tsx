'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { registerSubAdminAction } from '@/lib/actions/admin-actions';

export default function UserManagement() {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        loadUsers();
    }, []);

    async function loadUsers() {
        try {
            const res = await fetch('/api/admin/users');
            const result = await res.json();
            setData(Array.isArray(result) ? result : []);
        } catch (err) {
            console.error("Fetch failed", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        setMessage(null);

        const formData = new FormData(e.currentTarget);
        const result = await registerSubAdminAction(formData);

        if (result.success) {
            setMessage({ type: 'success', text: 'Sub-admin successfully registered!' });
            (e.target as HTMLFormElement).reset();
            loadUsers();
        } else {
            setMessage({ type: 'error', text: result.error || 'Registration failed' });
        }
        setIsLoading(false);
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Admin Management</h1>
                <p className="text-[#667085] font-outfit mt-1 text-sm">Register sub-admins and manage system access.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registration Form */}
                <motion.div 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 rounded-xl border border-[#EAECF0] shadow-sm"
                >
                    <div className="mb-6">
                        <h2 className="text-lg font-bold text-[#101828] font-outfit">Register Sub-Admin</h2>
                        <p className="text-[#667085] font-outfit text-xs">Create a new administrative account.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {message && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.98 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className={`p-4 rounded-lg text-xs font-bold font-outfit border ${
                                    message.type === 'success' 
                                        ? 'bg-[#ECFDF3] text-[#027A48] border-[#ABEFC6]' 
                                        : 'bg-red-50 text-red-700 border-[#FDA29B]'
                                }`}
                            >
                                {message.text}
                            </motion.div>
                        )}

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#344054]">Full Name</label>
                            <input 
                                name="displayName"
                                type="text" 
                                required
                                placeholder="John Doe"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-[#101828] text-sm transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#344054]">Email Address</label>
                            <input 
                                name="email"
                                type="email" 
                                required
                                placeholder="admin@kenyakeys.org"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-[#101828] text-sm transition-all"
                            />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-[#344054]">Password</label>
                            <input 
                                name="password"
                                type="password" 
                                required
                                placeholder="••••••••"
                                className="w-full px-4 py-2.5 rounded-lg bg-white border border-[#D0D5DD] focus:border-[#32D583] outline-none font-outfit text-[#101828] text-sm transition-all"
                            />
                        </div>

                        <button 
                            disabled={isLoading}
                            className="w-full py-3 rounded-lg bg-[#101828] text-white font-bold font-outfit text-sm hover:bg-[#1d2939] transition-all shadow-sm disabled:opacity-50"
                        >
                            {isLoading ? 'Processing...' : 'Register Access'}
                        </button>
                    </form>
                </motion.div>

                {/* Info / List Panel */}
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-8"
                >
                    <div className="bg-[#101828] p-8 rounded-xl text-white border border-[#1d2939] shadow-sm">
                        <h2 className="text-lg font-bold font-outfit mb-3">Security Policy</h2>
                        <p className="text-[#94A3B8] font-outfit text-sm leading-relaxed mb-6">
                            Sub-admins have granular access to student and donation data. Global settings and user management are restricted to super-admins.
                        </p>
                        <ul className="space-y-3">
                            {[
                                'Encrypted authentication active',
                                'Role-based access control enabled',
                                'Audit logging for all changes'
                            ].map((item, i) => (
                                <li key={i} className="flex items-center gap-2 text-xs font-bold font-outfit">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#32D583]" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
                        <h3 className="font-bold text-[#101828] font-outfit mb-4">Active System Users</h3>
                        <div className="space-y-3">
                            {loading ? (
                                <div className="py-10 flex justify-center">
                                    <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-[#32D583]"></div>
                                </div>
                            ) : data.length > 0 ? (
                                data.map((user: any, i: number) => (
                                    <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border border-[#EAECF0]">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-white border border-[#EAECF0] text-[#101828] flex items-center justify-center font-bold text-xs uppercase">
                                                {(user.displayName || user.email || 'A')[0]}
                                            </div>
                                            <div>
                                                <p className="font-semibold text-[#101828] font-outfit text-sm">{user.displayName || 'Unnamed User'}</p>
                                                <p className="text-[10px] text-[#667085] font-bold uppercase tracking-wider">{user.role || 'Admin'}</p>
                                            </div>
                                        </div>
                                        <div className="text-[10px] font-bold text-[#027A48] bg-[#ECFDF3] px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            Online
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-[#667085] text-center text-sm italic py-4">No other administrators found.</p>
                            )}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

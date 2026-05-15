'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getPackagesAction, updatePackageAction } from '@/lib/actions/admin-actions';

export default function PackageManagement() {
    const [packages, setPackages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<any>({});

    useEffect(() => {
        loadPackages();
    }, []);

    async function loadPackages() {
        setLoading(true);
        const data = await getPackagesAction();
        setPackages(data);
        setLoading(false);
    }

    function startEdit(pkg: any) {
        setEditingId(pkg.id);
        setFormData(pkg);
    }

    async function handleSave() {
        if (!editingId) return;
        await updatePackageAction(editingId, formData);
        setEditingId(null);
        loadPackages();
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Donation Packages</h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">Configure tiered sponsorship and impact levels.</p>
                </div>
                <button className="px-6 py-3 bg-[#101828] text-white rounded-lg font-bold font-outfit text-sm hover:bg-[#1d2939] transition-all shadow-sm">
                    New Package
                </button>
            </div>

            {loading ? (
                <div className="py-20 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#32D583] mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {packages.map((pkg) => (
                        <motion.div 
                            key={pkg.id}
                            layout
                            className={`bg-white rounded-xl border-2 transition-all p-6 flex flex-col ${
                                editingId === pkg.id ? 'border-[#32D583] shadow-lg scale-[1.01]' : 'border-[#EAECF0] shadow-sm'
                            }`}
                        >
                            {editingId === pkg.id ? (
                                <div className="space-y-5 flex-1 flex flex-col">
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Title</label>
                                        <input 
                                            value={formData.title} 
                                            onChange={(e) => setFormData({...formData, title: e.target.value})}
                                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-[#D0D5DD] font-bold text-[#101828] font-outfit text-base outline-none focus:border-[#32D583]"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#344054]">Amount ($)</label>
                                            <input 
                                                value={formData.amount} 
                                                onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-[#D0D5DD] font-bold text-[#101828] font-outfit outline-none focus:border-[#32D583]"
                                            />
                                        </div>
                                        <div className="space-y-1.5">
                                            <label className="text-xs font-bold text-[#344054]">Period</label>
                                            <input 
                                                value={formData.period} 
                                                onChange={(e) => setFormData({...formData, period: e.target.value})}
                                                className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-[#D0D5DD] font-medium text-[#667085] font-outfit outline-none focus:border-[#32D583]"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-[#344054]">Description</label>
                                        <textarea 
                                            value={formData.description} 
                                            onChange={(e) => setFormData({...formData, description: e.target.value})}
                                            rows={3}
                                            className="w-full px-3 py-2 rounded-lg bg-gray-50 border border-[#D0D5DD] font-medium text-[#667085] font-outfit text-sm resize-none outline-none focus:border-[#32D583]"
                                        />
                                    </div>
                                    <div className="mt-auto pt-4 flex gap-2">
                                        <button 
                                            onClick={handleSave}
                                            className="flex-1 py-2 bg-[#101828] text-white rounded-lg font-bold font-outfit text-xs hover:bg-[#1d2939] transition-all"
                                        >
                                            Save Changes
                                        </button>
                                        <button 
                                            onClick={() => setEditingId(null)}
                                            className="px-4 py-2 bg-gray-100 text-[#344054] rounded-lg hover:bg-gray-200 transition-all font-bold text-xs"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col">
                                    <div className="flex items-center justify-between mb-4">
                                        <div className="px-2.5 py-0.5 rounded-full bg-[#ECFDF3] text-[#027A48] text-[10px] font-bold uppercase tracking-wider">
                                            Active
                                        </div>
                                        <button 
                                            onClick={() => startEdit(pkg)}
                                            className="text-xs font-bold text-[#101828] hover:text-[#32D583] transition-all"
                                        >
                                            Edit
                                        </button>
                                    </div>
                                    <h3 className="text-lg font-bold text-[#101828] font-outfit mb-1">
                                        {pkg.title}
                                    </h3>
                                    <div className="flex items-baseline gap-1 mb-4">
                                        <span className="text-2xl font-bold text-[#101828] font-outfit">${pkg.amount}</span>
                                        <span className="text-[10px] font-bold text-[#667085] uppercase tracking-wider">{pkg.period}</span>
                                    </div>
                                    <p className="text-sm text-[#667085] font-outfit leading-relaxed flex-1">
                                        {pkg.description}
                                    </p>
                                    <div className="mt-6 pt-4 border-t border-[#EAECF0] text-[10px] font-bold text-[#32D583] uppercase tracking-widest font-outfit">
                                        Available for selection
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}

                    {!loading && packages.length === 0 && (
                        <div className="lg:col-span-3 py-20 text-center bg-white rounded-xl border border-dashed border-[#EAECF0]">
                            <p className="text-[#667085] font-outfit italic">No packages found.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

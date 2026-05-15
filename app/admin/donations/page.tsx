'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function DonationOversight() {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/admin/donations');
                const result = await res.json();
                setData(result);
            } catch (err) {
                console.error("Fetch error", err);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    if (loading) {
        return (
            <div className="h-full flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#32D583]"></div>
            </div>
        );
    }

    const donations = data?.donations || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#101828] font-outfit tracking-tight">Donation Oversight</h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">Monitor all incoming support and sponsorship funds.</p>
                </div>
                <button className="px-5 py-2.5 bg-white border border-[#EAECF0] text-[#344054] rounded-lg font-bold font-outfit text-sm hover:bg-gray-50 transition-all shadow-sm">
                    Export Report
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#101828] p-6 rounded-xl text-white border border-[#1d2939] shadow-sm">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] mb-2">Total Managed Revenue</h3>
                    <p className="text-3xl font-bold font-outfit">${data?.totalRevenue?.toLocaleString() || '0'}.00</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
                    <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-2">Unique Donors</h3>
                    <p className="text-3xl font-bold font-outfit text-[#101828]">{data?.donorCount || '0'}</p>
                </div>
                <div className="bg-white p-6 rounded-xl border border-[#EAECF0] shadow-sm">
                    <h3 className="text-xs font-bold text-[#667085] uppercase tracking-wider mb-2">Total Transactions</h3>
                    <p className="text-3xl font-bold font-outfit text-[#101828]">{donations.length}</p>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-xl border border-[#EAECF0] shadow-sm overflow-hidden">
                <div className="p-6 border-b border-[#EAECF0] flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-80">
                        <input 
                            type="text" 
                            placeholder="Search donors..."
                            className="w-full px-4 py-2.5 rounded-lg bg-gray-50 border border-[#EAECF0] focus:bg-white focus:border-[#32D583] outline-none font-outfit text-sm transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {donations.length > 0 ? (
                        <table className="w-full border-collapse text-left">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#EAECF0]">
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Donor</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Email</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Amount</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAECF0]">
                                {donations.map((donation: any) => (
                                    <tr key={donation.id} className="hover:bg-gray-50/50 transition-all">
                                        <td className="px-6 py-4 font-semibold text-[#101828] font-outfit text-sm">{donation.donor}</td>
                                        <td className="px-6 py-4 text-xs text-[#667085] font-medium">{donation.email || 'N/A'}</td>
                                        <td className="px-6 py-4">
                                            <span className="font-bold text-[#101828] font-outfit text-sm">${donation.amount}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-xs font-medium text-[#667085] font-outfit">{donation.date}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#ECFDF3] text-[#027A48]">
                                                COMPLETED
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-20 text-center">
                            <p className="text-[#667085] font-outfit font-medium">No donation records found.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

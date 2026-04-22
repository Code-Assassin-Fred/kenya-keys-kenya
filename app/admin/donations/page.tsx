'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Heart, 
    Search, 
    Download, 
    Filter, 
    Calendar,
    ArrowUpRight,
    TrendingUp,
    Users
} from 'lucide-react';

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
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#3B82F6]"></div>
            </div>
        );
    }

    const donations = data?.donations || [];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#2B4C9B] font-oswald uppercase tracking-tight">Donation Oversight</h1>
                    <p className="text-gray-500 font-outfit mt-1 text-sm font-medium">Monitor all incoming support and sponsorship funds from Firestore.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 text-[#2B4C9B] rounded-2xl font-black font-outfit uppercase tracking-widest text-sm hover:shadow-xl transition-all">
                    <Download size={18} className="text-[#3B82F6]" />
                    Export Report
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#3B82F6] p-8 rounded-[40px] text-white overflow-hidden relative shadow-xl shadow-blue-500/10">
                    <div className="relative z-10">
                        <TrendingUp className="text-[#FFB800] mb-4" size={32} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-80 mb-2">Total Managed Revenue</h3>
                        <p className="text-4xl font-black font-oswald">${data?.totalRevenue?.toLocaleString() || '0'}.00</p>
                    </div>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <Users className="text-[#009bba] mb-4" size={32} />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Unique Donors</h3>
                    <p className="text-4xl font-black font-oswald text-[#2B4C9B]">{data?.donorCount || '0'}</p>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <Heart className="text-red-500 mb-4" size={32} />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Total Transactions</h3>
                    <p className="text-4xl font-black font-oswald text-[#2B4C9B]">{donations.length}</p>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search donors..."
                            className="w-full pl-12 pr-6 py-3 rounded-2xl bg-gray-50 border-none font-outfit text-sm"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    {donations.length > 0 ? (
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Donor</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Email</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {donations.map((donation: any) => (
                                    <tr key={donation.id} className="hover:bg-blue-50/30 transition-all">
                                        <td className="px-8 py-6 font-bold text-[#2B4C9B] font-outfit">{donation.donor}</td>
                                        <td className="px-8 py-6 text-xs text-gray-500 font-medium">{donation.email || 'N/A'}</td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-1">
                                                <span className="font-black text-[#3B82F6] font-oswald">${donation.amount}</span>
                                                <ArrowUpRight size={12} className="text-green-500" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-xs font-bold text-gray-400 font-outfit">{donation.date}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-50 text-green-600">
                                                COMPLETED
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="p-20 text-center">
                            <Heart className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                            <p className="text-gray-400 font-outfit font-bold">No donation records found in the database.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

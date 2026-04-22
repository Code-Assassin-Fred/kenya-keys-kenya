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
    // Mock donations for visualization
    const donations = [
        { id: '1', donor: 'Michael Scott', amount: 1000, date: '2026-04-22', type: 'University Education', status: 'Completed' },
        { id: '2', donor: 'Pam Beesly', amount: 235, date: '2026-04-21', type: 'Landing Kit', status: 'Completed' },
        { id: '3', donor: 'Jim Halpert', amount: 750, date: '2026-04-20', type: 'College Education', status: 'Completed' },
        { id: '4', donor: 'Dwight Schrute', amount: 154, date: '2026-04-19', type: 'Transport Support', status: 'Pending' },
        { id: '5', donor: 'Angela Martin', amount: 385, date: '2026-04-18', type: 'Accommodation & Food', status: 'Completed' },
    ];

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-[#1D366D] font-oswald uppercase tracking-tight">Donation Oversight</h1>
                    <p className="text-gray-500 font-outfit mt-1">Monitor all incoming support and sponsorship funds.</p>
                </div>
                <button className="flex items-center gap-2 px-8 py-4 bg-white border border-gray-100 text-[#1D366D] rounded-2xl font-black font-outfit uppercase tracking-widest text-sm hover:shadow-xl transition-all">
                    <Download size={18} className="text-[#00529B]" />
                    Export Report
                </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-[#00529B] p-8 rounded-[40px] text-white overflow-hidden relative">
                    <div className="relative z-10">
                        <TrendingUp className="text-[#FFB800] mb-4" size={32} />
                        <h3 className="text-xs font-black uppercase tracking-[0.2em] opacity-60 mb-2">Total Monthly Revenue</h3>
                        <p className="text-4xl font-black font-oswald">$12,450.00</p>
                    </div>
                    <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white opacity-5 rounded-full" />
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <Users className="text-[#009bba] mb-4" size={32} />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Active Monthly Donors</h3>
                    <p className="text-4xl font-black font-oswald text-[#1D366D]">84</p>
                </div>
                <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
                    <Heart className="text-pink-500 mb-4" size={32} />
                    <h3 className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Sponsorship Impact</h3>
                    <p className="text-4xl font-black font-oswald text-[#1D366D]">126<span className="text-lg opacity-40 ml-1">Students</span></p>
                </div>
            </div>

            {/* Main Table Area */}
            <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-gray-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input 
                            type="text" 
                            placeholder="Search donors or packages..."
                            className="w-full pl-12 pr-6 py-3 rounded-2xl bg-gray-50 border-none font-outfit text-sm"
                        />
                    </div>
                    <div className="flex gap-2 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-[#1D366D] rounded-2xl font-bold font-outfit text-sm">
                            <Calendar size={16} />
                            Date Range
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-[#1D366D] rounded-2xl font-bold font-outfit text-sm">
                            <Filter size={16} />
                            Filter
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-50/50 border-b border-gray-100 text-left">
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Donor</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Package Type</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Amount</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Date</th>
                                <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {donations.map((donation) => (
                                <tr key={donation.id} className="hover:bg-blue-50/30 transition-all cursor-pointer">
                                    <td className="px-8 py-6 font-bold text-[#1D366D] font-outfit">{donation.donor}</td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs font-bold text-gray-500 font-outfit">{donation.type}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-1">
                                            <span className="font-black text-[#00529B] font-oswald">${donation.amount}</span>
                                            <ArrowUpRight size={12} className="text-green-500" />
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs font-bold text-gray-400 font-outfit">{donation.date}</div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                                            donation.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                                        }`}>
                                            {donation.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-8 bg-gray-50/50 text-center">
                    <button className="text-xs font-black text-[#00529B] uppercase tracking-[0.2em] border-b-2 border-[#00529B] pb-1">
                        View 12 More Transactions
                    </button>
                </div>
            </div>
        </div>
    );
}

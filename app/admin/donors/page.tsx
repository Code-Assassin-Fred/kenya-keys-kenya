'use client';

import React, { useState, useEffect } from 'react';
import { getInterestedDonorsAction } from '@/lib/actions/admin-actions';
import { Search, Heart, DollarSign, Calendar, Mail, Phone, Globe, Users } from 'lucide-react';

export default function InterestedDonorsPage() {
    const [donors, setDonors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        async function load() {
            const data = await getInterestedDonorsAction();
            setDonors(data);
            setLoading(false);
        }
        load();
    }, []);

    const formatDate = (isoString: string) => {
        try {
            const date = new Date(isoString);
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
            });
        } catch (e) {
            return isoString;
        }
    };

    const filteredDonors = donors.filter((donor: any) => {
        const query = searchQuery.toLowerCase();
        return (
            (donor.targetName || '').toLowerCase().includes(query) ||
            (donor.email || '').toLowerCase().includes(query) ||
            (donor.type || '').toLowerCase().includes(query) ||
            (donor.country || '').toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-8">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#101828] font-outfit tracking-tight uppercase">
                        Interested Donors
                    </h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">
                        Review and track individuals interested in student sponsorship or donation packages.
                    </p>
                </div>

                {/* Search Field */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search donors..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAECF0] focus:border-[#1D366D] outline-none font-outfit text-sm text-[#333] rounded-xl transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Table or Empty State */}
            {loading ? (
                <div className="py-24 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1D366D] mx-auto"></div>
                </div>
            ) : filteredDonors.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#EAECF0] p-16 text-center shadow-sm">
                    <Heart className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                    <p className="text-[#101828] font-outfit font-bold text-lg">No Interested Donors</p>
                    <p className="text-[#667085] font-outfit text-sm mt-1 max-w-xs mx-auto">
                        {searchQuery ? 'Try adjusting your search terms.' : 'No sponsorship or package interests recorded yet.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#EAECF0]">
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Interested Date</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Interest Category</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Target Package / Student</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Contact Info</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Country</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAECF0]">
                                {filteredDonors.map((donor: any) => (
                                    <tr 
                                        key={donor.id}
                                        className="hover:bg-blue-50/10 transition-colors"
                                    >
                                        {/* Date */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-[#475467] font-medium font-outfit">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {formatDate(donor.createdAt)}
                                            </div>
                                        </td>

                                        {/* Interest Category Badge */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {donor.type === 'sponsorship' ? (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#FDF2FA] text-[#C11574] border border-[#FCCEEE] font-outfit">
                                                    <Users className="w-3.5 h-3.5" />
                                                    Sponsorship
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-[#ECFDF3] text-[#027A48] border border-[#D1FADF] font-outfit">
                                                    <DollarSign className="w-3.5 h-3.5" />
                                                    Donation
                                                </span>
                                            )}
                                        </td>

                                        {/* Target Name */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="text-sm font-bold text-[#101828] font-outfit">
                                                {donor.targetName}
                                            </span>
                                        </td>

                                        {/* Contact Details */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold text-gray-800 font-outfit flex items-center gap-1.5">
                                                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                                                    <a href={`mailto:${donor.email}`} className="hover:underline text-[#1D366D]">
                                                        {donor.email}
                                                    </a>
                                                </div>
                                                <div className="text-xs text-[#667085] font-outfit flex items-center gap-1.5">
                                                    <Phone className="w-3 h-3 text-gray-400" />
                                                    {donor.phone}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Country */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-1.5 text-sm text-[#475467] font-medium font-outfit">
                                                <Globe className="w-4 h-4 text-gray-400" />
                                                {donor.country || <span className="italic text-gray-400">N/A</span>}
                                            </div>
                                        </td>

                                        {/* Reply / Email CTA */}
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <a 
                                                href={`mailto:${donor.email}?subject=Kenya Keys: Thank you for showing interest in ${donor.targetName}`}
                                                className="inline-flex items-center gap-1 text-[#1D366D] font-bold text-xs font-outfit hover:underline"
                                            >
                                                Get in Touch <Globe className="w-3.5 h-3.5" />
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}

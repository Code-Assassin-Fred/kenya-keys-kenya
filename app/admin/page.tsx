'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const quickActions = [
    {
        title: "Student Catalog",
        description: "Manage student profiles and academic records.",
        href: "/admin/students",
    },
    {
        title: "Sponsorship Packages",
        description: "Configure donation tiers and frequencies.",
        href: "/admin/packages",
    },
    {
        title: "Contact Messages",
        description: "View and respond to inquiries.",
        href: "/admin/messages",
    },
    {
        title: "Interested Donors",
        description: "Review and manage donor leads.",
        href: "/admin/donors",
    },
    {
        title: "Sub-Admins",
        description: "Manage administrative accounts and access.",
        href: "/admin/users",
    },

];

export default function AdminDashboard() {
    return (
        <div className="space-y-8 py-4">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-[#101828] font-outfit tracking-tight uppercase">
                    Admin Overview
                </h1>
                <p className="text-[#667085] font-outfit mt-2 text-sm max-w-xl leading-relaxed">
                    Quick actions to navigate across the administration panel.
                </p>
            </div>

            {/* Small Quick Action Cards Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {quickActions.map((action, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: idx * 0.05 }}
                    >
                        <Link
                                href={action.href}
                                className="block bg-white border border-[#E4E7EC] rounded-xl p-5 hover:border-[#1D366D] hover:shadow-md transition-all group h-full"
                                style={{ textDecoration: 'none' }}
                            >
                                <h3 className="text-sm font-bold text-[#101828] font-outfit uppercase tracking-tight mb-1.5 group-hover:text-[#1D366D] transition-colors">
                                    {action.title}
                                </h3>
                                <p className="text-xs text-[#667085] font-outfit leading-relaxed mb-3">
                                    {action.description}
                                </p>
                                <div className="flex items-center gap-1 text-[#1D366D] text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity">
                                    Open <ArrowRight className="w-3 h-3" />
                                </div>
                            </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

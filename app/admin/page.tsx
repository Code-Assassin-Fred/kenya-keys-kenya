'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
    GraduationCap, 
    Layers, 
    UserCheck, 
    ExternalLink, 
    ArrowRight,
    Plus,
    UserPlus
} from 'lucide-react';

export default function AdminDashboard() {
    const actions = [
        {
            title: "Student Catalog",
            description: "Manage student profiles, academic records, details, and general catalog listings.",
            icon: GraduationCap,
            color: "from-emerald-500/10 to-teal-500/10 text-emerald-600 border-emerald-500/20",
            hoverColor: "hover:border-emerald-500 hover:shadow-emerald-500/10",
            primaryLink: "/admin/students",
            primaryLabel: "Go to Catalog",
            secondaryLink: "/admin/students",
            secondaryLabel: "Add New Student",
            secondaryIcon: Plus,
        },
        {
            title: "Sponsorship Packages",
            description: "Configure tiered donation amounts, period frequencies, and package descriptions.",
            icon: Layers,
            color: "from-[#1D366D]/10 to-[#101828]/10 text-[#1D366D] border-[#1D366D]/20",
            hoverColor: "hover:border-[#1D366D] hover:shadow-[#1D366D]/10",
            primaryLink: "/admin/packages",
            primaryLabel: "Manage Packages",
            secondaryLink: "/admin/packages",
            secondaryLabel: "Create Package",
            secondaryIcon: Plus,
        },
        {
            title: "Administrative Access",
            description: "Control administrative accounts, sub-admins, access profiles, and permissions.",
            icon: UserCheck,
            color: "from-purple-500/10 to-indigo-500/10 text-[#101828] border-purple-500/20",
            hoverColor: "hover:border-[#101828] hover:shadow-[#101828]/10",
            primaryLink: "/admin/users",
            primaryLabel: "Manage Sub-Admins",
            secondaryLink: "/admin/users",
            secondaryLabel: "New Admin",
            secondaryIcon: UserPlus,
        },
        {
            title: "View Main Website",
            description: "Visit the live public-facing Kenya Keys website to review your site design and content.",
            icon: ExternalLink,
            color: "from-slate-500/10 to-slate-700/10 text-slate-700 border-slate-500/20",
            hoverColor: "hover:border-slate-500 hover:shadow-slate-500/10",
            primaryLink: "/",
            primaryLabel: "Open Live Site",
            external: true
        }
    ];

    return (
        <div className="space-y-10 py-4">
            {/* Header Section */}
            <div>
                <h1 className="text-3xl font-black text-[#101828] font-outfit tracking-tight uppercase">
                    Admin Overview
                </h1>
                <p className="text-[#667085] font-outfit mt-2 text-base max-w-2xl leading-relaxed">
                    Welcome to the Kenya Keys Administration Panel. Select any of the quick actions below to manage your system records and configurations.
                </p>
            </div>

            {/* Quick Actions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {actions.map((action, idx) => {
                    const IconComponent = action.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.08 }}
                            className={`bg-white rounded-3xl border-2 border-gray-100 p-8 flex flex-col justify-between transition-all duration-300 shadow-sm ${action.hoverColor} hover:shadow-xl group`}
                        >
                            <div>
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${action.color} border flex items-center justify-center mb-6`}>
                                    <IconComponent className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-black text-[#101828] font-outfit uppercase tracking-tight mb-3">
                                    {action.title}
                                </h3>
                                <p className="text-[#667085] font-outfit text-sm leading-relaxed mb-8 max-w-md">
                                    {action.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4 items-center mt-auto border-t border-gray-50 pt-6">
                                {action.external ? (
                                    <a
                                        href={action.primaryLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 px-6 py-3 bg-[#101828] text-white rounded-xl font-bold font-outfit text-sm hover:bg-[#1d2939] transition-all shadow-md active:scale-95"
                                    >
                                        {action.primaryLabel}
                                        <ExternalLink className="w-4 h-4" />
                                    </a>
                                ) : (
                                    <>
                                        <Link
                                            href={action.primaryLink}
                                            className="flex items-center gap-2 px-6 py-3 bg-[#1D366D] text-white rounded-xl font-bold font-outfit text-sm hover:bg-[#101828] transition-all shadow-md active:scale-95"
                                        >
                                            {action.primaryLabel}
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </Link>
                                        {action.secondaryLabel && (
                                            <Link
                                                href={action.secondaryLink}
                                                className="flex items-center gap-2 px-5 py-3 bg-white border border-[#D0D5DD] text-[#344054] rounded-xl font-bold font-outfit text-sm hover:bg-gray-50 transition-all active:scale-95"
                                            >
                                                {action.secondaryIcon && <action.secondaryIcon className="w-4 h-4" />}
                                                {action.secondaryLabel}
                                            </Link>
                                        )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}

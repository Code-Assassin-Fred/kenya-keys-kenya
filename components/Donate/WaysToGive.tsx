'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Landmark, Mail, Briefcase, Share2, Award } from 'lucide-react';

const methods = [
    {
        icon: <CreditCard className="w-12 h-12" />,
        title: "Online Giving",
        description: "Set up a one-time or recurring monthly gift securely via credit card or PayPal.",
        action: "Donate Online",
        href: "/donate"
    },
    {
        icon: <Landmark className="w-12 h-12" />,
        title: "Stock & Securities",
        description: "Donating appreciated stock is one of the most tax-efficient ways to support Kenya Keys.",
        action: "Transfer Stock",
        href: "mailto:info@kenyakeys.org?subject=Stock Transfer Inquiry"
    },
    {
        icon: <Mail className="w-12 h-12" />,
        title: "Check by Mail",
        description: "Send donations via check to our US office. 100% of your gift goes directly to programs.",
        action: "Mailing Address",
        href: "#contact"
    },
    {
        icon: <Briefcase className="w-12 h-12" />,
        title: "Employee Matching",
        description: "Many employers will double or triple your gift. Check if your company has a matching program.",
        action: "Check My Company",
        href: "mailto:info@kenyakeys.org?subject=Employee Matching Inquiry"
    },
    {
        icon: <Award className="w-12 h-12" />,
        title: "Planned Giving",
        description: "Create a lasting legacy by including Kenya Keys in your will or estate planning.",
        action: "Learn About Legacy",
        href: "mailto:info@kenyakeys.org?subject=Planned Giving Inquiry"
    },
    {
        icon: <Share2 className="w-12 h-12" />,
        title: "Fundraise",
        description: "Start a birthday fundraiser or local event to bring your community together for a cause.",
        action: "Resource Toolkit",
        href: "mailto:info@kenyakeys.org?subject=Fundraising Inquiry"
    }
];

export default function WaysToGive() {
    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                    {methods.map((method, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group flex flex-col p-10 rounded-[40px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl hover:border-blue-100 transition-all duration-500"
                        >
                            <div className="w-20 h-20 bg-blue-50 text-[#00529B] rounded-3xl flex items-center justify-center mb-8 group-hover:bg-[#00529B] group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                                {method.icon}
                            </div>
                            
                            <h3 className="text-2xl font-black text-[#333] font-oswald uppercase mb-4 tracking-tight">
                                {method.title}
                            </h3>
                            
                            <p className="text-gray-600 font-outfit leading-relaxed mb-8 text-lg">
                                {method.description}
                            </p>
                            
                            <a 
                                href={method.href}
                                className="mt-auto text-[#00529B] font-black font-outfit uppercase tracking-widest text-xs border-b-2 border-[#00529B] pb-1 w-fit group-hover:border-[#FFB800] transition-all"
                            >
                                {method.action}
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* Info Box */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="mt-24 p-12 bg-[#F0F7FF] rounded-[40px] border-2 border-blue-100 flex flex-col md:flex-row items-center gap-12"
                >
                    <div className="flex-1">
                        <h3 className="text-3xl font-black text-[#1D366D] font-oswald uppercase mb-4 tracking-tight">Question about giving?</h3>
                        <p className="text-lg text-gray-700 font-outfit leading-relaxed">
                            Our team is here to help you find the best way for you to make an impact. We can provide tax IDs, transfer instructions, or discuss specific program funding.
                        </p>
                    </div>
                    <a 
                        href="mailto:info@kenyakeys.org"
                        className="bg-[#1D366D] text-white px-10 py-5 rounded-full font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#001D4A] transition-all shadow-xl"
                    >
                        Contact Giving Team
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Mail, Send } from 'lucide-react';

interface SponsorshipModalProps {
    isOpen: boolean;
    onClose: () => void;
    studentName?: string;
    amount?: number;
    subject?: string;
}

export default function SponsorshipModal({ isOpen, onClose, studentName, amount, subject }: SponsorshipModalProps) {
    const [copied, setCopied] = useState(false);
    const email = "joseph@kenyakeyspbo-kenya.org";
    
    const defaultSubject = subject || (studentName ? `Sponsorship Inquiry: ${studentName}` : amount ? `Monthly Sponsorship: $${amount}` : "Sponsorship Inquiry");
    const defaultBody = studentName 
        ? `I am interested in sponsoring ${studentName}. Please provide more information.` 
        : amount 
        ? `I would like to start a monthly sponsorship of $${amount}. Please guide me on the next steps.`
        : "I am interested in sponsoring a student. Please provide more information on the process.";

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(defaultSubject)}&body=${encodeURIComponent(defaultBody)}`;

    const copyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white border border-gray-100 shadow-2xl overflow-hidden rounded-sm"
                    >
                        {/* Header */}
                        <div className="bg-[#1D366D] p-6 text-white flex justify-between items-center">
                            <h3 className="text-xl font-black font-oswald uppercase tracking-tight">Contact Joseph</h3>
                            <button 
                                onClick={onClose}
                                className="p-1 hover:bg-white/10 transition-colors rounded-sm"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 bg-blue-50 rounded-sm flex items-center justify-center text-[#1D366D]">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-black uppercase tracking-widest text-gray-400 font-outfit mb-1">Executive Director</p>
                                    <p className="text-lg font-bold text-[#333] font-outfit">Joseph M. Mwengea</p>
                                </div>
                            </div>

                            <p className="text-gray-600 font-outfit leading-relaxed mb-8 text-sm">
                                To proceed with your sponsorship {studentName ? `for ${studentName}` : amount ? `of $${amount}/month` : ""}, please reach out directly to our Executive Director.
                            </p>

                            {/* Email Display / Action */}
                            <div className="bg-gray-50 p-4 border border-gray-100 mb-8 flex items-center justify-between rounded-sm">
                                <span className="font-bold text-[#1D366D] font-outfit text-sm truncate mr-4">{email}</span>
                                <button 
                                    onClick={copyEmail}
                                    className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 bg-white border border-gray-200 text-[#333] text-[10px] font-black uppercase tracking-widest hover:bg-gray-50 transition-all rounded-sm"
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-3 h-3 text-green-600" />
                                            <span>Copied</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-3 h-3" />
                                            <span>Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>

                            {/* Main CTA */}
                            <a 
                                href={mailtoUrl}
                                className="flex items-center justify-center gap-3 w-full py-4 bg-[#1D366D] text-white font-black font-outfit uppercase tracking-widest text-sm hover:bg-[#001D4A] transition-all shadow-xl rounded-sm group"
                            >
                                <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                Open Email App
                            </a>
                            
                            <p className="mt-4 text-[10px] text-center text-gray-400 font-outfit uppercase tracking-widest font-bold">
                                Or manually email joseph@kenyakeyspbo-kenya.org
                            </p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

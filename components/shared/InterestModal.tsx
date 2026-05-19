'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Phone, Globe, Send, CheckCircle } from 'lucide-react';
import { submitInterestAction } from '@/lib/actions/admin-actions';

interface InterestModalProps {
    isOpen: boolean;
    onClose: () => void;
    type: 'donation' | 'sponsorship';
    targetName: string;
}

export default function InterestModal({ isOpen, onClose, type, targetName }: InterestModalProps) {
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email || !phone || !country) {
            setError('Please fill in all required fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await submitInterestAction({
                type,
                targetName,
                email,
                phone,
                country
            });

            if (res.success) {
                setSuccess(true);
                setEmail('');
                setPhone('');
                setCountry('');
            } else {
                setError(res.error || 'Failed to submit interest.');
            }
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSuccess(false);
        setError('');
        onClose();
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
                        onClick={handleClose}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="relative w-full max-w-md bg-white border border-gray-100 shadow-2xl overflow-hidden rounded-2xl"
                    >
                        {/* Header */}
                        <div className="bg-[#1D366D] p-6 text-white flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-black font-oswald uppercase tracking-tight">
                                    {type === 'sponsorship' ? 'Sponsor Student' : 'Choose Package'}
                                </h3>
                                <p className="text-xs text-blue-200 font-outfit mt-1 font-semibold uppercase tracking-wider">
                                    Target: {targetName}
                                </p>
                            </div>
                            <button 
                                onClick={handleClose}
                                className="p-2 hover:bg-white/10 transition-colors rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-8">
                            {success ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="text-center py-6 space-y-4"
                                >
                                    <div className="flex items-center justify-center text-green-500 mx-auto">
                                        <CheckCircle className="w-14 h-14" />
                                    </div>
                                    <h4 className="text-xl font-bold font-outfit text-[#333]">Interest Recorded</h4>
                                    <p className="text-gray-600 font-outfit text-sm px-4 leading-relaxed">
                                        Thanks for showing interest our director will get back to you
                                    </p>
                                    <button 
                                        onClick={handleClose}
                                        className="mt-6 px-6 py-2.5 bg-[#1D366D] hover:bg-[#001D4A] text-white font-bold font-outfit text-xs uppercase tracking-widest rounded-full transition-all"
                                    >
                                        Close
                                    </button>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {error && (
                                        <div className="text-center text-red-600 font-bold text-xs font-outfit">
                                            {error}
                                        </div>
                                    )}

                                    {/* Email */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 font-outfit uppercase tracking-wider block">Email Address *</label>
                                        <div className="relative">
                                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input 
                                                type="email" 
                                                required
                                                placeholder="you@example.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#1D366D] outline-none font-outfit text-sm text-gray-800 rounded-lg transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Phone */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 font-outfit uppercase tracking-wider block">Phone Number *</label>
                                        <div className="relative">
                                            <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input 
                                                type="tel" 
                                                required
                                                placeholder="+1 (555) 000-0000"
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#1D366D] outline-none font-outfit text-sm text-gray-800 rounded-lg transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Country */}
                                    <div className="space-y-1.5">
                                        <label className="text-xs font-bold text-gray-500 font-outfit uppercase tracking-wider block">Country *</label>
                                        <div className="relative">
                                            <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                                            <input 
                                                type="text" 
                                                required
                                                placeholder="Germany"
                                                value={country}
                                                onChange={(e) => setCountry(e.target.value)}
                                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-100 focus:border-[#1D366D] outline-none font-outfit text-sm text-gray-800 rounded-lg transition-all"
                                            />
                                        </div>
                                    </div>

                                    {/* Submit Button */}
                                    <button 
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-4 bg-[#1D366D] hover:bg-[#001D4A] text-white font-black font-outfit uppercase tracking-widest text-xs rounded-lg transition-all flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {loading ? (
                                            <span>Sending...</span>
                                        ) : (
                                            <>
                                                <Send className="w-3.5 h-3.5" />
                                                <span>Send Interest</span>
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

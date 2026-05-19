'use client';

import React, { useState, useEffect } from 'react';
import { getContactMessagesAction } from '@/lib/actions/admin-actions';
import { Search, Mail, Phone, Calendar, User, Info, ArrowUpRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ContactMessagesPage() {
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Modal state
    const [selectedMessage, setSelectedMessage] = useState<any>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    useEffect(() => {
        async function load() {
            const data = await getContactMessagesAction();
            setMessages(data);
            setLoading(false);
        }
        load();
    }, []);

    const handleRowClick = (msg: any) => {
        setSelectedMessage(msg);
        setIsDetailModalOpen(true);
    };

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

    const filteredMessages = messages.filter((msg: any) => {
        const query = searchQuery.toLowerCase();
        return (
            (msg.name || '').toLowerCase().includes(query) ||
            (msg.email || '').toLowerCase().includes(query) ||
            (msg.spaceInterest || '').toLowerCase().includes(query) ||
            (msg.message || '').toLowerCase().includes(query)
        );
    });

    return (
        <div className="space-y-8">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#101828] font-outfit tracking-tight uppercase">
                        Contact Messages
                    </h1>
                    <p className="text-[#667085] font-outfit mt-1 text-sm">
                        View and manage incoming inquiries and contact messages in real-time.
                    </p>
                </div>

                {/* Search field */}
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input 
                        type="text" 
                        placeholder="Search messages..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#EAECF0] focus:border-[#1D366D] outline-none font-outfit text-sm text-[#333] rounded-xl transition-all shadow-sm"
                    />
                </div>
            </div>

            {/* Table Container */}
            {loading ? (
                <div className="py-24 text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#1D366D] mx-auto"></div>
                </div>
            ) : filteredMessages.length === 0 ? (
                <div className="bg-white rounded-3xl border border-[#EAECF0] p-16 text-center shadow-sm">
                    <Mail className="w-12 h-12 text-[#94A3B8] mx-auto mb-4" />
                    <p className="text-[#101828] font-outfit font-bold text-lg">No Messages Found</p>
                    <p className="text-[#667085] font-outfit text-sm mt-1 max-w-xs mx-auto">
                        {searchQuery ? 'Try adjusting your search terms.' : 'No contact messages have been received yet.'}
                    </p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl border border-[#EAECF0] shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-[#EAECF0]">
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Received At</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Sender Details</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Space Interest</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit">Snippet</th>
                                    <th className="px-6 py-4 text-xs font-bold text-[#667085] uppercase tracking-wider font-outfit text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#EAECF0]">
                                {filteredMessages.map((msg: any) => (
                                    <tr 
                                        key={msg.id}
                                        onClick={() => handleRowClick(msg)}
                                        className="hover:bg-blue-50/20 cursor-pointer transition-colors group"
                                    >
                                        {/* Timestamp */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-2 text-sm text-[#475467] font-medium font-outfit">
                                                <Calendar className="w-4 h-4 text-gray-400" />
                                                {formatDate(msg.createdAt)}
                                            </div>
                                        </td>
                                        
                                        {/* Sender Name & Email */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="space-y-1">
                                                <div className="text-sm font-bold text-[#101828] font-outfit flex items-center gap-1.5">
                                                    <User className="w-3.5 h-3.5 text-gray-400" />
                                                    {msg.name}
                                                </div>
                                                <div className="text-xs text-[#667085] font-outfit flex items-center gap-1.5">
                                                    <Mail className="w-3 h-3 text-gray-400" />
                                                    {msg.email}
                                                </div>
                                            </div>
                                        </td>

                                        {/* Space Interest */}
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {msg.spaceInterest ? (
                                                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 text-[#1D366D] border border-blue-100 font-outfit">
                                                    {msg.spaceInterest}
                                                </span>
                                            ) : (
                                                <span className="text-xs italic text-gray-400 font-outfit">Not specified</span>
                                            )}
                                        </td>

                                        {/* Message Snippet */}
                                        <td className="px-6 py-4 max-w-xs truncate">
                                            <span className="text-sm text-[#475467] font-outfit">
                                                {msg.message}
                                            </span>
                                        </td>

                                        {/* Click Action Trigger Indicator */}
                                        <td className="px-6 py-4 text-right whitespace-nowrap">
                                            <button className="text-[#1D366D] font-bold text-xs font-outfit inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-all">
                                                Open <ArrowUpRight className="w-3.5 h-3.5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Premium Message Detail Modal */}
            <AnimatePresence>
                {isDetailModalOpen && selectedMessage && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
                        {/* Backdrop */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsDetailModalOpen(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />

                        {/* Modal Dialog */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-xl bg-white border border-[#EAECF0] shadow-2xl rounded-2xl overflow-hidden"
                        >
                            {/* Header */}
                            <div className="bg-[#101828] p-6 text-white flex justify-between items-center">
                                <div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#32D583] font-outfit">Inquiry Details</span>
                                    <h3 className="text-lg font-black font-oswald uppercase tracking-tight mt-1">{selectedMessage.name}</h3>
                                </div>
                                <button 
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="p-2 hover:bg-white/10 transition-colors rounded-full"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Body content */}
                            <div className="p-8 space-y-6">
                                {/* Metadata Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-xl border border-[#EAECF0]">
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-outfit">Email</span>
                                        <a href={`mailto:${selectedMessage.email}`} className="text-sm font-bold text-[#1D366D] hover:underline font-outfit block truncate">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-outfit">Phone</span>
                                        <span className="text-sm font-bold text-gray-800 font-outfit block">
                                            {selectedMessage.phone || 'N/A'}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-outfit">Space Interest</span>
                                        <span className="text-sm font-bold text-gray-800 font-outfit block">
                                            {selectedMessage.spaceInterest || 'Not specified'}
                                        </span>
                                    </div>
                                    <div className="space-y-1">
                                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-outfit">Date Received</span>
                                        <span className="text-sm font-medium text-gray-600 font-outfit block">
                                            {formatDate(selectedMessage.createdAt)}
                                        </span>
                                    </div>
                                </div>

                                {/* Message content block */}
                                <div className="space-y-2">
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block font-outfit">Inquiry Message</span>
                                    <div className="bg-[#FCFCFD] p-5 rounded-xl border border-[#EAECF0] min-h-[120px] max-h-[250px] overflow-y-auto custom-scrollbar">
                                        <p className="text-sm text-[#333] font-outfit whitespace-pre-wrap leading-relaxed">
                                            {selectedMessage.message}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer actions */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-[#EAECF0] flex justify-end gap-3">
                                <button 
                                    onClick={() => setIsDetailModalOpen(false)}
                                    className="px-5 py-2 border border-[#D0D5DD] hover:bg-gray-100 font-bold font-outfit text-xs text-[#344054] rounded-lg transition-all"
                                >
                                    Close
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

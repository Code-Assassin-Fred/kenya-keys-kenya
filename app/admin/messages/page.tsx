'use client';

import React from 'react';

export default function ContactMessagesPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-black text-[#101828] font-outfit tracking-tight uppercase">
                    Contact Messages
                </h1>
                <p className="text-[#667085] font-outfit mt-1 text-sm">
                    View and manage incoming inquiries and contact messages.
                </p>
            </div>
            
            <div className="bg-white rounded-3xl border border-[#EAECF0] p-12 text-center shadow-sm">
                <p className="text-[#667085] font-outfit font-medium">
                    This section is currently empty. More details will be set up in the next steps.
                </p>
            </div>
        </div>
    );
}

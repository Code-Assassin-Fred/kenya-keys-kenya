'use client';

import React, { useState } from 'react';
import StudentGrid from "./StudentGrid";
import InterestModal from "@/components/shared/InterestModal";

export default function StudentCatalogBody() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* Student catalog grid */}
            <StudentGrid />
            
            {/* Can't decide section (placed below the catalog) */}
            <section className="py-12 bg-blue-50 border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="max-w-2xl text-center md:text-left">
                        <h3 className="text-2xl font-black text-[#1D366D] font-oswald uppercase mb-2">Can't decide?</h3>
                        <p className="text-gray-600 font-outfit">Choose "Greatest Need" and our Kenyan teams will match your sponsorship to the student currently facing the most urgent barriers to their education.</p>
                    </div>
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="bg-[#FFB800] text-[#1D366D] px-10 py-4 rounded-full font-black font-outfit uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl whitespace-nowrap text-center cursor-pointer font-bold"
                    >
                        Sponsor Greatest Need
                    </button>
                </div>
            </section>

            <InterestModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                type="sponsorship"
                targetName="Greatest Need"
            />
        </>
    );
}

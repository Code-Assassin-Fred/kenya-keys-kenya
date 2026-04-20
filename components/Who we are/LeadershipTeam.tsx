'use client';

import React from 'react';
import { motion } from 'framer-motion';

const team = [
    {
        name: "Rinda Hayes",
        title: "Founder & US Director",
        bio: "Founded Kenya Keys in 2005 after a life-changing visit to Taru. She leads our US operations and strategic vision.",
        image: "/image1.png",
        location: "US Team"
    },
    {
        name: "Joseph Mwengea",
        title: "Kenya Director",
        bio: "A retired principal who has been instrumental in identifying the most vulnerable and high-achieving students since the beginning.",
        image: "/image2.png",
        location: "Kenya Team"
    },
    {
        name: "Clemence Mulandi",
        title: "Programs Manager",
        bio: "Oversees student student success, sponsorship tracking, and our local mentoring programs in Kwale County.",
        image: "/image3.png",
        location: "Kenya Team"
    },
    {
        name: "Linda Smith",
        title: "Board Chair",
        bio: "Brings decades of experience in non-profit management and educational advocacy to our leadership team.",
        image: "/image4.png",
        location: "US Team"
    },
    {
        name: "Esther Mwachia",
        title: "Student Support",
        bio: "A Kenya Keys alumni who returned to the organization to lead our girls' empowerment and mentorship initiatives.",
        image: "/image18.png",
        location: "Kenya Team"
    },
    {
        name: "David Wright",
        title: "Financial Director",
        bio: "Ensures our low admin cost promise stays true and manages transparent financial reporting to our donors.",
        image: "/image19.png",
        location: "US Team"
    }
];

export default function LeadershipTeam() {
    return (
        <section className="py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24">
                <div className="text-center mb-20">
                    <h2 className="text-3xl md:text-5xl font-black text-[#333] font-oswald uppercase tracking-tight mb-6">
                        OUR <span className="text-[#00529B]">LEADERSHIP</span>
                    </h2>
                    <p className="text-xl text-gray-600 font-outfit max-w-2xl mx-auto font-light">
                        Kenya Keys is powered by a dedicated team of educators, leaders, and former students across the US and Kenya.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
                    {team.map((member, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="group relative"
                        >
                            {/* Member Image Card */}
                            <div className="relative aspect-square rounded-[40px] overflow-hidden mb-8 shadow-lg group-hover:shadow-2xl transition-all duration-500">
                                <img 
                                    src={member.image} 
                                    alt={member.name} 
                                    className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#00529B]/80 via-[#00529B]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <p className="text-white text-sm font-outfit leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        {member.bio}
                                    </p>
                                </div>
                                <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#00529B] font-outfit">
                                    {member.location}
                                </div>
                            </div>

                            {/* Name & Title */}
                            <div className="text-center">
                                <h3 className="text-2xl font-black text-[#333] font-oswald uppercase tracking-tight mb-1 group-hover:text-[#00529B] transition-colors">
                                    {member.name}
                                </h3>
                                <p className="text-sm font-bold font-outfit text-gray-500 uppercase tracking-widest">
                                    {member.title}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}

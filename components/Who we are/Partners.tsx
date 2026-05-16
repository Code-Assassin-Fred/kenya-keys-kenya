'use client';

import Image from 'next/image';

const partners = [
    { name: 'Kenya National Library', logo: '/Patners/Kenya National Library.png' },
    { name: 'Ministry of Education', logo: '/Patners/Ministry of education.png' },
    { name: 'Loghorn Publishers', logo: '/Patners/Loghorn.png' },
    { name: 'Erido Computers Mombasa', logo: '/Patners/Erido Computers.jpg' },
    { name: 'Undugu Mentorship Initiative', logo: '/Patners/Undugu Mentorship Initiative.jpg' },
];

const supportivePartners = [
    'Kitmir Limited',
    'Stanbic Bank',
    'Choice Humanitarian (Kenya)',
];

export default function Partners() {
    return (
        <section id="partners" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a1a1a] mb-4 font-playfair uppercase tracking-tight">
                        Our Partners
                    </h2>
                    <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
                    <p className="mt-8 text-gray-600 max-w-3xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                        We are proud to collaborate with dedicated organizations that share our commitment to 
                        empowering the youth of rural Kenya through education and opportunity.
                    </p>
                </div>

                {/* Primary Partners Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-20">
                    {partners.map((partner) => (
                        <div 
                            key={partner.name}
                            className="group relative h-40 bg-gray-50 rounded-2xl p-6 flex items-center justify-center border border-gray-100 hover:border-red-100 hover:bg-white hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500 overflow-hidden"
                        >
                            <div className="relative w-full h-full transition-all duration-500 transform group-hover:scale-110">
                                <Image
                                    src={partner.logo}
                                    alt={partner.name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                                />
                            </div>
                            {/* Hover Tooltip/Label */}
                            <div className="absolute bottom-2 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <span className="text-[10px] uppercase tracking-widest text-red-600 font-bold px-2 py-1 bg-white/90 rounded-md shadow-sm">
                                    {partner.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Supportive Partners Section */}
                <div className="mt-24 pt-16 border-t border-gray-100">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-gray-800 font-playfair uppercase tracking-wider mb-2">
                            Supportive Partners
                        </h3>
                        <p className="text-gray-500 text-sm uppercase tracking-widest">Valued contributors to our mission</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 max-w-4xl mx-auto">
                        {supportivePartners.map((partner) => (
                            <div key={partner} className="relative group">
                                <span className="text-xl md:text-2xl text-gray-400 font-medium hover:text-red-600 transition-colors duration-300 cursor-default font-outfit">
                                    {partner}
                                </span>
                                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

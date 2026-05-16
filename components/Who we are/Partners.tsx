'use client';

export default function Partners() {
    return (
        <section id="partners" className="py-24 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-[#333] mb-4 font-playfair uppercase">Our Partners</h2>
                    <div className="w-24 h-1 bg-red-600 mx-auto"></div>
                    <p className="mt-6 text-gray-600 max-w-2xl mx-auto text-lg">
                        We collaborate with organizations that share our vision of transforming lives through education.
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-50">
                    {/* Placeholder for partner logos */}
                    <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center p-8 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="text-gray-400 font-bold">Partner 1</span>
                    </div>
                    <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center p-8 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="text-gray-400 font-bold">Partner 2</span>
                    </div>
                    <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center p-8 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="text-gray-400 font-bold">Partner 3</span>
                    </div>
                    <div className="h-32 bg-white rounded-xl shadow-sm flex items-center justify-center p-8 border border-gray-100 grayscale hover:grayscale-0 transition-all duration-300">
                        <span className="text-gray-400 font-bold">Partner 4</span>
                    </div>
                </div>
            </div>
        </section>
    );
}

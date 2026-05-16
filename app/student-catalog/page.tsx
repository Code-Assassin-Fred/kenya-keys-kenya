'use client';

import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import StudentGrid from "@/components/Sponsorship/StudentGrid";
import CTABanner from "@/components/shared/CTABanner";

export default function StudentCatalogPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <PageHero 
                    title="STUDENT CATALOG"
                    subtitle="Meet the bright, motivated high school and university students currently awaiting sponsorship. Each profile tells a story of resilience and potential."
                    bgColor="bg-[#00529B]"
                    accentColor="#FFB800"
                    bgImage="/image17.png"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }, { label: "Catalog", href: "/student-catalog" }]}
                />
                
                <section className="py-12 bg-blue-50 border-b border-blue-100">
                    <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-2xl text-center md:text-left">
                            <h3 className="text-2xl font-black text-[#1D366D] font-oswald uppercase mb-2">Can't decide?</h3>
                            <p className="text-gray-600 font-outfit">Choose \"Greatest Need\" and our Kenyan teams will match your sponsorship to the student currently facing the most urgent barriers to their education.</p>
                        </div>
                        <a 
                            href="mailto:joseph@kenyakeyspbo-kenya.org?subject=Sponsorship: Greatest Need"
                            className="bg-[#FFB800] text-[#1D366D] px-10 py-4 rounded-full font-black font-outfit uppercase tracking-widest text-sm hover:scale-105 transition-all shadow-xl whitespace-nowrap inline-block text-center"
                        >
                            Sponsor Greatest Need
                        </a>
                    </div>
                </section>

                <StudentGrid />
                
                <CTABanner 
                    title="HOW SPONSORSHIP WORKS"
                    description="From selecting a student to receiving reports and writing letters, discover the full journey of becoming a Kenya Keys sponsor."
                    buttonText="Sponsorship Overview"
                    buttonHref="/sponsorship-overview"
                    bgImage="/image8.png"
                />
            </main>
            <Footer />
        </div>
    );
}

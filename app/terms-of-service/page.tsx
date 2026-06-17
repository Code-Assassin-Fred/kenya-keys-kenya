import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export const metadata: Metadata = {
    title: "Terms of Service | Kenya Keys NGO",
    description: "Terms of Service for Kenya Keys, a registered Public Benefit Organisation (PBO) in Kenya. Governance rules for donor sponsorships and program usage.",
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/terms-of-service",
    },
};

export default function TermsOfServicePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <h1 className="text-4xl md:text-5xl font-black font-oswald text-[#1D366D] uppercase mb-8">
                    Terms of Service
                </h1>
                <p className="text-gray-500 font-outfit text-sm mb-12">
                    Last Updated: June 17, 2026
                </p>
                <div className="prose prose-blue max-w-none font-outfit text-gray-700 space-y-6">
                    <p>
                        Welcome to the website of Kenya Keys, a registered Public Benefit Organisation (PBO) in Kenya. By accessing or using our website, donation portal, or sponsorship services, you agree to comply with and be bound by the following Terms of Service.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        1. Sponsorship Commitments
                    </h2>
                    <p>
                        Kenya Keys facilitates student sponsorships to cover education costs in rural Kenya. Sponsoring a student is a commitment to supporting their academic journey. While you may cancel your sponsorship at any time, we request advance notice where possible to ensure continuity of education for the student.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        2. Use of Funds
                    </h2>
                    <p>
                        Kenya Keys is dedicated to financial efficiency. We allocate donor funds directly to educational expenses, infrastructure projects, and community support in Kenya. Under 10% of total funds are utilized for essential operational administration.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        3. Respectful Communication
                    </h2>
                    <p>
                        We promote mutual connection through letters between sponsors and students. All communications must remain respectful, encouraging, and appropriate. Kenya Keys reserves the right to review and filter letters to safeguard student wellbeing.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        4. Intellectual Property
                    </h2>
                    <p>
                        All content on this website, including student profiles, photographs, logos, and success stories, is the property of Kenya Keys and may not be reproduced or used without our prior written consent.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        5. Governing Law
                    </h2>
                    <p>
                        These Terms of Service are governed by the laws of the Republic of Kenya. Any disputes arising from the use of this website shall be resolved under the jurisdiction of Kenyan courts.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

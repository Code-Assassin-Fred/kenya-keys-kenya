import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";

export const metadata: Metadata = {
    title: "Privacy Policy | Kenya Keys NGO",
    description: "Privacy Policy for Kenya Keys, a registered Public Benefit Organisation (PBO) in Kenya. Learn how we handle donor data, sponsorships, and personal information.",
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/privacy-policy",
    },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="max-w-4xl mx-auto px-6 py-24 md:py-32">
                <h1 className="text-4xl md:text-5xl font-black font-oswald text-[#1D366D] uppercase mb-8">
                    Privacy Policy
                </h1>
                <p className="text-gray-500 font-outfit text-sm mb-12">
                    Last Updated: June 17, 2026
                </p>
                <div className="prose prose-blue max-w-none font-outfit text-gray-700 space-y-6">
                    <p>
                        Kenya Keys is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and safeguard personal information obtained through our website, sponsorship platform, and donor communications.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        1. Information We Collect
                    </h2>
                    <p>
                        We may collect personal information such as your name, email address, phone number, and billing information when you sponsor a student, make a donation, or register interest in our programs.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        2. How We Use Your Information
                    </h2>
                    <p>
                        We use the information we collect to process donations, facilitate student sponsorships, send periodic updates and newsletters, and respond to inquiries. We do not sell or trade donor information with third parties.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        3. Sponsorship Connections
                    </h2>
                    <p>
                        When sponsoring a student, some non-sensitive information (such as your name and general location) may be shared with the student to facilitate direct letter writing. You may request anonymous sponsorship at any time.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        4. Security
                    </h2>
                    <p>
                        We implement industry-standard security measures, including encryption, to protect your personal and financial data. Financial transactions are securely processed through vetted third-party payment gateways.
                    </p>
                    
                    <h2 className="text-2xl font-black font-oswald text-[#1D366D] uppercase mt-12 mb-4">
                        5. Contact Us
                    </h2>
                    <p>
                        If you have questions about this Privacy Policy or how we handle your personal information, please contact us at: <a href="mailto:info@kenyakeys-pbokenya.org" className="text-blue-600 hover:underline">info@kenyakeys-pbokenya.org</a>.
                    </p>
                </div>
            </main>
            <Footer />
        </div>
    );
}

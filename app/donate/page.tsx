import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import DonateHero from "@/components/Donate/DonateHero";
import DonationTiers from "@/components/Donate/DonationTiers";
import ImpactCalculator from "@/components/Donate/ImpactCalculator";
import TrustSignals from "@/components/Donate/TrustSignals";
import JsonLd, { donateActionSchema, createBreadcrumbSchema, createFaqSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Donate to Education in Kenya — Support Kenya Keys Students",
    description: "Make a donation to Kenya Keys and directly fund education for students in rural Kenya. Donate via M-Pesa, bank transfer, or online. See your impact through transparent reporting and student success stories. Every donation removes barriers to education.",
    keywords: [
        "Kenya Keys donate", "donate to education Kenya", "donate to children education Kenya",
        "donate to NGO Kenya", "education charity Kenya", "Kenya Keys donation",
        "support rural education Kenya", "donate M-Pesa NGO Kenya", "education fund Kenya",
        "sponsor education Kenya", "charitable donations Kenya",
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/donate",
    },
    openGraph: {
        title: "Donate to Education in Kenya — Kenya Keys",
        description: "Support Kenya Keys by donating to education in rural Kenya. Your donation sponsors students, builds schools, and provides essential resources. Donate today.",
        url: "https://kenyakeys-pbokenya.org/donate",
    },
};

const donateFaqs = createFaqSchema([
    {
        question: "How can I donate to Kenya Keys?",
        answer: "You can donate to Kenya Keys through multiple channels including M-Pesa, bank transfer, or online payment. Visit our Ways to Give page for all available donation methods."
    },
    {
        question: "Where does my donation to Kenya Keys go?",
        answer: "Your donation directly funds student scholarships, school infrastructure, sanitary pad distribution, laptop programs, and library resources in rural Kwale County, Kenya. Kenya Keys ensures transparent reporting on how every donation is used."
    },
    {
        question: "Is my donation to Kenya Keys tax-deductible?",
        answer: "Kenya Keys is a registered Public Benefit Organisation (PBO) in Kenya. Tax deductibility depends on your country's tax laws regarding international charitable donations. Please consult your local tax advisor."
    },
]);

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={donateActionSchema} />
                <JsonLd data={donateFaqs} />
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Donate to Education in Kenya", url: "https://kenyakeys-pbokenya.org/donate" },
                ])} />
                <DonateHero />
                <ImpactCalculator />
                <DonationTiers />
                <TrustSignals />
            </main>
            <Footer />
        </div>
    );
}

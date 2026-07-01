import type { Metadata } from "next";
import Navbar from "@/components/Home/Navbar";
import Footer from "@/components/Home/Footer";
import PageHero from "@/components/shared/PageHero";
import HowItWorks from "@/components/Sponsorship/HowItWorks";
import SponsorshipImpact from "@/components/Sponsorship/SponsorshipImpact";
import CTABanner from "@/components/shared/CTABanner";
import JsonLd, { createBreadcrumbSchema, createFaqSchema } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
    title: "Sponsor a Student in Kenya — Kenya Keys PBO Kenya Education NGO",
    description: "Sponsor secondary and university students in Kwale County, rural Kenya. Support tuition, boarding, supplies, and academic mentorship to unlock their potential with Kenya Keys PBO Kenya.",
    keywords: [
        "sponsor a student in Kenya", "Kenya Keys student sponsorship", "education sponsorship NGO Kenya",
        "sponsor high school student Kenya", "rural Kenya education NGO", "Kwale County student sponsorship",
        "education nonprofit Kenya", "Kenya Keys sponsorship", "support educational opportunities",
        "Kenya Keys PBO", "sponsor secondary student Kenya", "how to sponsor a child Kenya"
    ],
    alternates: {
        canonical: "https://kenyakeys-pbokenya.org/sponsorship-overview",
    },
    openGraph: {
        title: "Sponsor a Student in Kenya — Kenya Keys PBO Kenya",
        description: "Empower a high-achieving student in rural Kenya by removing the financial barriers to their education and future success with Kenya Keys PBO Kenya.",
        url: "https://kenyakeys-pbokenya.org/sponsorship-overview",
    },
};

const faqData = [
    {
        question: "How does student sponsorship with Kenya Keys work?",
        answer: "Sponsoring a student with Kenya Keys involves choosing a student from our catalog, choosing a monthly or annual donation tier, and providing ongoing support that covers tuition, board, supplies, and academic mentorship. Sponsors also exchange letters with students and receive progress reports twice a year."
    },
    {
        question: "How much does it cost to sponsor a student in Kenya?",
        answer: "Sponsorship tiers vary, covering secondary school (high school) and college/university education. Typical contributions help cover school fees, uniforms, boarding expenses, learning materials, and mentorship programs."
    },
    {
        question: "Can I write letters to my sponsored student?",
        answer: "Yes, we encourage direct connection! Sponsors and students exchange letters twice a year, fostering meaningful relationships and mutual encouragement."
    },
    {
        question: "How are students selected for the Kenya Keys sponsorship program?",
        answer: "Students are selected by our local Kenyan committees based on high academic achievement, potential, and extreme financial need in rural communities of Kwale County, Kenya."
    }
];

export default function SponsorshipOverviewPage() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main>
                <JsonLd data={createBreadcrumbSchema([
                    { name: "Home", url: "https://kenyakeys-pbokenya.org" },
                    { name: "Sponsorship Overview", url: "https://kenyakeys-pbokenya.org/sponsorship-overview" },
                ])} />
                <JsonLd data={createFaqSchema(faqData)} />
                <PageHero 
                    title="STUDENT SPONSORSHIP"
                    subtitle="Empower a high-achieving student in rural Kenya by removing the financial barriers to their education and future success."
                    bgColor="bg-[#1D366D]"
                    accentColor="#FFB800"
                    bgImage="/image9.webp"
                    breadcrumb={[{ label: "Sponsorship", href: "/sponsorship-overview" }]}
                />
                <HowItWorks />
                <SponsorshipImpact />
                <CTABanner 
                    title="MEET THE STUDENTS"
                    description="Explore our student catalog and discover the bright, motivated young minds waiting for a chance to continue their education."
                    buttonText="View Student Catalog"
                    buttonHref="/student-catalog"
                    bgImage="/image17.webp"
                />
            </main>
            <Footer />
        </div>
    );
}


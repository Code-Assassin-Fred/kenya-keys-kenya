import type { Metadata } from "next";
import Hero from "@/components/Home/Hero";
import ImpactStats from "@/components/Home/ImpactStats";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import CorePrograms from "@/components/Home/CorePrograms";
import Closure from "@/components/Home/Closure";
import AnniversaryBanner from "@/components/Home/AnniversaryBanner";
import Contact from "@/components/Home/Contact";

export const metadata: Metadata = {
  title: "Kenya Keys PBO Kenya — Education NGO in Kenya | Sponsor a Student in Rural Kenya",
  description: "Kenya Keys PBO Kenya is a grassroots education NGO and registered Public Benefit Organisation (PBO) in Taru, Kwale County, Kenya. We sponsor high-achieving secondary and university students, build schools, provide scholarships, and remove barriers to education. Donate to education in Kenya or sponsor a student today.",
  keywords: [
    "Kenya Keys", "education NGO Kenya", "sponsor a student Kenya", "donate to education Kenya",
    "education charity Kenya", "rural education Kenya", "Kenya Keys PBO Kenya", "NGO Kenya",
    "scholarship programs Kenya", "student sponsorship Kenya", "Kwale County education",
    "registered public benefit organisation Kenya", "Taru education charity", "Kenya Keys NGO",
    "Coast Kenya education", "Mombasa education NGO", "sponsor secondary school student Kenya",
    "sponsor university student Kenya", "donate M-Pesa NGO Kenya", "Kenya Keys PBO"
  ],
  alternates: {
    canonical: "https://kenyakeys-pbokenya.org",
  },
  openGraph: {
    title: "Kenya Keys PBO Kenya — Education NGO in Kenya | Sponsor a Student",
    description: "Kenya Keys PBO Kenya sponsors high-achieving students in rural Kenya. Donate to education or sponsor a student today. 1,000+ students sponsored with 100% graduation rate.",
    url: "https://kenyakeys-pbokenya.org",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      <main className="bg-white">
        <Hero />
        <ImpactStats />
        <CorePrograms />
        <AnniversaryBanner />
        <Closure />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}


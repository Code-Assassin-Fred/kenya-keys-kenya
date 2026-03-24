import Hero from "@/components/Home/Hero";
import ImpactStats from "@/components/Home/ImpactStats";
import Footer from "@/components/Home/Footer";
import Navbar from "@/components/Home/Navbar";
import CorePrograms from "@/components/Home/CorePrograms";
import Closure from "@/components/Home/Closure";
import AnniversaryBanner from "@/components/Home/AnniversaryBanner";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="bg-white">
        <Hero />
        <ImpactStats />
        <CorePrograms />
        <AnniversaryBanner />
        <Closure />
      </main>
      <Footer />
    </div>
  );
}

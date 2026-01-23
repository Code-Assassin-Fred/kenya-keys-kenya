import Hero from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";
import HeaderNav from "@/components/Home/HeaderNav";
import CorePrograms from "@/components/Home/CorePrograms";
import InfoSection from "@/components/Home/InfoSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <main>
        <Hero />
        <CorePrograms />
        <InfoSection />
      </main>
      <Footer />
    </div>
  );
}

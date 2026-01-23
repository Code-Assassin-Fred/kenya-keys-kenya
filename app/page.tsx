import Hero from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";
import HeaderNav from "@/components/Home/HeaderNav";
import CorePrograms from "@/components/Home/CorePrograms";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <main>
        <Hero />
        <CorePrograms />
      </main>
      <Footer />
    </div>
  );
}

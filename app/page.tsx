import Hero from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";
import HeaderNav from "@/components/Home/HeaderNav";
import CorePrograms from "@/components/Home/CorePrograms";
import { GalleryOverview } from "@/components/Home/GalleryOverview";
import Closure from "@/components/Home/Closure";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <main className="bg-black">
        <Hero />
        <CorePrograms />
        <GalleryOverview />
        <Closure />
      </main>
      <Footer />
    </div>
  );
}

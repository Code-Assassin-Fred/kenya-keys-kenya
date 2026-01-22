import Hero from "@/components/Home/Hero";
import Footer from "@/components/Home/Footer";
import HeaderNav from "@/components/Home/HeaderNav";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeaderNav />
      <main>
        <Hero />
      </main>
      <Footer />
    </div>
  );
}

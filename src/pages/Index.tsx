import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SectorsSection from "@/components/SectorsSection";
import ValedueAxisSection from "@/components/ValedueAxisSection";
import GlobalImpactSection from "@/components/GlobalImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <HeroSection />
      <SectorsSection />
      <ValedueAxisSection />
      <GlobalImpactSection />
      <Footer />
    </div>
  );
};

export default Index;

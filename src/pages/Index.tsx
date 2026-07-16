import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CapabilitiesSection from "@/components/CapabilitiesSection";
import GlobalImpactSection from "@/components/GlobalImpactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <HeroSection />
      <CapabilitiesSection />
      <GlobalImpactSection />
      <Footer />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsStrip from "@/components/StatsStrip";
import SectorsSection from "@/components/SectorsSection";
import GlobalImpactSection from "@/components/GlobalImpactSection";
import InvestorEntitiesSection from "@/components/InvestorEntitiesSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StatsStrip />
      <SectorsSection />
      <GlobalImpactSection />
      <InvestorEntitiesSection />
      <Footer />
    </div>
  );
};

export default Index;

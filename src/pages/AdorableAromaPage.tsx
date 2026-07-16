import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativeHero from "@/components/InitiativeHero";
import InitiativeCta from "@/components/InitiativeCta";
import adorableAroma from "@/assets/adorable-aroma.png";

const AdorableAromaPage = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <InitiativeHero
          eyebrow="Vallunex Global"
          eyebrowHref="/"
          logo={adorableAroma}
          name="Adorable Aroma"
          full="Fragrance & Wellness"
          description="Adorable Aroma brings a lifestyle dimension to Vallunex — a fragrance and wellness brand that adds warmth and sensory richness to the group portfolio."
        />
        <InitiativeCta
          heading="A lifestyle dimension"
          body="For partnership, stockist, or brand enquiries about Adorable Aroma."
          ctaLabel="Talk To Us"
          ctaHref="/talk-to-us"
        />
      </main>
      <Footer />
    </div>
  );
};

export default AdorableAromaPage;

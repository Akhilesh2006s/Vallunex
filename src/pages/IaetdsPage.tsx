import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativeHero from "@/components/InitiativeHero";
import InitiativePillars, { type Pillar } from "@/components/InitiativePillars";
import InitiativeCta from "@/components/InitiativeCta";

const pillars: Pillar[] = [
  {
    title: "Who we are",
    body: "Not a software subscription or generic service. A strategic excellence consortium that partners with forward-thinking institutions.",
  },
  {
    title: "The consortium model",
    body: "Strategic digital transformation, AI-integrated learning ecosystems, institutional prestige, and standards-led technology governance.",
  },
  {
    title: "Core outcomes",
    body: "Digital governance meets academic precision, AI improves student performance, and leadership teams gain long-term innovation direction.",
  },
  {
    title: "Membership",
    body: "Limited and evaluation-based. Reserved for institutions committed to digital excellence, institutional authority, and national recognition.",
  },
];

const IaetdsPage = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <InitiativeHero
          eyebrow="Valedue"
          logo="/iaetds-logo.png"
          name="IAETDS"
          full="Indian Association for Educational Technology & Digital Systems"
          line="Premium institutional architecture. By invitation only."
          description="A consortium for institutions that intend to lead India's digital education transformation with precision, prestige, and progress."
        />
        <InitiativePillars pillars={pillars} />
        <InitiativeCta
          heading="Explore IAETDS"
          body="Learn more about partnership, consortium structure, and institutional qualification."
          ctaLabel="Official IAETDS Site"
          ctaHref="https://www.iaetds.com/"
        />
      </main>
      <Footer />
    </div>
  );
};

export default IaetdsPage;

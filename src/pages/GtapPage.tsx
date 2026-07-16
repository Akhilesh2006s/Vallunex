import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativeHero from "@/components/InitiativeHero";
import InitiativePillars, { type Pillar } from "@/components/InitiativePillars";
import InitiativeCta from "@/components/InitiativeCta";

const pillars: Pillar[] = [
  {
    title: "The mandate",
    body: "GTAP empowers global academic excellence through structured accreditation standards. T.I.M.E.S stands for Training, Innovation, Mentorship, Education & Standards.",
  },
  {
    title: "Vision & mission",
    body: "Establish a globally trusted framework for academic accreditation. Promote integrity, innovation, and collaboration while setting benchmark standards for institutional excellence.",
  },
  {
    title: "The panel",
    body: "Led by distinguished academic leaders and advisors, with support from 35+ IITians and globally recognized researchers including Stanford top 2% scientists.",
  },
  {
    title: "Global impact",
    body: "Frameworks for quality assurance, innovation readiness, and continuous accreditation improvement, supporting institutions across regions.",
  },
];

const GtapPage = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <InitiativeHero
          eyebrow="Valedue"
          logo="/gtap-logo.png"
          name="GTAP"
          full="Global T.I.M.E.S Accreditation Panel"
          line="Accrediting excellence. Inspiring innovation."
          description="A global movement built to bridge innovation, credibility, and world-class academic standards across institutions."
        />
        <InitiativePillars pillars={pillars} />
        <InitiativeCta
          heading="Contact GTAP"
          body="Partner with a globally trusted framework for academic accreditation."
          contact="globaltimespanel@gmail.com · 8309159939"
          ctaLabel="Official GTAP Site"
          ctaHref="https://globaltimespanel.com"
        />
      </main>
      <Footer />
    </div>
  );
};

export default GtapPage;

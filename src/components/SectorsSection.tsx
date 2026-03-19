import { motion } from "framer-motion";
import SectorCard from "./SectorCard";
import amenityForge from "@/assets/amenity-forge-portfolio.png";
import valedue from "@/assets/valedue.png";
import sectorCapital from "@/assets/sector-capital.png";

const sectors = [
  {
    title: "Amenity Forge",
    subtitle: "AI & Information Technology",
    image: amenityForge,
  },
  {
    title: "Valedue",
    subtitle: "GTAP, IAETDS",
    image: valedue,
  },
  {
    title: "Vallunex Studios",
    subtitle: "Movies, Music & Entertainment",
    image: sectorCapital,
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const SectorsSection = () => {
  return (
    <section id="sectors" className="py-32 px-8 md:px-16">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-sm text-muted-foreground uppercase tracking-widest mb-4">
            Sector Portfolio
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-foreground max-w-xl">
            Three pillars of sovereign-scale enterprise
          </h2>
        </motion.div>
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {sectors.map((sector, i) => (
            <SectorCard key={sector.title} {...sector} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsSection;

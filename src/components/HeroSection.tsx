import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16 px-8 md:px-16 bg-white">
      <div className="max-w-[1440px] mx-auto w-full flex justify-center">
        <div className="w-full max-w-5xl px-6 md:px-12 py-8 md:py-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-gold-dark bg-gold/10 px-4 py-1.5 rounded-full border border-gold/30">
              Vallunex Group
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.2 }}
            className="font-display text-[clamp(2.3rem,6.2vw,5rem)] leading-[0.96] tracking-[-0.02em] text-navy max-w-4xl mx-auto"
          >
            Engineering the Next Era of Technology, Knowledge, and Entertainment.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.4 }}
            className="mt-6 text-base md:text-[1.15rem] text-navy/70 max-w-2xl mx-auto leading-relaxed font-medium"
          >
            Vallunex Global drives cross-sector innovation to shape the
            infrastructure of the next century.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.6 }}
            className="mt-12 flex gap-5 justify-center"
          >
            <a
              href="#sectors"
              className="bg-navy text-white px-8 py-3.5 text-sm font-medium hover:bg-navy-light transition-colors duration-300"
            >
              Explore Sectors
            </a>
            <a
              href="#global-impact"
              className="border-2 border-gold text-navy px-8 py-3.5 text-sm font-medium hover:bg-gold hover:text-navy transition-colors duration-300"
            >
              View Global Impact
            </a>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.75 }}
            className="mt-5 text-xs md:text-sm tracking-wide text-navy/50 uppercase"
          >
            Technology • Education • Media • Entertainment
          </motion.p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

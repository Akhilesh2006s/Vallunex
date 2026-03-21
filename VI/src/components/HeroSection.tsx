import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-end pb-32 pt-16 px-8 md:px-16 overflow-hidden">
      <div className="max-w-[1440px] mx-auto w-full">
        <motion.img
          src="/vallunex-logo.png"
          alt="Vallunex Group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease }}
          className="h-20 md:h-24 w-auto object-contain mb-8"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.2 }}
          className="font-display text-hero text-foreground max-w-4xl"
        >
          Engineering the Next Era of Technology, Knowledge, and Entertainment.
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.4 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed"
        >
          Vallunex Global drives cross-sector innovation to shape the infrastructure of the next century.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease, delay: 0.6 }}
          className="mt-12 flex gap-6"
        >
          <a
            href="#sectors"
            className="bg-foreground text-background px-8 py-3 text-sm hover:bg-primary transition-colors duration-300"
          >
            Review Portfolio
          </a>
          <a
            href="#global-impact"
            className="border border-foreground text-foreground px-8 py-3 text-sm hover:bg-foreground hover:text-background transition-colors duration-300"
          >
            Access Report
          </a>
        </motion.div>
      </div>

      {/* Subtle grid line decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(hsl(210 50% 4%) 1px, transparent 1px), linear-gradient(90deg, hsl(210 50% 4%) 1px, transparent 1px)',
          backgroundSize: '80px 80px'
        }} />
      </div>
    </section>
  );
};

export default HeroSection;

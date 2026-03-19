import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const GlobalImpactSection = () => {
  return (
    <section id="global-impact" className="py-32 px-8 md:px-16 bg-primary">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-sm text-primary-foreground/50 uppercase tracking-widest mb-4">
            Global Impact
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-primary-foreground">
            Building ecosystems that shape industries
          </h2>
          <p className="mt-6 text-primary-foreground/60 text-lg leading-relaxed">
            From advanced technology platforms and AI-driven infrastructure to global education networks, media production, and cinematic storytelling, Vallunex Global operates at the convergence of
            innovation, knowledge, and culture. Through its diversified ecosystem spanning technology, education, media, and entertainment, Vallunex is building platforms that influence how the
            world learns, connects, and experiences the future.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <span className="font-display text-3xl text-primary-foreground tabular-nums">5+</span>
              <p className="text-sm text-primary-foreground/50 mt-1">
                Industries: Technology, Education, Media, Entertainment &amp; Innovation
              </p>
            </div>
            <div>
              <span className="font-display text-3xl text-primary-foreground tabular-nums">Global</span>
              <p className="text-sm text-primary-foreground/50 mt-1">Ecosystem of platforms, studios, and digital infrastructure</p>
            </div>
          </div>
          <a
            href="#"
            className="inline-block mt-10 border border-primary-foreground/30 text-primary-foreground px-8 py-3 text-sm hover:bg-primary-foreground hover:text-primary transition-colors duration-300"
          >
            Explore Our Impact
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="aspect-[4/3] overflow-hidden"
        >
          <img
            src={heroBg}
            alt="Vallunex Global headquarters"
            className="object-cover w-full h-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;

import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const GlobalImpactSection = () => {
  return (
    <section
      id="global-impact"
      className="py-32 px-8 md:px-16 bg-slate-50"
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-sm text-gold-dark uppercase tracking-widest mb-4 font-semibold">
            Global Impact
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy">
            Building ecosystems that shape industries
          </h2>
          <p className="mt-6 text-navy/60 text-lg leading-relaxed">
            From advanced technology platforms and AI-driven infrastructure to global education networks, media production, and cinematic storytelling, Vallunex Global operates at the convergence of
            innovation, knowledge, and culture. Through its diversified ecosystem spanning technology, education, media, and entertainment, Vallunex is building platforms that influence how the
            world learns, connects, and experiences the future.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-8">
            <div>
              <span className="font-display text-3xl text-gold-dark tabular-nums">
                5+
              </span>
              <p className="text-sm text-navy/50 mt-1">
                Industries: Technology, Education, Media, Entertainment &amp; Innovation
              </p>
            </div>
            <div>
              <span className="font-display text-3xl text-gold-dark tabular-nums">
                Global
              </span>
              <p className="text-sm text-navy/50 mt-1">
                Ecosystem of platforms, studios, and digital infrastructure
              </p>
            </div>
          </div>
          <a
            href="/talk-to-us"
            className="inline-block mt-10 bg-navy text-white px-8 py-3.5 text-sm font-medium hover:bg-navy-light transition-colors duration-300"
          >
            Talk To Us
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
          className="aspect-[4/3] overflow-hidden rounded-sm shadow-paper"
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

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const domains = [
  { n: "I", label: "Technology" },
  { n: "II", label: "Education" },
  { n: "III", label: "Media & Entertainment" },
  { n: "IV", label: "Lifestyle" },
];

const HeroSection = () => {
  return (
    <section className="relative flex min-h-screen flex-col justify-center px-gutter pb-16 pt-32">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease }}
        className="type-label text-center text-brass"
      >
        Vallunex Global
      </motion.p>

      <h1 className="type-display mx-auto mt-10 max-w-6xl text-center text-[clamp(2.9rem,8.4vw,7.5rem)]">
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="block"
          >
            One conglomerate.
          </motion.span>
        </span>
        <span className="block overflow-hidden">
          <motion.span
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease, delay: 0.28 }}
            className="block italic text-estate"
          >
            Every domain.
          </motion.span>
        </span>
      </h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, ease, delay: 0.7 }}
        className="mx-auto mt-12 h-px w-16 bg-brass"
      />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease, delay: 0.8 }}
        className="mx-auto mt-12 max-w-xl text-center text-base leading-relaxed text-ink-soft md:text-lg"
      >
        Four enterprises solving hard problems in technology, education, media
        and lifestyle.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.95 }}
        className="mx-auto mt-20 flex w-full max-w-4xl flex-wrap justify-center gap-x-12 gap-y-6 border-t border-rule pt-8"
      >
        {domains.map((d) => (
          <li key={d.n} className="flex items-baseline gap-3">
            <span aria-hidden="true" className="type-numeral text-sm text-brass">
              {d.n}
            </span>
            <span className="type-label text-ink-soft">{d.label}</span>
          </li>
        ))}
      </motion.ul>
    </section>
  );
};

export default HeroSection;

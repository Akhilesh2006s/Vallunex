import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

/**
 * Spoken in the group's own voice. No brand names appear here by design —
 * the homepage presents Vallunex as one entity that does all of this.
 */
const capabilities = [
  {
    n: "I",
    title: "Technology",
    body: "We turn ideas into products — custom software, mobile, cloud and AI systems built to carry real weight.",
  },
  {
    n: "II",
    title: "Education & Accreditation",
    body: "We raise institutional standards, pairing accreditation frameworks with the digital transformation needed to meet them.",
  },
  {
    n: "III",
    title: "Media & Entertainment",
    body: "We tell stories at scale — film, music and cultural production for global audiences.",
  },
  {
    n: "IV",
    title: "Lifestyle",
    body: "We work in fragrance and wellness, where the problem is sensory rather than technical.",
  },
];

const CapabilitiesSection = () => {
  return (
    <section
      id="what-we-do"
      className="scroll-mt-16 border-t border-rule px-gutter py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="type-label text-brass">What We Do</p>
        <h2 className="type-display mt-6 text-[clamp(2.2rem,5.2vw,4rem)]">
          Four domains.
          <span className="italic text-estate"> One standard.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          We work across industries that share no vocabulary — and hold every
          one of them to the same bar.
        </p>
      </motion.div>

      <div className="mx-auto mt-20 max-w-5xl">
        {capabilities.map((c, i) => (
          <motion.article
            key={c.n}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }}
            className="grid gap-5 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14 last:border-b"
          >
            <div className="flex items-baseline gap-4 md:col-span-5">
              <span aria-hidden="true" className="type-numeral text-sm text-brass">
                {c.n}
              </span>
              <h3 className="type-display text-[clamp(1.8rem,3.6vw,2.8rem)]">
                {c.title}
              </h3>
            </div>
            <p className="text-base leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
              {c.body}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  );
};

export default CapabilitiesSection;

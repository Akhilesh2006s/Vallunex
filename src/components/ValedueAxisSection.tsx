import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const initiatives = [
  {
    n: "I",
    name: "GTAP",
    logo: "/gtap-logo.png",
    full: "Global T.I.M.E.S Accreditation Panel",
    line: "Accrediting excellence. Inspiring innovation.",
    body: "A global movement built to bridge innovation, credibility, and world-class academic standards across institutions.",
    href: "/gtap",
  },
  {
    n: "II",
    name: "IAETDS",
    logo: "/iaetds-logo.png",
    full: "Indian Association for Educational Technology & Digital Systems",
    line: "Premium institutional architecture. By invitation only.",
    body: "A consortium for institutions that intend to lead India's digital education transformation with precision, prestige, and progress.",
    href: "/iaetds",
  },
];

const ValedueAxisSection = () => {
  return (
    <section
      id="valedue"
      className="scroll-mt-16 border-t border-rule bg-ivory-deep px-gutter py-24 md:py-32"
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="type-label text-brass">Valedue — The Education Axis</p>
        <h2 className="type-display mt-6 text-[clamp(2rem,4.8vw,3.6rem)]">
          Two institutions, one standard
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          Valedue connects next-generation education, accreditation, and
          intelligence-led institutional transformation.
        </p>
      </motion.div>

      <div className="mx-auto mt-20 grid max-w-5xl gap-px bg-rule md:grid-cols-2">
        {initiatives.map((item, i) => (
          <motion.a
            key={item.name}
            href={item.href}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease, delay: i * 0.12 }}
            className="group flex flex-col bg-ivory p-10 transition-colors duration-500 hover:bg-estate md:p-14"
          >
            <div className="flex items-start justify-between gap-6">
              <img
                src={item.logo}
                alt=""
                loading="lazy"
                className="h-14 w-auto object-contain"
              />
              <span aria-hidden="true" className="type-numeral text-sm text-brass">
                {item.n}
              </span>
            </div>

            <h3 className="type-display mt-12 text-[clamp(2.2rem,5vw,3.6rem)] transition-colors duration-500 group-hover:text-ivory">
              {item.name}
            </h3>
            <p className="type-label mt-4 text-ink-soft transition-colors duration-500 group-hover:text-brass-light">
              {item.full}
            </p>

            <p className="type-title mt-8 text-xl italic transition-colors duration-500 group-hover:text-ivory md:text-2xl">
              {item.line}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-ink-soft transition-colors duration-500 group-hover:text-ivory/70">
              {item.body}
            </p>

            <span className="type-label mt-10 inline-block text-estate transition-colors duration-500 group-hover:text-brass-light">
              Discover {item.name}
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ValedueAxisSection;

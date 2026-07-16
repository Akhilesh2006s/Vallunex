import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";

const ease = [0.16, 1, 0.3, 1] as const;

const disciplines = [
  {
    n: "I",
    title: "Understand the domain",
    body: "Software, accreditation, film and fragrance share no vocabulary. We learn each one on its own terms before we build.",
  },
  {
    n: "II",
    title: "Build the platform",
    body: "We favour durable platforms over one-off solutions — systems the next problem can also stand on.",
  },
  {
    n: "III",
    title: "Hold the standard",
    body: "The same bar applies whether the work is an AI system, an institutional framework, or a film.",
  },
];

const GlobalImpactSection = () => {
  return (
    <section id="global-impact" className="scroll-mt-16 bg-estate text-ivory">
      {/* Statement */}
      <div className="px-gutter py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease }}
          className="mx-auto max-w-4xl text-center"
        >
          <p className="type-label text-brass-light">The Discipline</p>
          <p className="type-display mt-8 text-[clamp(1.9rem,4.6vw,3.6rem)]">
            Different industries ask different questions. The discipline of
            solving them <span className="italic text-brass-light">does not change.</span>
          </p>
        </motion.div>

        <div className="mx-auto mt-24 grid max-w-5xl gap-14 md:grid-cols-3 md:gap-10">
          {disciplines.map((d, i) => (
            <motion.article
              key={d.n}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease, delay: i * 0.12 }}
              className="border-t border-ivory/20 pt-7"
            >
              <span aria-hidden="true" className="type-numeral text-sm text-brass-light">
                {d.n}
              </span>
              <h3 className="type-title mt-3 text-2xl">{d.title}</h3>
              <p className="mt-4 text-sm leading-relaxed text-ivory/60">
                {d.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Plate + invitation */}
      <div className="border-t border-ivory/15 px-gutter py-20 md:py-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
          <motion.figure
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease }}
            className="aspect-[4/3] overflow-hidden"
          >
            <img
              src={heroBg}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </motion.figure>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <h2 className="type-display text-[clamp(1.9rem,4vw,3rem)]">
              Bring us the difficult one.
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ivory/60">
              If the problem sits across domains — technology and institutions,
              story and system — that is precisely where the group is built to
              work.
            </p>
            <a
              href="/talk-to-us"
              className="type-label mt-10 inline-block border border-brass bg-brass px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-brass"
            >
              Enquire
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GlobalImpactSection;

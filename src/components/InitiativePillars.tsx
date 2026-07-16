import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export interface Pillar {
  title: string;
  body: string;
}

const numerals = ["I", "II", "III", "IV", "V", "VI"];

const InitiativePillars = ({
  pillars,
  heading = "In Detail",
}: {
  pillars: Pillar[];
  heading?: string;
}) => {
  return (
    <section className="px-gutter py-24 md:py-32">
      <div className="mx-auto max-w-5xl">
        <p className="type-label text-center text-brass">{heading}</p>

        <div className="mt-16">
          {pillars.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, ease, delay: (i % 2) * 0.08 }}
              className="grid gap-4 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-12 last:border-b"
            >
              <div className="flex items-baseline gap-4 md:col-span-5">
                <span aria-hidden="true" className="type-numeral text-sm text-brass">
                  {numerals[i]}
                </span>
                <h2 className="type-display text-[clamp(1.6rem,3vw,2.4rem)]">
                  {p.title}
                </h2>
              </div>
              <p className="text-base leading-relaxed text-ink-soft md:col-span-6 md:col-start-7">
                {p.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativePillars;

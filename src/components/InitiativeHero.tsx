import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface InitiativeHeroProps {
  /** The house this sits under, e.g. "Valedue". */
  eyebrow: string;
  eyebrowHref?: string;
  logo: string;
  name: string;
  full: string;
  line?: string;
  description: string;
}

const InitiativeHero = ({
  eyebrow,
  eyebrowHref = "/#valedue",
  logo,
  name,
  full,
  line,
  description,
}: InitiativeHeroProps) => {
  return (
    <section className="border-b border-rule px-gutter pb-20 pt-32 md:pb-24 md:pt-40">
      <div className="mx-auto max-w-4xl text-center">
        <a
          href={eyebrowHref}
          className="type-label text-brass transition-colors hover:text-estate"
        >
          {eyebrow}
        </a>

        <motion.img
          src={logo}
          alt={`${name} logo`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.1 }}
          className="mx-auto mt-10 h-20 w-auto object-contain md:h-24"
        />

        <h1 className="type-display mt-10 text-[clamp(2.6rem,8vw,6.5rem)]">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "105%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 1.1, ease, delay: 0.2 }}
              className="block"
            >
              {name}
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.5 }}
          className="type-label mx-auto mt-6 max-w-xl text-ink-soft"
        >
          {full}
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease, delay: 0.6 }}
          className="mx-auto mt-10 h-px w-14 bg-brass"
        />

        {line && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.68 }}
            className="type-display mt-10 text-[clamp(1.5rem,3.2vw,2.4rem)] italic text-estate"
          >
            {line}
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.78 }}
          className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-ink-soft"
        >
          {description}
        </motion.p>
      </div>
    </section>
  );
};

export default InitiativeHero;

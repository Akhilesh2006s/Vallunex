import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

interface InitiativeCtaProps {
  heading: string;
  body: string;
  /** Optional contact line, e.g. "email · phone". */
  contact?: string;
  ctaLabel: string;
  ctaHref: string;
}

const InitiativeCta = ({
  heading,
  body,
  contact,
  ctaLabel,
  ctaHref,
}: InitiativeCtaProps) => {
  const isExternal = /^https?:\/\//.test(ctaHref);

  return (
    <section className="bg-estate px-gutter py-24 text-ivory md:py-28">
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="type-display text-[clamp(2rem,5vw,3.6rem)]">{heading}</h2>

        <div className="mx-auto mt-8 h-px w-14 bg-brass-light" />

        <p className="mx-auto mt-8 max-w-lg text-base leading-relaxed text-ivory/60">
          {body}
        </p>

        {contact && (
          <p className="type-label mt-6 text-brass-light">{contact}</p>
        )}

        <a
          href={ctaHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="type-label mt-12 inline-block border border-brass bg-brass px-8 py-4 text-ink transition-colors duration-500 hover:bg-transparent hover:text-brass"
        >
          {ctaLabel}
        </a>
      </motion.div>
    </section>
  );
};

export default InitiativeCta;

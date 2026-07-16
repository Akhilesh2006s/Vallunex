import { motion } from "framer-motion";
import amenityForge from "@/assets/amenity-forge-portfolio.png";
import valedue from "@/assets/valedue.png";
import studios from "@/assets/sector-capital.png";
import adorableAroma from "@/assets/adorable-aroma.png";

const ease = [0.16, 1, 0.3, 1] as const;

const houses = [
  {
    n: "I",
    name: "Amenity Forge",
    domain: "Technology",
    problem: "Turning ideas into products — custom software, mobile, cloud and AI.",
    image: amenityForge,
    href: "https://amenityforge.com",
    contain: false,
  },
  {
    n: "II",
    name: "Valedue",
    domain: "Education & Accreditation",
    problem: "Raising institutional standards through accreditation and digital transformation.",
    image: valedue,
    href: "#valedue",
    contain: false,
  },
  {
    n: "III",
    name: "Vallunex Studios",
    domain: "Media & Entertainment",
    problem: "Cinematic storytelling, music and cultural production for global audiences.",
    image: studios,
    href: "/vallunex-studios",
    contain: false,
  },
  {
    n: "IV",
    name: "Adorable Aroma",
    domain: "Lifestyle",
    problem: "Fragrance and wellness — warmth and sensory richness across the portfolio.",
    image: adorableAroma,
    href: "/adorable-aroma",
    contain: true,
  },
];

const SectorsSection = () => {
  return (
    <section id="sectors" className="scroll-mt-16 border-t border-rule px-gutter py-24 md:py-32">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease }}
        className="mx-auto max-w-3xl text-center"
      >
        <p className="type-label text-brass">The Houses</p>
        <h2 className="type-display mt-6 text-[clamp(2.2rem,5.2vw,4rem)]">
          A powerhouse of brands
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft">
          Each enterprise stands on its own. Together they apply one discipline
          to four very different problems.
        </p>
      </motion.div>

      <div className="mx-auto mt-20 max-w-6xl">
        {houses.map((h, i) => (
          <motion.a
            key={h.n}
            href={h.href}
            target={h.href.startsWith("http") ? "_blank" : undefined}
            rel={h.href.startsWith("http") ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease, delay: 0.05 }}
            className="group grid items-center gap-8 border-t border-rule py-10 md:grid-cols-12 md:gap-10 md:py-14 last:border-b"
          >
            {/* Plate */}
            <div className={`md:col-span-5 ${i % 2 === 1 ? "md:order-2" : ""}`}>
              <div className="aspect-[5/3] overflow-hidden bg-ivory-deep">
                <img
                  src={h.image}
                  alt={h.name}
                  loading="lazy"
                  className={`h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04] ${
                    h.contain ? "object-contain p-10" : "object-cover"
                  }`}
                />
              </div>
            </div>

            {/* Entry */}
            <div className={`md:col-span-6 ${i % 2 === 1 ? "md:order-1 md:col-start-1" : "md:col-start-7"}`}>
              <div className="flex items-baseline gap-4">
                <span aria-hidden="true" className="type-numeral text-sm text-brass">
                  {h.n}
                </span>
                <span className="type-label text-ink-soft">{h.domain}</span>
              </div>
              <h3 className="type-display mt-4 text-[clamp(2rem,4.4vw,3.4rem)] transition-colors duration-500 group-hover:text-estate">
                {h.name}
              </h3>
              <p className="mt-4 max-w-md text-base leading-relaxed text-ink-soft">
                {h.problem}
              </p>
              <span className="type-label rule-draw mt-8 inline-block pb-1.5 text-estate">
                Discover
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default SectorsSection;

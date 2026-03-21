import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const entities = [
  {
    id: "amenity-forge",
    name: "Amenity Forge",
    description:
      "A dedicated platform for structured amenity-backed investments, connecting institutional capital to next-generation urban infrastructure.",
    url: "https://amenityforge.com",
  },
  {
    id: "iaetds",
    name: "IAETDS",
    description:
      "International Advanced Energy Transmission & Distribution Systems, focused on grid-scale resilience and cross-border power corridors.",
    url: "https://iaetds.com",
  },
  {
    id: "gtap",
    name: "GTAP",
    description:
      "Global Transit & Access Platform, aggregating mobility assets across ports, rails, and intermodal gateways into a unified network.",
    url: "https://globaltimespanel.com",
  },
  {
    id: "vi",
    name: "VI",
    description:
      "Vallunex Initiatives, an innovation sleeve for early-stage infrastructure, climate, and digital logistics opportunities.",
  },
  {
    id: "cc",
    name: "CC",
    description:
      "Continuity Capital, a stabilization vehicle providing long-duration capital to core sovereign and quasi-sovereign partnerships.",
  },
];

const InvestorEntitiesSection = () => {
  return (
    <section className="py-32 px-8 md:px-16 bg-white">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="mb-16"
        >
          <p className="text-sm text-gold-dark uppercase tracking-widest mb-4 font-semibold">
            Investor Platforms
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-navy max-w-2xl">
            Dedicated access points for global partners
          </h2>
          <p className="mt-6 text-navy/50 max-w-2xl text-base leading-relaxed">
            Amenity Forge, IAETDS, GTAP, VI, and CC each provide tailored entry
            strategies into Vallunex Global&apos;s infrastructure and capital
            ecosystem. Select any platform below to explore its mandate.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {entities.map((entity, index) => (
            <motion.article
              key={entity.id}
              id={entity.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease, delay: index * 0.05 }}
              className={`relative flex flex-col justify-between border border-border bg-white p-6 md:p-8 shadow-paper hover:shadow-lg hover:border-gold/40 transition-all duration-300 rounded-sm ${entity.url ? 'cursor-pointer' : ''}`}
              onClick={entity.url ? () => window.open(entity.url, '_blank') : undefined}
            >
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-2 h-2 rounded-full bg-gold" />
                  <h3 className="font-display text-xl md:text-2xl text-navy">
                    {entity.name}
                  </h3>
                </div>
                <p className="text-sm md:text-base text-navy/50 leading-relaxed">
                  {entity.description}
                </p>
              </div>
              {entity.url && (
                <p className="mt-6 text-xs font-semibold text-gold-dark uppercase tracking-wider">
                  Visit platform →
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InvestorEntitiesSection;

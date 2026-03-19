import { motion } from "framer-motion";

const stats = [
  {
    value: "Next-Generation Platforms",
    label: "Building systems for the infrastructure of the next century",
  },
  {
    value: "242+",
    label: "Global Reach",
  },
  {
    value: "Innovation Across Sectors",
    label: "Technology • Education • Intelligence Systems",
  },
  {
    value: "Growing Global Ecosystem",
    label: "Talent, partners, and innovators",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

const StatsStrip = () => {
  return (
    <section className="py-20 px-8 md:px-16 border-t border-b border-border">
      <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: i * 0.1 }}
            className={i === 1 ? "text-center" : undefined}
          >
            <span className="font-display text-4xl md:text-5xl text-foreground tabular-nums">
              {stat.value}
            </span>
            <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default StatsStrip;

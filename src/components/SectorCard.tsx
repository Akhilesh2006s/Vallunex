import { motion } from "framer-motion";

interface SectorCardProps {
  title: string;
  subtitle: string;
  image: string;
  index: number;
  href?: string;
  external?: boolean;
}

const ease = [0.16, 1, 0.3, 1] as const;

const SectorCard = ({ title, subtitle, image, index, href, external }: SectorCardProps) => {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? {
        href,
        target: external ? "_blank" : undefined,
        rel: external ? "noopener noreferrer" : undefined,
      }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative aspect-[4/3] overflow-hidden group rounded-sm"
    >
      <Wrapper
        {...wrapperProps}
        className={`block h-full w-full ${href ? "cursor-pointer" : "cursor-default"}`}
      >
        <img
          src={image}
          alt={title}
          className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-900/45 to-transparent p-8 flex flex-col justify-end">
          <motion.div
            className="transition-transform duration-500 group-hover:-translate-y-1"
          >
            <h3 className="font-display text-3xl md:text-4xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.65)]">
              {title}
            </h3>
            <p className="text-gold text-base mt-2 font-semibold drop-shadow-[0_1px_6px_rgba(0,0,0,0.7)]">
              {subtitle}
            </p>
          </motion.div>
        </div>
      </Wrapper>
    </motion.div>
  );
};

export default SectorCard;

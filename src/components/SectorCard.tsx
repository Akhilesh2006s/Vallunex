import { motion } from "framer-motion";

interface SectorCardProps {
  title: string;
  subtitle: string;
  image: string;
  index: number;
}

const ease = [0.16, 1, 0.3, 1] as const;

const SectorCard = ({ title, subtitle, image, index }: SectorCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
      className="relative aspect-[4/3] overflow-hidden bg-muted group cursor-pointer"
    >
      <img
        src={image}
        alt={title}
        className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 scrim-bottom p-8 flex flex-col justify-end">
        <motion.div
          className="transition-transform duration-500 group-hover:-translate-y-1"
        >
          <h3 className="font-display text-3xl md:text-4xl text-primary-foreground">
            {title}
          </h3>
          <p className="text-primary-foreground/70 text-sm mt-2">{subtitle}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SectorCard;

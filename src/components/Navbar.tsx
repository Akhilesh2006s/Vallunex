import { useState } from "react";
import { motion } from "framer-motion";

const navItems = [
  "Sectors",
  "Global Impact",
  "Amenity Forge",
  "IAETDS",
  "GTAP",
  "VI",
  "CC",
];

const appLinks: Record<string, string> = {
  "Amenity Forge": "https://amenityforge.com",
  IAETDS: "https://iaetds.com",
  GTAP: "https://globaltimespanel.com",
  VI: import.meta.env.VITE_VI_APP_URL || "http://localhost:8081",
  CC: import.meta.env.VITE_CC_APP_URL || "http://localhost:8082",
};

const Navbar = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-8 md:px-16 backdrop-blur-md bg-background/80 shadow-contain"
    >
      <span className="font-display text-xl tracking-tight text-foreground">
        Vallunex Global
      </span>
      <div className="hidden md:flex items-center gap-10">
        {navItems.map((item, i) => {
          const url = appLinks[item] ?? `#${item.toLowerCase().replace(/ /g, "-")}`;
          const isExternalLink = /^https?:\/\//.test(url);
          
          return (
          <a
            key={item}
              href={url}
              target={isExternalLink ? "_blank" : undefined}
              rel={isExternalLink ? "noopener noreferrer" : undefined}
            className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-300"
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {item}
            <span
              className="absolute -bottom-0.5 left-1/2 h-px bg-foreground transition-all duration-300"
              style={{
                width: hoveredIndex === i ? "100%" : "0%",
                transform: "translateX(-50%)",
              }}
            />
          </a>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;

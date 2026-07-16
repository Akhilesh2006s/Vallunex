import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const navItems = [
  { label: "Amenity Forge", href: "https://amenityforge.com" },
  { label: "IAETDS", href: "/iaetds" },
  { label: "GTAP", href: "/gtap" },
  { label: "Studios", href: "/vallunex-studios" },
  { label: "Adorable Aroma", href: "/adorable-aroma" },
];

const getDefaultAppUrl = (subdomain: "vi" | "cc", localPort: number) => {
  if (import.meta.env.DEV) return `http://localhost:${localPort}`;
  if (typeof window === "undefined") return "";

  const protocol = window.location.protocol;
  const hostParts = window.location.hostname.split(".");
  if (hostParts.length >= 2) {
    const rootDomain = hostParts.slice(-2).join(".");
    return `${protocol}//${subdomain}.${rootDomain}`;
  }
  return window.location.origin;
};

const isExternal = (href: string) => /^https?:\/\//.test(href);

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const all = [
    ...navItems,
    { label: "VI", href: import.meta.env.VITE_VI_APP_URL || getDefaultAppUrl("vi", 8081) },
    { label: "CC", href: import.meta.env.VITE_CC_APP_URL || getDefaultAppUrl("cc", 8082) },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-ivory/95 backdrop-blur-sm transition-[border-color] duration-500 ${
          scrolled || open ? "border-b border-rule" : "border-b border-transparent"
        }`}
      >
        <div className="flex h-16 items-center justify-between px-gutter">
          <a
            href="/"
            className="type-serif text-xl tracking-tight text-ink transition-colors hover:text-estate"
          >
            Vallunex
          </a>

          <nav className="hidden items-center gap-8 lg:flex">
            {all.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={isExternal(item.href) ? "_blank" : undefined}
                rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                className="type-label rule-draw pb-1 text-ink-soft transition-colors hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/talk-to-us"
              className="type-label border border-estate bg-estate px-5 py-2.5 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-estate"
            >
              Enquire
            </a>
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="menu-panel"
            onClick={() => setOpen((v) => !v)}
            className="type-label py-2 text-ink lg:hidden"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-panel"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ivory pt-16 lg:hidden"
          >
            <nav className="flex h-full flex-col px-gutter pb-10 pt-8">
              <ul className="flex-1">
                {all.map((item, i) => (
                  <li key={item.label} className="border-b border-rule">
                    <a
                      href={item.href}
                      target={isExternal(item.href) ? "_blank" : undefined}
                      rel={isExternal(item.href) ? "noopener noreferrer" : undefined}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-5 py-5 transition-colors hover:text-estate"
                    >
                      {/* Decorative ordinal — hidden so it isn't read as
                          part of the name ("IIIAETDS"). */}
                      <span aria-hidden="true" className="type-numeral text-xs text-brass">
                        {["I", "II", "III", "IV", "V", "VI", "VII"][i]}
                      </span>
                      <span className="type-title text-3xl">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/talk-to-us"
                onClick={() => setOpen(false)}
                className="type-label mt-8 block border border-estate bg-estate py-4 text-center text-ivory"
              >
                Enquire
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

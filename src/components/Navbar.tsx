import { useEffect, useState } from "react";

/**
 * Deliberately bare: the wordmark and a single enquiry action, nothing else.
 * Navigation lives in the homepage sections and the footer.
 */
const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 bg-ivory/95 backdrop-blur-sm transition-[border-color] duration-500 ${
        scrolled ? "border-b border-rule" : "border-b border-transparent"
      }`}
    >
      <div className="flex h-16 items-center justify-between px-gutter">
        <a
          href="/"
          className="type-serif text-xl tracking-tight text-ink transition-colors hover:text-estate"
        >
          Vallunex
        </a>

        <a
          href="/talk-to-us"
          className="type-label border border-estate bg-estate px-5 py-2.5 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-estate"
        >
          Enquire
        </a>
      </div>
    </header>
  );
};

export default Navbar;

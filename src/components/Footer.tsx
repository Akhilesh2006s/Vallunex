/**
 * The homepage speaks only in the group's voice. The enterprises are listed
 * here, in the footer, so their pages stay reachable — Valedue is omitted
 * because it has neither a page nor a section to point at.
 */
const columns = [
  {
    heading: "Enterprises",
    links: [
      { label: "Amenity Forge", href: "https://amenityforge.com" },
      { label: "Vallunex Studios", href: "/vallunex-studios" },
      { label: "Adorable Aroma", href: "/adorable-aroma" },
    ],
  },
  {
    heading: "Education",
    links: [
      { label: "GTAP", href: "/gtap" },
      { label: "IAETDS", href: "/iaetds" },
    ],
  },
  {
    heading: "Enquiries",
    links: [{ label: "Talk To Us", href: "/talk-to-us" }],
  },
];

const isExternal = (href: string) => /^https?:\/\//.test(href);

const Footer = () => {
  return (
    <footer className="border-t border-rule px-gutter py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 pb-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-5">
            <img
              src="/vallunex-logo.png"
              alt="Vallunex Global"
              className="h-11 w-auto object-contain"
              onError={(e) => e.currentTarget.remove()}
            />
            <p className="type-display mt-7 max-w-xs text-3xl">
              One conglomerate.
              <span className="block italic text-estate">Every domain.</span>
            </p>
          </div>

          {columns.map((col) => (
            <nav key={col.heading} className="md:col-span-2">
              <h2 className="type-label text-brass">{col.heading}</h2>
              <ul className="mt-6 space-y-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={isExternal(l.href) ? "_blank" : undefined}
                      rel={isExternal(l.href) ? "noopener noreferrer" : undefined}
                      className="text-sm text-ink-soft transition-colors hover:text-estate"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-rule pt-7 md:flex-row md:items-center md:justify-between">
          <p className="type-label text-ink-soft">
            © {new Date().getFullYear()} Vallunex Global Holdings Ltd.
          </p>
          <p className="type-label text-ink-soft">All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

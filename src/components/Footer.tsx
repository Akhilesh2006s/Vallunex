/**
 * The site speaks only in the group's voice — no enterprise is named
 * anywhere, including here. The enterprise pages remain live at their own
 * URLs but are deliberately unlinked.
 */
const Footer = () => {
  return (
    <footer className="border-t border-rule px-gutter py-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-14 pb-16 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-7">
            <p className="type-display mt-7 max-w-md text-3xl md:text-4xl">
              One conglomerate.
              <span className="block italic text-estate">Every domain.</span>
            </p>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <h2 className="type-label text-brass">Enquiries</h2>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-ink-soft">
              If the problem sits across domains, that is where we work.
            </p>
            <a
              href="/talk-to-us"
              className="type-label mt-7 inline-block border border-estate bg-estate px-7 py-3.5 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-estate"
            >
              Talk To Us
            </a>
          </div>
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

const Footer = () => {
  return (
    <footer id="investors" className="bg-foreground">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-20">
        <div>
          <span className="font-display text-2xl text-background">Vallunex Global</span>
          <p className="mt-4 text-background/40 text-sm leading-relaxed max-w-md">
            Engineering the Next Era of Technology, Knowledge, and Entertainment.
          </p>
        </div>
        <div className="mt-20 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/30">© 2025 Vallunex Global Holdings Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Disclosures"].map((item) => (
              <a key={item} href="#" className="text-xs text-background/30 hover:text-background/60 transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

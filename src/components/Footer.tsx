const Footer = () => {
  return (
    <footer id="investors" className="bg-navy">
      <div className="max-w-[1440px] mx-auto px-8 md:px-16 py-20">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          <img
            src="/vallunex-logo.png"
            alt="Vallunex Group"
            className="h-14 w-auto object-contain"
          />
          <div>
            <span className="font-display text-2xl text-white">Vallunex Global</span>
            <p className="mt-2 text-white/40 text-sm leading-relaxed max-w-md">
              Engineering the Next Era of Technology, Knowledge, and Entertainment.
            </p>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/30">© 2025 Vallunex Global Holdings Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            {["Privacy", "Terms", "Disclosures"].map((item) => (
              <a key={item} href="#" className="text-xs text-white/30 hover:text-gold transition-colors duration-300">
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

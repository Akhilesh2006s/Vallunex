import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const GtapPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 px-8 md:px-16">
        <section className="max-w-6xl mx-auto">
          <img
            src="/gtap-logo.png"
            alt="GTAP Logo"
            className="h-24 w-auto object-contain"
          />
          <h1 className="mt-4 font-display text-5xl text-navy">GTAP</h1>
          <p className="mt-2 text-gold-dark font-semibold">
            Global T.I.M.E.S Accreditation Panel
          </p>
          <p className="mt-6 text-lg text-navy/70 max-w-4xl">
            Accrediting Excellence. Inspiring Innovation. GTAP is a global
            movement built to bridge innovation, credibility, and world-class
            academic standards across institutions.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">About GTAP</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                GTAP (Global T.I.M.E.S Accreditation Panel) empowers global
                academic excellence through structured accreditation standards.
                T.I.M.E.S stands for Training, Innovation, Mentorship, Education
                & Standards.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Vision & Mission</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                Vision: establish a globally trusted framework for academic
                accreditation. Mission: promote integrity, innovation, and
                collaboration while setting benchmark standards for institutional
                excellence.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Expert Panel</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                Led by distinguished academic leaders and advisors, with support
                from 35+ IITians and globally recognized researchers including
                Stanford top 2% scientists.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Global Impact</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                GTAP supports institutions across regions with frameworks for
                quality assurance, innovation readiness, and continuous
                accreditation improvement.
              </p>
            </article>
          </div>

          <div className="mt-10 border border-gold/40 bg-gold/10 p-6 rounded-sm">
            <h3 className="font-display text-2xl text-navy">Contact GTAP</h3>
            <p className="mt-2 text-navy/70">
              Email: globaltimespanel@gmail.com | Phone: 8309159939
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://globaltimespanel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white px-6 py-3 text-sm font-medium"
              >
                Visit Official GTAP Site
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GtapPage;

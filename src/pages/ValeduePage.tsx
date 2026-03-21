import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ValeduePage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 px-8 md:px-16">
        <section className="max-w-5xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-gold-dark font-semibold">
            Valedue
          </p>
          <h1 className="mt-3 font-display text-5xl text-navy">
            Valedue: Strategic Education & Media Axis
          </h1>
          <p className="mt-6 text-lg text-navy/70 leading-relaxed">
            Valedue is a core Vallunex vertical connecting next-generation education,
            accreditation, and intelligence-led institutional transformation. It
            anchors two high-impact initiatives:
          </p>
          <div className="mt-8 grid md:grid-cols-2 gap-6">
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">GTAP</h2>
              <p className="mt-3 text-navy/70">
                Global T.I.M.E.S Accreditation Panel focused on global standards,
                academic excellence, and institutional benchmarking.
              </p>
              <a
                href="/gtap"
                className="inline-block mt-5 text-sm font-semibold text-gold-dark hover:underline"
              >
                Explore GTAP
              </a>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">IAETDS</h2>
              <p className="mt-3 text-navy/70">
                Premium consortium model for digital education leadership,
                AI-integrated learning ecosystems, and institutional excellence.
              </p>
              <a
                href="/iaetds"
                className="inline-block mt-5 text-sm font-semibold text-gold-dark hover:underline"
              >
                Explore IAETDS
              </a>
            </article>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ValeduePage;

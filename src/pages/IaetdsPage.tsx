import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const IaetdsPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 px-8 md:px-16">
        <section className="max-w-6xl mx-auto">
          <img
            src="/iaetds-logo.png"
            alt="IAETDS Logo"
            className="h-24 w-auto object-contain"
          />
          <h1 className="mt-4 font-display text-5xl text-navy">IAETDS</h1>
          <p className="mt-2 text-gold-dark font-semibold">
            Indian Association for Educational Technology & Digital Systems
          </p>
          <p className="mt-6 text-lg text-navy/70 max-w-4xl">
            Premium institutional architecture by invitation only. IAETDS is a
            consortium for institutions that intend to lead India&apos;s digital
            education transformation with precision, prestige, and progress.
          </p>

          <div className="mt-10 grid md:grid-cols-2 gap-6">
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Who We Are</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                IAETDS is not a software subscription or generic service. It is
                a strategic excellence consortium that partners with
                forward-thinking institutions.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Consortium Model</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                The model delivers strategic digital transformation,
                AI-integrated learning ecosystems, institutional prestige, and
                standards-led technology governance.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Core Outcomes</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                Digital governance meets academic precision, AI improves student
                performance, and leadership teams gain long-term innovation
                direction.
              </p>
            </article>
            <article className="border border-border p-6 rounded-sm bg-white shadow-paper">
              <h2 className="font-display text-3xl text-navy">Membership</h2>
              <p className="mt-3 text-navy/70 leading-relaxed">
                Membership is limited and evaluation-based. Partnership is
                reserved for institutions committed to digital excellence,
                institutional authority, and national recognition.
              </p>
            </article>
          </div>

          <div className="mt-10 border border-gold/40 bg-gold/10 p-6 rounded-sm">
            <h3 className="font-display text-2xl text-navy">Explore IAETDS</h3>
            <p className="mt-2 text-navy/70">
              Visit the official IAETDS website to learn more about partnership,
              consortium structure, and institutional qualification.
            </p>
            <div className="mt-5 flex flex-wrap gap-4">
              <a
                href="https://www.iaetds.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-navy text-white px-6 py-3 text-sm font-medium"
              >
                Visit Official IAETDS Site
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default IaetdsPage;

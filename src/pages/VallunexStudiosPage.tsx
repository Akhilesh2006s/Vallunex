import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const VallunexStudiosPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pt-24 pb-20 px-8 md:px-16">
        <section className="max-w-6xl mx-auto">
          <img
            src="/vallunex-studios.png"
            alt="Vallunex Studios"
            className="w-full h-auto object-cover rounded-sm shadow-paper"
          />
          <h1 className="mt-8 font-display text-5xl text-navy">
            Vallunex Studios
          </h1>
          <p className="mt-3 text-gold-dark font-semibold">
            Movies • Music • Entertainment
          </p>
          <p className="mt-6 text-lg text-navy/70 max-w-4xl leading-relaxed">
            Vallunex Studios is the creative entertainment division of Vallunex
            Group, focused on cinematic storytelling, music production, and
            high-impact cultural experiences for global audiences.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VallunexStudiosPage;

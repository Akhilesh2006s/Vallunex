import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InitiativePillars, { type Pillar } from "@/components/InitiativePillars";
import InitiativeCta from "@/components/InitiativeCta";

const ease = [0.16, 1, 0.3, 1] as const;

const disciplines: Pillar[] = [
  {
    title: "Cinematic storytelling",
    body: "Film and content production — cinematic stories and brand films crafted for global audiences.",
  },
  {
    title: "Music production",
    body: "Original music and sound production for film, media, and cultural experiences.",
  },
  {
    title: "Cultural experiences",
    body: "High-impact media experiences that bring the Vallunex vision to life.",
  },
];

const VallunexStudiosPage = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main>
        <section className="border-b border-rule px-gutter pb-20 pt-32 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-4xl text-center">
            <a
              href="/"
              className="type-label text-brass transition-colors hover:text-estate"
            >
              Vallunex Global
            </a>

            <h1 className="type-display mt-10 text-[clamp(2.6rem,8vw,6.5rem)]">
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.1 }}
                  className="block"
                >
                  Vallunex
                </motion.span>
              </span>
              <span className="block overflow-hidden">
                <motion.span
                  initial={{ y: "105%" }}
                  animate={{ y: "0%" }}
                  transition={{ duration: 1.1, ease, delay: 0.2 }}
                  className="block italic text-estate"
                >
                  Studios
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, ease, delay: 0.5 }}
              className="type-label mt-8 text-ink-soft"
            >
              Movies · Music · Entertainment
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease, delay: 0.58 }}
              className="mx-auto mt-10 h-px w-14 bg-brass"
            />

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease, delay: 0.66 }}
              className="mx-auto mt-10 max-w-2xl text-base leading-relaxed text-ink-soft"
            >
              The creative entertainment division of Vallunex Group — focused on
              cinematic storytelling, music production, and high-impact cultural
              experiences for global audiences.
            </motion.p>
          </div>

          <motion.figure
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease, delay: 0.4 }}
            className="mx-auto mt-20 aspect-[21/9] max-w-6xl overflow-hidden bg-ivory-deep"
          >
            <img
              src="/vallunex-studios.png"
              alt="Vallunex Studios"
              className="h-full w-full object-cover"
            />
          </motion.figure>
        </section>

        <InitiativePillars pillars={disciplines} heading="Disciplines" />

        <InitiativeCta
          heading="Bring a story to the screen"
          body="For production, collaboration, or partnership enquiries with Vallunex Studios."
          ctaLabel="Talk To Us"
          ctaHref="/talk-to-us"
        />
      </main>
      <Footer />
    </div>
  );
};

export default VallunexStudiosPage;

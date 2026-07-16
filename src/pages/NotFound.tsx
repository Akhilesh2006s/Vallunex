import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-gutter py-16">
      <div className="mx-auto max-w-lg text-center">
        <p className="type-label text-brass">Vallunex Global</p>

        <p className="type-display mt-8 text-[clamp(4rem,14vw,9rem)] text-estate">
          404
        </p>

        <div className="mx-auto mt-8 h-px w-14 bg-brass" />

        <h1 className="type-display mt-8 text-[clamp(1.6rem,3.4vw,2.4rem)]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-5 text-base leading-relaxed text-ink-soft">
          The link may be outdated, or the page may have moved.
        </p>

        <a
          href="/"
          className="type-label mt-10 inline-block border border-estate bg-estate px-8 py-4 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-estate"
        >
          Return Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;

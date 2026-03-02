import React, { useEffect, useRef, useState } from "react";

type ScrollStep = {
  startProgress: number; // 0 to 1 scroll fraction
  endProgress: number; // 0 to 1 scroll fraction
  title: string;
  body: string;
  logo?: string;
  url?: string;
};

export const ScrollVideo: React.FC = () => {
  const globeVideo = new URL(
    "../Vallunex.mp4",
    import.meta.url
  ).href;
  const firstFrameImage = new URL("../Frame1.png", import.meta.url).href;
  const lastFrameImage = new URL("../Last frame.png", import.meta.url).href;
  const amenityLogo = new URL("../Amenityforge.jpg", import.meta.url).href;
  const gtapLogo = new URL("../GTAP.png", import.meta.url).href;
  const iaetdsLogo = new URL("../IAETDS.png", import.meta.url).href;
  const adorableAromaLogo = new URL(
    "../Adorable Aroma.png",
    import.meta.url
  ).href;
  const vallunexStudiosLogo = new URL(
    "../Valluenx studios.png",
    import.meta.url
  ).href;

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [activeStep, setActiveStep] = useState<ScrollStep | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0–1

  // Define scroll "chapters" – based on scroll percentage
  const steps: ScrollStep[] = [
    {
      startProgress: 0.1,
      endProgress: 0.23,
      title: "Vallunex Group",
      body: "Vallunex is a multi-business group bringing together technology, education, certification, and lifestyle brands under one unified vision.",
      url: "https://www.vallunex.com",
    },
    {
      startProgress: 0.23,
      endProgress: 0.36,
      title: "Amenity Forge",
      body: "Amenity Forge is your strategic digital partner – a tech company that turns ideas into products, from custom software and mobile apps to cloud, AI and digital experiences.",
      logo: amenityLogo,
      url: "https://www.amenityforge.com",
    },
    {
      startProgress: 0.36,
      endProgress: 0.49,
      title: "IAETDS",
      body: "IAETDS partners exclusively with forward-thinking institutions that aspire to lead—not follow—India's educational transformation journey.",
      logo: iaetdsLogo,
      url: "https://www.iaetds.com",
    },
    {
      startProgress: 0.49,
      endProgress: 0.62,
      title: "GTAP Certifications",
      body: "GTAP focuses on skill validation and certifications, helping learners and professionals showcase credible, industry-relevant credentials backed by the Vallunex ecosystem.",
      logo: gtapLogo,
      url: "https://www.globaltimespanel.com",
    },
    {
      startProgress: 0.62,
      endProgress: 0.75,
      title: "Vallunex Studios",
      body: "Vallunex Studios is the film and content production arm of the group, crafting cinematic stories, brand films, and media experiences that bring the Vallunex vision to life.",
      logo: vallunexStudiosLogo,
      url: "https://www.vallunex.com/studios",
    },
    {
      startProgress: 0.75,
      endProgress: 0.9,
      title: "Adorable Aroma",
      body: "Adorable Aroma brings a lifestyle dimension to Vallunex – a fragrance and wellness brand that adds warmth and sensory richness to the group portfolio.",
      logo: adorableAromaLogo,
      url: "https://www.vallunex.com/adorable-aroma",
    },
  ];

  // Capture video duration when metadata is loaded
  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  // Scroll listener: map scroll position to video time + active text step
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const doc = document.documentElement;
      const maxScrollTop = doc.scrollHeight - window.innerHeight;
      const scrollFraction = maxScrollTop > 0 ? scrollTop / maxScrollTop : 0;

      setScrollProgress(scrollFraction);

      // Define small ranges at start and end where we "hold" still images
      const START_HOLD = 0.1; // first 10% of scroll
      const END_HOLD = 0.1; // last 10% of scroll

      // Map scroll to video playback only in the middle range
      let videoFraction = 0;
      if (scrollFraction <= START_HOLD) {
        videoFraction = 0;
      } else if (scrollFraction >= 1 - END_HOLD) {
        videoFraction = 1;
      } else {
        const middleFraction =
          (scrollFraction - START_HOLD) / (1 - START_HOLD - END_HOLD);
        videoFraction = Math.min(1, Math.max(0, middleFraction));
      }

      if (videoRef.current && duration) {
        const targetTime = videoFraction * duration;
        // Pause to keep it frame-accurate and avoid autoplay
        if (!videoRef.current.paused) {
          videoRef.current.pause();
        }
        videoRef.current.currentTime = targetTime;
      }

      const currentStep =
        steps.find(
          (step) =>
            scrollFraction >= step.startProgress &&
            scrollFraction <= step.endProgress
        ) ?? null;

      setActiveStep(currentStep);
    };

    // Initialize once so first/last frames show correctly without scrolling
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [duration]);

  return (
    <div
      style={{
        position: "relative",
        height: "600vh", // longer scroll distance = more frames / slower scrub
        width: "100%",
        background: "black",
        color: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        overflowX: "hidden",
      }}
    >
      <div
        style={{
          position: "fixed", // keep media pinned to viewport
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* First frame image */}
          <img
            src={firstFrameImage}
            alt="Vallunex intro"
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: "100vw",
              height: "100vh",
              objectFit: "cover", // fill entire viewport
               opacity: scrollProgress <= 0.1 ? 1 : 0,
              transition: "opacity 0.4s ease-out",
              pointerEvents: "none",
            }}
          />

          {/* Video in the middle */}
          <video
            ref={videoRef}
            src={globeVideo}
            onLoadedMetadata={handleLoadedMetadata}
            muted
            playsInline
            style={{
              width: "100vw",
              height: "100vh",
              objectFit: "cover", // fill entire viewport
              display: "block",
              opacity:
                scrollProgress >= 0.05 && scrollProgress <= 0.95 ? 1 : 0,
              transition: "opacity 0.4s ease-out",
            }}
          />

          {/* Last frame image */}
          <img
            src={lastFrameImage}
            alt="Vallunex logo"
            style={{
              position: "absolute",
              inset: 0,
              margin: "auto",
              width: "100vw",
              height: "100vh",
              objectFit: "cover", // fill entire viewport
               opacity: scrollProgress >= 0.9 ? 1 : 0,
              transition: "opacity 0.4s ease-out",
              pointerEvents: "none",
            }}
          />

          {/* Text card overlay, only during main video (no black box on first/last images) */}
          {scrollProgress >= 0.1 && scrollProgress <= 0.9 && activeStep && (
            <div
              style={{
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)", // big centered square
                width: "60vw",
                maxWidth: 900,
                minHeight: "40vh",
                background: "rgba(0, 0, 0, 0.85)", // solid black square overlay
                borderRadius: 20,
                padding: "2rem 2.25rem",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
                pointerEvents: "auto",
              }}
            >
              <div
                style={{
                  textTransform: "uppercase",
                  fontSize: 12,
                  letterSpacing: 4,
                  opacity: 0.7,
                  marginBottom: 6,
                }}
              >
                Scroll Story
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "1.75rem",
                  alignItems: "flex-start",
                }}
              >
                {activeStep.logo && (
                  <div
                    style={{
                      flex: "0 0 120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <img
                      src={activeStep.logo}
                      alt={activeStep.title}
                      style={{
                        maxWidth: "100%",
                        maxHeight: 120,
                        objectFit: "contain",
                      }}
                    />
                  </div>
                )}

                <div style={{ flex: 1 }}>
                  <h2
                    style={{
                      fontSize: 24,
                      margin: "0 0 0.5rem",
                    }}
                  >
                    {activeStep.title}
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 16,
                      lineHeight: 1.6,
                      opacity: 0.9,
                    }}
                  >
                    {activeStep.body}
                  </p>
                  {activeStep.url && (
                    <a
                      href={activeStep.url}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: "inline-flex",
                        marginTop: "1rem",
                        fontSize: 14,
                        color: "#e5e7eb",
                        textDecoration: "none",
                        padding: "0.55rem 1.1rem",
                        borderRadius: 999,
                        border: "1px solid rgba(148,163,184,0.6)",
                        background:
                          "linear-gradient(135deg, rgba(15,23,42,0.9), rgba(30,64,175,0.75))",
                      }}
                    >
                      Visit website
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ScrollVideo;


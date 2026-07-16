import { FormEvent, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ease = [0.16, 1, 0.3, 1] as const;

const field =
  "mt-3 w-full border-0 border-b border-rule bg-transparent pb-2.5 text-lg text-ink outline-none transition-colors placeholder:text-ink-soft/40 focus:border-estate";

const TalkToUsPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus("idle");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formsubmit.co/ajax/amenityforge@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      <main className="px-gutter pb-24 pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl text-center">
          <a
            href="/"
            className="type-label text-brass transition-colors hover:text-estate"
          >
            Vallunex Global
          </a>

          <h1 className="type-display mt-10 text-[clamp(2.6rem,7vw,5.5rem)]">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.1 }}
                className="block"
              >
                Bring us the
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1.1, ease, delay: 0.2 }}
                className="block italic text-estate"
              >
                difficult one.
              </motion.span>
            </span>
          </h1>

          <div className="mx-auto mt-10 h-px w-14 bg-brass" />

          <p className="mx-auto mt-10 max-w-lg text-base leading-relaxed text-ink-soft">
            Tell us which part of the group you need. Share your details and our
            team will get back to you shortly.
          </p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.4 }}
          className="mx-auto mt-20 max-w-3xl"
        >
          <input type="hidden" name="_subject" value="New Vallunex Talk To Us Submission" />
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />

          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <label htmlFor="name" className="type-label text-ink-soft">
                Name *
              </label>
              <input id="name" name="name" required className={field} placeholder="Name" />
            </div>
            <div>
              <label htmlFor="email" className="type-label text-ink-soft">
                Email *
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className={field}
                placeholder="example@gmail.com"
              />
            </div>
          </div>

          <div className="mt-10">
            <label htmlFor="company" className="type-label text-ink-soft">
              Company
            </label>
            <input id="company" name="company" className={field} placeholder="Company Inc." />
          </div>

          <div className="mt-10">
            <label htmlFor="description" className="type-label text-ink-soft">
              What can we help with?
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              className={`${field} resize-none`}
              placeholder="Which part of the Vallunex group you're interested in."
            />
          </div>

          <div className="mt-10">
            <label htmlFor="message" className="type-label text-ink-soft">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className={`${field} resize-none`}
              placeholder="Any additional details for the team."
            />
          </div>

          {status === "success" && (
            <p
              role="status"
              className="mt-10 border-l-2 border-estate bg-ivory-deep px-5 py-4 text-sm"
            >
              Your request has been submitted. Our team will contact you soon.
            </p>
          )}

          {status === "error" && (
            <p
              role="alert"
              className="mt-10 border-l-2 border-destructive bg-ivory-deep px-5 py-4 text-sm text-destructive"
            >
              Something went wrong while submitting. Please try again.
            </p>
          )}

          <div className="mt-14 text-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="type-label border border-estate bg-estate px-10 py-4 text-ivory transition-colors duration-500 hover:bg-transparent hover:text-estate disabled:opacity-50"
            >
              {isSubmitting ? "Sending…" : "Send Request"}
            </button>
          </div>
        </motion.form>
      </main>
      <Footer />
    </div>
  );
};

export default TalkToUsPage;

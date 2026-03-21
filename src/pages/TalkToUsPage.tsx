import { FormEvent, useState } from "react";
import Navbar from "@/components/Navbar";
import heroBg from "@/assets/hero-bg.jpg";

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
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 px-4 md:px-10 pb-10">
        <div
          className="max-w-6xl mx-auto rounded-2xl border border-border/60 overflow-hidden min-h-[78vh] relative"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white/70" />
          <div className="relative p-5 md:p-8">
            <div className="max-w-3xl mx-auto bg-[#fffdf7] rounded-2xl border border-border/60 shadow-paper">
              <div className="px-6 md:px-8 py-5 border-b border-border/70">
                <h1 className="font-display text-4xl text-navy">Talk To Us</h1>
                <p className="mt-2 text-sm text-navy/60">
                  Share your details and our team will get back to you shortly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="px-6 md:px-8 py-6 space-y-5">
                <input type="hidden" name="_subject" value="New Vallunex Talk To Us Submission" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="text-xs font-semibold tracking-wider uppercase text-navy/70">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="text-xs font-semibold tracking-wider uppercase text-navy/70">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-gold/40"
                      placeholder="example@gmail.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="text-xs font-semibold tracking-wider uppercase text-navy/70">
                    Your Company Name
                  </label>
                  <input
                    id="company"
                    name="company"
                    className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-gold/40"
                    placeholder="Company Inc."
                  />
                </div>

                <div>
                  <label htmlFor="description" className="text-xs font-semibold tracking-wider uppercase text-navy/70">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-gold/40"
                    placeholder="Tell us what you want to automate with Vallunex."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="text-xs font-semibold tracking-wider uppercase text-navy/70">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="mt-2 w-full rounded-xl border border-border bg-white px-4 py-3 text-navy outline-none focus:ring-2 focus:ring-gold/40"
                    placeholder="Any additional details for the team."
                  />
                </div>

                {status === "success" && (
                  <p className="rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-emerald-700 text-sm">
                    Success! Your request has been submitted. Our team will contact you soon.
                  </p>
                )}

                {status === "error" && (
                  <p className="rounded-lg bg-rose-50 border border-rose-200 px-4 py-3 text-rose-700 text-sm">
                    Something went wrong while submitting. Please try again.
                  </p>
                )}

                <div className="flex items-center justify-end gap-3 pt-2">
                  <a
                    href="/"
                    className="px-5 py-2.5 text-sm font-medium text-navy/70 hover:text-navy"
                  >
                    Cancel
                  </a>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-navy text-white rounded-full px-7 py-2.5 text-sm font-semibold hover:bg-navy-light transition-colors disabled:opacity-70"
                  >
                    {isSubmitting ? "Sending..." : "Send Request"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TalkToUsPage;

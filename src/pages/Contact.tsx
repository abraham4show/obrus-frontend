import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useForm, ValidationError } from "@formspree/react";

const Contact = () => {
  const [state, handleSubmit] = useForm("mzdyylnk");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // Reset form when submission succeeds – wrapped in useEffect to avoid infinite loop
  useEffect(() => {
    if (state.succeeded) {
      setFullName("");
      setEmail("");
      setPhone("");
      setMessage("");
    }
  }, [state.succeeded]); // Only runs when state.succeeded changes

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Contact Us
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Get In Touch
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              We would love to hear from you. Reach out by phone, email, WhatsApp, or use the form below.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information – unchanged */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Contact Information</h2>
              <div className="space-y-5 mb-8">
                {[
                  { icon: Phone, label: "Phone", text: "+234 807 874 7510", href: "tel:+2348078747510" },
                  { icon: Mail, label: "Email", text: "info@obrusApex.com.ng", href: "mailto:info@obrusApex.com.ng" },
                  { icon: MapPin, label: "Address", text: "Elelewon, Port Harcourt, Nigeria" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-md bg-secondary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <p className="font-heading font-semibold text-sm text-foreground">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="text-muted-foreground text-sm hover:text-secondary transition-colors">{item.text}</a>
                      ) : (
                        <p className="text-muted-foreground text-sm">{item.text}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="https://wa.me/2348078747510"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
              >
                <MessageCircle size={18} /> Chat on WhatsApp
              </a>

              {/* Map - OpenStreetMap */}
              <div className="mt-8 rounded-lg overflow-hidden border border-border">
                <iframe
                  src="https://www.openstreetmap.org/export/embed.html?bbox=6.99,4.79,7.11,4.91&layer=mapnik&marker=4.85,7.05"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  title="Obrus Apex Services Location"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-heading text-2xl font-bold text-foreground mb-6">Send Us a Message</h2>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                  <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Phone (optional)</label>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+234..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
                  <textarea
                    name="message"
                    rows={5}
                    placeholder="How can we help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    className="w-full bg-card border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
                  />
                  <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs mt-1" />
                </div>
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full bg-primary text-primary-foreground py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {state.submitting ? "Sending..." : "Send Message"}
                </button>
                {state.succeeded && (
                  <p className="text-green-600 text-sm text-center mt-2">
                    Thank you! Your message has been sent.
                  </p>
                )}
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Contact;
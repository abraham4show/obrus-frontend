import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { services } from "@/components/ServicesSection";

const Quote = () => {
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
              Request a Quote
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Tell Us What You Need
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              Tell us what you need and we will get back to you quickly.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-5 bg-card border border-border rounded-lg p-8"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Your Name *</label>
              <input
                type="text"
                placeholder="Full name"
                required
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Company Name</label>
              <input
                type="text"
                placeholder="Your company (optional)"
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Email *</label>
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Service Needed *</label>
              <select
                required
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground focus:outline-none focus:border-secondary transition-colors"
              >
                <option value="">Select a service</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
              <input
                type="text"
                placeholder="Where do you need the service?"
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Message</label>
              <textarea
                rows={4}
                placeholder="Tell us more about what you need..."
                className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Submit Quote Request
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Quote;

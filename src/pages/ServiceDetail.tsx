import { useParams, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { services } from "@/components/ServicesSection";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ArrowRight } from "lucide-react";

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-28 pb-16 container mx-auto px-4 text-center">
          <h1 className="font-heading text-3xl font-bold text-foreground mb-4">Service Not Found</h1>
          <Link to="/services" className="text-secondary hover:underline">
            ← Back to Services
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero with image */}
      <section className="relative pt-20">
        <div className="relative h-64 md:h-80 overflow-hidden">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
            width={1280}
            height={854}
          />
          <div className="absolute inset-0 bg-primary/80" />
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-4">
              <Link to="/services" className="inline-flex items-center gap-2 text-primary-foreground/60 hover:text-secondary transition-colors mb-4 text-sm">
                <ArrowLeft size={16} /> Back to Services
              </Link>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex items-start gap-5"
              >
                <div className="w-14 h-14 rounded-md bg-secondary/20 flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-7 h-7 text-secondary" />
                </div>
                <div>
                  <h1 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-3">
                    {service.title}
                  </h1>
                  <p className="text-primary-foreground/70 text-lg leading-relaxed max-w-2xl">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">What We Do</h2>
              <ul className="space-y-3">
                {service.details.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{d}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="font-heading text-xl font-bold text-foreground mb-4">Why It Matters</h2>
              <ul className="space-y-3">
                {service.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Need This Service?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Contact us today or request a quote. We respond quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/request-service"
              className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              {service.cta} <ArrowRight size={16} />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default ServiceDetail;

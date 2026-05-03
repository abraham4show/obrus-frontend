import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ProjectsShowcase from "@/components/ProjectsShowcase";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck,
  Users,
  Zap,
  Leaf,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const whyChooseUs = [
  { icon: Users, title: "Experienced Team", desc: "Our supervisors and technicians have years of hands-on experience in facility and environmental operations." },
  { icon: Zap, title: "Fast Response Time", desc: "We act quickly because we understand that downtime costs money. Same-day response on urgent requests." },
  { icon: ShieldCheck, title: "Strong HSE Standards", desc: "We follow strict health, safety, and environmental standards on every project we deliver." },
  { icon: Leaf, title: "Environmental Compliance", desc: "Our environmental services help your business stay compliant with local regulations." },
  { icon: HeartHandshake, title: "Reliable Service Delivery", desc: "We show up on time, every time. Our clients trust us because we are dependable." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background w-full">
      <Navbar />
      <HeroSection />

      {/* About preview */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
              Who We Are
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Obrus Apex Services is a reliable manpower, facility management, environmental, and equipment procurement company serving corporate and industrial clients in Nigeria. Based in Port Harcourt, we support businesses by providing skilled personnel, maintaining operational facilities, ensuring clean and safe environments, and supplying essential equipment.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-secondary font-heading font-semibold text-sm hover:gap-3 transition-all"
            >
              Learn more about us <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      </section>

      <ServicesSection />

      {/* Why Choose Us */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              Why Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Obrus Apex Services
            </h2>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {whyChooseUs.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <item.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <ProjectsShowcase />
      <TestimonialsSection />

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-heading text-2xl md:text-4xl font-bold text-primary-foreground mb-4">
              Get a Quote Today
            </h2>
            <p className="text-primary-foreground/70 max-w-2xl mx-auto mb-8">
              Need manpower, facility support, environmental services, or equipment? Our team is ready to deliver the right solution for your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/request-service"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Request a Quote <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-8 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Building2, Home, Factory, ArrowRight } from "lucide-react";

const projectTypes = [
  {
    icon: Building2,
    title: "Corporate Offices",
    desc: "Cleaning, maintenance, and staffing services for corporate buildings and office complexes.",
    examples: ["Daily office cleaning", "HVAC maintenance", "Staff outsourcing"],
  },
  {
    icon: Factory,
    title: "Industrial Facilities",
    desc: "HSE consultancy, waste management, and facility maintenance for factories and industrial sites.",
    examples: ["Safety audits", "Waste evacuation", "Equipment supply"],
  },
  {
    icon: Home,
    title: "Residential Properties",
    desc: "Fumigation, cleaning, septic services, and general maintenance for homes and estates.",
    examples: ["Pest control", "Septic evacuation", "Deep cleaning"],
  },
];

const Projects = () => {
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
              Our Work
            </p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">
              Projects & Clients
            </h1>
            <p className="text-primary-foreground/70 text-lg">
              We serve businesses, organizations, and individuals across Nigeria. Here are the types of clients we work with.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {projectTypes.map((type, i) => (
              <motion.div
                key={type.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-card border border-border rounded-lg p-6"
              >
                <type.icon className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{type.desc}</p>
                <ul className="space-y-2">
                  {type.examples.map((ex) => (
                    <li key={ex} className="text-xs bg-secondary/10 text-secondary px-3 py-1.5 rounded-full inline-block mr-2">
                      {ex}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
            {[
              { number: "200+", label: "Projects Completed" },
              { number: "50+", label: "Active Clients" },
              { number: "500+", label: "Workers Deployed" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat) => (
              <div key={stat.label} className="bg-primary text-center rounded-lg p-6">
                <p className="font-heading text-3xl font-bold text-secondary mb-1">{stat.number}</p>
                <p className="text-primary-foreground/60 text-xs">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Want to Work With Us?
          </h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Let us help your business with reliable services. Get started today.
          </p>
          <Link
            to="/quote"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground px-7 py-3 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
          >
            Request a Quote <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Projects;

import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const projects = [
  {
    title: "Facility Maintenance — Industrial Complex",
    location: "Port Harcourt",
    services: ["Electrical maintenance", "HVAC servicing", "Plumbing repairs"],
  },
  {
    title: "Environmental Sanitation — Residential Estate",
    location: "Port Harcourt",
    services: ["Fumigation", "Waste management", "General cleaning"],
  },
  {
    title: "Manpower Deployment — Oil & Gas Facility",
    location: "Rivers State",
    services: ["HVAC technicians", "Electricians", "Facility supervisors"],
  },
];

const ProjectsShowcase = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
            Experience
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Projects We Have Delivered
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A snapshot of the work we have done for corporate and industrial clients.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6"
            >
              <h3 className="font-heading font-semibold text-foreground mb-1">{p.title}</h3>
              <p className="text-muted-foreground text-xs mb-4">{p.location}</p>
              <ul className="space-y-2">
                {p.services.map((s) => (
                  <li key={s} className="flex items-center gap-2 text-muted-foreground text-sm">
                    <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-secondary font-heading font-semibold text-sm hover:gap-3 transition-all"
          >
            View All Projects <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsShowcase;

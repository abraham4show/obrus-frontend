import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, Building2, Package, Leaf, ArrowRight } from "lucide-react";
import manpowerImg from "@/assets/manpower.jpg";
import facilityImg from "@/assets/facility.jpg";
import equipmentImg from "@/assets/equipment.jpg";
import environmentalImg from "@/assets/environmental.jpg";

export const services = [
  {
    icon: Users,
    title: "Manpower Recruitment",
    slug: "manpower",
    image: manpowerImg,
    short: "We provide skilled technicians and reliable workers to support business operations.",
    description: "We supply reliable workers for businesses of all sizes. Whether you need temporary staff or permanent hires, we source, screen, and deploy the right people for your team.",
    benefits: [
      "Saves hiring time",
      "Access to qualified workers",
      "Flexible workforce solutions",
    ],
    details: [
      "Skilled technicians (Electrical, HVAC, Plumbing)",
      "Facility support staff",
      "Contract and permanent placement",
      "Workforce outsourcing",
    ],
    cta: "Request Staff",
  },
  {
    icon: Building2,
    title: "Facility Management",
    slug: "facility-management",
    image: facilityImg,
    short: "We maintain buildings and systems to keep them safe and fully functional.",
    description: "From electrical systems to plumbing, we keep your facilities running at their best. Our team handles routine inspections, preventive maintenance, and technician supervision.",
    benefits: [
      "Clean and safe environment",
      "Reduced maintenance issues",
      "Improved workplace productivity",
    ],
    details: [
      "Electrical systems maintenance",
      "HVAC systems (cooling and ventilation)",
      "Plumbing systems",
      "Routine inspections and preventive maintenance",
      "Technician supervision",
    ],
    cta: "Request Service",
  },
  {
    icon: Leaf,
    title: "Environmental Services",
    slug: "environmental-services",
    image: environmentalImg,
    short: "From fumigation to waste management and fire safety support, we help businesses maintain clean, safe, and compliant environments.",
    description: "We provide professional environmental and sanitation services to keep communities, offices, and industrial sites clean, healthy, and compliant with regulations.",
    benefits: [
      "Cleaner and healthier environment",
      "Regulatory compliance",
      "Reliable waste disposal",
    ],
    details: [
      "Fumigation",
      "Waste Management",
      "Septic Tank Dislodgment",
      "Fire Extinguisher Servicing",
      "Cleaning Services",
      "General Environmental Maintenance",
    ],
    cta: "Request Service",
  },
  {
    icon: Package,
    title: "Equipment Procurement",
    slug: "equipment-procurement",
    image: equipmentImg,
    short: "We supply quality industrial tools and equipment needed for daily operations.",
    description: "We supply high-quality industrial tools, HVAC components, electrical and plumbing materials, and spare parts. Keep your operations running with reliable equipment.",
    benefits: [
      "Access to reliable equipment",
      "Saves procurement stress",
      "Cost-effective supply",
    ],
    details: [
      "Industrial tools",
      "HVAC systems and components",
      "Electrical and plumbing materials",
      "Spare parts sourcing",
    ],
    cta: "Order Equipment",
  },
];

const ServicesSection = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Our Core Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We focus on four key areas to help your business run smoothly and safely.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, i) => (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link
                to={`/services/${service.slug}`}
                className="group block bg-card border border-border rounded-lg overflow-hidden hover:border-secondary/40 hover:shadow-lg transition-all h-full"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    loading="lazy"
                    width={1280}
                    height={854}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-primary/30" />
                  <div className="absolute bottom-4 left-4 w-11 h-11 rounded-md bg-secondary flex items-center justify-center">
                    <service.icon className="w-5 h-5 text-secondary-foreground" />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    {service.short}
                  </p>
                  <span className="inline-flex items-center gap-1 text-secondary text-sm font-medium group-hover:gap-2 transition-all">
                    Learn more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;

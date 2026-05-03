import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Engr. Chukwuma O.",
    role: "Operations Manager, Oil & Gas",
    text: "Obrus Apex Services has been consistent with delivering skilled manpower for our facility in Port Harcourt. Their team understands the demands of industrial operations.",
  },
  {
    name: "Mrs. Adaeze N.",
    role: "Estate Manager, Residential Estate",
    text: "We use their environmental and cleaning services monthly. The quality is always excellent, and they respond quickly when we have urgent requests.",
  },
  {
    name: "Mr. Ibrahim K.",
    role: "Procurement Lead, Construction Firm",
    text: "Their equipment procurement service saved us time and money. They source quality materials at competitive prices and deliver on schedule.",
  },
];

const TestimonialsSection = () => {
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
            Testimonials
          </p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Why Clients Trust Us
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 relative"
            >
              <Quote className="w-8 h-8 text-secondary/20 absolute top-4 right-4" />
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-secondary text-secondary" />
                ))}
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed mb-5">
                "{t.text}"
              </p>
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">{t.name}</p>
                <p className="text-muted-foreground text-xs">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

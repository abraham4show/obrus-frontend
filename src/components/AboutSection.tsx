import { motion } from "framer-motion";
import { CheckCircle2, Clock, Shield, Star, ThumbsUp } from "lucide-react";
import teamImg from "@/assets/team.jpg";

const reasons = [
  { icon: Shield, label: "Experienced and reliable team" },
  { icon: Clock, label: "Fast response time" },
  { icon: Star, label: "Quality service delivery" },
  { icon: ThumbsUp, label: "Customer-focused approach" },
];

const AboutSection = () => {
  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">
              About Us
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-5">
              Why Choose{" "}
              <span className="text-secondary">OBRUS Apex?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              OBRUS Apex Services is a trusted service company in Nigeria, helping businesses with manpower, facility management, and equipment supply. We understand client needs, plan properly, and deliver quality service on time.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((reason) => (
                <div key={reason.label} className="flex items-center gap-3 bg-background rounded-lg p-4 border border-border">
                  <reason.icon className="w-5 h-5 text-secondary flex-shrink-0" />
                  <span className="text-sm font-medium text-foreground">{reason.label}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <img
              src={teamImg}
              alt="OBRUS Apex Services team"
              loading="lazy"
              width={1280}
              height={854}
              className="rounded-lg shadow-lg w-full object-cover aspect-[4/3]"
            />
            <div className="absolute -bottom-4 -left-4 bg-secondary text-secondary-foreground rounded-lg p-5 shadow-lg hidden md:block">
              <p className="font-heading text-2xl font-bold">200+</p>
              <p className="text-sm opacity-90">Projects Done</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;

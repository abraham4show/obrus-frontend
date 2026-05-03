import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <img
        src={heroBg}
        alt="Professional facility and environmental services in Nigeria"
        className="absolute inset-0 w-full h-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-primary/85" />

      <div className="relative z-10 container mx-auto px-4 py-32">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-4">
              Trusted Services Across Nigeria
            </p>
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-primary-foreground">
              Reliable Facility, Environmental & Manpower Solutions{" "}
              <span className="text-secondary">You Can Trust</span>
            </h1>
            <p className="text-primary-foreground/80 text-lg max-w-xl mb-8 font-body leading-relaxed">
              Obrus Apex Services delivers skilled manpower, efficient facility maintenance, environmental solutions, and quality equipment supply to corporate and industrial clients across Nigeria.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/signup"
                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-7 py-3.5 rounded-md font-heading font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Get Started <ArrowRight size={16} />
              </Link>
              <Link
                to="/request-service"
                className="inline-flex items-center justify-center gap-2 border border-primary-foreground/30 text-primary-foreground px-7 py-3.5 rounded-md font-heading font-semibold text-sm hover:border-secondary hover:text-secondary transition-colors"
              >
                Request a Quote
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

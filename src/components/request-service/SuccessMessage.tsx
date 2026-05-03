import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const SuccessMessage = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <section className="pt-28 pb-20">
      <div className="container mx-auto px-4 max-w-lg text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
          <CheckCircle2 className="w-16 h-16 text-secondary mx-auto mb-6" />
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">Your Request Has Been Received</h1>
          <p className="text-muted-foreground leading-relaxed mb-6">Our team will contact you within 24 hours. Thank you for choosing Obrus Apex Services.</p>
          <p className="text-muted-foreground text-sm mb-8">For urgent requests, please contact us via phone or WhatsApp at +234 807 874 7510.</p>
          <Button variant="secondary" asChild><a href="/">Back to Home</a></Button>
        </motion.div>
      </div>
    </section>
    <Footer />
  </div>
);

export default SuccessMessage;

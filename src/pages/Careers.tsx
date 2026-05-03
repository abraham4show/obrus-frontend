import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Careers = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Join Our Team</h1>
            <p className="text-primary-foreground/70 text-lg">We are always looking for skilled people. Submit your CV or request workers.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="bg-card border border-border rounded-lg p-8">
              <Briefcase className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Looking for Work?</h3>
              <p className="text-muted-foreground text-sm mb-4">Browse available jobs or submit your CV.</p>
              <Link to="/jobs" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">View open positions <ArrowRight size={14} /></Link>
            </div>
            <div className="bg-card border border-border rounded-lg p-8">
              <Users className="w-10 h-10 text-secondary mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">Need Workers?</h3>
              <p className="text-muted-foreground text-sm mb-4">We provide skilled and unskilled workers.</p>
              <a href="request-service" className="inline-flex items-center gap-2 text-secondary text-sm font-medium">Request manpower <ArrowRight size={14} /></a>
            </div>
          </div>
          {/* <div className="mb-16">
            <h2 className="font-heading text-2xl font-bold mb-6">Submit Your CV</h2>
            <form className="bg-card border border-border rounded-lg p-8 space-y-4" onSubmit={(e) => { e.preventDefault(); alert("CV submission – coming soon."); }}>
              <input type="text" placeholder="Full Name" className="w-full border rounded-md p-2" required />
              <input type="email" placeholder="Email" className="w-full border rounded-md p-2" required />
              <input type="tel" placeholder="Phone" className="w-full border rounded-md p-2" required />
              <input type="text" placeholder="Position Interested In" className="w-full border rounded-md p-2" required />
              <input type="file" accept=".pdf,.doc,.docx" className="w-full border rounded-md p-2" />
              <button type="submit" className="w-full bg-secondary text-secondary-foreground py-3 rounded-md font-semibold">Submit Application</button>
            </form>
          </div>*/}
        </div> 
      </section>
      <Footer /><WhatsAppButton />
    </div>
  );
};
export default Careers;
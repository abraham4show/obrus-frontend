import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { Briefcase, MapPin, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { api } from "@/api/client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  description: string;
  salary_range: string;
  created_at: string;
}

const Jobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const data = await api.request("/jobs/");
        // 👇 Handle both array and paginated response
        const jobsArray = Array.isArray(data) ? data : data?.results || [];
        setJobs(jobsArray);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center">Loading jobs...</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <p className="text-secondary font-heading text-sm font-semibold tracking-widest uppercase mb-3">Careers</p>
            <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground mb-4">Available Jobs</h1>
            <p className="text-primary-foreground/70 text-lg">We are hiring skilled professionals across Nigeria.</p>
          </motion.div>
        </div>
      </section>
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          {jobs.length === 0 ? (
            <div className="text-center py-16">
              <Briefcase className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-heading text-xl font-bold mb-2">No open positions right now</h3>
              <p className="text-muted-foreground mb-6">Submit your CV and we will reach out when a position opens up.</p>
              <Link to="/careers" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-md text-sm font-semibold">Submit Your CV</Link>
            </div>
          ) : (
            <div className="space-y-6">
              {jobs.map(job => (
                <div key={job.id} className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{job.title}</h3>
                      <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1"><Briefcase size={14} /> {job.company}</span>
                        <span className="flex items-center gap-1"><MapPin size={14} /> {job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={14} /> {job.job_type.replace('_', ' ')}</span>
                      </div>
                      <p className="mt-3 text-muted-foreground line-clamp-2">{job.description}</p>
                      {job.salary_range && <p className="mt-2 text-sm font-medium">💰 {job.salary_range}</p>}
                    </div>
                    <Link to={`/apply/${job.id}`} className="bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 whitespace-nowrap">
                      Apply Now <ArrowRight size={14} className="inline ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer /><WhatsAppButton />
    </div>
  );
};

export default Jobs;
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const ApplyJob = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { toast } = useToast();
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    cover_letter: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);

  useEffect(() => {
    if (!jobId) return;
    api.request(`/jobs/${jobId}/`)
      .then(data => setJob(data))
      .catch(err => {
        console.error(err);
        toast({ title: "Job not found", variant: "destructive" });
        navigate("/jobs");
      })
      .finally(() => setLoading(false));
  }, [jobId, navigate, toast]);

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        full_name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        phone: user.phone || "",
      }));
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cvFile) {
      toast({ title: "Please upload your CV", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    fd.append("job", jobId!);
      fd.append("position", job.title);         // 👈 ADD THIS LINE
    fd.append("full_name", formData.full_name);
    fd.append("email", formData.email);
    fd.append("phone", formData.phone);
    fd.append("cover_letter", formData.cover_letter);
    fd.append("cv", cvFile);
    if (user) fd.append("user", String(user.id));

    try {
      await api.createJobApplication(fd);
      toast({ title: "Application submitted successfully!" });
      navigate("/jobs");
    } catch (err) {
      toast({ title: "Submission failed", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="p-8 text-center">Loading job details...</div>;
  if (!job) return <div className="p-8 text-center">Job not found</div>;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-2xl font-bold mb-2">Apply for {job.title}</h1>
        <p className="text-muted-foreground mb-6">{job.company} – {job.location}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Full Name *" required className="w-full border p-2 rounded" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
          <input type="email" placeholder="Email *" required className="w-full border p-2 rounded" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          <input type="tel" placeholder="Phone *" required className="w-full border p-2 rounded" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          <textarea placeholder="Cover Letter (optional)" rows={5} className="w-full border p-2 rounded" value={formData.cover_letter} onChange={e => setFormData({...formData, cover_letter: e.target.value})} />
          <div>
            <label className="block mb-1">Upload CV (PDF, DOC, DOCX) *</label>
            <input type="file" accept=".pdf,.doc,.docx" required onChange={e => setCvFile(e.target.files?.[0] || null)} />
          </div>
          <button type="submit" disabled={submitting} className="bg-secondary text-secondary-foreground px-6 py-2 rounded-md w-full">
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default ApplyJob;
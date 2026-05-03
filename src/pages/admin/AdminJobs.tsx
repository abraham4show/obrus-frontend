import { useState, useEffect, useCallback } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";
import { Pencil, Trash2, Plus } from "lucide-react";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  job_type: string;
  experience_level: string;
  description: string;
  requirements: string;
  salary_range: string;
  is_active: boolean;
  created_at: string;
}

const AdminJobs = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "Obrus Apex Services",
    location: "",
    job_type: "full_time",
    experience_level: "mid",
    description: "",
    requirements: "",
    salary_range: "",
    is_active: true,
  });
  const { toast } = useToast();

  const fetchJobs = useCallback(async () => {
    try {
      const data = await api.request("/admin/jobs/");
      const jobsArray = Array.isArray(data) ? data : data?.results || [];
      setJobs(jobsArray);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const openCreateModal = () => {
    setEditingJob(null);
    setFormData({
      title: "",
      company: "Obrus Apex Services",
      location: "",
      job_type: "full_time",
      experience_level: "mid",
      description: "",
      requirements: "",
      salary_range: "",
      is_active: true,
    });
    setDialogOpen(true);
  };

  const openEditModal = (job: Job) => {
    setEditingJob(job);
    setFormData({
      title: job.title,
      company: job.company,
      location: job.location,
      job_type: job.job_type,
      experience_level: job.experience_level,
      description: job.description,
      requirements: job.requirements,
      salary_range: job.salary_range,
      is_active: job.is_active,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingJob) {
        await api.request(`/admin/jobs/${editingJob.id}/`, {
          method: "PUT",
          body: JSON.stringify(formData),
        });
        toast({ title: "Job updated" });
      } else {
        await api.request("/admin/jobs/", {
          method: "POST",
          body: JSON.stringify(formData),
        });
        toast({ title: "Job created" });
      }
      setDialogOpen(false);
      fetchJobs(); // now works because fetchJobs is in scope
    } catch (err) {
      toast({ title: "Error saving job", variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await api.request(`/admin/jobs/${id}/`, { method: "DELETE" });
      toast({ title: "Job deleted" });
      fetchJobs();
    }
  };

  if (loading) return <div>Loading jobs...</div>;

  return (
    <AdminLayout>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Job Postings</CardTitle>
          <Button onClick={openCreateModal} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Job
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Posted</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map(job => (
                <TableRow key={job.id}>
                  <TableCell className="font-medium">{job.title}</TableCell>
                  <TableCell>{job.location}</TableCell>
                  <TableCell className="capitalize">{job.job_type.replace('_', ' ')}</TableCell>
                  <TableCell>{job.is_active ? <Badge>Active</Badge> : <Badge variant="outline">Inactive</Badge>}</TableCell>
                  <TableCell>{new Date(job.created_at).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" onClick={() => openEditModal(job)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(job.id)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {jobs.length === 0 && (
                <TableRow><TableCell colSpan={6} className="text-center">No jobs created yet.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingJob ? "Edit Job" : "Create New Job"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input placeholder="Job Title *" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
            <Input placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} />
            <Input placeholder="Location *" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
            <Select value={formData.job_type} onValueChange={val => setFormData({...formData, job_type: val})}>
              <SelectTrigger><SelectValue placeholder="Job Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="full_time">Full Time</SelectItem>
                <SelectItem value="part_time">Part Time</SelectItem>
                <SelectItem value="contract">Contract</SelectItem>
                <SelectItem value="remote">Remote</SelectItem>
                <SelectItem value="internship">Internship</SelectItem>
              </SelectContent>
            </Select>
            <Select value={formData.experience_level} onValueChange={val => setFormData({...formData, experience_level: val})}>
              <SelectTrigger><SelectValue placeholder="Experience Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="entry">Entry Level</SelectItem>
                <SelectItem value="mid">Mid Level</SelectItem>
                <SelectItem value="senior">Senior Level</SelectItem>
                <SelectItem value="lead">Lead</SelectItem>
                <SelectItem value="executive">Executive</SelectItem>
              </SelectContent>
            </Select>
            <Textarea placeholder="Job Description *" rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
            <Textarea placeholder="Requirements" rows={3} value={formData.requirements} onChange={e => setFormData({...formData, requirements: e.target.value})} />
            <Input placeholder="Salary Range (e.g., ₦150,000 - ₦250,000)" value={formData.salary_range} onChange={e => setFormData({...formData, salary_range: e.target.value})} />
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.is_active} onChange={e => setFormData({...formData, is_active: e.target.checked})} />
              <label>Active (visible to applicants)</label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminJobs;
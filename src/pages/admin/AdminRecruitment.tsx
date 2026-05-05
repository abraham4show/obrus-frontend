import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Eye, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/client";

const statuses = ["received", "reviewing", "shortlisted", "interview", "rejected", "hired"];

const AdminRecruitment = () => {
  const [apps, setApps] = useState<any[]>([]);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { toast } = useToast();

  const fetchApps = async () => {
    const data = await api.request("/admin/recruitment/");
    setApps(data);
  };

  useEffect(() => {
    fetchApps();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      await api.request(`/job-applications/${id}/`, { method: "PATCH", body: JSON.stringify({ status }) });
      toast({ title: "Status updated" });
      fetchApps();
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const deleteApp = async (id: string) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.request(`/job-applications/${id}/`, { method: "DELETE" });
      toast({ title: "Application deleted" });
      fetchApps();
    } catch (err) {
      toast({ title: "Error", variant: "destructive" });
    }
  };

  const viewDetails = (app: any) => {
    setSelectedApp(app);
    setModalOpen(true);
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Recruitment Applications ({apps.length})</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apps.map(a => (
                <TableRow key={a.id}>
                  <TableCell>{a.full_name}</TableCell>
                  <TableCell>{a.position}</TableCell>
                  <TableCell>
                    <Select defaultValue={a.status} onValueChange={(v) => updateStatus(a.id, v)}>
                      <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>{new Date(a.created_at).toLocaleDateString()}</TableCell>
                  <TableCell className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => viewDetails(a)} title="View Details">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => deleteApp(a.id)} className="text-destructive">
                      <Trash2 size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {apps.length === 0 && <TableRow><TableCell colSpan={5}>No applications</TableCell></TableRow>}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal for details */}
      {modalOpen && selectedApp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={20} />
            </button>
            <h2 className="text-xl font-bold mb-4">Application Details</h2>
            <div className="space-y-3">
              <div><span className="font-medium">Name:</span> {selectedApp.full_name}</div>
              <div><span className="font-medium">Email:</span> {selectedApp.email}</div>
              <div><span className="font-medium">Phone:</span> {selectedApp.phone}</div>
              <div><span className="font-medium">Position:</span> {selectedApp.position}</div>
              <div><span className="font-medium">Status:</span> {selectedApp.status}</div>
              <div><span className="font-medium">Applied on:</span> {new Date(selectedApp.created_at).toLocaleString()}</div>
              {selectedApp.cover_letter && (
                <div>
                  <div className="font-medium">Cover Letter:</div>
                  <p className="text-sm mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded">{selectedApp.cover_letter}</p>
                </div>
              )}
              {selectedApp.cv_url && (
                <div>
                  <a href={selectedApp.cv_url} target="_blank" rel="noopener noreferrer" className="text-secondary underline">Download CV</a>
                </div>
              )}
              {selectedApp.admin_notes && (
                <div><span className="font-medium">Admin Notes:</span> {selectedApp.admin_notes}</div>
              )}
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRecruitment;
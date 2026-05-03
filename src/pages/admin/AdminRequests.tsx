import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2 } from "lucide-react";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";

const statuses = ["pending", "assigned", "in_progress", "completed", "cancelled"];

const AdminRequests = () => {
  const [requests, setRequests] = useState<any[]>([]);
  const [staffList, setStaffList] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const { toast } = useToast();
  const perPage = 10;

  const fetchRequests = async () => {
    try {
      const data = await api.request("/admin/requests/");
      setRequests(data);
    } catch (err) {
      console.error("Failed to fetch requests", err);
      toast({ title: "Error loading requests", variant: "destructive" });
    }
  };

  const fetchStaffList = async () => {
    try {
      const data = await api.request("/admin/staff-list/");
      setStaffList(data);
    } catch (err) {
      console.error("Failed to fetch staff list", err);
    }
  };

  useEffect(() => {
    fetchRequests();
    fetchStaffList();
  }, []);

  const updateRequest = async (id: string, data: any) => {
    try {
      await api.request(`/service-requests/${id}/`, { method: "PATCH", body: JSON.stringify(data) });
      toast({ title: "Request updated" });
      fetchRequests();
    } catch (err) {
      toast({ title: "Failed to update", variant: "destructive" });
    }
  };

  const deleteRequest = async (id: string) => {
    if (!confirm("Are you sure you want to delete this request?")) return;
    try {
      await api.request(`/service-requests/${id}/`, { method: "DELETE" });
      toast({ title: "Request deleted" });
      fetchRequests();
    } catch (err) {
      toast({ title: "Failed to delete", variant: "destructive" });
    }
  };

  const paginated = requests.slice(page * perPage, (page + 1) * perPage);
  const totalPages = Math.ceil(requests.length / perPage);

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Service Requests ({requests.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assigned To</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map(r => (
                  <TableRow key={r.id}>
                    <TableCell>{r.user_email}</TableCell>
                    <TableCell className="capitalize">{r.service_type.replace(/_/g, " ")}</TableCell>
                    <TableCell>
                      <Select value={r.status} onValueChange={(val) => updateRequest(r.id, { status: val })}>
                        <SelectTrigger className="w-[130px] h-8"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {statuses.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Select value={r.assigned_to || "unassigned"} onValueChange={(val) => updateRequest(r.id, { assigned_to: val === "unassigned" ? null : val })}>
                        <SelectTrigger className="w-[150px] h-8"><SelectValue placeholder="Unassigned" /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unassigned">Unassigned</SelectItem>
                          {staffList.map(staff => (
                            <SelectItem key={staff.id} value={staff.id}>{staff.full_name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </TableCell>
                    <TableCell>{new Date(r.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" onClick={() => deleteRequest(r.id)} className="text-destructive">
                        <Trash2 size={16} />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {paginated.length === 0 && (
                  <TableRow><TableCell colSpan={6} className="text-center">No requests</TableCell></TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {totalPages > 1 && (
            <div className="flex justify-between mt-4">
              <Button variant="outline" disabled={page===0} onClick={()=>setPage(p=>p-1)}>Previous</Button>
              <span>Page {page+1} of {totalPages}</span>
              <Button variant="outline" disabled={page>=totalPages-1} onClick={()=>setPage(p=>p+1)}>Next</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminRequests;
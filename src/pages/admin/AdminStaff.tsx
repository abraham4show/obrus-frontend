import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";

const AdminStaff = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    api.request("/admin/staff-applications/").then(data => {
      setApplications(data);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const handleApprove = async (userId: number) => {
    await api.request(`/admin/staff-approve/${userId}/`, { method: "POST" });
    toast({ title: "Staff approved" });
    setApplications(prev => prev.filter(a => a.id !== userId));
  };

  const handleReject = async (userId: number) => {
    await api.request(`/admin/staff-reject/${userId}/`, { method: "POST" });
    toast({ title: "Staff rejected" });
    setApplications(prev => prev.filter(a => a.id !== userId));
  };

  if (loading) return <div>Loading staff applications...</div>;

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Staff Applications</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.map(app => (
                <TableRow key={app.id}>
                  <TableCell>{app.full_name}</TableCell>
                  <TableCell>{app.email}</TableCell>
                  <TableCell>{app.phone}</TableCell>
                  <TableCell>
                    <Button size="sm" onClick={() => handleApprove(app.id)} className="mr-2">Approve</Button>
                    <Button size="sm" variant="destructive" onClick={() => handleReject(app.id)}>Reject</Button>
                  </TableCell>
                </TableRow>
              ))}
              {applications.length === 0 && (
                <TableRow><TableCell colSpan={4}>No pending staff applications.</TableCell></TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};
export default AdminStaff;
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const AdminSettings = () => {
  const { user } = useAuth();

  return (
    <AdminLayout>
      <Card className="max-w-2xl">
        <CardHeader><CardTitle>Settings</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm text-muted-foreground">Admin Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Role</p>
            <p className="font-medium">Administrator</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">System</p>
            <p className="font-medium">OBRUS Apex Services Admin Panel v1.0</p>
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminSettings;


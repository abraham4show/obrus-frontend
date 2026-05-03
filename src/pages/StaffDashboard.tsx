import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { CheckCircle2, Clock, AlertCircle, LogOut, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/client";

const statusColors: Record<string, string> = {
  pending: "bg-yellow-100 text-yellow-700",
  assigned: "bg-blue-100 text-blue-700",
  in_progress: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
  cancelled: "bg-red-100 text-red-700",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  assigned: "Assigned",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (status === "completed") return <CheckCircle2 size={16} />;
  if (status === "in_progress" || status === "assigned") return <Clock size={16} />;
  return <AlertCircle size={16} />;
};

const StaffDashboard = () => {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tasks, setTasks] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
    // If user is not staff, redirect to client dashboard
    if (!loading && user) {
      const isStaff = user.roles?.some((r: any) => r.role === 'staff');
      if (!isStaff) {
        navigate("/dashboard");
      }
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      try {
        // Fetch tasks assigned to this staff member
        const tasksData = await api.request("/service-requests/assigned-to-me/");
        setTasks(Array.isArray(tasksData) ? tasksData : tasksData.results || []);
        // Fetch notifications
        const notifData = await api.request("/notifications/my-notifications/");
        setNotifications(Array.isArray(notifData) ? notifData : notifData.results || []);
      } catch (err) {
        console.error("Error fetching staff data:", err);
      }
    };
    fetchData();
  }, [user]);

  const updateTaskStatus = async (taskId: string, newStatus: string) => {
    setUpdating(taskId);
    try {
      await api.request(`/service-requests/${taskId}/`, {
        method: "PATCH",
        body: JSON.stringify({ status: newStatus }),
      });
      toast({ title: "Task updated", description: `Status changed to ${newStatus}` });
      // Refresh tasks
      const tasksData = await api.request("/service-requests/assigned-to-me/");
      setTasks(Array.isArray(tasksData) ? tasksData : tasksData.results || []);
    } catch (err: any) {
      toast({ title: "Update failed", description: err.message, variant: "destructive" });
    } finally {
      setUpdating(null);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
     <section className="pt-28 pb-6 bg-primary">
  <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
        Welcome back, {user.first_name} {user.last_name}!
      </h1>
      <p className="text-primary-foreground/70 text-sm mt-1">Role: Staff Member</p>
      <p className="text-primary-foreground/70 text-sm">Manage your assigned tasks</p>
    </motion.div>
    <Button variant="outline" size="sm" onClick={handleSignOut} className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
      <LogOut size={16} /> Sign Out
    </Button>
  </div>
</section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader><CardTitle>Assigned Tasks</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{tasks.length}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{notifications.length}</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Completed</CardTitle></CardHeader>
              <CardContent><p className="text-3xl font-bold">{tasks.filter(t => t.status === 'completed').length}</p></CardContent>
            </Card>
          </div>

          <h2 className="text-xl font-bold mb-4">Assigned Service Requests</h2>
          {tasks.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">No tasks assigned yet.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {tasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <p className="font-semibold capitalize">{task.service_type?.replace(/_/g, " ")}</p>
                        <p className="text-sm text-muted-foreground">Client: {task.full_name || task.user_email}</p>
                        <p className="text-sm text-muted-foreground">Location: {task.location}</p>
                        <p className="text-xs text-muted-foreground">Requested: {new Date(task.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={statusColors[task.status] || "bg-gray-100"}>
                          <StatusIcon status={task.status} />
                          <span className="ml-1">{statusLabels[task.status] || task.status}</span>
                        </Badge>
                        <Select
                          value={task.status}
                          onValueChange={(val) => updateTaskStatus(task.id, val)}
                          disabled={updating === task.id}
                        >
                          <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Update status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="assigned">Assigned</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          <h2 className="text-xl font-bold mt-8 mb-4">Notifications</h2>
          {notifications.length === 0 ? (
            <div className="bg-card border border-border rounded-lg p-8 text-center">
              <p className="text-muted-foreground">No notifications.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notif) => (
                <Card key={notif.id}>
                  <CardContent className="p-4">
                    <p className="font-medium">{notif.title}</p>
                    <p className="text-sm text-muted-foreground">{notif.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{new Date(notif.created_at).toLocaleString()}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default StaffDashboard;
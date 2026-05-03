import { useEffect, useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, ClipboardList, UserCheck, Briefcase, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/api/client"; // add this import

interface Stats {
  totalUsers: number;
  totalRequests: number;
  totalStaff: number;
  totalJobs: number;
  mostRequestedService: string;
  recentRequests: any[];
  recentApplications: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<Stats>({
    totalUsers: 0, totalRequests: 0, totalStaff: 0, totalJobs: 0,
    mostRequestedService: "N/A", recentRequests: [], recentApplications: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await api.request("/admin/stats/");
        setStats(data);
      } catch (error) {
        console.error("Error fetching admin stats:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  const cards = [
    { label: "Total Users", value: stats.totalUsers, icon: Users, color: "text-blue-600" },
    { label: "Service Requests", value: stats.totalRequests, icon: ClipboardList, color: "text-green-600" },
    { label: "Total Staff", value: stats.totalStaff, icon: UserCheck, color: "text-purple-600" },
    { label: "Job Applications", value: stats.totalJobs, icon: Briefcase, color: "text-orange-600" },
    { label: "Most Requested", value: stats.mostRequestedService, icon: TrendingUp, color: "text-secondary" },
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cards.map((card, i) => (
            <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">{card.label}</CardTitle>
                  <card.icon className={`h-5 w-5 ${card.color}`} />
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold font-heading capitalize">{card.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader><CardTitle className="text-lg">Recent Service Requests</CardTitle></CardHeader>
            <CardContent>
              {stats.recentRequests.length === 0 ? (
                <p className="text-muted-foreground text-sm">No requests yet.</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentRequests.map(r => (
                    <div key={r.id} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium capitalize">{r.service_type.replace(/_/g, " ")}</p>
                        <p className="text-muted-foreground text-xs">{r.user_email} · {new Date(r.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        r.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                        r.status === "in_progress" ? "bg-blue-100 text-blue-700" :
                        r.status === "completed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                      }`}>{r.status.replace(/_/g, " ")}</span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="text-lg">Recent Job Applications</CardTitle></CardHeader>
            <CardContent>
              {stats.recentApplications.length === 0 ? (
                <p className="text-muted-foreground text-sm">No applications yet.</p>
              ) : (
                <div className="space-y-2">
                  {stats.recentApplications.map(a => (
                    <div key={a.id} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                      <div>
                        <p className="font-medium">{a.full_name}</p>
                        <p className="text-muted-foreground text-xs">{a.position} · {new Date(a.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                        {a.status || "submitted"}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
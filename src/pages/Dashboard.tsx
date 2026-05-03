import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { motion } from "framer-motion";
import { ClipboardList, Briefcase, User, Bell, Clock, CheckCircle2, AlertCircle, LogOut, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/client";

const tabs = [
  { id: "requests", label: "My Service Requests", icon: ClipboardList },
  { id: "applications", label: "My Job Applications", icon: Briefcase },
  { id: "profile", label: "Profile Settings", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
];

const statusColors: Record<string, string> = {
  pending: "text-yellow-600 bg-yellow-50",
  in_progress: "text-blue-600 bg-blue-50",
  completed: "text-green-600 bg-green-50",
  cancelled: "text-red-600 bg-red-50",
  submitted: "text-yellow-600 bg-yellow-50",
  under_review: "text-blue-600 bg-blue-50",
  shortlisted: "text-green-600 bg-green-50",
  rejected: "text-red-600 bg-red-50",
  hired: "text-green-600 bg-green-50",
};

const statusLabels: Record<string, string> = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
  submitted: "Submitted",
  under_review: "Under Review",
  shortlisted: "Shortlisted",
  rejected: "Rejected",
  hired: "Hired",
};

const StatusIcon = ({ status }: { status: string }) => {
  if (["completed", "shortlisted", "hired"].includes(status)) return <CheckCircle2 size={14} />;
  if (["pending", "submitted", "under_review"].includes(status)) return <Clock size={14} />;
  return <AlertCircle size={14} />;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("requests");
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [requests, setRequests] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [profile, setProfile] = useState<{ full_name: string; phone: string; company_name: string }>({
    full_name: "",
    phone: "",
    company_name: "",
  });
  const [savingProfile, setSavingProfile] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // Service requests
        const reqData = await api.getMyServiceRequests();
        setRequests(Array.isArray(reqData) ? reqData : reqData?.results || []);

        // Job applications
        let appData: any = [];
        try {
          appData = await api.getMyJobApplications();
        } catch (err) {
          console.warn("Job applications not loaded:", err);
        }
        setApplications(Array.isArray(appData) ? appData : appData?.results || []);

        // Notifications
        await loadNotifications();

        // Profile
        const userData = await api.request("/auth/profile/");
        setProfile({
          full_name: `${userData.first_name || ""} ${userData.last_name || ""}`.trim(),
          phone: userData.phone || "",
          company_name: userData.company_name || "",
        });
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        toast({ title: "Error loading data", description: "Please refresh the page", variant: "destructive" });
      }
    };
    fetchData();
  }, [user, toast]);

  const loadNotifications = async () => {
    try {
      const notifData = await api.getMyNotifications();
      console.log("Notifications response:", notifData);
      setNotifications(Array.isArray(notifData) ? notifData : notifData?.results || []);
    } catch (err) {
      console.error("Error loading notifications:", err);
    }
  };

  const refreshNotifications = async () => {
    setRefreshing(true);
    await loadNotifications();
    toast({ title: "Notifications refreshed" });
    setRefreshing(false);
  };

  const handleSaveProfile = async () => {
    if (!user) return;
    setSavingProfile(true);
    try {
      const [firstName, lastName] = profile.full_name.split(" ");
      await api.request("/auth/profile/", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: firstName || "",
          last_name: lastName || "",
          phone: profile.phone,
        }),
      });
      toast({ title: "Profile updated!" });
    } catch (error: any) {
      toast({ title: "Failed to save profile", description: error.message, variant: "destructive" });
    } finally {
      setSavingProfile(false);
    }
  };

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  const unreadCount = notifications.filter((n) => !n.is_read).length;

  if (loading) return <div className="min-h-screen bg-background flex items-center justify-center"><p className="text-muted-foreground">Loading...</p></div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-6 bg-primary">
        <div className="container mx-auto px-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="font-heading text-2xl md:text-3xl font-bold text-primary-foreground">
              Welcome back, {user.first_name} {user.last_name}!
            </h1>
            <p className="text-primary-foreground/70 text-sm mt-1">
              Role: {user.roles?.find(r => r.role === 'admin') ? 'Administrator' : 
                     user.roles?.find(r => r.role === 'staff') ? 'Staff Member' : 'Client'}
            </p>
            <p className="text-primary-foreground/70 text-sm mt-1">Manage your requests and applications</p>
          </motion.div>
          <Button variant="outline" size="sm" onClick={handleSignOut} className="text-primary-foreground border-primary-foreground/30 hover:bg-primary-foreground/10">
            <LogOut size={16} /> Sign Out
          </Button>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id ? "bg-secondary text-secondary-foreground" : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
                {tab.id === "notifications" && unreadCount > 0 && (
                  <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">{unreadCount}</span>
                )}
              </button>
            ))}
          </div>

          {activeTab === "requests" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">Service Requests</h2>
                <Button variant="secondary" size="sm" asChild><a href="/request-service">New Request</a></Button>
              </div>
              {requests.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No service requests yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {requests.map((req) => (
                    <div key={req.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground capitalize">{req.service_type?.replace(/_/g, " ")}</p>
                        <p className="text-muted-foreground text-sm">{new Date(req.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[req.status] || ""}`}>
                        <StatusIcon status={req.status} />
                        {statusLabels[req.status] || req.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "applications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Job Applications</h2>
              {applications.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No job applications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {applications.map((app) => (
                    <div key={app.id} className="bg-card border border-border rounded-lg p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <p className="font-heading font-semibold text-foreground">{app.position}</p>
                        <p className="text-muted-foreground text-sm">Applied {new Date(app.created_at).toLocaleDateString()}</p>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusColors[app.status] || "bg-yellow-100 text-yellow-700"}`}>
                        <StatusIcon status={app.status || "submitted"} />
                        {statusLabels[app.status || "submitted"]}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <h2 className="font-heading text-xl font-bold text-foreground mb-6">Profile Settings</h2>
              <div className="bg-card border border-border rounded-lg p-8 space-y-4 max-w-lg">
                <div><Label>Full Name</Label><Input value={profile.full_name} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} /></div>
                <div><Label>Phone</Label><Input value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} /></div>
                <div><Label>Company Name</Label><Input value={profile.company_name} onChange={(e) => setProfile({ ...profile, company_name: e.target.value })} /></div>
                <div><Label>Email</Label><Input value={user.email || ""} disabled className="opacity-60" /></div>
                <Button variant="secondary" onClick={handleSaveProfile} disabled={savingProfile}>
                  {savingProfile ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "notifications" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-heading text-xl font-bold text-foreground">Notifications</h2>
                <Button variant="outline" size="sm" onClick={refreshNotifications} disabled={refreshing}>
                  <RefreshCw size={14} className="mr-1" /> {refreshing ? "Refreshing..." : "Refresh"}
                </Button>
              </div>
              {notifications.length === 0 ? (
                <div className="bg-card border border-border rounded-lg p-8 text-center">
                  <p className="text-muted-foreground">No notifications yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map((notif) => (
                    <div key={notif.id} className="bg-card border border-border rounded-lg p-5">
                      <p className="font-medium">{notif.title}</p>
                      <p className="text-muted-foreground text-sm">{notif.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{new Date(notif.created_at).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Dashboard;
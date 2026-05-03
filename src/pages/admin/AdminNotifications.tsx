import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";

const AdminNotifications = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const sendNotification = async () => {
    if (!title || !message) {
      toast({ title: "Please fill both title and message", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await api.request("/admin/notify-staff/", { method: "POST", body: JSON.stringify({ title, message }) });
      toast({ title: "Notification sent to all staff" });
      setTitle("");
      setMessage("");
    } catch (err) {
      toast({ title: "Error sending notification", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Notify Staff</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
          <Textarea placeholder="Message" rows={6} value={message} onChange={e => setMessage(e.target.value)} />
          <Button onClick={sendNotification} disabled={sending}>{sending ? "Sending..." : "Send to all staff"}</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default AdminNotifications;
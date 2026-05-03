import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { api } from "@/api/client";
import { useToast } from "@/hooks/use-toast";

const AdminMessages = () => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const sendBroadcast = async () => {
    if (!subject || !message) {
      toast({ title: "Please fill both subject and message", variant: "destructive" });
      return;
    }
    setSending(true);
    try {
      await api.request("/admin/broadcast/", { method: "POST", body: JSON.stringify({ subject, message }) });
      toast({ title: "Broadcast sent!" });
      setSubject("");
      setMessage("");
    } catch (err) {
      toast({ title: "Failed to send", variant: "destructive" });
    } finally {
      setSending(false);
    }
  };

  return (
    <AdminLayout>
      <Card>
        <CardHeader><CardTitle>Broadcast Message</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Input placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
          <Textarea rows={5} placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
          <Button onClick={sendBroadcast} disabled={sending}>{sending ? "Sending..." : "Send to all users"}</Button>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};
export default AdminMessages;
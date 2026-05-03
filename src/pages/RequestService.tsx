import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/api/client";

const RequestService = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    service_type: "facility",
    location: "",
    address: "",
    preferred_date: "",
    priority: "normal",
    quantity_size: "",
    budget_range: "",
    // Dynamic fields
    facility_sub_service: "",
    env_sub_service: "",
    role_needed: "",
    number_staff: 1,
    item_description: "",
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) || 0 });
  };

  const isStep1Valid = () => {
    return formData.location.trim() !== "" && formData.preferred_date !== "";
  };

  const isStep2Valid = () => {
    const service = formData.service_type;
    if (service === "facility") return formData.facility_sub_service !== "";
    if (service === "environmental") return formData.env_sub_service !== "";
    if (service === "manpower") return formData.role_needed.trim() !== "" && formData.number_staff > 0;
    if (service === "equipment") return formData.item_description.trim() !== "";
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);
    try {
      // Build service_details object
      const serviceDetails: any = {
        address: formData.address,
        preferred_date: formData.preferred_date,
        priority: formData.priority,
        quantity_size: formData.quantity_size,
        budget_range: formData.budget_range,
      };
      if (formData.service_type === "facility") {
        serviceDetails.sub_service = formData.facility_sub_service;
      } else if (formData.service_type === "environmental") {
        serviceDetails.sub_service = formData.env_sub_service;
      } else if (formData.service_type === "manpower") {
        serviceDetails.role_needed = formData.role_needed;
        serviceDetails.number_staff = formData.number_staff;
      } else if (formData.service_type === "equipment") {
        serviceDetails.item_description = formData.item_description;
      }

      const payload = {
        full_name: `${user.first_name} ${user.last_name}`.trim(),
        phone: user.phone || 'Not provided',        
        email: user.email,
        service_type: formData.service_type,
        location: formData.location,
        service_details: serviceDetails,
      };

      await api.createServiceRequest(payload);
      toast({ title: "Success!", description: "Your service request has been submitted." });
      navigate("/dashboard");
    } catch (err: any) {
      toast({ title: "Submission failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) return <div className="p-8 text-center">Loading...</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-16 bg-primary">
        <div className="container mx-auto px-4">
          <BackButton label="Go Back" />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-3xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">Request a Service</h1>
            <p className="text-primary-foreground/70 text-lg">Fill the form. Our team will respond within 24 hours.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-2xl">
          <form onSubmit={step === 1 ? (e) => { e.preventDefault(); if (isStep1Valid()) setStep(2); } : handleSubmit} className="bg-card border border-border rounded-lg p-8 space-y-4">
            {step === 1 && (
              <>
                <div><Label>Location (State/City) *</Label><Input name="location" value={formData.location} onChange={handleChange} required /></div>
                <div><Label>Address (optional)</Label><Textarea name="address" value={formData.address} onChange={handleChange} /></div>
                <div><Label>Preferred Date *</Label><Input type="date" name="preferred_date" value={formData.preferred_date} onChange={handleChange} required /></div>
                <div><Label>Priority *</Label>
                  <Select value={formData.priority} onValueChange={(v) => handleSelectChange("priority", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="normal">Normal</SelectItem><SelectItem value="urgent">Urgent</SelectItem></SelectContent>
                  </Select>
                </div>
                <div><Label>Quantity / Size</Label><Input name="quantity_size" value={formData.quantity_size} onChange={handleChange} /></div>
                <div><Label>Budget Range (optional)</Label><Input name="budget_range" value={formData.budget_range} onChange={handleChange} /></div>
                <div className="flex justify-end"><Button type="button" variant="secondary" onClick={() => setStep(2)} disabled={!isStep1Valid()}>Next</Button></div>
              </>
            )}

            {step === 2 && (
              <>
                <div><Label>Service Type *</Label>
                  <Select value={formData.service_type} onValueChange={(v) => handleSelectChange("service_type", v)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="facility">Facility Management</SelectItem>
                      <SelectItem value="environmental">Environmental Services</SelectItem>
                      <SelectItem value="manpower">Manpower Recruitment</SelectItem>
                      <SelectItem value="equipment">Equipment Procurement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {formData.service_type === "facility" && (
                  <div><Label>Sub-Service *</Label>
                    <Select value={formData.facility_sub_service} onValueChange={(v) => handleSelectChange("facility_sub_service", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cleaning">Cleaning</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                        <SelectItem value="hvac">HVAC Servicing</SelectItem>
                        <SelectItem value="electrical_plumbing">Electrical / Plumbing</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.service_type === "environmental" && (
                  <div><Label>Sub-Service *</Label>
                    <Select value={formData.env_sub_service} onValueChange={(v) => handleSelectChange("env_sub_service", v)}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fumigation">Fumigation</SelectItem>
                        <SelectItem value="waste">Waste Management</SelectItem>
                        <SelectItem value="pest">Pest Control</SelectItem>
                        <SelectItem value="inspection">Environmental Inspection</SelectItem>
                        <SelectItem value="sanitation">Sanitation Services</SelectItem>
                        <SelectItem value="fire_safety">Fire Safety Services</SelectItem>
                        <SelectItem value="civil">Civil Works / Civil Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {formData.service_type === "manpower" && (
                  <>
                    <div><Label>Role Needed *</Label><Input name="role_needed" value={formData.role_needed} onChange={handleChange} required /></div>
                    <div><Label>Number of Staff *</Label><Input type="number" name="number_staff" value={formData.number_staff} onChange={handleNumberChange} min="1" required /></div>
                    {/* CV upload removed */}
                  </>
                )}

                {formData.service_type === "equipment" && (
                  <>
                    <div><Label>Item Description *</Label><Textarea name="item_description" value={formData.item_description} onChange={handleChange} required /></div>
                    {/* Document upload removed */}
                  </>
                )}

                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                  <Button type="submit" variant="secondary" disabled={!isStep2Valid() || submitting}>
                    {submitting ? "Submitting..." : "Submit Request"}
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RequestService;
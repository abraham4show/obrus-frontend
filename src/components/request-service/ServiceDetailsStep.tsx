import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { facilitySubServices, environmentalSubServices, nigerianStates, priorityLevels } from "./serviceConfig";

interface Props {
  serviceType: string;
  fields: Record<string, string>;
  updateField: (key: string, value: string) => void;
  cvFile: File | null;
  setCvFile: (f: File | null) => void;
  docFile: File | null;
  setDocFile: (f: File | null) => void;
}

const ServiceDetailsStep = ({ serviceType, fields, updateField, cvFile, setCvFile, docFile, setDocFile }: Props) => (
  <div className="space-y-5">
    <h2 className="font-heading text-xl font-bold text-foreground mb-4">Service Details</h2>

    {serviceType === "manpower" && (
      <>
        <div>
          <Label>Role Needed *</Label>
          <Input placeholder="e.g. HVAC Technician, Electrician" value={fields.roleNeeded || ""} onChange={(e) => updateField("roleNeeded", e.target.value)} />
        </div>
        <div>
          <Label>Number of Staff Required</Label>
          <Input type="number" min="1" placeholder="e.g. 5" value={fields.staffCount || ""} onChange={(e) => updateField("staffCount", e.target.value)} />
        </div>
        <div>
          <Label>Duration</Label>
          <RadioGroup value={fields.duration || ""} onValueChange={(v) => updateField("duration", v)} className="flex gap-4 mt-2">
            <div className="flex items-center space-x-2"><RadioGroupItem value="short-term" id="short" /><Label htmlFor="short">Short-term</Label></div>
            <div className="flex items-center space-x-2"><RadioGroupItem value="long-term" id="long" /><Label htmlFor="long">Long-term</Label></div>
          </RadioGroup>
        </div>
        <div>
          <Label>Upload CV (PDF/DOC)</Label>
          <Input type="file" accept=".pdf,.doc,.docx" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="cursor-pointer" />
          {cvFile && <p className="text-sm text-muted-foreground mt-1">Selected: {cvFile.name}</p>}
        </div>
      </>
    )}

    {serviceType === "facility" && (
      <>
        <div>
          <Label>Sub-Service *</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {facilitySubServices.map((t) => (
              <label key={t} className={`flex items-center gap-2 p-2.5 border rounded-md text-sm cursor-pointer transition-colors ${fields.subService === t ? "border-secondary bg-secondary/5 text-foreground" : "border-border text-muted-foreground hover:border-secondary/40"}`}>
                <input type="radio" name="subService" value={t} checked={fields.subService === t} onChange={() => updateField("subService", t)} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label>Type of Building</Label>
          <RadioGroup value={fields.facilityType || ""} onValueChange={(v) => updateField("facilityType", v)} className="flex flex-wrap gap-4 mt-2">
            {["Office", "Estate", "Industrial", "Residential"].map((t) => (
              <div key={t} className="flex items-center space-x-2"><RadioGroupItem value={t.toLowerCase()} id={`ft-${t}`} /><Label htmlFor={`ft-${t}`}>{t}</Label></div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Additional Details</Label>
          <Textarea placeholder="Describe what you need..." value={fields.additionalDetails || ""} onChange={(e) => updateField("additionalDetails", e.target.value)} />
        </div>
      </>
    )}

    {serviceType === "environmental" && (
      <>
        <div>
          <Label>Sub-Service *</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {environmentalSubServices.map((t) => (
              <label key={t} className={`flex items-center gap-2 p-2.5 border rounded-md text-sm cursor-pointer transition-colors ${fields.subService === t ? "border-secondary bg-secondary/5 text-foreground" : "border-border text-muted-foreground hover:border-secondary/40"}`}>
                <input type="radio" name="envSubService" value={t} checked={fields.subService === t} onChange={() => updateField("subService", t)} className="sr-only" />
                {t}
              </label>
            ))}
          </div>
        </div>
        <div>
          <Label>Frequency</Label>
          <RadioGroup value={fields.frequency || ""} onValueChange={(v) => updateField("frequency", v)} className="flex flex-wrap gap-4 mt-2">
            {["One-time", "Weekly", "Monthly"].map((f) => (
              <div key={f} className="flex items-center space-x-2"><RadioGroupItem value={f.toLowerCase()} id={`ef-${f}`} /><Label htmlFor={`ef-${f}`}>{f}</Label></div>
            ))}
          </RadioGroup>
        </div>
        <div>
          <Label>Quantity / Size</Label>
          <Input placeholder="e.g. 500 sqm, 3 buildings" value={fields.quantity || ""} onChange={(e) => updateField("quantity", e.target.value)} />
        </div>
      </>
    )}

    {serviceType === "equipment" && (
      <>
        <div>
          <Label>Item Description *</Label>
          <Textarea placeholder="Describe the equipment or items needed" value={fields.itemDescription || ""} onChange={(e) => updateField("itemDescription", e.target.value)} />
        </div>
        <div>
          <Label>Quantity</Label>
          <Input type="number" min="1" placeholder="e.g. 10" value={fields.quantity || ""} onChange={(e) => updateField("quantity", e.target.value)} />
        </div>
        <div>
          <Label>Upload Supporting Document (optional)</Label>
          <Input type="file" accept=".pdf,.doc,.docx,.xlsx,.xls" onChange={(e) => setDocFile(e.target.files?.[0] || null)} className="cursor-pointer" />
          {docFile && <p className="text-sm text-muted-foreground mt-1">Selected: {docFile.name}</p>}
        </div>
      </>
    )}

    <hr className="border-border" />

    {/* Common fields */}
    <div>
      <Label>State *</Label>
      <select
        value={fields.state || ""}
        onChange={(e) => updateField("state", e.target.value)}
        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      >
        <option value="">Select a state</option>
        {nigerianStates.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    </div>
    <div>
      <Label>City</Label>
      <Input placeholder="e.g. Port Harcourt" value={fields.city || ""} onChange={(e) => updateField("city", e.target.value)} />
    </div>
    <div>
      <Label>Address (optional)</Label>
      <Input placeholder="Street address" value={fields.address || ""} onChange={(e) => updateField("address", e.target.value)} />
    </div>
    <div>
      <Label>Preferred Service Date</Label>
      <Input type="date" value={fields.preferredDate || ""} onChange={(e) => updateField("preferredDate", e.target.value)} />
    </div>
    <div>
      <Label>Priority Level</Label>
      <RadioGroup value={fields.priority || "normal"} onValueChange={(v) => updateField("priority", v)} className="flex gap-4 mt-2">
        {priorityLevels.map((p) => (
          <div key={p.value} className="flex items-center space-x-2">
            <RadioGroupItem value={p.value} id={`pr-${p.value}`} />
            <Label htmlFor={`pr-${p.value}`} className={p.value === "urgent" ? "text-destructive font-medium" : ""}>{p.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
    <div>
      <Label>Budget Range (optional)</Label>
      <Input placeholder="e.g. ₦500,000 - ₦1,000,000" value={fields.budget || ""} onChange={(e) => updateField("budget", e.target.value)} />
    </div>
  </div>
);

export default ServiceDetailsStep;

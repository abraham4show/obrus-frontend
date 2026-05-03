import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { serviceTypes } from "./serviceConfig";

interface Props {
  serviceType: string;
  setServiceType: (v: string) => void;
  clientType: string;
  setClientType: (v: string) => void;
  fullName: string;
  setFullName: (v: string) => void;
  email: string;
  setEmail: (v: string) => void;
  phone: string;
  setPhone: (v: string) => void;
  companyName: string;
  setCompanyName: (v: string) => void;
  contactPerson: string;
  setContactPerson: (v: string) => void;
}

const ServiceTypeStep = ({
  serviceType, setServiceType,
  clientType, setClientType,
  fullName, setFullName,
  email, setEmail,
  phone, setPhone,
  companyName, setCompanyName,
  contactPerson, setContactPerson,
}: Props) => (
  <div className="space-y-6">
    <div>
      <h2 className="font-heading text-xl font-bold text-foreground mb-4">Your Information</h2>
      <div className="space-y-4">
        <div>
          <Label>Full Name *</Label>
          <Input placeholder="Your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div>
          <Label>Email Address *</Label>
          <Input type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <Label>Phone Number *</Label>
          <Input type="tel" placeholder="+234..." value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
      </div>
    </div>

    <div>
      <Label className="text-base font-semibold">Client Type *</Label>
      <RadioGroup value={clientType} onValueChange={setClientType} className="flex gap-4 mt-2">
        <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-secondary/40 transition-colors flex-1">
          <RadioGroupItem value="individual" id="ct-ind" />
          <Label htmlFor="ct-ind" className="cursor-pointer flex-1">Individual</Label>
        </div>
        <div className="flex items-center space-x-2 p-3 border border-border rounded-md hover:border-secondary/40 transition-colors flex-1">
          <RadioGroupItem value="company" id="ct-comp" />
          <Label htmlFor="ct-comp" className="cursor-pointer flex-1">Company</Label>
        </div>
      </RadioGroup>
    </div>

    {clientType === "company" && (
      <div className="space-y-4 pl-1 border-l-2 border-secondary/30 ml-2 pl-4">
        <div>
          <Label>Company Name *</Label>
          <Input placeholder="Your company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
        <div>
          <Label>Contact Person</Label>
          <Input placeholder="Person to contact" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} />
        </div>
      </div>
    )}

    <div>
      <h2 className="font-heading text-xl font-bold text-foreground mb-4">Select Service *</h2>
      <RadioGroup value={serviceType} onValueChange={setServiceType} className="space-y-3">
        {serviceTypes.map((s) => (
          <div key={s.value} className="flex items-center space-x-3 p-3 border border-border rounded-md hover:border-secondary/40 transition-colors">
            <RadioGroupItem value={s.value} id={s.value} />
            <Label htmlFor={s.value} className="cursor-pointer flex-1">{s.label}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  </div>
);

export default ServiceTypeStep;

import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import logo from "@/assets/logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground pt-14 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
          <div>
            <img src={logo} alt="Obrus Apex Services" className="h-12 w-auto mb-4 rounded" />
            <p className="text-primary-foreground/60 text-sm leading-relaxed">
              Reliable Solutions. Peak Performance. Trusted services across Nigeria.
            </p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "About Us", to: "/about" },
                { label: "Services", to: "/services" },
                { label: "Projects", to: "/projects" },
                { label: "Jobs", to: "/jobs" },
                { label: "Request a Quote", to: "/request-service" },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Services</h4>
            <div className="flex flex-col gap-2">
              {[
                { label: "Manpower Recruitment", to: "/services/manpower" },
                { label: "Facility Management", to: "/services/facility-management" },
                { label: "Environmental Services", to: "/services/environmental-services" },
                { label: "Equipment Procurement", to: "/services/equipment-procurement" },
              ].map((s) => (
                <Link
                  key={s.to}
                  to={s.to}
                  className="text-primary-foreground/60 text-sm hover:text-secondary transition-colors"
                >
                  {s.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+2348078747510" className="flex items-center gap-2 text-primary-foreground/60 text-sm hover:text-secondary transition-colors">
                <Phone size={14} /> +234 807 874 7510
              </a>
              <a href="mailto:info@obrusApex.com.ng" className="flex items-center gap-2 text-primary-foreground/60 text-sm hover:text-secondary transition-colors">
                <Mail size={14} /> info@obrusApex.com.ng
              </a>
              <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                <MapPin size={14} /> Elelewon, Port Harcourt, Nigeria
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 pt-6 text-center">
          <p className="text-primary-foreground/40 text-xs">
            © {new Date().getFullYear()} Obrus Apex Services. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

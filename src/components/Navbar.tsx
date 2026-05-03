import { useState } from "react";
import { Menu, X, LogIn, User, LogOut, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.jpeg";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Jobs", to: "/jobs" },
  { label: "Careers", to: "/careers" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // Use 'logout' instead of 'signOut'

  // Compute isAdmin from user roles
  const isAdmin = user?.roles?.some((role) => role.role === 'admin') || false;

  const handleSignOut = async () => {
    await logout();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Obrus Apex Services" className="h-10 w-auto" />
        </Link>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors ${
                location.pathname === link.to ? "text-secondary" : "text-foreground/70 hover:text-secondary"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/request-service"
            className="bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Get a Quote
          </Link>
          {user ? (
            <>
              {isAdmin && (
                <Link to="/admin" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-secondary transition-colors">
                  <Shield size={16} /> Admin
                </Link>
              )}
              <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-secondary transition-colors">
                <User size={16} /> Dashboard
              </Link>
              <button onClick={handleSignOut} className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-secondary transition-colors">
                <LogOut size={16} /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground/70 hover:text-secondary transition-colors">
              <LogIn size={16} /> Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="flex flex-col gap-3 p-6">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`font-medium transition-colors py-1 ${
                    location.pathname === link.to ? "text-secondary" : "text-foreground hover:text-secondary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/request-service"
                onClick={() => setOpen(false)}
                className="bg-secondary text-secondary-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center mt-2"
              >
                Get a Quote
              </Link>
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      to="/admin"
                      onClick={() => setOpen(false)}
                      className="inline-flex items-center justify-center gap-1.5 bg-primary text-primary-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
                    >
                      <Shield size={16} /> Admin Panel
                    </Link>
                  )}
                  <Link
                    to="/dashboard"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center gap-1.5 border border-border text-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
                  >
                    <User size={16} /> Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleSignOut();
                      setOpen(false);
                    }}
                    className="inline-flex items-center justify-center gap-1.5 border border-border text-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center justify-center gap-1.5 border border-border text-foreground px-5 py-2.5 rounded-md text-sm font-semibold text-center"
                >
                  <LogIn size={16} /> Login / Sign Up
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
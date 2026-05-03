import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackButton from "@/components/BackButton";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useEffect } from "react";


const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUp, user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if already logged in
 useEffect(() => {
  if (user) {
    navigate("/dashboard", { replace: true });
  }
}, [user, navigate]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (!firstName || !lastName || !email || !password || !confirmPassword) {
    toast({ title: "Please fill all required fields", variant: "destructive" });
    return;
  }

  if (password !== confirmPassword) {
    toast({ title: "Passwords do not match", variant: "destructive" });
    return;
  }

  if (password.length < 8) {  // backend requires min 8 chars
    toast({ title: "Password must be at least 8 characters", variant: "destructive" });
    return;
  }

  setLoading(true);

  const userData = {
    username: email,  // using email as username
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone: phone || "",
    password: password,
    password_confirm: confirmPassword,
  };

  try {
    await signUp(userData);
    toast({ title: "Account created!", description: "You are now logged in. Redirecting..." });
    setTimeout(() => navigate("/dashboard"), 1500);
  } catch (error: any) {
    toast({ title: "Sign up failed", description: error.message, variant: "destructive" });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <section className="pt-28 pb-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto"><BackButton /></div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-md mx-auto"
          >
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-md bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <UserPlus className="w-7 h-7 text-secondary" />
              </div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
                Create an Account
              </h1>
              <p className="text-muted-foreground text-sm">
                Sign up to apply for jobs, request services, and manage your profile.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-8 space-y-4">
              <GoogleSignInButton />

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <form className="space-y-4" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>First Name *</Label>
                    <Input
                      type="text"
                      required
                      placeholder="John"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label>Last Name *</Label>
                    <Input
                      type="text"
                      required
                      placeholder="Doe"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Email *</Label>
                  <Input
                    type="email"
                    required
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Phone</Label>
                  <Input
                    type="tel"
                    placeholder="+234..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Password *</Label>
                  <Input
                    type="password"
                    required
                    placeholder="Create a password (min 6 characters)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div>
                  <Label>Confirm Password *</Label>
                  <Input
                    type="password"
                    required
                    placeholder="Confirm your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" variant="secondary" className="w-full" disabled={loading}>
                  {loading ? "Creating account..." : "Create Account"}
                </Button>
                <p className="text-center text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-secondary font-medium hover:underline">
                    Log in
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default SignUp;
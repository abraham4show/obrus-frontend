import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const { signIn, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();



const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!email || !password) {
    toast({ title: "Please fill all fields", variant: "destructive" });
    return;
  }
  setLoading(true);
  try {
    await signIn(email, password);
    // No need to redirect here – the useEffect will handle it
  } catch (error: any) {
    toast({ title: "Login failed", description: error.message, variant: "destructive" });
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  if (!authLoading && user) {
    let userType = 'client';
    if (user.roles && user.roles.length > 0) {
      const roles = user.roles.map((r: any) => r.role);
      if (roles.includes('admin')) userType = 'admin';
      else if (roles.includes('staff')) userType = 'staff';
    }
    if (userType === 'admin') navigate('/admin', { replace: true });
    else if (userType === 'staff') navigate('/staff', { replace: true });
    else navigate('/dashboard', { replace: true });
  }
}, [user, authLoading, navigate]);

const handleGoogleSignIn = () => {
  const backendUrl = import.meta.env.VITE_API_URL?.replace('/api', '') || 'https://obrus-backend.onrender.com';
  window.location.href = `${backendUrl}/accounts/google/login/`;
};

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <section className="pt-28 pb-20 bg-muted min-h-[80vh] flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            <BackButton />
          </div>
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.6 }} 
            className="max-w-md mx-auto"
          >
            <div className="bg-card border border-border rounded-lg p-8 shadow-sm">
              <div className="text-center mb-8">
                <LogIn className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h1 className="font-heading text-2xl font-bold text-foreground mb-2">Welcome Back</h1>
                <p className="text-muted-foreground text-sm">Sign in to your account</p>
              </div>

              <Button
                type="button"
                variant="outline"
                className="w-full mb-4 flex items-center justify-center gap-2"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
              >
                {googleLoading ? "Signing in..." : "Continue with Google"}
              </Button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">or</span>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email" 
                    placeholder="you@example.com" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                    className="bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password"
                    type="password" 
                    placeholder="••••••••" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                    className="bg-background"
                  />
                </div>
                <div className="text-right">
                  <Link to="/forgot-password" title="Forgot Password" className="text-sm text-secondary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <Button 
                  type="submit" 
                  variant="secondary" 
                  className="w-full" 
                  disabled={loading || authLoading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
              <p className="text-center text-muted-foreground text-sm mt-6">
                Don't have an account?{" "}
                <Link to="/signup" className="text-secondary font-medium hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Login;

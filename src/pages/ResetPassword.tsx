import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const ResetPassword = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Reset Password</h1>
        <p className="text-muted-foreground mb-6">Use the link you received in your email. If you need a new reset link, go to the Forgot Password page.</p>
        <Link to="/forgot-password" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md inline-block">Request New Link</Link>
      </div>
      <Footer />
    </div>
  );
};
export default ResetPassword;
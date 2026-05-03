import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-20 max-w-md">
        <h1 className="text-2xl font-bold mb-4">Forgot Password</h1>
        <p className="text-muted-foreground mb-6">Please use the link below to reset your password via Django allauth.</p>
        <a href="http://127.0.0.1:8000/accounts/password/reset/" target="_blank" rel="noopener noreferrer" className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md inline-block">
          Go to Password Reset Page
        </a>
        <p className="mt-4 text-sm"><Link to="/login" className="text-secondary">Back to Login</Link></p>
      </div>
      <Footer />
    </div>
  );
};
export default ForgotPassword;
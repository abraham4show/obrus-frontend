import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const BackButton = ({ label = "Back" }: { label?: string }) => {
  const navigate = useNavigate();
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className="mb-4 text-muted-foreground hover:text-foreground"
    >
      <ArrowLeft size={16} className="mr-1" /> {label}
    </Button>
  );
};

export default BackButton;

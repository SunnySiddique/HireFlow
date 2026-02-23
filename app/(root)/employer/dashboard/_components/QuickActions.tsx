import { Card } from "@/components/ui/card";
import {
  BarChart2,
  Building2,
  Mail,
  PlusCircle,
  Settings,
  Users,
} from "lucide-react";

const QuickActions = () => {
  return (
    <>
      <div>
        <h3 className="text-xs lg:text-sm font-bold text-foreground mb-3 lg:mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-2 lg:gap-3">
          {" "}
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <PlusCircle className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Post Job</p>
          </Card>
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <Users className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Applicants</p>
          </Card>
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <Building2 className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Profile</p>
          </Card>
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <Mail className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Messages</p>
          </Card>
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <BarChart2 className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Analytics</p>
          </Card>
          <Card className="p-3 lg:p-4 bg-background border border-border text-center hover:border-primary cursor-pointer transition">
            <Settings className="w-5 lg:w-6 h-5 lg:h-6 text-primary mx-auto mb-1 lg:mb-2" />
            <p className="text-xs font-medium text-foreground">Settings</p>
          </Card>
        </div>
      </div>
    </>
  );
};

export default QuickActions;

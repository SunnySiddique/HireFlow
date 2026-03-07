import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  Clock,
  Download,
  Search,
  Users,
  XCircle,
} from "lucide-react";

const ApplicantsSearchBar = () => {
  return (
    <>
      <div className="pb-3 sm:pb-4 md:pb-5 lg:pb-6 px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center">
          <div className="relative w-full sm:w-auto flex-1 max-w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search applicants..."
              className="w-full pl-10 sm:pl-11 text-sm"
            />
          </div>

          <div className="w-full sm:w-auto flex flex-col sm:flex-row sm:items-center gap-2">
            <Select defaultValue="All">
              <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>

                <SelectItem value="Pending">
                  <span className="flex items-center gap-2">
                    <Clock className="w-3 h-3" /> Pending
                  </span>
                </SelectItem>

                <SelectItem value="Reviewing">
                  <span className="flex items-center gap-2">
                    <Users className="w-3 h-3" /> Reviewing
                  </span>
                </SelectItem>

                <SelectItem value="Shortlisted">
                  <span className="flex items-center gap-2">
                    <CheckCircle className="w-3 h-3" /> Shortlisted
                  </span>
                </SelectItem>

                <SelectItem value="Rejected">
                  <span className="flex items-center gap-2">
                    <XCircle className="w-3 h-3" /> Rejected
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>

            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground text-sm gap-2">
              <Download className="w-4 h-4" />
              <span className="sm:hidden md:inline">Export</span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicantsSearchBar;

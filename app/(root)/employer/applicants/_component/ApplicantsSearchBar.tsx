import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle, Clock, Search, Users, XCircle } from "lucide-react";

interface ApplicantsSearchBarProps {
  filters: { search: string; status: string };
  setFilters: (filters: { search: string; status: string }) => void;
}

const ApplicantsSearchBar = ({
  filters,
  setFilters,
}: ApplicantsSearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 items-start sm:items-center flex-1 w-full">
      <div className="relative w-full sm:flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          type="text"
          placeholder="Search applicants..."
          className="w-full pl-10 sm:pl-11 text-sm"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
        />
      </div>

      <div className="w-full sm:w-auto flex gap-2">
        <Select
          defaultValue="all"
          value={filters.status}
          onValueChange={(val) => setFilters({ ...filters, status: val })}
        >
          <SelectTrigger className="w-full sm:w-[140px] md:w-[160px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>

            <SelectItem value="pending">
              <span className="flex items-center gap-2">
                <Clock className="w-3 h-3" /> Pending
              </span>
            </SelectItem>

            <SelectItem value="reviewing">
              <span className="flex items-center gap-2">
                <Users className="w-3 h-3" /> Reviewing
              </span>
            </SelectItem>

            <SelectItem value="shortlisted">
              <span className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3" /> Shortlisted
              </span>
            </SelectItem>

            <SelectItem value="rejected">
              <span className="flex items-center gap-2">
                <XCircle className="w-3 h-3" /> Rejected
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default ApplicantsSearchBar;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EmployerSearchFilter = ({
  filters,
  onFilterChange,
}: {
  onFilterChange: (type: string, value: string) => void;
  filters: { search: string; status: string; type: string };
}) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Status
        </label>
        <Select
          value={filters.status}
          onValueChange={(value) => onFilterChange("status", value)}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending_confirm">
              Pending Confirmation
            </SelectItem>
            <SelectItem value="upcoming">Upcoming</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Type
        </label>
        <Select
          value={filters.type}
          onValueChange={(value) => onFilterChange("type", value)}
        >
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="zoom">Zoom</SelectItem>
            <SelectItem value="google_meet">Google Meet</SelectItem>
            <SelectItem value="ms_teams">MS Teams</SelectItem>
            <SelectItem value="phone">Phone</SelectItem>
            <SelectItem value="in_person">In Person</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default EmployerSearchFilter;

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFilterProps {
  statusFilter: string;
  typeFilter: string;
  onStatusChange: (value: string) => void;
  onTypeChange: (value: string) => void;
}

const EmployerSearchFilter = (
  {
    // statusFilter,
    // typeFilter,
    // onStatusChange,
    // onTypeChange,
  },
) => {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-end">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Status
        </label>
        <Select>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="In Progress">In Progress</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Type
        </label>
        <Select>
          <SelectTrigger className="w-full md:w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Types</SelectItem>
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

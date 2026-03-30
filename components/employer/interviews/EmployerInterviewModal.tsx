import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DURATION_OPTIONS } from "@/constants/InterviewsData";
import { MapPin, Phone, Video } from "lucide-react";

// candidtae object
// {
//   id: "1",
//   candidateName: "Alice Johnson",
//   interviewType: "zoom",
//   date: "2024-04-15",
//   time: "10:00",
//   duration: "1 hour",
//   status: "Scheduled",
//   meetingLink: "https://zoom.us/j/123456789",
//   interviewerName: "John Smith",
//   interviewerTitle: "Senior Engineer",
//   message: "Looking forward to discussing your experience with React.",
//   notes:
//     "Strong background in frontend development. Previously worked at TechCorp.",
//   feedback: "",
// },

interface Candidate {
  id: string;
  candidateName: string;
  interviewType: string;
  date: string;
  time: string;
  duration: string;
  status: "Scheduled" | "In Progress" | "Completed" | "Cancelled";
  meetingLink: string;
  interviewerName: string;
  interviewerTitle: string;
  message: string;
  notes: string;
  feedback: string;
}

interface EmployerInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  isView: boolean;
  interview?: Candidate;
}

const EmployerInterviewModal = ({
  isOpen,
  onClose,
  isView,
  interview,
}: EmployerInterviewModalProps) => {
  console.log(interview);
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card text-card-foreground">
        <DialogHeader className="px-6 py-4 border-b border-border bg-card">
          <DialogTitle className="text-xl">Schedule Interview</DialogTitle>
          <DialogDescription>
            Set up an interview with Jane Doe for the Senior Frontend Engineer
            role.
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Title & Interviewer */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Interview Title
              </label>
              <Input defaultValue="Technical Interview - Frontend" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Interviewer Name
              </label>
              <Input placeholder="e.g. James Cho" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Interviewer Title
              </label>
              <Input placeholder="e.g. Senior Engineer" />
            </div>
          </div>

          <hr className="border-border" />

          {/* Interview Type */}
          {!isView && (
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-2">
                Interview Type
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {[
                  { name: "Zoom", icon: <Video className="w-4 h-4" /> },
                  { name: "Google Meet", icon: <Video className="w-4 h-4" /> },
                  { name: "MS Teams", icon: <Video className="w-4 h-4" /> },
                  { name: "Phone", icon: <Phone className="w-4 h-4" /> },
                  { name: "In Person", icon: <MapPin className="w-4 h-4" /> },
                ].map((type) => (
                  <button
                    key={type.name}
                    type="button"
                    className="flex flex-col items-center justify-center gap-1 rounded-md border border-border bg-card text-card-foreground px-2 py-1 text-xs hover:bg-muted/50 hover:shadow-sm"
                  >
                    {type.icon}
                    <span className="text-[10px] text-center">{type.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
          {/* Date, Time, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Date
              </label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Time
              </label>
              <Input type="time" />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Duration
              </label>
              <Select defaultValue="60 min">
                <SelectTrigger>
                  <SelectValue placeholder="Select Duration" />
                </SelectTrigger>
                <SelectContent>
                  {DURATION_OPTIONS.map((duration) => (
                    <SelectItem key={duration} value={`${duration} min`}>
                      {duration} min
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Meeting Link
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Video className="h-4 w-4 text-muted-foreground" />
              </div>
              <Input
                className="pl-10"
                type="url"
                placeholder="https://meet.google.com/..."
              />
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              A calendar invitation will be sent with this link.
            </p>
          </div>

          <hr className="border-border" />

          {/* Instructions */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Instructions for Candidate
            </label>
            <Textarea
              rows={3}
              placeholder="E.g., Please prepare a 5-minute presentation on a recent project..."
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-card border-t border-border flex justify-end gap-3">
          <DialogClose>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button>{isView ? "Save Changes" : "Send Invite"}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployerInterviewModal;

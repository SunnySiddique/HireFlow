import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useSendInterviewInvite } from "@/hooks/useInterview";
import { Interview } from "@/types/interview";
import { CalendarDays, Clock, MapPin, Phone, Timer, Video } from "lucide-react";
import { ChangeEvent, useState } from "react";
import toast from "react-hot-toast";

interface EmployerInterviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  isView: boolean;
  interview?: Interview;
  seekerId?: string;
  applicationId?: string;
  seekerName?: string;
}

const EmployerInterviewModal = ({
  isOpen,
  onClose,
  isView,
  interview,
  seekerId,
  applicationId,
  seekerName,
}: EmployerInterviewModalProps) => {
  const {
    mutateAsync: sendInterviewInvite,
    isPending: isSendInterviewSending,
  } = useSendInterviewInvite();

  const [interviewData, setInterviewData] = useState({
    interviewer_title: interview?.interviewer_title ?? "",
    interview_type: interview?.interview_type ?? "",
    interview_date: interview?.scheduled_at
      ? new Date(interview.scheduled_at).toISOString().slice(0, 10)
      : "",
    interview_time: interview?.scheduled_at
      ? new Date(interview.scheduled_at).toISOString().slice(11, 16)
      : "",
    duration_minutes: String(interview?.duration_minutes ?? "60"),
    status: interview?.status ?? "pending_confirm",
    meeting_link: interview?.meeting_link ?? "",
    message: interview?.message ?? "",
    notes: interview?.notes ?? "",
    feedback: interview?.feedback ?? "",
  });

  const [isActiveType, setIsActiveType] = useState<string>(
    interview?.interview_type ?? "",
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { value, name } = e.target;
    setInterviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    const { interview_date, interview_time, ...rest } = interviewData;
    const scheduled_at = `${interview_date}T${interview_time}:00`;
    await sendInterviewInvite(
      {
        ...rest,
        ...(isView && interview?.id ? { id: interview.id } : {}),
        interviewer_name: seekerName!,
        duration_minutes: Number(interviewData.duration_minutes),
        seeker_id: seekerId!,
        application_id: applicationId as string,
        scheduled_at,
      },
      {
        onSuccess: () => {
          toast.success(
            isView
              ? "Interview updated successfully."
              : "Interview invite sent successfully.",
          );
          onClose();
        },
      },
    );
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card text-card-foreground">
        <DialogHeader className="px-6 py-4 border-b border-border bg-card">
          <DialogTitle className="text-xl">
            {isView ? "Interview Details" : "Schedule Interview"}
          </DialogTitle>
          <DialogDescription>
            {isView
              ? "Viewing interview details and current status."
              : "Set up an interview with a candidate."}
          </DialogDescription>
        </DialogHeader>

        <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Interviewer Name & Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Interviewer Name
              </label>
              <Input
                placeholder="e.g. James Cho"
                name="interviewer_name"
                value={seekerName ?? ""}
                disabled={true}
                className="disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Interviewer Title
              </label>
              <Input
                placeholder="e.g. Senior Engineer"
                name="interviewer_title"
                value={interviewData.interviewer_title}
                onChange={handleChange}
              />
            </div>
          </div>

          <hr className="border-border" />

          {/* Interview Type */}

          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Interview Type
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {[
                {
                  name: "Zoom",
                  icon: <Video className="w-4 h-4" />,
                  value: "zoom",
                },
                {
                  name: "Google Meet",
                  icon: <Video className="w-4 h-4" />,
                  value: "google_meet",
                },
                {
                  name: "MS Teams",
                  icon: <Video className="w-4 h-4" />,
                  value: "ms_teams",
                },
                {
                  name: "Phone",
                  icon: <Phone className="w-4 h-4" />,
                  value: "phone",
                },
                {
                  name: "In Person",
                  icon: <MapPin className="w-4 h-4" />,
                  value: "in_person",
                },
              ].map((type) => (
                <button
                  key={type.name}
                  type="button"
                  className={`flex flex-col items-center justify-center gap-1 rounded-md border border-border ${
                    isActiveType === type.value
                      ? "bg-primary text-primary-foreground"
                      : "text-card-foreground"
                  } px-2 py-1 text-xs hover:bg-muted/50 hover:shadow-sm`}
                  onClick={() => {
                    setInterviewData((prev) => ({
                      ...prev,
                      interview_type: type.value,
                    }));
                    setIsActiveType(type.value);
                  }}
                >
                  {type.icon}
                  <span className="text-[10px] text-center">{type.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date, Time, Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Date
              </label>
              <div className="relative">
                <CalendarDays className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground z-10 pointer-events-none" />
                <Input
                  type="date"
                  name="interview_date"
                  value={interviewData.interview_date}
                  onChange={handleChange}
                  className="pl-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Time
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground z-10 pointer-events-none" />
                <Input
                  type="time"
                  name="interview_time"
                  value={interviewData.interview_time}
                  onChange={handleChange}
                  className="pl-9 [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                Duration
              </label>
              <div className="relative">
                <Timer className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground z-10 pointer-events-none" />
                <Select
                  value={interviewData.duration_minutes}
                  onValueChange={(value) =>
                    setInterviewData((prev) => ({
                      ...prev,
                      duration_minutes: value,
                    }))
                  }
                >
                  <SelectTrigger className="pl-9">
                    <SelectValue placeholder="Select Duration" />
                  </SelectTrigger>
                  <SelectContent>
                    {DURATION_OPTIONS.map((duration) => (
                      <SelectItem key={duration} value={`${Number(duration)}`}>
                        {duration} min
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Status — view mode only */}
          {isView &&
            ["upcoming", "completed"].includes(interviewData.status) && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Status
                </label>
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="completed"
                    checked={interviewData.status === "completed"}
                    onCheckedChange={(checked) => {
                      setInterviewData((prev) => ({
                        ...prev,
                        status: checked ? "completed" : "upcoming",
                      }));
                    }}
                  />
                  <label
                    htmlFor="completed"
                    className={`text-sm cursor-pointer text-foreground`}
                  >
                    Mark as completed
                  </label>
                </div>
              </div>
            )}

          {/* Meeting Link */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Meeting Link
            </label>
            <div className="relative">
              <Video className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground pointer-events-none" />
              <Input
                className="pl-9"
                type="url"
                placeholder="https://meet.google.com/..."
                name="meeting_link"
                value={interviewData.meeting_link}
                onChange={handleChange}
              />
            </div>
            {!isView && (
              <p className="mt-1.5 text-xs text-muted-foreground">
                A calendar invitation will be sent with this link.
              </p>
            )}
          </div>

          <hr className="border-border" />

          {/* Message */}
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-1.5">
              Instructions for Candidate
            </label>
            <Textarea
              rows={3}
              placeholder="E.g., Please prepare a 5-minute presentation on a recent project..."
              name="message"
              value={interviewData.message}
              onChange={handleChange}
            />
          </div>

          {/* Notes & Feedback — view mode only */}
          {isView && (
            <>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Notes
                </label>
                <Textarea
                  rows={2}
                  placeholder="Internal notes..."
                  name="notes"
                  value={interviewData.notes}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-1.5">
                  Feedback
                </label>
                <Textarea
                  rows={2}
                  placeholder="Candidate feedback..."
                  name="feedback"
                  value={interviewData.feedback}
                  onChange={handleChange}
                />
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-card border-t border-border flex justify-end gap-3">
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={isSendInterviewSending}>
            {isSendInterviewSending
              ? "Saving..."
              : isView
                ? "Save Changes"
                : "Send Invite"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EmployerInterviewModal;

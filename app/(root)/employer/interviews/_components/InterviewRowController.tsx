import { useNotifyBeforeInterview } from "@/hooks/useInterview";
import { interviewTime } from "@/lib/utils";
import { Interview } from "@/types/interview";
import { useEffect, useRef, useState } from "react";
import EmployerInterviewMobileCard from "./EmployerInterviewMobileCard";
import EmployerInterviewRow from "./EmployerInterviewRow";

const InterviewRowController = ({
  interview,
  onView,
  onDeleteClick,
  isDeleting,
}: {
  interview: Interview;
  onView?: (interview: Interview) => void;
  onDeleteClick?: (interview: Interview) => void;
  isDeleting: boolean;
}) => {
  const [isJoinAvailable, setIsJoinAvailable] = useState(false);
  const { mutate: notifyBeforeInterview } = useNotifyBeforeInterview();
  const notificationSentRef = useRef(false);

  useEffect(() => {
    if (!interview.scheduled_at) return;

    const check = () => {
      const available = interviewTime(interview.scheduled_at);
      setIsJoinAvailable(available);

      if (available && !notificationSentRef.current) {
        notificationSentRef.current = true;
        notifyBeforeInterview(interview.id);
      }
    };

    check();
    const interval = setInterval(check, 60 * 1000);
    return () => clearInterval(interval);
  }, [interview.scheduled_at]);

  return (
    <>
      {/* Desktop */}

      <EmployerInterviewRow
        interview={interview}
        onView={onView}
        onDeleteClick={onDeleteClick}
        isDeleting={isDeleting}
        isJoinAvailable={isJoinAvailable}
      />
      {/* Mobile */}
      <div className="md:hidden">
        <EmployerInterviewMobileCard
          interview={interview}
          onView={onView}
          onDeleteClick={onDeleteClick}
          isDeleting={isDeleting}
          isJoinAvailable={isJoinAvailable}
        />
      </div>
    </>
  );
};

export default InterviewRowController;

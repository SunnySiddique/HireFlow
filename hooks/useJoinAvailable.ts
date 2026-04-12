import { interviewTime } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { useNotifyBeforeInterview } from "./useInterview";

export const useJoinAvailable = (interviewId: string, scheduled_at: string) => {
  const [isJoinAvailable, setIsJoinAvailable] = useState(false);
  const { mutate: notifyBeforeInterview } = useNotifyBeforeInterview();

  const hasNotified = useRef(false);

  useEffect(() => {
    if (!scheduled_at || !interviewId) return;

    const check = () => {
      const available = interviewTime(scheduled_at);
      setIsJoinAvailable(available);

      if (available && !hasNotified.current) {
        hasNotified.current = true;
        notifyBeforeInterview(interviewId);
      }
    };

    check();
    const interval = setInterval(check, 10 * 1000);

    return () => clearInterval(interval);
  }, [scheduled_at, interviewId, notifyBeforeInterview]);

  return { isJoinAvailable };
};

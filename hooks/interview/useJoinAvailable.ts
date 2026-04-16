// useJoinAvailable.ts
import { interviewTime } from "@/lib/utils";
import { useEffect, useState } from "react";
import { useNotifyBeforeInterview } from "./useInterview";

const notifiedInterviewIds = new Set<string>();

export const useJoinAvailable = (interviewId: string, scheduled_at: string) => {
  const [isJoinAvailable, setIsJoinAvailable] = useState(false);
  const { mutate: notifyBeforeInterview } = useNotifyBeforeInterview();

  useEffect(() => {
    if (!scheduled_at || !interviewId) return;

    const check = () => {
      const available = interviewTime(scheduled_at);
      setIsJoinAvailable(available);

      if (available && !notifiedInterviewIds.has(interviewId)) {
        notifiedInterviewIds.add(interviewId);
        notifyBeforeInterview(interviewId);
      }
    };

    check();
    const interval = setInterval(check, 10 * 1000);

    return () => clearInterval(interval);
  }, [scheduled_at, interviewId]); // eslint-disable-line react-hooks/exhaustive-deps

  return { isJoinAvailable };
};

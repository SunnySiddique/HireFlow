// useInterviewTimer.ts
import { differenceInMilliseconds, format, intervalToDuration } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useJoinAvailable } from "./useJoinAvailable";

// useInterviewTimer.ts
export const useInterviewTimer = (interview: {
  id: string;
  scheduled_at: string | null;
  status: string | null;
}) => {
  const [remainingLabel, setRemainingLabel] = useState("");
  const { isJoinAvailable } = useJoinAvailable(
    interview.id,
    interview.scheduled_at ?? "",
  );

  const scheduledDate = useMemo(
    () => new Date(interview.scheduled_at ?? ""),
    [interview.scheduled_at],
  );

  useEffect(() => {
    if (!interview?.id || interview.status !== "upcoming") return;

    const tick = () => {
      const now = new Date();
      const timeRemainingMs = differenceInMilliseconds(scheduledDate, now);

      if (timeRemainingMs <= 0) {
        setRemainingLabel("In progress");
        return;
      }

      const duration = intervalToDuration({ start: now, end: scheduledDate });
      const { days, hours, minutes, seconds } = duration;

      if (days) setRemainingLabel(`${days}d ${hours ?? 0}h`);
      else if (hours) setRemainingLabel(`${hours}h ${minutes ?? 0}m`);
      else if (minutes) setRemainingLabel(`${minutes}m ${seconds ?? 0}s`);
      else setRemainingLabel(`${seconds ?? 0}s`);
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [scheduledDate, interview.status]);

  return {
    isJoinAvailable,
    getRemainingLabel: () => remainingLabel,
    formattedDate: interview?.scheduled_at
      ? format(scheduledDate, "EEE, MMM d")
      : "N/A",
    formattedTime: interview?.scheduled_at
      ? format(scheduledDate, "hh:mm a")
      : "N/A",
  };
};

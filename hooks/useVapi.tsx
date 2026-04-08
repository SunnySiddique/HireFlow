import { getVapi } from "@/lib/vapi";
import Vapi from "@vapi-ai/web";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export type InterviewConfig = {
  jobTitle?: string;
  companyName?: string;
  jobDescription?: string;
  candidateName?: string;
  Experience?: string;
};

export const useVapi = () => {
  const vapiRef = useRef<Vapi | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const vapi = getVapi();
    vapiRef.current = vapi;

    vapi.on("call-start", () => setIsConnected(true));
    vapi.on("call-end", () => {
      setIsConnected(false);
      setIsSpeaking(false);
    });

    const handleMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        const newMessage = { content: message.transcript, role: message.role };
        setTranscript((prev) => [...prev, newMessage]);
      }
    };
    vapi.on("speech-start", () => setIsSpeaking(true));
    vapi.on("speech-end", () => setIsSpeaking(false));
    vapi.on("message", handleMessage);
    vapi.on("error", console.error);

    return () => {
      vapi?.stop();
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startCall = () => {
    setTranscript([]);
    if (vapiRef.current) {
      console.log("id:", process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
      vapiRef.current?.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
    }
  };

  const endCall = () => {
    vapiRef.current?.stop();
    setTranscript([]);
  };

  return {
    startCall,
    isSpeaking,
    transcript,
    endCall,
    isConnected,
    setIsConnected,
    transcriptEndRef,
  };
};

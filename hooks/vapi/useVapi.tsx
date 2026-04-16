import { getVapi } from "@/lib/vapi";
import { useEffect, useRef, useState } from "react";

type Message = { role: "user" | "assistant"; text: string };

export const useVapi = () => {
  const [isConnecting, setIsConnecting] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState<Message[]>([]);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  const vapiRef = useRef(getVapi());

  useEffect(() => {
    const vapi = vapiRef.current;

    const onCallStart = () => setIsConnected(true);
    const onCallEnd = () => {
      setIsConnected(false);
      setIsSpeaking(false);
    };
    const onSpeechStart = () => {
      setIsSpeaking(true);
      setIsConnecting(false);
    };
    const onSpeechEnd = () => {
      setIsSpeaking(false);
      setIsConnecting(false);
    };

    const onMessage = (message: any) => {
      if (message.type === "transcript" && message.transcriptType === "final") {
        setTranscript((prev) => [
          ...prev,
          { role: message.role, text: message.transcript },
        ]);
      }
    };

    vapi.on("call-start", onCallStart);
    vapi.on("call-end", onCallEnd);
    vapi.on("speech-start", onSpeechStart);
    vapi.on("speech-end", onSpeechEnd);
    vapi.on("message", onMessage);
    vapi.on("error", console.error);

    return () => {
      vapi.off("call-start", onCallStart);
      vapi.off("call-end", onCallEnd);
      vapi.off("speech-start", onSpeechStart);
      vapi.off("speech-end", onSpeechEnd);
      vapi.off("message", onMessage);
      vapi.off("error", console.error);
    };
  }, []);

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript]);

  const startCall = () => {
    setIsConnecting(true);
    setTranscript([]);
    vapiRef.current.start(process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID!);
  };

  const endCall = () => {
    setIsConnecting(false);
    vapiRef.current.stop();
  };

  return {
    startCall,
    endCall,
    isSpeaking,
    transcript,
    isConnected,
    transcriptEndRef,
    isConnecting,
  };
};

"use client";
import Loader from "@/components/Loader";
import { useSeekerProfile } from "@/hooks/seeker-profile/useSeeker";
import { useVapi } from "@/hooks/vapi/useVapi";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Phone, PhoneOff, Sparkles } from "lucide-react";
import Image from "next/image";
import AudioVisualizer from "./_components/AudioVisualizer";

const AIMockInterviewPage = () => {
  const {
    isConnecting,
    startCall,
    isSpeaking,
    transcript,
    endCall,
    isConnected,
    transcriptEndRef,
  } = useVapi();

  const { data: seeker, isLoading } = useSeekerProfile();

  if (isLoading) return <Loader mode="inline" />;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 flex flex-col gap-6 sm:gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
              Technical Interview Practice
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Role: Dynamic Data Coordinator • Difficulty: Medium
            </p>
          </div>

          <div className="flex flex-wrap gap-3 w-full md:w-auto">
            {!isConnected && !isConnecting ? (
              <button
                onClick={startCall}
                className="flex-1 md:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center justify-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Start Call
              </button>
            ) : isConnecting ? (
              <button
                disabled
                className="flex-1 md:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-primary/50 text-primary-foreground font-bold flex items-center justify-center gap-2 cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 animate-spin" />
                Connecting...
              </button>
            ) : (
              <button
                onClick={endCall}
                className="flex-1 md:flex-none px-5 sm:px-6 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-bold flex items-center justify-center gap-2 hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all hover:scale-105"
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </button>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 flex-1">
          {/* AI CARD */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-card border border-border/50 shadow-lg overflow-hidden flex flex-col min-h-[380px] sm:min-h-[500px]">
            <AnimatePresence>
              {isConnected && isSpeaking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-primary/5 shadow-[inset_0_0_100px_rgba(231,138,83,0.15)] pointer-events-none z-0"
                />
              )}
            </AnimatePresence>

            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center gap-2 sm:gap-3 bg-background/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-border/50">
              <div className="relative flex h-3 w-3">
                {isConnected ? (
                  <>
                    <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative h-3 w-3 rounded-full bg-green-500" />
                  </>
                ) : (
                  <span className="h-3 w-3 rounded-full bg-muted-foreground" />
                )}
              </div>
              <span className="text-xs sm:text-sm font-bold">Nova</span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
              <div className="relative">
                <div
                  className={cn(
                    "relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4 transition-colors",
                    isConnected && isSpeaking
                      ? "border-primary"
                      : "border-border",
                  )}
                >
                  <Image
                    src="/nova-logo.png"
                    alt="Nova AI"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 h-14 sm:h-16 flex items-center justify-center">
                {!isConnected && !isConnecting && (
                  <span className="text-muted-foreground text-xs sm:text-sm bg-muted/50 px-3 sm:px-4 py-2 rounded-full">
                    Ready to start
                  </span>
                )}
                {isConnecting && (
                  <span className="text-primary text-xs sm:text-sm animate-pulse">
                    Connecting...
                  </span>
                )}
                {isConnected && (
                  <div className="flex flex-col items-center gap-2">
                    <AudioVisualizer
                      active={isSpeaking}
                      colorClass="bg-primary"
                    />
                    <span className="text-[10px] sm:text-xs text-primary uppercase tracking-widest">
                      {isSpeaking ? "Speaking" : "Listening"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* USER CARD */}
          <div className="relative rounded-2xl sm:rounded-3xl bg-card border border-border/50 shadow-lg overflow-hidden flex flex-col min-h-[380px] sm:min-h-[500px]">
            <div className="absolute top-4 sm:top-6 left-4 sm:left-6 z-10 flex items-center bg-background/80 backdrop-blur-md px-3 sm:px-4 py-2 rounded-full border border-border/50">
              <span className="text-xs sm:text-sm font-bold">
                {seeker?.full_name?.split(" ")[0] ?? "Seeker"}
              </span>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
              <div
                className={cn(
                  "relative w-28 h-28 sm:w-40 sm:h-40 rounded-full overflow-hidden border-4",
                  isConnected && !isSpeaking
                    ? "border-secondary"
                    : "border-border",
                )}
              >
                <Image
                  src={seeker?.profile_url ?? "/placeholder.png"}
                  alt="Seeker profile"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="mt-6 sm:mt-8 h-14 sm:h-16 flex items-center justify-center">
                {isConnected && !isSpeaking ? (
                  <div className="flex flex-col items-center gap-2">
                    <AudioVisualizer active={true} colorClass="bg-secondary" />
                    <span className="text-[10px] sm:text-xs text-secondary uppercase tracking-widest">
                      Speaking
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-xs sm:text-sm bg-muted/50 px-3 sm:px-4 py-2 rounded-full">
                    {isConnected ? "Listening" : "Ready"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* TRANSCRIPT */}
        <div className="w-full">
          <div className="p-4 sm:p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold text-sm sm:text-base">
                Live Transcript
              </h3>
            </div>

            <div className="p-3 sm:p-4 rounded-xl bg-muted/30 border border-border/50 h-[200px] sm:h-[250px] lg:h-[300px] overflow-y-scroll flex flex-col gap-3 sm:gap-4">
              {transcript.map((msg, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "flex w-full",
                    msg.role === "user" ? "justify-end" : "justify-start",
                  )}
                >
                  <div
                    className={cn(
                      "max-w-[85%] p-3 rounded-2xl text-sm",
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-primary/10 border border-primary/20",
                    )}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              <div ref={transcriptEndRef} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIMockInterviewPage;

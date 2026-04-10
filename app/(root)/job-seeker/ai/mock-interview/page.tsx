"use client";

import Loader from "@/components/Loader";
import { useGetJobSeekerProfile } from "@/hooks/useJobSeeker";
import { useVapi } from "@/hooks/useVapi";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { MessageSquare, Phone, PhoneOff, Sparkles } from "lucide-react";
import Image from "next/image";
import AudioVisualizer from "./_components/AudioVisualizer";

// --- Main Page ---

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

  const { data: seeker, isLoading } = useGetJobSeekerProfile();

  if (isLoading) return <Loader mode="inline" />;
  return (
    <div className="flex flex-col">
      {/* Main Content */}
      <main className="flex-1 px-14 py-8 flex flex-col gap-8">
        {/* Header Area */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-2">
              Technical Interview Practice
            </h2>
            <p className="text-muted-foreground">
              Role: Dynamic Data Coordinator • Difficulty: Medium
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Call Action Button */}
            {!isConnected && !isConnecting ? (
              <button
                onClick={startCall}
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold flex items-center gap-2 hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Start Call
              </button>
            ) : isConnecting ? (
              <button
                disabled
                className="px-6 py-2.5 rounded-xl bg-primary/50 text-primary-foreground font-bold flex items-center gap-2 cursor-not-allowed"
              >
                <Sparkles className="w-5 h-5 animate-spin" />
                Connecting...
              </button>
            ) : (
              <button
                onClick={endCall}
                className="px-6 py-2.5 rounded-xl bg-destructive text-destructive-foreground font-bold flex items-center gap-2 hover:bg-destructive/90 shadow-lg shadow-destructive/20 transition-all hover:scale-105"
              >
                <PhoneOff className="w-5 h-5" />
                End Call
              </button>
            )}
          </div>
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-[500px]">
          {/* Card 1: AI Avatar (Nova) */}
          <div className="relative rounded-3xl bg-card border border-border/50 shadow-lg overflow-hidden flex flex-col">
            {/* Active Glow Effect */}
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

            {/* Header */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <div className="relative flex h-3 w-3">
                {isConnected ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-muted-foreground"></span>
                )}
              </div>
              <span className="text-sm font-bold">Nova (AI Interviewer)</span>
            </div>

            {/* Avatar Center */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
              <div className="relative">
                {/* Glowing Ring when speaking */}
                {isConnected && isSpeaking && (
                  <motion.div
                    layoutId="glow"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.2 }}
                    transition={{
                      repeat: Infinity,
                      duration: 2,
                      repeatType: "reverse",
                    }}
                    className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
                  />
                )}

                <div
                  className={cn(
                    "relative w-40 h-40 rounded-full overflow-hidden border-4 transition-colors duration-500 z-10",
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

              {/* Status / Visualizer */}
              <div className="mt-8 h-16 flex items-center justify-center">
                {!isConnected && !isConnecting && (
                  <span className="text-muted-foreground font-mono text-sm bg-muted/50 px-4 py-2 rounded-full">
                    Ready to start
                  </span>
                )}
                {isConnecting && (
                  <span className="text-primary font-mono text-sm animate-pulse">
                    Connecting to Nova...
                  </span>
                )}
                {isConnected && (
                  <div className="flex flex-col items-center gap-2">
                    <AudioVisualizer
                      active={isSpeaking}
                      colorClass="bg-primary"
                    />
                    <span className="text-xs text-primary font-mono uppercase tracking-widest">
                      {isSpeaking ? "Speaking" : "Listening"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl bg-card border border-border/50 shadow-lg overflow-hidden flex flex-col">
            {/* Header */}
            <div className="absolute top-6 left-6 z-10 flex items-center gap-3 bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-border/50 shadow-sm">
              <span className="text-sm font-bold">
                {seeker?.full_name.split(" ")[0] ?? "Seeker"} (You)
              </span>
            </div>

            {/* Avatar Center */}
            <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-8">
              <div className="relative">
                <div
                  className={cn(
                    "relative w-40 h-40 rounded-full overflow-hidden border-4 transition-colors duration-500 z-10",
                    isConnected && !isSpeaking
                      ? "border-secondary"
                      : "border-border",
                  )}
                >
                  <Image
                    src={seeker?.profile_url ?? "Seeker profile"}
                    alt="Seeker profile"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Status / Visualizer */}
              <div className="mt-8 h-16 flex items-center justify-center">
                {isConnected && !isSpeaking ? (
                  <div className="flex flex-col items-center gap-2">
                    <AudioVisualizer active={true} colorClass="bg-secondary" />
                    <span className="text-xs text-secondary font-mono uppercase tracking-widest">
                      Speaking
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground font-mono text-sm bg-muted/50 px-4 py-2 rounded-full">
                    {isConnected ? "Listening" : "Ready"}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Context / Transcript Panel */}
        <div className="w-full">
          {/* Live Transcript */}
          <div className="w-full p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col gap-4">
            <div className="flex items-center gap-2 text-primary">
              <MessageSquare className="w-5 h-5" />
              <h3 className="font-bold">Live Transcript</h3>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-muted/30 border border-border/50 h-[250px] overflow-y-scroll flex flex-col gap-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                      "max-w-[80%] p-3 rounded-2xl",
                      msg.role === "user"
                        ? "bg-secondary text-secondary-foreground rounded-tr-sm"
                        : "bg-primary/10 text-foreground border border-primary/20 rounded-tl-sm",
                    )}
                  >
                    <p className="text-sm font-medium">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isConnected && !isSpeaking && (
                <div className="flex w-full justify-end">
                  <div className="max-w-[80%] p-3 rounded-2xl bg-secondary/10 text-secondary-foreground border border-secondary/20 rounded-tr-sm animate-pulse">
                    <p className="text-sm font-medium italic">
                      Listening to you...
                    </p>
                  </div>
                </div>
              )}
              <div ref={transcriptEndRef} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AIMockInterviewPage;

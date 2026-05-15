"use client";

import { cn } from "@/lib/utils";
import { extractPdfText } from "@/lib/utils/pdfExatact";
import { StreamEvent } from "@/types";
import { AICareerAnalysisResult } from "@/types/aiJobseeker";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Sparkles,
  UploadCloud,
  Zap,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import AIResult from "../resume-matching/_components/AIResult";

const MiniCircularFitScore = ({
  score,
  colorClass,
}: {
  score: number;
  colorClass: string;
}) => {
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;
  return (
    <div className="relative flex items-center justify-center w-10 h-10 shrink-0">
      <svg className="transform -rotate-90 w-10 h-10">
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          className="text-muted"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          stroke="currentColor"
          strokeWidth="3"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={colorClass}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className={cn("text-[10px] font-bold font-mono", colorClass)}>
          {score}
        </span>
      </div>
    </div>
  );
};

const STEPS = [
  { icon: "📄", label: "Reading resume" },
  { icon: "🗄️", label: "Fetching live jobs" },
  { icon: "🤖", label: "AI analysis" },
  { icon: "✨", label: "Building report" },
];

const AnalyzingPanel = ({
  currentStep,
  statusMessage,
  totalSteps,
}: {
  currentStep: number;
  statusMessage: string;
  totalSteps: number;
}) => (
  <div className="flex flex-col items-center justify-center py-10 text-center gap-8 w-full">
    {/* Animated GIF */}
    <Image
      src="/resume-scan.gif"
      alt="AI Analyzing Resume"
      width={260}
      height={195}
      unoptimized
      className="opacity-90"
    />

    <div className="flex flex-wrap justify-center gap-2">
      {STEPS.map((step, i) => {
        const stepNum = i + 1;
        const isDone = currentStep > stepNum;
        const isActive = currentStep === stepNum;
        return (
          <motion.div
            key={step.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-300",
              isDone
                ? "bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400"
                : isActive
                  ? "bg-primary/10 border-primary/40 text-primary scale-105 shadow-sm shadow-primary/20"
                  : "bg-muted/40 border-border text-muted-foreground opacity-50",
            )}
          >
            {isDone ? (
              <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
            ) : isActive ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <span className="w-3.5 h-3.5 flex items-center justify-center text-[10px]">
                {step.icon}
              </span>
            )}
            {step.label}
          </motion.div>
        );
      })}
    </div>

    {/* Progress bar */}
    <div className="w-full max-w-xs">
      <div className="h-1 rounded-full bg-muted overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${Math.max(8, (currentStep / totalSteps) * 100)}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>

    {/* Live message */}
    <AnimatePresence mode="wait">
      <motion.p
        key={statusMessage}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="text-sm text-muted-foreground font-medium"
      >
        {statusMessage}
      </motion.p>
    </AnimatePresence>

    <p className="text-xs text-muted-foreground">
      This takes about 10–20 seconds
    </p>
  </div>
);

const AICoachUploadPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [result, setResult] = useState<AICareerAnalysisResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState("");

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (!file) return;
    const text =
      file.type === "application/pdf"
        ? await extractPdfText(file)
        : await file.text();
    if (!text || text.trim().length < 50)
      return toast.error("Resume too small or unreadable");
    await analyzeResume(text);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const text =
      file.type === "application/pdf"
        ? await extractPdfText(file)
        : await file.text();
    if (!text || text.trim().length < 50)
      return toast.error("Resume too small or unreadable");
    await analyzeResume(text);
  };

  const analyzeResume = async (text: string) => {
    setIsAnalyzing(true);
    setResult(null);
    setCurrentStep(0);
    setStatusMessage("Starting analysis...");

    try {
      const res = await fetch("/api/match-jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resume: text }),
      });

      if (!res.ok || !res.body) throw new Error("Request failed");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n\n");

        buffer = lines.pop() ?? "";

        for (const line of lines) {
          const raw = line.replace(/^data:\s*/, "").trim();

          if (!raw) continue;

          let event: StreamEvent;
          try {
            event = JSON.parse(raw);
          } catch {
            continue;
          }

          if (event.type === "status") {
            setCurrentStep(event.step);
            setStatusMessage(event.message);
          } else if (event.type === "result") {
            setResult(event.data);
          } else if (event.type === "error") {
            throw new Error(event.message);
          }
        }
      }
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsAnalyzing(false);
      setCurrentStep(0);
    }
  };

  return (
    <>
      {!result ? (
        <main className="flex flex-col lg:flex-row gap-12 lg:gap-8 items-center lg:items-start justify-between min-h-screen">
          {/* Left Column */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8 max-w-2xl">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-xs font-bold font-mono uppercase tracking-widest mb-2">
                <Zap className="w-3.5 h-3.5" />
                Smart Matching Engine
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1]">
                Let AI Find Your{" "}
                <span className="text-primary">Perfect Job</span> Worldwide
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Upload your resume and get hyper-personalized job matches with
                fit scores, strengths, skill gaps & learning paths from anywhere
                in the world.
              </p>
            </motion.div>

            {/* Upload area */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "relative flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl border-2 border-dashed transition-all duration-300 group overflow-hidden",
                  isDragging
                    ? "border-primary bg-primary/10 scale-[1.02]"
                    : "border-border hover:border-primary/50 bg-card/40 hover:bg-card/80 backdrop-blur-xl shadow-lg",
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* ── Loading state ── */}
                {isAnalyzing ? (
                  <AnalyzingPanel
                    currentStep={currentStep}
                    statusMessage={statusMessage}
                    totalSteps={4}
                  />
                ) : (
                  /* ── Upload idle state ── */
                  <div className="flex flex-col items-center text-center z-10">
                    <div className="relative mb-6">
                      <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-500 shadow-[0_0_40px_rgba(231,138,83,0.15)]">
                        <UploadCloud className="w-12 h-12" />
                      </div>
                      <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-primary animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-3">
                      Drop your resume here or click to upload
                    </h3>
                    <p className="text-muted-foreground mb-8">
                      Supported formats: PDF, DOCX, TXT (max 5MB)
                    </p>
                    <label className="cursor-pointer">
                      <div className="px-8 py-3.5 rounded-xl bg-primary text-primary-foreground font-bold hover:bg-primary/90 shadow-md shadow-primary/20 transition-all">
                        Browse Files
                      </div>
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx,.txt"
                        onChange={handleFileUpload}
                      />
                    </label>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Footer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono mt-4"
            >
              <ShieldCheck className="w-4 h-4 text-secondary" />
              <span>Your data is secure</span>
              <span className="mx-1">•</span>
              <span>Powered by advanced AI</span>
              <span className="mx-1">•</span>
              <span>Takes &lt; 30 seconds</span>
            </motion.div>
          </div>

          {/* Right Column: preview panel (unchanged) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-full lg:w-[45%] relative hidden md:block"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-[80px] -z-10" />
            <div className="relative w-full max-w-md mx-auto bg-card/60 backdrop-blur-2xl border border-border/80 rounded-[2rem] shadow-2xl shadow-black/50 overflow-hidden flex flex-col">
              <div className="p-6 border-b border-border/50 bg-muted/20">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <h3 className="font-bold text-sm tracking-wide">
                    What you&apos;ll get
                  </h3>
                </div>
                <div className="space-y-3">
                  <div className="h-2 w-16 bg-primary/20 rounded-full" />
                  <p className="text-xs text-muted-foreground italic border-l-2 border-primary/50 pl-3 py-0.5">
                    &quot;A passionate Junior Software Engineer with 2 years of
                    experience...&quot;
                  </p>
                  <div className="flex gap-2 pt-1">
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-mono font-bold">
                      React
                    </span>
                    <span className="px-2 py-1 rounded-md bg-primary/10 text-primary text-[10px] font-mono font-bold">
                      Node.js
                    </span>
                    <span className="px-2 py-1 rounded-md bg-muted text-muted-foreground text-[10px] font-mono font-bold">
                      +5 more
                    </span>
                  </div>
                </div>
              </div>
              <div className="p-6 flex flex-col gap-3 relative">
                <div className="p-3 rounded-xl bg-background border border-border/50 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      Frontend Developer
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      Pathao • Dhaka
                    </p>
                  </div>
                  <MiniCircularFitScore
                    score={92}
                    colorClass="text-green-500"
                  />
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/50 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      Full Stack Developer
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      bKash • Dhaka
                    </p>
                  </div>
                  <MiniCircularFitScore score={78} colorClass="text-primary" />
                </div>
                <div className="p-3 rounded-xl bg-background border border-border/50 flex items-center justify-between shadow-sm">
                  <div>
                    <h4 className="font-bold text-sm text-foreground">
                      Junior Backend
                    </h4>
                    <p className="text-[10px] text-muted-foreground font-mono mt-0.5">
                      Dutch-Bangla Bank
                    </p>
                  </div>
                  <MiniCircularFitScore
                    score={65}
                    colorClass="text-secondary"
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-card/60 via-card/40 to-transparent backdrop-blur-[2px] flex items-end justify-center pb-6">
                  <span className="px-4 py-1.5 rounded-full bg-background/80 border border-border text-xs font-bold shadow-lg backdrop-blur-md">
                    Preview Analysis
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </main>
      ) : (
        <AIResult jobs={result} />
      )}
    </>
  );
};

export default AICoachUploadPage;

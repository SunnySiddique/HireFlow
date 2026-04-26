"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import Link from "next/link";

const SubscriptionSuccessPage = () => {
  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-emerald-500/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md z-10 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.4 }}
          className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-8 sm:p-10 relative overflow-hidden text-center"
        >
          {/* Floating sparkles animation */}
          <motion.div
            initial={{ opacity: 0, rotate: -45, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
            className="absolute top-8 right-8 text-emerald-500/40"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, rotate: 45, scale: 0 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
            className="absolute bottom-28 left-8 text-primary/40"
          >
            <Sparkles className="w-6 h-6" />
          </motion.div>

          {/* Central Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
            className="mx-auto w-24 h-24 bg-emerald-500/10 rounded-full flex items-center justify-center mb-6 border border-emerald-500/20 shadow-inner relative"
          >
            <CheckCircle2 className="w-12 h-12 text-emerald-500 relative z-10" />

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-emerald-500"
              initial={{ scale: 1, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl font-black tracking-tight text-foreground mb-4"
          >
            Payment Successful!
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <p className="text-base text-muted-foreground leading-relaxed px-2 mb-4">
              Congratulations! Your subscription is now active. You have
              unlocked full access to all premium features.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-4"
          >
            <Link href="/" className="block">
              <Button className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md group border-none">
                Go to Dashboard
                <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default SubscriptionSuccessPage;

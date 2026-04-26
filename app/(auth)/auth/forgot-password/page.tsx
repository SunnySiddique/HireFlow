"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForgotPassword } from "@/hooks/auth/useAuth";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, KeyRound, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import SuccessModal from "./_components/SuccessModal";

const ForgotPasswordPage = () => {
  // hook
  const { mutateAsync: sendEmail, isPending: isSendingEmail } =
    useForgotPassword();

  // states
  const [email, setEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const submitForm = async () => {
    if (!email || !email.includes("@")) return;

    await sendEmail(email, {
      onSuccess: () => {
        setIsModalOpen(true);
      },
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitForm();
  };

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] bg-primary/10 rounded-full blur-[80px] sm:blur-[120px] pointer-events-none -z-10" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="bg-card/80 backdrop-blur-xl rounded-3xl border border-border/50 shadow-2xl p-8 sm:p-10 relative"
        >
          <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 border border-primary/20">
            <KeyRound className="w-7 h-7 text-primary" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-3">
            Forgot password?
          </h2>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            No worries, {`we'll`} send you reset instructions. Please enter the
            email address associated with your account.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-foreground"
              >
                Email address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-11 h-12 rounded-xl border-border/50 bg-background/50 focus-visible:ring-primary/50 text-base"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={isSendingEmail || !email}
              className="w-full h-12 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20 transition-all duration-300"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Sending...
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center flex items-center justify-center">
            <Link
              href="/auth/signin"
              className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              Back to log in
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <SuccessModal
            email={email}
            onSubmit={submitForm}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default ForgotPasswordPage;

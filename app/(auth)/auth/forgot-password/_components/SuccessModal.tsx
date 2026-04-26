import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface SuccessModalProps {
  setIsModalOpen: (open: boolean) => void;
  onSubmit: () => void;
  email: string;
}

const SuccessModal = ({
  email,
  setIsModalOpen,
  onSubmit,
}: SuccessModalProps) => {
  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-0">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          onClick={() => setIsModalOpen(false)}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-sm bg-card rounded-3xl border border-border/50 shadow-2xl p-8 text-center"
        >
          <div className="mx-auto w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mb-5 border border-emerald-500/20">
            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-foreground mb-2">
            Check your email
          </h3>
          <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
            {`We've`} sent a password reset link to{" "}
            <span className="font-semibold text-foreground">{email}</span>.
            Click the link to set a new password.
          </p>

          <div className="space-y-3">
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full h-11 rounded-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Got it
            </Button>
            <div className="text-sm text-muted-foreground mt-4">
              {`Didn't`} receive the email?{" "}
              <button
                onClick={onSubmit}
                className="text-primary font-semibold hover:underline"
              >
                Click to resend
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default SuccessModal;

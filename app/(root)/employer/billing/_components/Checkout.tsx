import { createCheckoutSession } from "@/lib/action/stripe.actions";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { useTransition } from "react";

const Checkout = ({
  cta,
  isPopular,
  planName,
}: {
  cta: string;
  isPopular: boolean;
  planName: string;
}) => {
  const [isPending, startTransition] = useTransition();
  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession(planName, "employer");
    });
  };
  return (
    <>
      <button
        onClick={handleCheckout}
        className={cn(
          "w-full py-3 px-4 rounded-xl font-bold text-sm transition-all duration-200 mb-8 flex items-center justify-center gap-2 group",
          isPopular
            ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-md shadow-primary/20"
            : "bg-muted text-foreground hover:bg-accent border border-border",
        )}
      >
        {cta}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </button>
    </>
  );
};

export default Checkout;

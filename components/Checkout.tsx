import { createCheckoutSession } from "@/lib/action/stripe.actions";
import { ArrowRight } from "lucide-react";
import { useTransition } from "react";
import { Button } from "./ui/button";

const Checkout = ({
  cta,
  isPopular,
  planName,
  userRole,
  subscription,
}: {
  cta: string;
  isPopular: boolean;
  planName: string;
  userRole: "employer" | "jobseeker";
  subscription: any;
}) => {
  const [isPending, startTransition] = useTransition();
  const isSubscribed = subscription?.subscription_status === "active";

  const handleCheckout = () => {
    startTransition(async () => {
      await createCheckoutSession(planName, userRole);
    });
  };

  return (
    <>
      <Button
        onClick={handleCheckout}
        disabled={(isSubscribed && subscription.plan === planName) || isPending}
        className="w-full py-3 rounded-xl font-bold text-sm mb-8 flex items-center justify-center gap-2 group"
        variant={isPopular ? "default" : "outline"}
      >
        {isSubscribed && subscription.plan === planName
          ? "Current Plan"
          : isPending
            ? "Subscribing..."
            : isSubscribed
              ? "Update Plan"
              : cta}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </>
  );
};

export default Checkout;

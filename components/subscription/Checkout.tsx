import { createCheckoutSession } from "@/lib/action/stripe/stripe.actions";
import { hasAccess } from "@/lib/utils";
import { UserSubscription } from "@/types";
import { ArrowRight } from "lucide-react";
import { useTransition } from "react";
import { Button } from "../ui/button";

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
  subscription: UserSubscription;
}) => {
  const [isPending, startTransition] = useTransition();

  const isSubscribed = hasAccess(
    subscription?.subscription_status as string,
    subscription?.plan_expires_at as string,
  );
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
              ? "Upgrade Plan"
              : cta}
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
      </Button>
    </>
  );
};

export default Checkout;

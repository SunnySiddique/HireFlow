import { employerPlans, seekerPlans } from "@/constants/BillingData";
import { createPortalSession } from "@/lib/action/stripe.actions";
import { AlertCircle, Calendar, CreditCard, Zap } from "lucide-react";
import { useTransition } from "react";

const ManageSubscription = ({
  subscription,
  isSubscribed,
  userRole,
}: {
  subscription: any;
  isSubscribed: boolean;
  userRole: "employer" | "job-seeker";
}) => {
  const [isPending, startTransition] = useTransition();
  const palns = userRole === "employer" ? employerPlans : seekerPlans;
  const subCost = palns.find(
    (plan) => plan.name.toLowerCase() === subscription?.plan,
  );
  const isCanceling =
    isSubscribed && subscription?.cancel_at_end_period === true;

  const handleCancelSubscription = async () => {
    startTransition(async () => {
      await createPortalSession(userRole);
    });
  };

  return (
    <>
      <div className="bg-card border border-border rounded-2xl overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-xl text-primary">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">
                {subscription?.plan
                  .split(" ")
                  .map((c: string) => c.charAt(0).toUpperCase() + c.slice(1))}
              </h3>
              <p className="text-sm text-muted-foreground">Billed monthly</p>
            </div>
          </div>
          {subscription?.subscription_status === "active" &&
          !subscription?.cancel_at_period_end ? (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-bold uppercase tracking-widest border border-green-500/20 w-fit">
              Active
            </div>
          ) : subscription?.subscription_status === "cancelling" ||
            subscription?.cancel_at_period_end ? (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-bold uppercase tracking-widest border border-amber-500/20 w-fit">
              Cancelling (ends on{" "}
              {subscription?.plan_expires_at
                ? new Date(subscription.plan_expires_at).toLocaleDateString()
                : "-"}
              )
            </div>
          ) : (
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-200 text-gray-600 text-xs font-bold uppercase tracking-widest border border-gray-300 w-fit">
              Inactive
            </div>
          )}
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 bg-muted/30">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-muted-foreground mb-2">
              <CreditCard className="w-4 h-4" />
              <span className="text-sm font-medium">Subscription Cost</span>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {subCost?.price}
            </p>
            <p className="text-xs text-muted-foreground">per month</p>
          </div>

          {subscription?.subscription_status === "cancelling" ? (
            <div className="text-sm text-yellow-600 font-medium">
              You have cancelled your subscription. You will retain access until{" "}
              {subscription?.plan_expires_at
                ? new Date(subscription.plan_expires_at).toLocaleDateString()
                : "the end of your current period"}
              .
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground mb-2">
                <Calendar className="w-4 h-4" />
                <span className="text-sm font-medium">Next Renewal</span>
              </div>
              <p className="text-2xl font-bold text-foreground">Apr 24, 2026</p>
              <p className="text-xs text-muted-foreground">
                Your card will be charged
              </p>
            </div>
          )}
        </div>
        {/* <div className="p-6 sm:p-8 border rounded-lg bg-background">
          <h3 className="text-lg font-bold mb-2">Subscription Cost</h3>
          <p className="text-2xl font-extrabold mb-2">
            {subCost?.price ?? "0"}
          </p>
          <p className="text-sm text-muted-foreground mb-4">per month</p>

          {subscription?.subscription_status === "cancelling" ? (
            <div className="text-sm text-yellow-600 font-medium">
              You have cancelled your subscription. You will retain access until{" "}
              {subscription?.plan_expires_at
                ? new Date(subscription.plan_expires_at).toLocaleDateString()
                : "the end of your current period"}
              .
            </div>
          ) : subscription?.subscription_status === "active" ? (
            <div className="text-sm text-muted-foreground">
              Next Renewal:{" "}
              {subscription?.plan_expires_at
                ? new Date(subscription.plan_expires_at).toLocaleDateString()
                : "-"}
              <br />
              Your card will be charged automatically.
            </div>
          ) : (
            <div className="text-sm text-muted-foreground">
              You do not have an active subscription.
            </div>
          )}
        </div> */}

        {/* Footer / Actions */}

        <div className="p-6 sm:p-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-6 bg-background">
          <div className="flex items-start gap-3 text-sm text-muted-foreground max-w-sm">
            <AlertCircle className="w-5 h-5 text-muted-foreground shrink-0 mt-0.5" />
            {subscription?.subscription_status === "cancelling" &&
            subscription?.plan_expires_at ? (
              <p>
                You have canceled your subscription. You will keep access to
                premium features until{" "}
                <strong>
                  {new Date(subscription?.plan_expires_at).toLocaleDateString()}
                </strong>
                .
              </p>
            ) : (
              <p>
                Canceling your subscription will stop auto-renewal. You will
                keep access to premium features until{" "}
                <strong>
                  {new Date(subscription?.plan_expires_at).toLocaleDateString()}
                </strong>
                .
              </p>
            )}
          </div>

          <button
            disabled={isPending}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl border border-destructive/30 text-destructive hover:bg-destructive hover:text-destructive-foreground transition-colors font-bold text-sm whitespace-nowrap`}
            onClick={handleCancelSubscription}
          >
            {isPending
              ? "Processing..."
              : subscription?.subscription_status === "cancelling" &&
                  subscription?.plan_expires_at
                ? "Don't Cancel Subscription"
                : "Cancel Subscription"}
          </button>
        </div>
      </div>
    </>
  );
};

export default ManageSubscription;

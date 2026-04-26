import {
  EmployerPlanKey,
  JobSeekerPlanKey,
  PRICE_IDS,
} from "@/constants/BillingData";
import { getServerUser } from "@/lib/action/auth/serverAuth";
import { redirect } from "next/navigation";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK!);

// current user
export async function getMySubscriptionService() {
  const { supabase, user } = await getServerUser();
  if (!user) throw new Error("UNAUTHORIZED");

  const { data, error } = await supabase
    .from("subscriptions")
    .select("subscription_status, plan_expires_at, plan")
    .eq("user_id", user.id)
    .maybeSingle();
  if (error) throw error;

  return data;
}

// any user
export async function getUserSubscription(userId: string) {
  const { supabase } = await getServerUser();

  const { data } = await supabase
    .from("subscriptions")
    .select("subscription_status, plan_expires_at, plan")
    .eq("user_id", userId)
    .maybeSingle();

  return data;
}

export async function createCheckoutSessionService(
  planName: string,
  userRole: "employer" | "jobseeker",
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data: existingSubscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  let stripeCustomerId = existingSubscription?.stripe_customer_id;

  const priceId =
    userRole === "employer"
      ? PRICE_IDS.employer[planName as EmployerPlanKey]
      : PRICE_IDS.jobseeker[planName as JobSeekerPlanKey];

  if (!priceId) throw new Error("Invalid plan selected");

  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({
      email: user.email,
    });
    stripeCustomerId = customer.id;

    await supabase.from("subscriptions").upsert({
      user_id: user.id,
      stripe_customer_id: stripeCustomerId,
      role: userRole,
      subscription_status: "inactive",
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: stripeCustomerId,
    payment_method_types: ["card"],
    line_items: [{ price: priceId, quantity: 1 }],
    mode: "subscription",
    metadata: {
      userId: user.id,
      userRole,
      planName,
    },
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN!}/subscription/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/subscription/cancel`,
  });

  redirect(session.url!);
}

export async function createPortalSessionService(
  userRole: "employer" | "job-seeker",
) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .maybeSingle();

  if (!sub?.stripe_customer_id) {
    throw new Error("No subscription found");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/${userRole}/billing`,
  });

  redirect(portalSession.url);
}

export async function increaseJobUsedPostService(jobUsed: number) {
  const { supabase, user } = await getServerUser();

  if (!user) throw new Error("Unauthorized: Please login to continue");

  const { error } = await supabase
    .from("subscriptions")
    .update({ job_posts_used: jobUsed })
    .eq("user_id", user.id);

  if (error) throw new Error(error.message);
}

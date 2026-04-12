"use server";

import {
  EmployerPlanKey,
  JobSeekerPlanKey,
  PRICE_IDS,
} from "@/constants/BillingData";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { serverAuth } from "../auth/serverAuth";
import { createClient } from "../supabase/server";

const stripe = new Stripe(process.env.STRIPE_SK!);

export async function createCheckoutSession(
  planName: string,
  userRole: "employer" | "jobseeker",
) {
  const supabase = await createClient();

  const user = await serverAuth();
  console.log("plaName", planName);
  const { data: existingSubscription } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

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
    success_url: `${process.env.NEXT_PUBLIC_DOMAIN}/${userRole === "employer" ? "employer" : "job-seeker"}/dashboard?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_DOMAIN}/${userRole === "employer" ? "employer" : "job-seeker"}/billing`,
  });

  redirect(session.url!);
}

export async function createPortalSession(userRole: "employer" | "job-seeker") {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (!user || authError) redirect("/auth/signin");

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single();

  if (!sub?.stripe_customer_id) {
    throw new Error("No subscription found");
  }

  const portalSession = await stripe.billingPortal.sessions.create({
    customer: sub.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_DOMAIN}/${userRole}/billing`,
  });

  redirect(portalSession.url);
}

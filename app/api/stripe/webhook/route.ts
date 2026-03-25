import {
  sendNotification,
  sendSubscriptionNotification,
} from "@/lib/notifications.helper";
import { supabaseAdmin } from "@/lib/supabase/admin";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SK!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  // Verify request is really from Stripe
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err: any) {
    console.log("Webhook error:", err.message);
    return Response.json({ error: err.message }, { status: 400 });
  }
  const supabase = await supabaseAdmin();

  switch (event.type) {
    // ✅ Payment successful
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const subscription = await stripe.subscriptions.retrieve(
        session.subscription as string,
        {
          expand: ["items.data"],
        },
      );

      const current_period_end = subscription.items.data[0].current_period_end;

      const { userId, planName } = session.metadata!;

      const { data: existingSub } = await supabase
        .from("subscriptions")
        .select("plan")
        .eq("user_id", userId)
        .single();

      const isUpdating =
        existingSub?.plan !== null && existingSub?.plan !== planName;

      const error = await onPaymentCompleted(
        userId,
        planName,
        session.subscription as string,
        current_period_end,
      );

      await sendSubscriptionNotification(
        supabase,
        userId,
        planName,
        isUpdating ? "update" : "new",
      );

      console.log("checkout.session.completed error →", error);
      break;
    }

    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription: string | null;
      };

      if (invoice.billing_reason === "subscription_create") break;

      const customerId = invoice.customer as string;

      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
        { expand: ["items.data"] },
      );
      const current_period_end = subscription.items.data[0].current_period_end;

      const { error, sub } = await onPaymentSucceeded(
        customerId,
        current_period_end,
      );

      if (sub) {
        await sendSubscriptionNotification(
          supabase,
          sub.user_id,
          sub.plan as string,
          "renewed",
        );
      }

      console.log("invoice.payment_succeeded error →", error);
      break;
    }

    case "customer.subscription.updated": {
      const supabase = await supabaseAdmin();
      const subscription = await stripe.subscriptions.retrieve(
        (event.data.object as Stripe.Subscription).id,
      );

      const { data: sub } = await supabase
        .from("subscriptions")
        .select("user_id, plan")
        .eq("subscription_id", subscription.id)
        .single();

      const isCancelling =
        subscription.cancel_at_period_end || subscription.cancel_at !== null;

      let status = "active";
      let notificationType: string | null = null;

      if (subscription.status === "canceled") {
        status = "inactive";
        notificationType = "canceled";
      } else if (isCancelling) {
        status = "cancelling";
        notificationType = "cancelling";
      }

      const { error } = await supabase
        .from("subscriptions")
        .update({
          cancel_at_period_end: isCancelling,
          subscription_status: status,
          updated_at: new Date().toISOString(),
        })
        .eq("subscription_id", subscription.id);

      if (notificationType && sub) {
        await sendSubscriptionNotification(
          supabase,
          sub.user_id,
          sub.plan as string,
          notificationType,
        );
      }

      console.log("customer.subscription.updated error →", error);

      break;
    }
    // ❌ Subscription cancelled
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;
      const { error, sub } = await onSubCancelled(
        subscription.customer as string,
      );

      if (sub) {
        await sendNotification(
          supabase,
          sub.user_id,
          "subscription",
          "Subscription Cancelled",
          `Your ${sub.plan} plan has been cancelled. You can resubscribe anytime.`,
          "deleted",
        );
      }

      console.log("customer.subscription.deleted error →", error);
      break;
    }

    // ⚠️ Payment failed
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const { error, sub } = await onPaymentFailed(invoice.customer as string);

      if (sub) {
        await sendSubscriptionNotification(
          supabase,
          sub.user_id,
          sub.plan as string,
          "payment_failed",
        );
      }

      console.log("invoice.payment_failed error →", error);
      break;
    }
  }

  return Response.json({ received: true });
}

async function onPaymentCompleted(
  userId: string,
  planName: string,
  subscription_id: string,
  current_period_end: number,
) {
  const supabase = await supabaseAdmin();

  const { error } = await supabase
    .from("subscriptions")
    .update({
      plan: planName,
      subscription_id,
      subscription_status: "active",
      job_posts_used: 0,
      applications_used: 0,
      plan_expires_at: new Date(current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  return error;
}

async function onPaymentSucceeded(
  customerId: string,
  current_period_end: number,
) {
  const supabase = await supabaseAdmin();
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("user_id, plan")
    .eq("stripe_customer_id", customerId)
    .single();

  const { error } = await supabase
    .from("subscriptions")
    .update({
      subscription_status: "active",
      job_posts_used: 0,
      applications_used: 0,
      plan_expires_at: new Date(current_period_end * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  return { error, sub };
}

async function onSubCancelled(customerId: string) {
  const supabase = await supabaseAdmin();
  const { data: sub } = await supabase
    .from("subscriptions")
    .select("user_id, plan")
    .eq("stripe_customer_id", customerId)
    .single();

  const { error } = await supabase
    .from("subscriptions")
    .update({
      plan: null,
      subscription_id: null,
      plan_expires_at: null,
      subscription_status: "inactive",
      cancel_at_period_end: false,
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  return { error, sub };
}

async function onPaymentFailed(customerId: string) {
  const supabase = await supabaseAdmin();

  const { data: sub } = await supabase
    .from("subscriptions")
    .select("user_id, plan")
    .eq("stripe_customer_id", customerId)
    .single();
  const { error } = await supabase
    .from("subscriptions")
    .update({
      subscription_status: "past_due",
      updated_at: new Date().toISOString(),
    })
    .eq("stripe_customer_id", customerId);

  return { error, sub };
}

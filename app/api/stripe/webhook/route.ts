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

      const { userId, planKey } = session.metadata!;
      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan: planKey,
          subscription_id: session.subscription as string,
          subscription_status: "active",
          job_posts_used: 0,
          applications_used: 0,
          plan_expires_at: new Date(current_period_end * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq("user_id", userId);

      console.log("checkout.session.completed error →", error);
      break;
    }

    // ✅ Monthly renewal — reset usage counters
    case "invoice.payment_succeeded": {
      const invoice = event.data.object as Stripe.Invoice & {
        subscription: string | null;
      };
      const customerId = invoice.customer as string;

      const subscription = await stripe.subscriptions.retrieve(
        invoice.subscription as string,
        { expand: ["items.data"] },
      );
      const current_period_end = subscription.items.data[0].current_period_end;

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

      console.log("invoice.payment_succeeded error →", error);
      break;
    }

    // ❌ Subscription cancelled
    case "customer.subscription.deleted": {
      const subscription = event.data.object as Stripe.Subscription;

      const { error } = await supabase
        .from("subscriptions")
        .update({
          plan: null,
          subscription_id: null,
          plan_expires_at: null,
          subscription_status: "inactive",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", subscription.customer as string);

      console.log("customer.subscription.deleted error →", error);
      break;
    }

    // ⚠️ Payment failed
    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;

      const { error } = await supabase
        .from("subscriptions")
        .update({
          subscription_status: "past_due",
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_customer_id", invoice.customer as string);

      console.log("invoice.payment_failed error →", error);
      break;
    }
  }

  return Response.json({ received: true });
}
